import { Pei } from "./pei.model";
import { Dimension } from "./dimension.model";
import { Objetivo } from "./objetivo.model";
import { Area } from "./area.model";
import { Resultado } from "./resultado.model";
export interface Indicador {
    id:           number;
    nombre:       string;
    descripcion?: string;
    isDelete:     boolean;
    createdAt:    Date;
    updatedAt:    Date;
    idResultado: number;
    idArea:      number;
    idObjetivos: number;
    idDimension: number;
    idpei:        number;
    resultado: Resultado;
    area:        Area;
    objetivo:    Objetivo;
    dimension:   Dimension;
    pei:         Pei;
}