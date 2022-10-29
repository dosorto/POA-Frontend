export namespace objetivomodel {
    export interface Dimension {
        id:          number;
        nombre:      string;
        descripcion: string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idPei:       number;
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

    export interface objetivo {
        id:          number,
        nombre:      string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idDimension: number;
        idPei:       number;
        dimension:   Dimension;
        pei:         Pei;
    }
}