import { MenuCompletoModel } from "./menu-completo-model";

export class PlatosAMostrar {

    idPlatosAMostrar!: number;
    descripcionPlatoAMostrar!: string;
    platos!: MenuCompletoModel;
   

    constructor(idPlatosAMostrar: number,
        descripcionPlatoAMostrar: string,
        platos: MenuCompletoModel
        ) {

        this.idPlatosAMostrar = idPlatosAMostrar;
        this.descripcionPlatoAMostrar = descripcionPlatoAMostrar;
        this.platos = platos;
      

    };
}
