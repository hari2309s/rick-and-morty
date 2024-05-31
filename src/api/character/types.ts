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

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
}

export interface Character {
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

export interface ICharacterResponsePayload {
    info: Info;
    results: Array<Character>;
}
