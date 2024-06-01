import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { getLocation as getLocationAPI } from '../../../api/location';
import {
    ILocation,
    ILocationResponsePayload,
} from '../../../api/location/types';
import { IInfo } from '../../../api/character/types';
import { RootState } from '../..';

export interface LocationState {
    locations: Array<ILocation>;
    paginationInfo: IInfo | null;
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: LocationState = {
    locations: [],
    paginationInfo: null,
    loading: false,
    error: null,
};

export const getLocation = createAsyncThunk(
    'location/getLocations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getLocationAPI().then(data => data);
            return response as ILocationResponsePayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getLocation.fulfilled,
                (state, action: PayloadAction<ILocationResponsePayload>) => {
                    state.locations = action.payload.results;
                    state.paginationInfo = action.payload.info;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getLocation.pending, state => {
                state.locations = [];
                state.paginationInfo = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getLocation.rejected, (state, action) => {
                state.locations = [];
                state.paginationInfo = null;
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const selectLocations = (state: RootState) => state.location.locations;
export const selectLocationsPaginationInfo = (state: RootState) =>
    state.location.paginationInfo;
export const selectLocationsLoading = (state: RootState) =>
    state.location.loading;
export const selectLocationsError = (state: RootState) => state.location.error;

export default locationSlice.reducer;
