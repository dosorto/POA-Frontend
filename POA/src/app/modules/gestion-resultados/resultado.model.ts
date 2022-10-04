export namespace ResultadoModels {
    export interface resultado {
        id:          number;
        nombre:      string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idArea:      number;
        idObjetivo:  number;
        idDimension: number;
        idPei:       number;
        PEI:         Pei;
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
    
    export interface Pei {
        id:          number;
        nombre:       string;
        initialYear: Date;
        finalYear:   Date;
        isActive:    boolean;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
    }
}