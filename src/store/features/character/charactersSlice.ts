import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { getCharacters as getCharactersAPI } from '../../../api/character/index';
import {
    ICharacter,
    ICharactersResponsePayload,
    IInfo,
} from '../../../api/character/types';
import { RootState } from '../..';

interface CharactersState {
    characters: ICharacter[];
    paginationInfo: IInfo | null;
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: CharactersState = {
    characters: [],
    paginationInfo: null,
    loading: false,
    error: null,
};

export const getCharacters = createAsyncThunk(
    'characters/getCharacters',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCharactersAPI().then(data => data);
            return response as ICharactersResponsePayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getCharacters.fulfilled,
                (state, action: PayloadAction<ICharactersResponsePayload>) => {
                    state.characters = action.payload.results;
                    state.paginationInfo = action.payload.info;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getCharacters.pending, state => {
                state.loading = true;
                state.characters = [];
                state.paginationInfo = null;
                state.error = null;
            })
            .addCase(getCharacters.rejected, (state, action) => {
                state.characters = [];
                state.paginationInfo = null;
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const selectCharacters = (state: RootState) =>
    state.characters.characters;
export const selectCharactersPaginationInfo = (state: RootState) =>
    state.characters.paginationInfo;
export const selectCharactersLoading = (state: RootState) =>
    state.characters.loading;
export const selectCharactersError = (state: RootState) =>
    state.characters.error;

export default charactersSlice.reducer;
