export class TipoPlato {
    idTipoPlato!: number;
    nombreTipoPlato!: string;
    iconoTipoPlato!:string;    
    colorCardTipoPlato!: string;

    constructor(idTipoPlato: number, nombreTipoPlato: string, iconoTipoPlato:string, colorCardTipoPlato: string){
        this.idTipoPlato = idTipoPlato;
        this.nombreTipoPlato = nombreTipoPlato;
        this.iconoTipoPlato = iconoTipoPlato;
        this.colorCardTipoPlato = colorCardTipoPlato;
    }
    
}
