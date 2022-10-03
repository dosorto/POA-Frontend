export class Objetivo{
    _id?: number;
    nombre: string;
    idDimension: number;
    idPEI: number;

    constructor( nombre: string,idDimension: number,idPEI: number){
        this.nombre = nombre;
        this.idDimension = idDimension;
        this.idPEI = idPEI;
    }
}