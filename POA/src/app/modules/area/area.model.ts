export namespace AreaModels {
  export interface Area {
    id: number;
    nombre: string;
    isDelete: boolean;
    createdAt: Date;
    updatedAt: Date;
    idObjetivo: number;
    idDimension: number;
    idPei: number;
    objetivo : Objetivo;
    dimension: Dimension;
    pei : Pei;
  }

  export interface Objetivo {
    id:number;
    nombre: string;
    isDelete: boolean;
    createdAt: Date;
    updatedAt: Date;
    idDimension: number;
    idPei: number;
  }
  export interface Dimension {
    id: number;
    nombre: string;
    descripcion: string;
    isDelete: boolean;
    createdAt: Date;
    updatedAt: Date;
    idPei: number;
    pei: Pei;
  }
  export interface Pei {
    id: number;
    name: string;
    initialYear: Date;
    finalYear: Date;
    isActive: boolean;
    isDelete: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}