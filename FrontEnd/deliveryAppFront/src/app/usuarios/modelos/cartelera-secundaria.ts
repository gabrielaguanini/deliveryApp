export class CarteleraSecundaria {

    idPromoSec!: number;
    imgParaCelOPc!: string; 
    tituloPromo!: string;
    textoPromo!: string;
    colorTexto!: string;
    urlImagenPromo!: string;
    fechaPromo!:string;


    constructor(idPromoSec: number, imgParaCelOPc: string, tituloPromo: string, textoPromo: string, colorTexto: string,  urlImagenPromo: string, fechaPromo:string){
        this.idPromoSec = idPromoSec;
        this.imgParaCelOPc = imgParaCelOPc;
        this.tituloPromo = tituloPromo;
        this.textoPromo = textoPromo;
        this.colorTexto = colorTexto;
        this.urlImagenPromo = urlImagenPromo;
        this.fechaPromo = fechaPromo;
    }
}
