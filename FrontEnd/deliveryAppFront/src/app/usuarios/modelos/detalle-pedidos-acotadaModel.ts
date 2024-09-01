import { PedidosModel } from "./pedidos-model";
import { PlatosAMostrar } from "./platos-amostrar";

export class DetallePedidosAcotadaModel {

 
  pedidos: { idPedido: number };
  platos: { idPlato: number };
  porcionPlato: number;
   
  constructor(idPedido: number, idPlato: number, porcionPlato: number) {
    this.pedidos = { idPedido };
    this.platos = { idPlato };
    this.porcionPlato = porcionPlato;
  }
    }
