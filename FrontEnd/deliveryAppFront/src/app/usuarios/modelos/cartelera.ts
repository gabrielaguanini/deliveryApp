export class Cartelera {
    idPromo!: number;
    imgParaCelOPc!: string; 
    tituloPromo!: string;
    textoPromo!: string;
    urlImagenPromo!: string;
    fechaPromo!:Date;


    constructor(idPromo: number, imgParaCelOPc: string, tituloPromo: string, textoPromo: string, urlImagenPromo: string, fechaPromo:Date){
        this.idPromo = idPromo;
        this.imgParaCelOPc = imgParaCelOPc;
        this.tituloPromo = tituloPromo;
        this.textoPromo = textoPromo;
        this.urlImagenPromo = urlImagenPromo;
        this.fechaPromo = fechaPromo;
    }
}
