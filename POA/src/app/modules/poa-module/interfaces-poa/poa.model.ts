import {Depto} from "./depto.model";
import { UnidadEjecutora } from "./unidad_ejecutora.model";
import { Institucion } from "../../administracion-module/interfaces/institucion.model";

export interface Poa {
    id:        number;
    name:      string;
    anio:      string;
    fuente11:  string;
    fuente12:  string;
    fuente12B: string;
    isDelete:  boolean;
    isActive:  boolean;
    createdAt: Date;
    updatedAt: Date;
    idDepto:   number;
    idUE:      number;
    idInsti: number;
    depto: Depto;
    unidadE: UnidadEjecutora;
    institucion: Institucion;

}