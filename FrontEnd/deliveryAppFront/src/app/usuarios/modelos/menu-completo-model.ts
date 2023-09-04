import { TipoPlato } from "./tipo-plato";

export class MenuCompletoModel {

    idPlato!: number;    
    tipoPlato!: TipoPlato;
    nombrePlato!: string;
    precioPlato!: number;
    imgPlato!: string;

    constructor(idPlato: number,
                tipoPlato: TipoPlato,
                nombrePlato: string,
                precioPlato: number,
                imgPlato: string
                ) {

        this.idPlato = idPlato;
        this.tipoPlato = tipoPlato;       
        this.nombrePlato = nombrePlato;
        this.precioPlato = precioPlato;
        this.imgPlato = imgPlato;
    };
  
}