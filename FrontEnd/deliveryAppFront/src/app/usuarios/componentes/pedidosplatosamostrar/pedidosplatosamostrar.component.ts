import { Component, HostListener, TemplateRef } from '@angular/core';
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
  //MODALITO NGIF (NO BSMODALREF) 
  //PARA CONFIRMAR EL PEDIDO Y EL DETALLE PEDIDO
  mostrarModalitoEnviarPedido: boolean = false;
  


  //LISTAS
  ///////////////////////////////////
  platosAMostrarList: PlatosAMostrar[] = [];
  platosListForSelect: MenuCompletoModel [] = [];
  pedidosDeHoyList: PedidosModel [] = [];
  porcionesPlatosList: number[] = []; // Array para almacenar los totales de cada plato, esta lista se itera con el let i = index del componente
  detallePedidosList: DetallePedidos [] = [];
  //platosSeleccionadosList: DetallePedidos[] = []; //borrar cuando este segura de que no se utiliza
  platosSeleccionadosSioNo: Boolean[] = []; //lista en la que se agregan los datos de los chekbox seleccionados
  totalesPlatosList: number[] = []; // Array para almacenar los totales de cada plato, esta lista se itera con el let i = index del componente
  

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
  pedidoConfirmado: boolean = false;


 
  //AGREGAR DETALLE PEDIDO (SOLO SE PUEDE AGREGAR SI SE GENERO EL ID PEDIDO O PEDIDO)
  //////////////////
  idDetallePedido!: number;
  porcionPlato!: number;
  precioPlatosAMostrar!: number;
  totalPlato!: number;

  //VARIOS
  botonDisabled: boolean = false;


  constructor(private modalService: BsModalService,
              private plaMosServ: PlatosAMostrarService,
              private platosServ: MenuCompletoServiceService,
              private pedidosServ: PedidosService,
              private detallePedidServ: DetallePedidosService        
  ) { };


  ngOnInit(): void {
    this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar completa
    this.listaPlatosForSelect() // muestra la lista de platos para etiqueta select de editar plato a mostrar
    this.listaPedidosDeHoy(); // muestra la lista de pedidos completa
    this.listaDetallePedidos(); // muestra la lista de pedidos completa

    this.inicializarTotalesPlatos(); // Llama a esta función cuando los datos están disponibles

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

  //MODALITO NGIF (NO BSMODALREF)
  //PARA CONFIRMAR EL PEDIDO Y EL DETALLE PEDIDO
  mostrarOcultarModalitoEnviarPedido(){
    this.mostrarModalitoEnviarPedido = !this.mostrarModalitoEnviarPedido;
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
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]); 
    
  
    if (seleccionados.length === 0 ) {
      alert("Selecciona al menos un plato");
      this.mostrarModalitoEnviarPedido = false;
      
      return;
    };    

    const porcionesNoIngresadas = this.porcionesPlatosList.length === 0;

    console.log(`Valor ingresado en el input: ${porcionesNoIngresadas}`);

    if(porcionesNoIngresadas)
    { 
      alert("Ingresa porcion/es");
    this.mostrarModalitoEnviarPedido = false;
    //console.log(`Valor ingresado en el input: ${porcionesNoIngresadas}`);
    return;
  };   

  const pedido = new PedidosModel(
    this.idPedido,
    this.nombreCliente,
    this.telefonoCliente,
    this.direccionCliente,
    this.localidadCliente,
    this.listaPlatosDelPedido,
    this.fechaPedido,
    this.horaPedido,
    this.importeTotalPedido,
    this.pedidoConfirmado
  ); 
  
    this.pedidosServ.guardarPedido(pedido).subscribe(
      (data: PedidosModel) => {
        this.idPedido = data.idPedido;        
        this.listaPedidosDeHoy();
        alert("Pedido N° " + this.idPedido + " creado");
        this.botonDisabled = true;
      },
      err => { 
        alert("No se guardó el pedido");
      }
    );
    
  }
  
  
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
      this.importeTotalPedido,
      this.pedidoConfirmado);

    this.pedidosServ.actualizarPedido(this.idPedido, pedid).subscribe(data => {
      this.listaPedidosDeHoy();
      alert("Pedido editado");
    },
      err => { alert("No se editó el pedido"); })
  };

  //BORRAR PEDIDO
  ///////////////////////////////////
   eliminarPedido(idPedido:number): void {
    
    //Advertencia para eliminar el pedido
    const confirmacion = window.confirm("El pedido se eliminará");

    if(confirmacion){
      this.pedidosServ.borrarPedido(idPedido).subscribe(data => {
        alert("Pedido eliminado.");      
        this.listaPedidosDeHoy();
       }, err => {
        // Error al eliminar el pedido
        console.log("No se pudo eliminar el pedido", err);
        alert("Error al eliminar el pedido.");
      }
    );
  }
}

    


  
//AGREGAR DETALLE PEDIDO  (CON EL ID QUE GENERA agregarPedido())
///////////////////////////////////

//paso 1: tomar los elementos de los chekbox seleccionados
 chekBoxSeleccion(index: number): void {
  this.platosSeleccionadosSioNo[index] = !this.platosSeleccionadosSioNo[index];
 };


calcularTotalPlato(index: number): void {
  this.totalesPlatosList[index] = this.platosAMostrarList[index].platos.precioPlato * this.porcionesPlatosList[index] || 0;
};

inicializarTotalesPlatos(): void {
  this.totalesPlatosList = Array(this.platosAMostrarList.length).fill(0);
}

 enviarDetallePedidos(): void {
  // Filtra los elementos seleccionados
  const elementosSeleccionados: DetallePedidosAcotadaModel[] = this.platosAMostrarList
    .map((PlatosAMostrar, index) => {
      if (this.platosSeleccionadosSioNo[index] && this.porcionesPlatosList[index] !== undefined) {
        return {
          pedidos: { idPedido: this.idPedido },
          platosAMostrar: { idPlatosAMostrar: PlatosAMostrar.idPlatosAMostrar },
          porcionPlato: this.porcionesPlatosList[index],
        };
      }
      return null;
    })
    .filter(elemento => elemento !== null) as DetallePedidosAcotadaModel[];
  //console.log('JSON a enviar:', JSON.stringify(elementosSeleccionados));
 

  this.detallePedidServ.guardarVariosDetallesPedido(elementosSeleccionados).subscribe(
    data => {
      // Manejar la respuesta del servidor si es necesario
      console.log('Pedido enviado:', data);
      alert("Pedido " + data.idPedido + " enviado");
    },
    error => {
      // Manejar errores si es necesario
      console.error('Error, no se generó el pedido:', error);
      alert( error.error.mensaje);
    }
  );
}



//muestra una lista de platos seleccionados para el pedido antes de enviarla a la DB
getPlatosSeleccionados(): DetallePedidos[] {
  // Filtra los elementos seleccionados
  const seleccionados = this.platosAMostrarList
    .filter((_, index) => this.platosSeleccionadosSioNo[index])
    .map((platoAMostrar, index) => {
      return {
        idDetallePedido: 0, // Asigna el valor adecuado si es necesario
        
        pedidos: {
          idPedido: this.idPedido,
          nombreCliente: this.nombreCliente,
          telefonoCliente: this.telefonoCliente,
          direccionCliente: this.direccionCliente,
          localidadCliente: this.localidadCliente,
          listaPlatosDelPedido: this.listaPlatosDelPedido,
          fecha: this.fecha,
          hora: this.hora,
          importeTotalPedido: this.importeTotalPedido,
        },
        platosAMostrar: platoAMostrar,
        platos: platoAMostrar.platos,     
        porcionPlato: this.porcionesPlatosList.filter((_, i) => this.platosSeleccionadosSioNo[i])[index] || 0,
        precioPlatosAMostrar: this.precioPlatosAMostrar, 
        totalPlato: this.totalesPlatosList.filter((_, i) => this.platosSeleccionadosSioNo[i])[index] || 0 // Asigna el valor adecuado si es necesario
      };
    });

  // Log para verificar los elementos seleccionados
  //console.log('Platos seleccionados:', seleccionados);

  return seleccionados;
}









actualizarImporteTotalPedido(): void {
  this.pedidosServ.actualizarImporteTotalPedido(this.idPedido).subscribe(
    data => {
      // Maneja la respuesta del servidor si es necesario
      console.log('Importe total actualizado:', data);
    },
    error => {
      // Maneja errores si es necesario
      console.error('Error al actualizar importe total:', error);
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







  
  


    



  //FUNCIONES VARIAS
  ///////////////////////////////////

  
//resetea formularios, toma el id del form, deselecciona chekbox
resetFormCleanChekBox(idFormulario: string) {  
  const formulario = document.getElementById(idFormulario) as HTMLFormElement | null;

  if (formulario) {
    formulario.reset();
  };
  //deseleccionar chekbox
  for (let i = 0; i < this.platosSeleccionadosSioNo.length; i++) {
    if (this.platosSeleccionadosSioNo[i]) {
        this.chekBoxSeleccion(i);
        
    };
  };  
};

//cierra modalitos (no bsmodalref)
cerrarModalitos(): void {
  this.mostrarModalitoAgregarPlatos = false;
  this.mostrarModalitoEnviarPedido = false;
  //reinicia la lista de porciones para borrarla y que cuando
  //la funcion agregarPedido() valide si hay porciones por segunda vez
  //la lista de porciones comience vacio, sin esto contendria el valor agregado la 
  //primera vez que se envia un pedido
  this.porcionesPlatosList = [];
  this.botonDisabled = false;
};

// Evita que se ingresen numeros o porciones manualmente en el input
handleKeydown(event: KeyboardEvent): void { 
  event.preventDefault();
};






}




