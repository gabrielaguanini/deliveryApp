import { Component, TemplateRef } from '@angular/core';
import { PlatosAMostrar } from '../../modelos/platos-amostrar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PlatosAMostrarService } from '../../servicios/platos-amostrar.service';
import { MenuCompletoModel } from '../../modelos/menu-completo-model';
import { TipoPlato } from '../../modelos/tipo-plato';
import { MenuCompletoServiceService } from '../../servicios/menu-completo-service.service';
import { PedidosModel } from '../../modelos/pedidos-model';
import { PedidosService } from '../../servicios/pedidos.service';
import { DetallePedidos } from '../../modelos/detalle-pedidos';
import { DetallePedidosService } from '../../servicios/detalle-pedidos.service';
import { DetallePedidosAcotadaModel } from '../../modelos/detalle-pedidos-acotadaModel';

@Component({
  selector: 'app-pedidosplatosamostrar',
  templateUrl: './pedidosplatosamostrar.component.html',
  styleUrls: ['./pedidosplatosamostrar.component.css']
})
export class PedidosplatosamostrarComponent {

  //MODAL AGREGAR PLATOS A MOSTRAR
  /////////////////////////////
  modalAgregarPlatosAMos!: BsModalRef;

  //MODAL EDITAR PLATO A MOSTRAR
  /////////////////////////////
  modalEditarPlatosAMos!: BsModalRef;

  //MODAL EDITAR PEDIDOPlatosAMostrar
  /////////////////////////////
  modalEditarPedido!: BsModalRef;

  //MODAL AGREGAR PEDIDO
  /////////////////////////////
  modalAgregarPedido!: BsModalRef;
  
  //MODALITO NGIF (NO BSMODALREF) 
  //PARA SELECCIONAR PLATO DEL PEDIDO
  /////////////////////////////////////
  mostrarModalitoAgregarPlatos: boolean = false;
  


  //LISTAS
  ///////////////////////////////////
  platosAMostrarList: PlatosAMostrar[] = [];
  platosListForSelect: MenuCompletoModel [] = [];
  pedidosDeHoyList: PedidosModel [] = [];
  porcionesPlatosList: number[] = []; //lista para que cada input en donde se ingresa la porcion sea unico o sea no se repita con la lista platosAMostrarList
  detallePedidosList: DetallePedidos [] = [];
  platosSeleccionadosList: DetallePedidos[] = [];
  platosSeleccionadosSioNo: Boolean[] = []; //lista en la que se agregan los datos de los chekbox seleccionados

  //CREAR PLATO A MOSTRAR Y EDITAR PLATO A MOSTRAR
  ///////////////////////////////////
  idPlato!:number;
  idPlatosAMostrar!:number;
  descripcionPlatoAMostrar!: string;  
  platosAMostrar!: PlatosAMostrar;
  fecha!: Date;
  hora!: string;


  //EDITAR PEDIDO
  //////////////////
  idPedido!: number;
  fechaPedido!: Date;
  horaPedido!: string;
  nombreCliente!: string;
  telefonoCliente!: string;
  direccionCliente!: string;
  localidadCliente!: string;
  listaPlatosDelPedido!: string;
  importeTotalPedido!: number;
 
  //AGREGAR DETALLE PEDIDO (SOLO SE PUEDE AGREGAR SI SE GENERO EL ID PEDIDO O PEDIDO)
  //////////////////
  idDetallePedido!: number;
  porcionPlato!: number;
  precioPlatosAMostrar!: number;
  totalPedido!: number;
  


 


  constructor(private modalService: BsModalService,
              private plaMosServ: PlatosAMostrarService,
              private platosServ: MenuCompletoServiceService,
              private pedidosServ: PedidosService,
              private detallePedidServ: DetallePedidosService        
  ) {};


  ngOnInit(): void {
    this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar completa
    this.listaPlatosForSelect() // muestra la lista de platos para etiqueta select de editar plato a mostrar
    this.listaPedidosDeHoy(); // muestra la lista de pedidos completa
    this.listaDetallePedidos(); // muestra la lista de pedidos completa
 
  };


  //MODAL PLATOS A MOSTRAR
  ////////////////////////////
  openModalAgregarPlatosAMos(templateAgregarPlatoAMostrar: TemplateRef<any>){
  this.modalAgregarPlatosAMos = this.modalService.show(templateAgregarPlatoAMostrar, {backdrop: 'static'})
  };


  //MODAL EDITAR PLATOS A MOSTRAR
  ////////////////////////////
  openModalEditarPlatosAMos(templateEditarPlatoAMostrar: TemplateRef<any>){
    this.modalEditarPlatosAMos = this.modalService.show(templateEditarPlatoAMostrar, {backdrop: 'static'})
  };

  //MODAL AGREGAR PEDIDOS
  ////////////////////////////
  openModalAgregarPedidos(templateAgregarPedido: TemplateRef<any>){
    const modalConfig = {
      class: 'modal-dialog-centered modal-xl' // tamaño del modal
    };
    this.modalAgregarPedido = this.modalService.show(templateAgregarPedido, {backdrop: 'static', ...modalConfig})
  };



  //MODAL EDITAR PEDIDOS
  ////////////////////////////
  openModalEditarPedidos(templateEditarPedido: TemplateRef<any>){
    this.modalEditarPedido = this.modalService.show(templateEditarPedido, {backdrop: 'static'})
  };

  //MODALITO NGIF (NO BSMODALREF)
  //PARA SELECCIONAR PLATOS DEL PEDIDO
  /////////////////////////////////////////////
  mostrarOcultarModalitoAgregarDetPed(){
    this.mostrarModalitoAgregarPlatos = !this.mostrarModalitoAgregarPlatos;
  };
  



  // FUNCIONES PARA LISTAS
  ///////////////////////////////////
  listaPlatosAMostrar(): void{
    this.plaMosServ.listaPlatosAMostrar().subscribe(data => this.platosAMostrarList = data)
  };

  listaPlatosForSelect():void{
    this.platosServ.listaPlatos().subscribe( data => this.platosListForSelect = data);
  };

  listaPedidosDeHoy():void{
    this.pedidosServ.listaPedidosDeHoy().subscribe( data => this.pedidosDeHoyList = data)
  };

  listaDetallePedidos():void{
    this.detallePedidServ.listaDetallePedidos().subscribe( data => this.detallePedidosList = data);
  };


  //AGREGAR PLATOS A MOSTRAR
  //////////////////////////
  agregarPlatoAMos():void{
    const tipoPlat = new TipoPlato(0,"","","");
    const plat = new MenuCompletoModel(this.idPlato, tipoPlat, "",0, "");
    const plaMos = new PlatosAMostrar(0, this.descripcionPlatoAMostrar, plat)
    this.plaMosServ.guardarPlatoAMostrar(plaMos).subscribe(data => {
      this.listaPlatosAMostrar();
      alert("Plato guardado");},
      err => {
      alert("No se guardó el plato");
      }
      );
  };

  //EDITAR PLATOS A MOSTRAR
  //////////////////////////
  obtenerPlaMosXId(idPlatoAMostrar:number, idPlato: number, descripcionPlatoAMostrar: string): void{
   this.idPlatosAMostrar = idPlatoAMostrar;
   this.idPlato = idPlato;
   this.descripcionPlatoAMostrar = descripcionPlatoAMostrar;
   
  };

  editarPlatoAMos():void{
    const tipoPl = new TipoPlato(0,"","","");
    const platos = new MenuCompletoModel(this.idPlato, tipoPl, "", 0, "");
    const plaMos = new PlatosAMostrar(this.idPlatosAMostrar, this.descripcionPlatoAMostrar, platos);
  
    // Mostrar el JSON que se enviará en la solicitud HTTP
    const requestData = {
      idPlatosAMostrar: plaMos.idPlatosAMostrar,
      descripcionPlatoAMostrar: plaMos.descripcionPlatoAMostrar,
      platos: {
        idPlato: plaMos.platos.idPlato
       }
    };
    console.log("Datos del plato para editar (antes de la solicitud HTTP):", requestData);
  
     this.plaMosServ.actualizarPlatoAMostrar(this.idPlatosAMostrar, plaMos).subscribe(data => {
      this.listaPlatosAMostrar();
      alert("Plato actualizado");
    }, err => {
      alert("No se actualizó el plato");
    });
  }
  

  //BORRAR TIPO DE PLATO
  /////////////////////////
  
  borrarPlatoAMostrar(idPlatosAMostrar: number):void{
    if(idPlatosAMostrar != undefined){
      this.plaMosServ.borrarPlatoAMostrar(idPlatosAMostrar).subscribe( data => {
        alert("Plato a mostrar eliminado");
        this.listaPlatosAMostrar(); //refresca la lista de platos a mostrar cuando se elimina un registro
      }, err => "No se eliminó el plato a mostrar")
  };
};

 borrarPlatMosMensajeAdv(idPlatosAMostrar:number): void {
  const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
  if(msjAdvertenciaElim){
    this.borrarPlatoAMostrar(idPlatosAMostrar);
  } else {
    ""
  };
 };



  //AGREGAR PEDIDO
  /////////////////////////
  agregarPedido(): void {  

    const pedido = new PedidosModel(this.idPedido,
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente,
      this.listaPlatosDelPedido,
      this.fechaPedido,
      this.horaPedido,
      this.importeTotalPedido);

    this.pedidosServ.guardarPedido(pedido).subscribe(data => {
      this.listaPedidosDeHoy();
      this.idPedido = data.idPedido;
      alert("Pedido guardado");
    },
      err => { alert("No se guardó el pedido"); });    
   };   


  
  //EDITAR PEDIDO
  /////////////////////////
  obtPedidoXId( idPedido: number, fechaPedido: Date, horaPedido: string, nombreCliente: string, telefonoCliente: string,
     direccionCliente: string, localidadCliente: string, listaPlatosDelPedido: string, importeTotalPedido: number ): void {

    this.idPedido = idPedido;
    this.nombreCliente = nombreCliente;
    this.telefonoCliente = telefonoCliente;
    this.direccionCliente = direccionCliente;
    this.localidadCliente = localidadCliente;
    this.listaPlatosDelPedido = listaPlatosDelPedido;
    this.fechaPedido = fechaPedido;
    this.horaPedido = horaPedido;
    this.importeTotalPedido = importeTotalPedido;
    };

 

  editarPedido(): void {
    const pedid = new PedidosModel(this.idPedido,
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente,
      this.listaPlatosDelPedido,
      this.fechaPedido,
      this.horaPedido,
      this.importeTotalPedido);

    this.pedidosServ.actualizarPedido(this.idPedido, pedid).subscribe(data => {
      this.listaPedidosDeHoy();
      alert("Pedido editado");
    },
      err => { alert("No se editó el pedido"); })
  };

  //BORRAR PEDIDO
  ///////////////////////////////////
   eliminarPedido(idPedido:number): void {
     this.pedidosServ.borrarPedido(idPedido).subscribe(data => {
      alert("Pedido eliminado");      
      this.listaPedidosDeHoy();
     }, err => console.log("No se pudo eliminar el pedido"))
  };


  
//AGREGAR DETALLE PEDIDO  (CON EL ID QUE GENERA agregarPedido())
///////////////////////////////////

//paso 1: tomar los elementos de los chekbox seleccionados
 chekBoxSeleccion(index: number): void {
  this.platosSeleccionadosSioNo[index] = !this.platosSeleccionadosSioNo[index];
};





enviarElementosSeleccionadosADb(): void {
  // Filtra los elementos seleccionados
  const elementosSeleccionados = this.platosAMostrarList
  .filter((_, index) => this.platosSeleccionadosSioNo[index])
  .map((PlatosAMostrar, index) => {
    return {
      pedidos: {idPedido: this.idPedido,
      },
      platosAMostrar: {
        idPlatosAMostrar: PlatosAMostrar.idPlatosAMostrar,
      },
      porcionPlato: this.porcionesPlatosList[index],
    };
  });
  console.log('JSON a enviar:', JSON.stringify(elementosSeleccionados));
 
  this.detallePedidServ.guardarVariosDetallesPedido(elementosSeleccionados).subscribe(
    data => {
      // Manejar la respuesta del servidor si es necesario
      console.log('Pedido generado:', data);  
    },
    error => {
      // Manejar errores si es necesario
      console.error('Error, no se genero el pedido:', error);
    }
  );
}






mostrarElementosSeleccionadosEnConsola(): void {
  const elementosSeleccionados = this.platosAMostrarList
    .filter((_, index) => this.platosSeleccionadosSioNo[index]);

  // También, puedes extraer los datos específicos que necesitas y almacenarlos en variables.
  const idsPlatosAMostrar = elementosSeleccionados.map(item => item.idPlatosAMostrar);
  const idPedido = this.idPedido; // Puedes obtenerlo de donde sea necesario.
  const porcionesPlatos = this.porcionesPlatosList.filter((_, index) => this.platosSeleccionadosSioNo[index]);

  // Aquí puedes imprimir los datos específicos en la consola.
  console.log('IDs de Platos a Mostrar:', idsPlatosAMostrar);
  console.log('ID del Pedido:', idPedido);
  console.log('Porciones de Platos:', porcionesPlatos);
};







  agregarDetallePedido(): void {};
  


    
     



  //FUNCIONES VARIAS
  ///////////////////////////////////

  borrarInputs(): void{
    this.idPlato = 0
    this.descripcionPlatoAMostrar = "";
    this.idPlato = 0;
    this.idPlatosAMostrar = 0;
    this.descripcionPlatoAMostrar = "";   
    this.fecha = new Date('2000-01-01');
    this.hora = "";
    this.idPedido = 0;
    this.fechaPedido = new Date('2000-01-01');
    this.horaPedido = "";
    this.nombreCliente = "";
    this.telefonoCliente = "";
    this.direccionCliente = "";
    this.localidadCliente = "";
    this.listaPlatosDelPedido = "";
    this.importeTotalPedido = 0;
    this.totalPedido = 0;
    this.porcionesPlatosList = [];

  };




}
