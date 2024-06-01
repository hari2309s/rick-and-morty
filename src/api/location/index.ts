import { API_BASE_URL } from '../../constants';

export const getLocation = () => {
    return fetch(`${API_BASE_URL}/location`)
        .then(data => data.json())
        .catch(error => Promise.reject(error));
};
