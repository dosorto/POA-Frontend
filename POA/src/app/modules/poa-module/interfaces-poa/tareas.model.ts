import { Actividad } from "./actividad.model";

export interface Tareas {
    id:            number;
    nombre:        string;
    descripcion:   string;
    isDelete:      boolean;
    isPresupuesto: boolean;
    createdAt:     Date;
    updatedAt:     Date;
    idActividad:   number;
    actividades:   Actividad;
}