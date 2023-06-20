export class TipoPlato {
    idTipoPlato!: number;
    nombreTipoPlato!: string;
    imgTipoPlato!:string;

    constructor(idTipoPlato: number, nombreTipoPlato: string, imgTipoPlato:string){
        this.idTipoPlato = idTipoPlato;
        this.nombreTipoPlato = nombreTipoPlato;
        this.imgTipoPlato = imgTipoPlato;
    }

    
}
