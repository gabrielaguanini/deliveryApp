import { PlatosAMostrar } from "./platos-amostrar";

export class PedidosModel {
    idPedido!: number;
    nombreCliente!: string;
    telefonoCliente!: string;
    direccionCliente!: string;
    localidadCliente!: string;
    listaPlatosDelPedido!: string;
    fecha!: Date;
    hora!: string;
    importeTotalPedido!: number;
    pedidoConfirmado?: boolean = false;

    constructor(idPedido: number,
                nombreCliente: string,
                telefonoCliente: string,
                direccionCliente: string,
                localidadCliente: string,
                listaPlatosDelPedido: string,
                fecha: Date,
                hora: string,
                importeTotalPedido: number,
                pedidoConfirmado: boolean) {

        this.idPedido = idPedido;
        this.nombreCliente = nombreCliente;
        this.telefonoCliente = telefonoCliente;
        this.direccionCliente = direccionCliente;
        this.localidadCliente = localidadCliente;
        this.listaPlatosDelPedido = listaPlatosDelPedido;
        this.fecha = fecha;
        this.hora = hora;
        this.importeTotalPedido = importeTotalPedido;
        this.pedidoConfirmado = pedidoConfirmado;
    };
}




