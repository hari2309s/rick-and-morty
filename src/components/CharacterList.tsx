import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCharacters,
    selectCharacters,
    selectCharactersLoading,
    selectCharactersPaginationInfo,
} from '../store/features/character/charactersSlice';
import { ICharacter, IInfo } from '../api/character/types';
import Character from './Character';
import { AppDispatch } from '../store';
import { Box, CircularProgress, Grid } from '@mui/joy';
import CharacterPagination from './CharacterPagination';

const List = () => {
    const dispatch: AppDispatch = useDispatch();

    const characters: ICharacter[] = useSelector(selectCharacters);
    const charactersLoading: boolean = useSelector(selectCharactersLoading);
    const paginationInfo: IInfo | null = useSelector(
        selectCharactersPaginationInfo,
    );

    const [pageCount, setPageCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(getCharacters());
    }, []);

    useEffect(() => {
        if (paginationInfo) {
            setPageCount(Math.floor(paginationInfo.count / 20));
        }
    }, [paginationInfo]);

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        page: number,
    ) => {
        dispatch(getCharacters(page));
        setCurrentPage(page);
    };

    return (
        <Box
            sx={{
                paddingTop: '30px',
                height: '60vw',
                overflowY: 'scroll',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CharacterPagination
                currentPage={currentPage}
                pageCount={pageCount}
                onChange={handlePaginationChange}
            />
            {charactersLoading ? (
                <CircularProgress
                    size="lg"
                    sx={{ alignSelf: 'center', margin: '50px' }}
                />
            ) : (
                <Grid container justifyContent="center" spacing={1}>
                    {characters.map(character => (
                        <Grid key={character.id}>
                            <Character character={character} />
                        </Grid>
                    ))}
                </Grid>
            )}
            <CharacterPagination
                currentPage={currentPage}
                pageCount={pageCount}
                onChange={handlePaginationChange}
            />
        </Box>
    );
};

export default List;
