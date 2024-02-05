import { Component, TemplateRef } from '@angular/core';
import { PedidosService } from '../../servicios/pedidos.service';
import { PedidosModel } from '../../modelos/pedidos-model';
import { DetallePedidosService } from '../../servicios/detalle-pedidos.service';
import { DetallePedidos } from '../../modelos/detalle-pedidos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetallePedidosAcotadaModel } from '../../modelos/detalle-pedidos-acotadaModel';
import { PlatosAMostrar } from '../../modelos/platos-amostrar';
import { PlatosAMostrarService } from '../../servicios/platos-amostrar.service';

@Component({
  selector: 'app-pedidos-anter-ydescargas',
  templateUrl: './pedidos-anter-ydescargas.component.html',
  styleUrls: ['./pedidos-anter-ydescargas.component.css']
})
export class PedidosAnterYDescargasComponent {


//VARIABLES
fecha!: string;
idPedido!: number;
nombreCliente!: string;
telefonoCliente!: string;
direccionCliente!: string;
localidadCliente!: string;
platosDelPedido!: string;
horaPedido!: string;
importeTotalPedido!: number;
pedidoConfirmado!: boolean;
idDetallePedido!: number;
idPlatosAMostrar!: number;
porcionPlato!: number;
nombrePlato!: string;

//LISTAS
listaPedidosXFecha: PedidosModel[] = [];
detallePedidosListxIdPedido: DetallePedidos[] = [];
listaPeConfTrueFalse: Boolean[] = [true,false];
platosAMostrarList: PlatosAMostrar[] = [];

//MODALES
modalitoEditPedid: boolean = false;
modalEditarPedido!: BsModalRef; 
modalitoInputEditDetPedid: boolean = false; //modalito ngif (NO BSMODALREF) para editar detalles pedidos 
modalitoTdEditDetPedid: boolean = true; //modalito ngif (NO BSMODALREF) para editar detalles pedidos  



constructor(
  private pedidosServ: PedidosService,
  private detallePedidServ: DetallePedidosService,
  private modalService: BsModalService,
  private plaMosServ: PlatosAMostrarService
  
) { };

ngOnInit(): void {

  this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar completa para select edicion detalle pedidos

};




  //FUNCIONES LISTAS
  listaDePedidosXFecha(fecha: string): void {
    if (fecha === undefined || fecha.trim() === '' || fecha === '') {
      
        this.fecha = "";
        console.error('La fecha no puede estar vacía');
        alert('La fecha no puede estar vacía');
      
    } else {
      this.pedidosServ.listaPedidosXFecha(fecha).subscribe(
        
        data => this.listaPedidosXFecha = data,
        err => {
          this.fecha = "";
          console.error(err.error.message);
          // Puedes mostrar un mensaje de error al usuario si lo deseas
          alert(err.error.message);
        }
      );
    }
  };
  
  listaDetallePedidosXIdPedido(idPedido: number): void {
    this.detallePedidServ.listaDetPedXIdPedido(idPedido).subscribe(data => this.detallePedidosListxIdPedido = data);
  };


  listaPlatosAMostrar(): void {
    this.plaMosServ.listaPlatosAMostrar().subscribe(data => this.platosAMostrarList = data)

  };


//FUNCIONES MODALES

//modal editar detalles del pedidos
mostrarOcultarModalitoEditDetallePedid() {
  this.modalitoEditPedid = !this.modalitoEditPedid;
};

//modal editar pedidos
  openModalEditarPedidos(templateEditarPedido: TemplateRef<any>) {
    const modalConfig = {
      class: 'modal-dialog-centered modal-lg' // tamaño del modal
    };
    this.modalEditarPedido = this.modalService.show(templateEditarPedido, { backdrop: 'static', ...modalConfig })    
  };

//modal lista opciones editar detalle pedidos
  mostrarOcultarModalitoTdEditDetPedid() {
    this.modalitoTdEditDetPedid = !this.modalitoTdEditDetPedid;
  };
//modal formulario editar detalle pedidos
  mostrarOcultarModalitoEditDetPedid() {
    this.modalitoInputEditDetPedid = !this.modalitoInputEditDetPedid;
  };




   //EDITAR PEDIDO
  /////////////////////////
  obtPedidoXId(idPedido: number, fecha: string, horaPedido: string, nombreCliente: string, telefonoCliente: string,
    direccionCliente: string, localidadCliente: string, listaPlatosDelPedido: string, importeTotalPedido: number, pedidoConfirmado: boolean): void {

    this.idPedido = idPedido;
    this.nombreCliente = nombreCliente;
    this.telefonoCliente = telefonoCliente;
    this.direccionCliente = direccionCliente;
    this.localidadCliente = localidadCliente;
    this.platosDelPedido = listaPlatosDelPedido;
    this.fecha = fecha;
    this.horaPedido = horaPedido;
    this.importeTotalPedido = importeTotalPedido;
    this.pedidoConfirmado = pedidoConfirmado;

  };


  //BORRAR PEDIDO
  ///////////////////////////////////
  eliminarPedido(idPedido: number): void {

    //Advertencia para eliminar el pedido
    const confirmacion = window.confirm("El pedido se eliminará");

    if (confirmacion) {
      this.pedidosServ.borrarPedido(idPedido).subscribe(data => {
        this.listaDePedidosXFecha(this.fecha);
        alert("Pedido eliminado.");
       
      }, err => {
        // Error al eliminar el pedido
        console.log("No se pudo eliminar el pedido", err);
        alert("Error al eliminar el pedido.");
      }
      );
    }
  };

  //EDITAR PEDIDO
  editarPedido(): void {
    const pedid = new PedidosModel(
      this.idPedido,
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente,
      this.platosDelPedido,
      this.fecha,
      this.horaPedido,
      this.importeTotalPedido,
      this.pedidoConfirmado
      );

    this.pedidosServ.actualizarPedido(this.idPedido, pedid).subscribe(data => {
      this.listaDePedidosXFecha(this.fecha);
      console.log("Msj. Servidor: " + JSON.stringify(data));
      alert("Pedido actualizado");
    },
      err => {
        console.log("Msj. Servidor: " + err.error.message);
        alert("Error, no se pudo editar el pedido");
        console.log(err)
      })
  };


 //EDITAR DETALLE PEDIDO 
  /////////////////////////////


  obtenerDetPedXId(idDetallePedido: number, idPedido: number, idPlatosAMostrar: number, porcionPlato: number, nombrePlato: string) {
    this.detallePedidServ.obtDetallePedidoXId(idDetallePedido).subscribe(data => {
      this.idDetallePedido = idDetallePedido;
      this.idPedido = idPedido;
      this.idPlatosAMostrar = idPlatosAMostrar;
      this.porcionPlato = porcionPlato
      this.nombrePlato = nombrePlato;
      console.log("Detalles del pedido obtenidos con idDetallePedido: " + idDetallePedido);

    }, err => {
      console.log(err);
      alert("Error, no se trajeron los detalles del pedido")
    })
  };


  //BORRAR DETALLE PEDIDO 
  /////////////////////////////

  eliminarDetallePedidos(idDetallePedido: number, idPedido: number): void {
    //Advertencia para eliminar el pedido
    const confirmacion = window.confirm("El detalle del pedido se eliminará");

    if (confirmacion) {
      this.detallePedidServ.eliminarDetallePedido(idDetallePedido, idPedido).subscribe(data => {
        alert("Detalle del pedido eliminado.");
        this.listaDetallePedidosXIdPedido(idPedido);
        
      }, err => {
        // Error al eliminar el pedido
        console.log("No se pudo eliminar el detalle del pedido", err);
        alert("Error al eliminar el detalle del pedido.");
      }
      );
    }
  };


  editarDetallePedidos(): void {

    const detPed = new DetallePedidosAcotadaModel(this.idPedido, this.idPlatosAMostrar, this.porcionPlato)


    this.detallePedidServ
      .actualizarDetallePedido(this.idDetallePedido, detPed)
      .subscribe(
        (data) => {
       
          this.listaDetallePedidosXIdPedido(this.idPedido);
          this.listaDePedidosXFecha(this.fecha);
          console.log("Msj servidor: " + JSON.stringify(data));
          alert("Detalles del pedido actualizados.");
        },
        (err) => {

          console.log("No se pudo actualizar el detalle del pedido. ", err.error.message);

          //console.log("DetPEd: " + JSON.stringify(detPed));
          alert("Error al actualizar el detalle del pedido. " + err.error.message);
        }
      );
  };



//FUNCIONES VARIAS



 // Genera una lista de pedidos de hoy vacia para poder eliminar los registros
 // traidos de la pantalla. Algo asi como borrar.
 listaPedXFechaVacia(): void{
  this.listaPedidosXFecha = [];
};


 // Ancla para ir a secciones mediante un button
 scrollASeccion(sectionId: string): void {
  try {
    const tryScroll = () => {
      const section = document.getElementById(sectionId);

      if (!section) {
        console.error(`La sección con ID '${sectionId}' no fue encontrada.`);
        return;
      }

      //console.log('Sección encontrada:', section);
      section.scrollIntoView({ behavior: 'smooth' });
    };

    // scroll a ancla después de 500 milisegundos
    setTimeout(tryScroll, 500);
  } catch (error) {
    console.error('Error al intentar hacer scroll:', error);
  }
}
  
  

}
