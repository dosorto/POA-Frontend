export interface Planificacion{
    id: number;
    trimestre: string;
    cantidad: number;
    fechaInicio: Date;
    fechaFin: Date;
    isDelete:      boolean;
    createdAt:     Date;
    updatedAt:     Date;
}