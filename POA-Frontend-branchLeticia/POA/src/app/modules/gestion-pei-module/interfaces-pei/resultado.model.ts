import { Pei } from "./pei.model";
import { Dimension } from "./dimension.model";
import { Objetivo } from "./objetivo.model";
import { Area } from "./area.model";

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
    objetivo:    Objetivo;
    dimension:   Dimension;
    pei:         Pei;
}



