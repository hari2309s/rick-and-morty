export enum CharacterStatus {
    ALIVE = 'Alive',
    DEAD = 'Dead',
    UNKNOWN = 'unknown',
}

export interface ICharacterOrigin {
    name: string;
    link: string;
}

export interface ILastKnownLocation extends ICharacterOrigin {}

export interface IInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface ICharacter {
    id: number;
    name: string;
    status: CharacterStatus;
    species: string;
    type: string;
    gender: string;
    origin: ICharacterOrigin;
    location: ILastKnownLocation;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
}

export interface ICharactersResponsePayload {
    info: IInfo;
    results: Array<ICharacter>;
}
