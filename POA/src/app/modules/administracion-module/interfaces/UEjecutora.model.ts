import { Institucion } from './institucion.model';
export interface Ejecutora {
    id:            number;
    name:          string;
    descripcion:   string;
    isDelete:      boolean;
    createdAt:     Date;
    updatedAt:     Date;
    idInstitucion: number;
    Institucion:   Institucion;
}