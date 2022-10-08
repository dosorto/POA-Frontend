export namespace DimensionModels {
    export interface dimension {
        id:          number;
        nombre:      string;
        descripcion: string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idPei:       number;
        pei:         Pei;
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
}