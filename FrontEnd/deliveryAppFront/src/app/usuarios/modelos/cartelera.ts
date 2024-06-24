export class Cartelera {
    idPromo!: number;
    imgParaCelOPc!: string; 
    tituloPromo!: string;
    textoPromo!: string;
    colorTexto!: string;
    urlImagenPromo!: string;
    fechaPromo!:string;


    constructor(idPromo: number, imgParaCelOPc: string, tituloPromo: string, textoPromo: string, colorTexto: string,  urlImagenPromo: string, fechaPromo:string){
        this.idPromo = idPromo;
        this.imgParaCelOPc = imgParaCelOPc;
        this.tituloPromo = tituloPromo;
        this.textoPromo = textoPromo;
        this.colorTexto = colorTexto;
        this.urlImagenPromo = urlImagenPromo;
        this.fechaPromo = fechaPromo;
    }
}
