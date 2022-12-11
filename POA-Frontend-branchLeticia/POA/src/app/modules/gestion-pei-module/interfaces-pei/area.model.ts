import { Pei } from "./pei.model";
import { Dimension } from "./dimension.model";
import { Objetivo } from "./objetivo.model";
export interface Area {
    id:          number;
    nombre:      string;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idObjetivos: number;
    idDimension: number;
    idpei:       number;
    pei:         Pei;
    dimension:   Dimension;
    objetivo:    Objetivo;
}