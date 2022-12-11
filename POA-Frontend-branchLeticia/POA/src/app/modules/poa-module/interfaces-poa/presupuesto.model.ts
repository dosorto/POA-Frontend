import { Tareas } from "./tareas.model";
import { Fuente } from "./fuente_gasto.model";
import { Grupogasto } from "./grupo_gasto.model";
import { Unidadmedida } from "./unidad_medida.model";
import { ObjetoGasto } from "./objeto_gasto.model";
import { Actividad } from "./actividad.model";
export interface Presupuesto {
    id:            number;
    cantidad:      number;
    costounitario: number;
    total:         number;
    isDelete:      boolean;
    createdAt:     Date;
    updatedAt:     Date;
    idgrupo:       number;
    idobjeto:      number;
    idtarea:       number;
    idfuente:      number;
    idunidad:      number;
    idActividad: number;
    tarea:         Tareas;
    objetogasto:   ObjetoGasto;
    grupogasto:    Grupogasto;
    unidadmedida:  Unidadmedida;
    fuente:        Fuente;
    actividad: Actividad;
}