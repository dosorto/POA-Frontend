export namespace ResultadoModels {
    export interface Resultado {
        id:          number;
        nombre:      string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idArea:      number;
        idDimension: number;
        idObjetivos:  number;
        idPei:       number;
        area:        area;
        dimension:   Dimension;
        objetivo:    objetivos;
        pei:         Pei;
    }

    export interface area {
        id:          number,
        nombre:      string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idDimension: number;
        idObjetivos: number;
        idPei:       number;
    }

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

    export interface objetivos {
        id:          number,
        nombre:      string;
        isDelete:    boolean;
        createdAt:   Date;
        updatedAt:   Date;
        idDimension: number;
        idPei:       number;

    }

    
}