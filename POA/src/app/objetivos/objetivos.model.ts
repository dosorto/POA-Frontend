export namespace objetivomodel {
    export interface dimension {
        id:          number;
        nombre:      string;
        descripcion: string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idPei:       number;
    }
    
    export interface pei {
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
        Dimension:   dimension;
        Pei:         pei;
    }
}