import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { getEpisodes as getEpisodesAPI } from '../../../api/episode';
import { IEpisode, IEpisodesResponsePayload } from '../../../api/episode/types';
import { IInfo } from '../../../api/character/types';
import { RootState } from '../..';

export interface EpisodeState {
    episodes: Array<IEpisode>;
    paginationInfo: IInfo | null;
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: EpisodeState = {
    episodes: [],
    paginationInfo: null,
    loading: false,
    error: null,
};

export const getEpisodes = createAsyncThunk(
    'episodes/getEpisodes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getEpisodesAPI().then(data => data);
            return response as IEpisodesResponsePayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const episodeSlice = createSlice({
    name: 'episodes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getEpisodes.fulfilled,
                (state, action: PayloadAction<IEpisodesResponsePayload>) => {
                    state.episodes = action.payload.results;
                    state.paginationInfo = action.payload.info;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getEpisodes.pending, state => {
                state.episodes = [];
                state.paginationInfo = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getEpisodes.rejected, (state, action) => {
                state.episodes = [];
                state.paginationInfo = null;
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const selectEpisodes = (state: RootState) => state.episodes.episodes;
export const selectEpisodesPaginationInfo = (state: RootState) =>
    state.episodes.paginationInfo;
export const selectEpisodesLoading = (state: RootState) =>
    state.episodes.loading;
export const selectEpisodesError = (state: RootState) => state.episodes.error;

export default episodeSlice.reducer;
