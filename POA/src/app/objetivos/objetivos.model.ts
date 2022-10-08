export namespace objetivomodel {
export interface objetivo{
    id:Number,
    nombre: string;
    idDimension: number;
    idPei: number;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
   
}
    export interface Pei {
        id:          number;
        name:        string;
        initialYear: Date;
        finalYear:   Date;
        isActive:    boolean;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
    }
    export interface dimension {
        id:          number;
        nombre:      string;
        descripcion: string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idPei:       number;
        PEI:         Pei;
    }
}