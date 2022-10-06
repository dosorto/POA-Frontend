export namespace AreaModels {
  export interface Area {
    id: number;
    nombre: string;
    isDelete:    boolean;
    createdAt:   Date;
    updatedAt:   Date;
    idObjetivo: number;
    idDimension: number;
    idPei: number;
  }
}