import {Peripheral} from './Peripheral';

export interface Gateway {
    _id:        string;
    uid:        string;
    name:       string;
    ipv4:       string;
    peripheral: Peripheral[];
}
