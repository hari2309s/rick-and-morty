import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { getLocations as getLocationsAPI } from '../../../api/location';
import {
    ILocation,
    ILocationsResponsePayload,
} from '../../../api/location/types';
import { IInfo } from '../../../api/character/types';
import { RootState } from '../..';

export interface LocationsState {
    locations: Array<ILocation>;
    paginationInfo: IInfo | null;
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: LocationsState = {
    locations: [],
    paginationInfo: null,
    loading: false,
    error: null,
};

export const getLocations = createAsyncThunk(
    'locations/getLocations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getLocationsAPI().then(data => data);
            return response as ILocationsResponsePayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getLocations.fulfilled,
                (state, action: PayloadAction<ILocationsResponsePayload>) => {
                    state.locations = action.payload.results;
                    state.paginationInfo = action.payload.info;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getLocations.pending, state => {
                state.locations = [];
                state.paginationInfo = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getLocations.rejected, (state, action) => {
                state.locations = [];
                state.paginationInfo = null;
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const selectLocations = (state: RootState) => state.locations.locations;
export const selectLocationsPaginationInfo = (state: RootState) =>
    state.locations.paginationInfo;
export const selectLocationsLoading = (state: RootState) =>
    state.locations.loading;
export const selectLocationsError = (state: RootState) => state.locations.error;

export default locationsSlice.reducer;
