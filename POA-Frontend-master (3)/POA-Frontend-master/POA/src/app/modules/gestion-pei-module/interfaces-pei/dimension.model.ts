import { Pei } from "./pei.model";

export interface Dimension {
    id:          number;
    nombre:      string;
    descripcion: string;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idPei:       number;
    pei:         Pei;
}