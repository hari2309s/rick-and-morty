import { AspectRatio, Box, Button, Card, Typography } from '@mui/joy';
import React from 'react';
import { CharacterStatus, ICharacter } from '../api/character/types';

interface CharacterProps {
    character: ICharacter;
}

const Character = ({ character }: CharacterProps) => {
    const handleCharacterClick = () => {
        console.log('eeeee ', character.id);
    };

    return (
        <Card sx={{ width: '300px', height: '350px', margin: '20px' }}>
            <Typography
                level="title-lg"
                sx={{
                    alignSelf: 'start',
                    color: '#606c38',
                    outline: 'none',
                    border: 'none',
                    background: 'none',
                    '&:hover': {
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                    },
                }}
                component={Button}
                onClick={handleCharacterClick}
            >
                {character.name}
            </Typography>
            <AspectRatio>
                <img src={character.image} alt={character.name} />
            </AspectRatio>
            <Box component="div" sx={{ display: 'flex' }}>
                <Typography
                    level="title-sm"
                    sx={{
                        color:
                            character.status === CharacterStatus.ALIVE
                                ? 'green'
                                : character.status === CharacterStatus.DEAD
                                  ? 'red'
                                  : 'black',
                        alignSelf: 'start',
                    }}
                >
                    {character.status}
                </Typography>
                &nbsp;
                <Typography level="title-sm">
                    &nbsp;{'- ' + character.species}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'left',
                }}
            >
                <Typography level="title-sm">Last known location:</Typography>
                &nbsp;
                <Typography level="body-sm">
                    {character.location.name}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'left',
                }}
            >
                <Typography level="title-sm">First seen in:</Typography>
                &nbsp;
                <Typography level="body-sm">{character.origin.name}</Typography>
            </Box>
        </Card>
    );
};

export default Character;
