import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { getCharacter as getCharacterAPI } from '../../../api/character/index';
import {
    Character,
    ICharacterResponsePayload,
    Info,
} from '../../../api/character/types';

interface CharacterState {
    characters: Character[];
    paginationInfo: Info | null;
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: CharacterState = {
    characters: [],
    paginationInfo: null,
    loading: false,
    error: null,
};

export const getCharacter = createAsyncThunk(
    'character/getCharacter',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCharacterAPI().then(data => data);
            return response as ICharacterResponsePayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const CharacterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getCharacter.fulfilled,
                (state, action: PayloadAction<ICharacterResponsePayload>) => {
                    state.characters = action.payload.results;
                    state.paginationInfo = action.payload.info;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getCharacter.pending, state => {
                state.loading = true;
                state.characters = [];
                state.paginationInfo = null;
                state.error = null;
            })
            .addCase(getCharacter.rejected, (state, action) => {
                state.characters = [];
                state.paginationInfo = null;
                state.loading = false;
                state.error = action.error;
            });
    },
});
