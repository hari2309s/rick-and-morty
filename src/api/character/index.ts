import { API_BASE_URL } from '../../constants';
import { ICharacterResponsePayload } from './types';

export const getCharacter = async (): Promise<ICharacterResponsePayload> => {
    return await fetch(`${API_BASE_URL}/character`)
        .then(response => response.json())
        .catch(error => Promise.reject(error));
};
