import { TipoPlato } from "./tipo-plato";

export class MenuCompletoModel {

    idPlato!: number;    
    tipoPlato: TipoPlato;
    nombrePlato!: string;
    precioPlato!: number;

    constructor(
                tipoPlato: TipoPlato,
                nombrePlato: string,
                precioPlato: number) {

       
        this.tipoPlato = tipoPlato;
        this.nombrePlato = nombrePlato;
        this.precioPlato = precioPlato;
    }

  
}