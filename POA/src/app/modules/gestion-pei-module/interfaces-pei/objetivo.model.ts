 import { Pei } from "./pei.model";
 import { Dimension } from './dimension.model';
export interface Objetivo {
    id:          number;
    nombre:      string;
    descripcion: string;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idDimension: number;
    idPei:       number;
    pei:         Pei;
    dimension:   Dimension;
}


