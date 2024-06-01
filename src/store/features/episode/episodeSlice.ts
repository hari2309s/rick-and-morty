import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { getEpisode as getEpisodeAPI } from '../../../api/episode';
import { IEpisode, IEpisodeResponsePayload } from '../../../api/episode/types';
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

export const getEpisode = createAsyncThunk(
    'episode/getEpisode',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getEpisodeAPI().then(data => data);
            return response as IEpisodeResponsePayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getEpisode.fulfilled,
                (state, action: PayloadAction<IEpisodeResponsePayload>) => {
                    state.episodes = action.payload.results;
                    state.paginationInfo = action.payload.info;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getEpisode.pending, state => {
                state.episodes = [];
                state.paginationInfo = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getEpisode.rejected, (state, action) => {
                state.episodes = [];
                state.paginationInfo = null;
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const selectEpisodes = (state: RootState) => state.episode.episodes;
export const selectEpisodesPaginationInfo = (state: RootState) =>
    state.episode.paginationInfo;
export const selectEpisodesLoading = (state: RootState) =>
    state.episode.loading;
export const selectEpisodesError = (state: RootState) => state.episode.error;

export default episodeSlice.reducer;
