import { Institucion } from '../../administracion-module/interfaces/institucion.model';
export interface UnidadEjecutora {
        id:            number;
        name:          string;
        descripcion:   string;
        isDelete:      boolean;
        createdAt:     Date;
        updatedAt:     Date;
        idInstitucion: number;
        Institucion:   Institucion;
    }