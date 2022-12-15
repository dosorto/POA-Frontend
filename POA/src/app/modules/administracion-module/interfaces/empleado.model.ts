import { UnidadEjecutora } from "../../poa-module/interfaces-poa/unidad_ejecutora.model";
export interface Empleado {
    id:                number;
    dni:               string;
    nombre:            string;
    apellido:          string;
    direccion:         string;
    telefono:          string;
    fechaNacimiento:   Date;
    sexo:              string;
    isDelete:          boolean;
    createdAt:         Date;
    updatedAt:         Date;
    idUnidadEjecutora: number;
    ejecutora:         UnidadEjecutora;
}