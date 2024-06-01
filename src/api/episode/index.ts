import { API_BASE_URL } from '../../constants';

export const getEpisode = async () => {
    return await fetch(`${API_BASE_URL}/episode`)
        .then(response => response.json())
        .catch(error => Promise.reject(error));
};
