import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './features/character/characterSlice';
import episodeReducer from './features/episode/episodeSlice';
import locationReducer from './features/location/locationSlice';

export const store = configureStore({
    reducer: {
        character: characterReducer,
        episode: episodeReducer,
        location: locationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
