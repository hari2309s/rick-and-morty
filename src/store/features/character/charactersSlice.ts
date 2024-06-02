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
import { getCharacter as getCharacterAPI } from '../../../api/character';

interface CharactersState {
    characters: ICharacter[];
    selectedCharacter: ICharacter | null;
    paginationInfo: IInfo | null;
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: CharactersState = {
    characters: [],
    selectedCharacter: null,
    paginationInfo: null,
    loading: false,
    error: null,
};

export const getCharacters = createAsyncThunk(
    'characters/getCharacters',
    async (page: number | undefined, { rejectWithValue }) => {
        try {
            const response = await getCharactersAPI(page).then(data => data);
            return response as ICharactersResponsePayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const getCharacter = createAsyncThunk(
    'characters/getCharacter',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await getCharacterAPI(id).then(data => data);
            return response as ICharacter;
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
            })
            .addCase(
                getCharacter.fulfilled,
                (state, action: PayloadAction<ICharacter>) => {
                    state.selectedCharacter = action.payload;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getCharacter.pending, state => {
                state.selectedCharacter = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getCharacter.rejected, (state, action) => {
                state.selectedCharacter = null;
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

export const selectSelectedCharacter = (state: RootState) =>
    state.characters.selectedCharacter;
export const selectSelectedCharacterLoading = (state: RootState) =>
    state.characters.loading;
export const selectSelectedCharacterError = (state: RootState) =>
    state.characters.error;

export default charactersSlice.reducer;
