import { Role } from "./role.model";
export interface Empleado {
    id:              number;
    dni:             string;
    nombre:          string;
    apellido:        string;
    direccion:       string;
    telefono:        string;
    fechaNacimiento: Date;
    sexo:            string;
    isDelete:        boolean;
    createdAt:       Date;
    updatedAt:       Date;
    idInstitucion:   number;
    Institucion:     Role;
}