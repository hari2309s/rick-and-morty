import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AspectRatio,
    Box,
    Modal,
    ModalClose,
    ModalProps,
    Sheet,
    Typography,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCharacter,
    selectSelectedCharacter,
} from '../store/features/character/charactersSlice';

interface CharacterModalProps extends Omit<ModalProps, 'children'> {
    characterId: number;
    setOpen: (open: boolean) => void;
}

const CharacterModal = ({
    characterId,
    open,
    setOpen,
}: CharacterModalProps) => {
    const dispatch: AppDispatch = useDispatch();

    const selectedCharacter = useSelector(selectSelectedCharacter);

    useEffect(() => {
        if (characterId && open) {
            dispatch(getCharacter(characterId));
        }
    }, [characterId]);

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: '500px',
                    height: '350px',
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                >
                    {selectedCharacter?.name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <AspectRatio
                        sx={{
                            width: '300px',
                            borderRadius: '5px',
                        }}
                        ratio={1}
                    >
                        <img
                            src={selectedCharacter?.image}
                            alt={selectedCharacter?.name}
                        />
                    </AspectRatio>
                    <Box marginLeft={2}>
                        <Accordion sx={{ height: '150px' }}>
                            <AccordionSummary>Episodes</AccordionSummary>
                            <AccordionDetails sx={{ overflow: 'scroll' }}>
                                {selectedCharacter?.episode.map(episodeItem => (
                                    <Typography
                                        level="body-lg"
                                        key={episodeItem}
                                    >
                                        {episodeItem}
                                    </Typography>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Box>
            </Sheet>
        </Modal>
    );
};

export default CharacterModal;
