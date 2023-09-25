import { PlatosAMostrar } from "./platos-amostrar";

export class PedidosModel {
    idPedido!: number;
    platosAMostrar!: PlatosAMostrar;
    porcionPlato!: number;
    totalPedido!: number;
    fecha!: Date;

    constructor(idPedido: number,
        platosAMostrar: PlatosAMostrar,
        porcionPlato: number,
        totalPedido: number,
        fecha: Date) {

        this.idPedido = idPedido;
        this.platosAMostrar = platosAMostrar;
        this.porcionPlato = porcionPlato;
        this.totalPedido = totalPedido;
        this.fecha = fecha;
    };
}
