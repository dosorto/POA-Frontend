import { InstitucionModels } from "src/app/archivos_antiguos/gestion-institucion-module/institucion.model";
export interface Empleado{
    id:          number;
    dni:string,
    nombre:string,
    apellido:string,
    direccion:string,
    telefono :string,
    fechaNacimiento : string,
    sexo: string,
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idInstitucion: number  
   
}