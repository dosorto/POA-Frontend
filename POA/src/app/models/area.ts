export class area{
    _id?: number;
    nombre: string;
    idObjetivo: number;
    idDimension: number;
    idPEI: number;

    constructor( nombre: string,idObjetivo: number,idDimension: number,idPEI: number){
        this.nombre = nombre;
        this.idObjetivo = idObjetivo;
        this.idDimension = idDimension;
        this.idPEI = idPEI;
    
        
        
    }
}