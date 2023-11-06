import { PedidosModel } from "./pedidos-model";
import { PlatosAMostrar } from "./platos-amostrar";

export class DetallePedidos {
    idDetallePedido!: number;
    pedidos!: PedidosModel;
    platosAMostrar!: PlatosAMostrar;
    porcionPlato!: number;
    totalPedido!: number;

    constructor(idDetallePedido: number,
        pedidos: PedidosModel,
        platosAMostrar: PlatosAMostrar,
        porcionPlato: number,
        totalPedido: number) {

        this.idDetallePedido = idDetallePedido;
        this.pedidos = pedidos;
        this.platosAMostrar = platosAMostrar;
        this.porcionPlato = porcionPlato;
        this.totalPedido = totalPedido;
    };

}
