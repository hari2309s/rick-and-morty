import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './features/character/charactersSlice';
import episodesReducer from './features/episode/episodesSlice';
import locationsReducer from './features/location/locationsSlice';

export const store = configureStore({
    reducer: {
        characters: charactersReducer,
        episodes: episodesReducer,
        locations: locationsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
