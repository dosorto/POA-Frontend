import { Pei } from "./pei.model";
import { Dimension } from './dimension.model';
export interface Objetivo {
    id:          number;
    nombre:      string;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idDimension: number;
    idpei:       number;
    pei:         Pei;
    dimension:   Dimension;
}