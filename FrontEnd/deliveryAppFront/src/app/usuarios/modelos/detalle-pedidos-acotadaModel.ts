import { PedidosModel } from "./pedidos-model";
import { PlatosAMostrar } from "./platos-amostrar";

export class DetallePedidosAcotadaModel {

 
  pedidos: { idPedido: number };
  platosAMostrar: { idPlatosAMostrar: number };
  porcionPlato: number;
   
  constructor(idPedido: number, idPlatosAMostrar: number, porcionPlato: number) {
    this.pedidos = { idPedido };
    this.platosAMostrar = { idPlatosAMostrar };
    this.porcionPlato = porcionPlato;
  }
    }
