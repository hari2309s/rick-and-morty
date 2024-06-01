import { API_BASE_URL } from '../../constants';
import { ILocationsResponsePayload } from './types';

export const getLocations = (): Promise<ILocationsResponsePayload> => {
    return fetch(`${API_BASE_URL}/location`)
        .then(data => data.json())
        .catch(error => Promise.reject(error));
};
