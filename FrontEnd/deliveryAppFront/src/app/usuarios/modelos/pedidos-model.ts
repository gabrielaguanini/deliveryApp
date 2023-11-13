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

    constructor(idPedido: number,
                nombreCliente: string,
                telefonoCliente: string,
                direccionCliente: string,
                localidadCliente: string,
                listaPlatosDelPedido: string,
                fecha: Date,
                hora: string) {

        this.idPedido = idPedido;
        this.nombreCliente = nombreCliente;
        this.telefonoCliente = telefonoCliente;
        this.direccionCliente = direccionCliente;
        this.localidadCliente = localidadCliente;
        this.listaPlatosDelPedido = listaPlatosDelPedido;
        this.fecha = fecha;
        this.hora = hora;
    };
}




