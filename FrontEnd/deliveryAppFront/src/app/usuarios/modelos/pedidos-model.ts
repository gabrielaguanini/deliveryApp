import { PlatosAMostrar } from "./platos-amostrar";

export class PedidosModel {
    idPedido!: number;
    listaPlatosDelPedido!: string;
    fecha!: Date;
    hora!: string;

    constructor(idPedido: number,
                listaPlatosDelPedido: string,
                fecha: Date,
                hora: string) {

        this.idPedido = idPedido;
        this.listaPlatosDelPedido = listaPlatosDelPedido;
        this.fecha = fecha;
        this.hora = hora;
    };
}




