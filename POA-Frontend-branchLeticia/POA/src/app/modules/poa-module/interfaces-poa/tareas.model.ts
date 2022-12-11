import { Actividad } from "./actividad.model";
import { ObjetoGasto } from "./objeto_gasto.model";
import { Presupuesto } from "./presupuesto.model";

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
    presupuesto: Presupuesto;
    objeto: ObjetoGasto;
}