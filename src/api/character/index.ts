import { API_BASE_URL } from '../../constants';
import { ICharactersResponsePayload } from './types';

export const getCharacters = async (
    page?: number,
): Promise<ICharactersResponsePayload> => {
    const pageNumber: number = page && page > 1 && page <= 826 ? page - 1 : 0;
    const characetersURL =
        pageNumber > 0
            ? `${API_BASE_URL}/character/?page=${pageNumber}`
            : `${API_BASE_URL}/character`;
    return await fetch(characetersURL)
        .then(response => response.json())
        .catch(error => Promise.reject(error));
};

export const getCharacter = async (id: number) => {
    return await fetch(`${API_BASE_URL}/character/${id}`)
        .then(data => data.json())
        .catch(error => Promise.reject(error));
};
