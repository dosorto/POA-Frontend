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
        objetivo:    objetivos;
    }

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
        dimension:   Dimension;

    }

    
}