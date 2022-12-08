import { Role } from "./role.model";
import { Empleado } from "./empleado.model";
export interface Usuario {
    id:         number;
    email:      string;
    username:   string;
    isDelete:   boolean;
    createdAt:  Date;
    updatedAt:  Date;
    idEmpleado: number;
    idRol:      number;
    role:       Role;
    empleado:   Empleado;
}