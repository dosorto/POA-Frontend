 //import { Pei } from "./pei.model";
 //import { Dimension } from './dimension.model';
 
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

export interface Dimension {
    id:          number;
    nombre:      string;
    descripcion: string;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idPei:       number;
}

export interface Pei {
    id:          number;
    name:        string;
    initialYear: Date;
    finalYear:   Date;
    isActive:    boolean;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idInstitucion: number;
}
 

