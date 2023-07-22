export class Cartelera {
    idPromo!: number;
    textoPromo!: string;
    fechaPromo!:Date;


    constructor(idPromo: number, textoPromo: string, fechaPromo:Date){
        this.idPromo = idPromo;
        this.textoPromo = textoPromo;
        this.fechaPromo = fechaPromo;
    }
}
