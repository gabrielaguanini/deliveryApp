import { MenuCompletoModel } from "./menu-completo-model";

export class PlatosAMostrar {

    idPlatosAMostrar!: number;
    platos!: MenuCompletoModel;
    descripcionPlatoAMostrar!: string;
    
   
   

    constructor(
        idPlatosAMostrar: number,
        descripcionPlatoAMostrar: string,
        platos: MenuCompletoModel
        ) {

        this.idPlatosAMostrar = idPlatosAMostrar;
        this.platos = platos;
        this.descripcionPlatoAMostrar = descripcionPlatoAMostrar;
      
      

    };
}
