import { API_BASE_URL } from '../../constants';
import { ICharactersResponsePayload } from './types';

export const getCharacters = async (): Promise<ICharactersResponsePayload> => {
    return await fetch(`${API_BASE_URL}/character`)
        .then(response => response.json())
        .catch(error => Promise.reject(error));
};

export const getCharacter = async (id: number) => {
    return await fetch(`${API_BASE_URL}/character/${id}`)
        .then(data => data.json())
        .catch(error => Promise.reject(error));
};
