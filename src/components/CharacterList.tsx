import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCharacter,
    selectCharacters,
} from '../store/features/character/characterSlice';
import { ICharacter } from '../api/character/types';
import Character from './Character';
import { AppDispatch } from '../store';
import { Box, Grid } from '@mui/joy';

const List = () => {
    const dispatch: AppDispatch = useDispatch();

    const characters: ICharacter[] = useSelector(selectCharacters);

    useEffect(() => {
        dispatch(getCharacter());
    }, []);

    return (
        <Box
            sx={{
                paddingTop: '30px',
                height: '60vw',
                overflowY: 'scroll',
                overflowX: 'hidden',
            }}
        >
            <Grid container justifyContent="center" spacing={1}>
                {characters.map(character => (
                    <Grid key={character.id}>
                        <Character character={character} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default List;
