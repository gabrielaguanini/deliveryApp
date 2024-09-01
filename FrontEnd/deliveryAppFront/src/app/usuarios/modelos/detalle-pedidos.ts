import { MenuCompletoModel } from "./menu-completo-model";
import { PedidosModel } from "./pedidos-model";
import { PlatosAMostrar } from "./platos-amostrar";

export class DetallePedidos {
    idDetallePedido!: number;
    pedidos!: PedidosModel;
    platos!: MenuCompletoModel;
    porcionPlato!: number;
    precioPlato!: number;
    totalPlato!: number;
    

    constructor(idDetallePedido: number,
        pedidos: PedidosModel,
        platos: MenuCompletoModel,
        porcionPlato: number,
        precioPlato: number,
        totalPlato: number        
        ) {

        this.idDetallePedido = idDetallePedido;
        this.pedidos = pedidos;
        this.platos = platos;
        this.porcionPlato = porcionPlato;
        this.precioPlato = precioPlato;
        this.totalPlato = totalPlato;   
    };

    

}
