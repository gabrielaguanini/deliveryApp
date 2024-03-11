import { Component, TemplateRef } from '@angular/core';
import { PedidosService } from '../../servicios/pedidos.service';
import { PedidosModel } from '../../modelos/pedidos-model';
import { DetallePedidosService } from '../../servicios/detalle-pedidos.service';
import { DetallePedidos } from '../../modelos/detalle-pedidos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetallePedidosAcotadaModel } from '../../modelos/detalle-pedidos-acotadaModel';
import { PlatosAMostrar } from '../../modelos/platos-amostrar';
import { PlatosAMostrarService } from '../../servicios/platos-amostrar.service';
import * as XLSX from 'xlsx';


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
  pedidos!: PedidosModel | null;
  listaPlatosDelPedido!: string;
  
 

  //LISTAS
  listaPedidosXFecha: PedidosModel[] = [];
  detallePedidosListxIdPedido: DetallePedidos[] = [];
  listaPeConfTrueFalse: Boolean[] = [true, false];
  platosAMostrarList: PlatosAMostrar[] = [];
 


  //MODALES
  modalitoEditPedid: boolean = false;
  modalEditarPedido!: BsModalRef;
  modalitoInputEditDetPedid: boolean = false; //modalito ngif (NO BSMODALREF) para editar detalles pedidos 
  modalitoTdEditDetPedid: boolean = true; //modalito ngif (NO BSMODALREF) para editar detalles pedidos  
  modalInfo!: BsModalRef;
  modalitoPedidosXId: boolean = false;
  modalitoPedidosXFecha: boolean = false;


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
  listaDePedidosXFecha(fecha: string, alertConLog: boolean = true, isRequestByDate: boolean = true): void {
    if (alertConLog) {
      if (fecha === undefined || fecha.trim() === '' || fecha === '') {
        this.fecha = "";
        console.error('La fecha no puede estar vacía');
        alert('La fecha no puede estar vacía');
      } else {
        this.pedidosServ.listaPedidosXFecha(fecha).subscribe(
          data => {
            this.listaPedidosXFecha = data;
            if (this.listaPedidosXFecha.length === 0 && isRequestByDate) {
              this.fecha = "";
              alert('No existen registros con la fecha ingresada');
            }
          },
          err => {
            this.fecha = "";
            console.error(err.error.message);
            alert(err.error.message);
          }
        );
      }
    } else {
      // Si alertConLog es false, solo actualiza la lista sin mostrar alertas ni logs
      if (fecha === undefined || fecha.trim() === '' || fecha === '') {
        this.fecha = "";
      } else {
        this.pedidosServ.listaPedidosXFecha(fecha).subscribe(
          data => {
            this.listaPedidosXFecha = data;
            if (this.listaPedidosXFecha.length === 0 && isRequestByDate) {
              this.fecha = "";
              alert('No existen registros con la fecha ingresada');
            }
          },
          err => {
            this.fecha = "";
          }
        );
      }
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

  mostrarOcultarModalInfo(templateModalInfo: TemplateRef<any>) {
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static'})
   };

   mostrarOcultarModalitoPedidosXId(){
    this.modalitoPedidosXId = !this.modalitoPedidosXId;
   };

   mostrarOcultarModalitoPedidosXFecha(){ 
    this.modalitoPedidosXFecha = !this.modalitoPedidosXFecha;
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
        this.listaDePedidosXFecha(this.fecha, false, false); //  actualiza la lista de pedidos por fecha
        this.pedidosXIdVacio(); // elimina de la pantalla el pedido buscado por idPedido
        alert("Pedido eliminado.");
        console.log(data);


      }, err => {
        // Error al eliminar el pedido
        this.fecha = "";
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
      this.listaDePedidosXFecha(this.fecha, false, false);
      this.obtenerPedidoXId(this.idPedido);
      console.log("Msj. Servidor: " + JSON.stringify(data));
      alert("Pedido actualizado");
    },
      err => {
        console.log("Msj. Servidor: " + err.error.message);
        alert("Error, no se pudo editar el pedido");
        console.log(err)
      })
  };

   //OBTENER PEDIDO X ID (obtejo tipo pedido completo)
    obtenerPedidoXId(idPedido: number): void {
      this.pedidosServ.obtenerPedidoXId(idPedido).subscribe(data => this.pedidos = data)
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
        this.listaDePedidosXFecha(this.fecha);
        this.obtenerPedidoXId(idPedido);

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

          this.listaDetallePedidosXIdPedido(this.idPedido); //actualiza la lista de detalles pedidos al editar
          this.listaDePedidosXFecha(this.fecha, false, false); //actualiza la lista de pedidos por fecha al editar
          this.obtenerPedidoXId(this.idPedido); //actualiza sobre la busqueda de pedido x id el pedido editado
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

  //FUNCION PARA CREAR EXCEL CON LISTA PEDIDOS COMPLETA
  ///////////////////////////////////////////////////

  generateExcel(liPedComp: any[], liPedidosHistorico: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Crear la hoja de Excel para la lista de pedidos completa
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liPedComp);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'pedidosHistorico');



    // Convertir el libro de Excel en un archivo binario y crear un enlace de descarga
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = liPedidosHistorico + '.xlsx'; // Nombre del archivo de Excel
    link.click(); // Simula un clic en el enlace para iniciar la descarga
    window.URL.revokeObjectURL(url); // Libera el recurso del enlace

  };

  //descargar el excel generado
  exportToExcelOnClick(): void {

    //msj advertencia descarga
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo ¿desea continuar?');

    //suscribir al servicio para ingresar los registros de la lista completa de pedidos
    if (msjAdvertenciaDescarga) {

      this.pedidosServ.listaPedidos().subscribe((pedidos) => {
        const liPedComp: string = "listaPedidoHistorica";
        this.generateExcel(pedidos, liPedComp);
      })
    }
  };


  //FUNCIONES VARIAS

  //cierra modalitos (no bsmodalref)
  cerrarModalitosLimpiarInput(): void {

    this.nombreCliente = "";
    this.telefonoCliente = "";
    this.direccionCliente = "";
    this.localidadCliente = "";
    this.modalitoEditPedid = false;
    this.detallePedidosListxIdPedido = [];
    this.idPedido = NaN;
    this.modalitoInputEditDetPedid = false;
    this.modalitoTdEditDetPedid = true;


    this.platosDelPedido = "";
    this.importeTotalPedido = NaN;

    this.idDetallePedido = NaN;
    this.porcionPlato = NaN;

    this.nombrePlato = "";

  };




  // Genera una lista de pedidos de hoy vacia para poder eliminar los registros
  // traidos de la pantalla. Algo asi como borrar.
  listaPedXFechaVacia(): void {
    this.fecha = "";
    this.listaPedidosXFecha = [];
  };


  // Genera un objeto de tipo pedidos vacio para poder eliminar los registros
  // traidos de la pantalla. Algo asi como borrar.
  pedidosXIdVacio(): PedidosModel | null {
    this.idPedido = NaN; // elimina el idPedido ingresado
    this.pedidos = null; //Genera un objeto de tipo pedidos vacio
    return this.pedidos;
    
  }


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
  };



}