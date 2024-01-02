import { MenuCompletoModel } from "./menu-completo-model";
import { PedidosModel } from "./pedidos-model";
import { PlatosAMostrar } from "./platos-amostrar";

export class DetallePedidos {
    idDetallePedido!: number;
    pedidos!: PedidosModel;
    platosAMostrar!: PlatosAMostrar;
    platos!: MenuCompletoModel;
    porcionPlato!: number;
    precioPlatosAMostrar!: number;
    totalPlato!: number;
    

    constructor(idDetallePedido: number,
        pedidos: PedidosModel,
        platosAMostrar: PlatosAMostrar,
        platos: MenuCompletoModel,
        porcionPlato: number,
        precioPlatosAMostrar: number,
        totalPlato: number        
        ) {

        this.idDetallePedido = idDetallePedido;
        this.pedidos = pedidos;
        this.platosAMostrar = platosAMostrar;
        this.platos = platos;
        this.porcionPlato = porcionPlato;
        this.precioPlatosAMostrar = precioPlatosAMostrar;
        this.totalPlato = totalPlato;   
    };

    

}
