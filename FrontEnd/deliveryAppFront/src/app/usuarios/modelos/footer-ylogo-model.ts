export class FooterYLogoModel {

idOtrosDatos!: number;
nombreDatoAMostrar!: string;
textoAMostrar!: string;
urlAMostrar!: string;
iconoOImgAMostrar!: string;

constructor(idOtrosDatos: number, 
            nombreDatoAMostrar: string, 
            textoAMostrar: string,
            urlAMostrar: string,
            iconoOImgAMostrar: string) 
{

    this.idOtrosDatos = idOtrosDatos;
    this.nombreDatoAMostrar = nombreDatoAMostrar;
    this.textoAMostrar = textoAMostrar;
    this.urlAMostrar = urlAMostrar;
    this.iconoOImgAMostrar = iconoOImgAMostrar
};

}
