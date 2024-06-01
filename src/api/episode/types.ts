import { IInfo } from '../character/types';

export interface IEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Array<string>;
    url: string;
    created: string;
}

export interface IEpisodesResponsePayload {
    info: IInfo;
    results: Array<IEpisode>;
}
