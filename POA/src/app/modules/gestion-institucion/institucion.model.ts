export namespace InstitucionModels {
    export interface Institucion {
        id:string;
        nombre: string;
        descripcion: string;
    }
    export interface Pei {
        id: number;
        name: string;
        initialYear: string;
        finalYear: string;
        isDelete: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        idInstitucion: number;
      }
}