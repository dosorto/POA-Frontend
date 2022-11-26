// import { Pei } from "./pei.model";
// import { Dimension } from "./dimension.model";
// import { Objetivo } from "./objetivo.model";
// import { Area } from "./area.model";

export interface Resultado {
    id:           number;
    nombre:       string;
    descripcion: string;
    isDelete:     boolean;
    createdAt:    Date;
    updatedAt:    Date;
    idArea:      number;
    idObjetivos: number;
    idDimension: number;
    idPei:        number;
    area:        Area;
    objetivo:    Objetivos;
    dimension:   Dimension;
    pei:         Pei;
}


export interface Area {
    id:          number,
    nombre:      string;
    descripcion: string;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idDimension: number;
    idObjetivos: number;
    idPei:       number;
    objetivo:    Objetivos;
}

export interface Dimension {
    id:          number;
    nombre:      string;
    descripcion: string;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idPei:       number;
    pei:         Pei;
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

export interface Objetivos {
    id:          number,
    nombre:      string;
    descripcion: string,
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idDimension: number;
    idPei:       number;
    dimension:   Dimension;

}


