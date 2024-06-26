import { IInfo } from '../character/types';

export interface ILocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Array<string>;
    url: string;
    created: string;
}

export interface ILocationsResponsePayload {
    info: IInfo;
    results: Array<ILocation>;
}
