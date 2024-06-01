import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './features/character/characterSlice';
import episodeReducer from './features/episode/episodeSlice';

export const store = configureStore({
    reducer: {
        character: characterReducer,
        episode: episodeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
