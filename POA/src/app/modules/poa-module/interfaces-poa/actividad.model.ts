
export interface Actividad{
    id:          number;
    nombre:      string;
    descripcion: string,
    estado: string,
    tipoActividad: string,
    categoria: string,
    isActive:    boolean;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idResultado: number
}