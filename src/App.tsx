import React from 'react';
import './App.css';
import { Typography } from '@mui/joy';
import CharacterList from './components/CharacterList';

function App() {
    return (
        <div className="App">
            <Typography level="h2" sx={{ color: '#606c38', marginTop: '30px' }}>
                Rick and Morty
            </Typography>
            <div>
                <Typography
                    level="title-lg"
                    sx={{ color: '#606c38', margin: '20px' }}
                >
                    Characters
                </Typography>
                <CharacterList />
            </div>
        </div>
    );
}

export default App;
