import { Actividad } from './actividad.model';
export interface Indicadores {
    id:                  number;
    nombre:              string;
    descripcion:         string;
    cantidadPlanificada: number;
    cantidadEjecutada:   number;
    promedioAlcanzado:   number;
    isDelete:            boolean;
    createdAt:           Date;
    updatedAt:           Date;
    idActividad:         number;
    actividade:          Actividad;
}