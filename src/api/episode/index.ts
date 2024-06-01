import { API_BASE_URL } from '../../constants';
import { IEpisodesResponsePayload } from './types';

export const getEpisodes = async (): Promise<IEpisodesResponsePayload> => {
    return await fetch(`${API_BASE_URL}/episode`)
        .then(response => response.json())
        .catch(error => Promise.reject(error));
};
