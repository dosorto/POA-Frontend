export interface Departamento {
    id:                number;
    name:              string;
    descripcion:       string;
    isDelete:          boolean;
    createdAt:         Date;
    updatedAt:         Date;
    idUnidadEjecutora: number;
}