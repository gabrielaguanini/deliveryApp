export class MenuCompletoModel {

    idPlato!: number;
    idSecundario!: string;
    tipoPlato!: string;
    nombrePlato!: string;
    precioPlato!: number;

    constructor(idSecundario: string,
                tipoPlato: string,
                nombrePlato: string,
                precioPlato: number) {

        this.idSecundario = idSecundario;
        this.tipoPlato = tipoPlato;
        this.nombrePlato = nombrePlato;
        this.precioPlato = precioPlato;
    }

  
}