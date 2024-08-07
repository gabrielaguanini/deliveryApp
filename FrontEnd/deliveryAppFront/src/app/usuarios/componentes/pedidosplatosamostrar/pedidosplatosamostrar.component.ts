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
import * as XLSX from 'xlsx';
import { catchError, forkJoin, of } from 'rxjs';


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
  modalitoAgregarPlatos: boolean = false;

  //MODALITO NGIF (NO BSMODALREF) 
  //PARA CONFIRMAR EL PEDIDO Y EL DETALLE PEDIDO
  modalitoEnviarPedido: boolean = false;

  //MODALITO NGIF (NO BSMODALREF) 
  //PARA EDITAR PEDIDOS
  modalitoEditPedid: boolean = false;

  //MODALITO NGIF (NO BSMODALREF) 
  //PARA EDITAR DETALLE PEDIDOS
  modalitoInputEditDetPedid: boolean = false;

  modalitoTdEditDetPedid: boolean = true;

  //MODAL INFO
  ///////////////////////
  modalInfo!: BsModalRef;

  //MODAL AGREGAR 1 PEDIDO
  ///////////////////////
  modalitoAgrDetPed: boolean = false;




  //LISTAS
  ///////////////////////////////////
  platosAMostrarList: PlatosAMostrar[] = [];
  platosListForSelect: MenuCompletoModel[] = [];
  pedidosDeHoyList: PedidosModel[] = [];
  porcionesPlatosList: number[] = []; // Array para almacenar las porciones de cada plato, esta lista se itera con el let i = index del componente
  detallePedidosList: DetallePedidos[] = [];
  platosSeleccionadosSioNo: Boolean[] = []; //lista en la que se agregan los datos de los chekbox seleccionados
  totalesPlatosList: number[] = []; // Array para almacenar los totales de cada plato, esta lista se itera con el let i = index del componente
  detallePedidosListxIdPedido: DetallePedidos[] = [];
  listaPlatosDelPedido: string[] = [];
  detallesPedidosAcotada: DetallePedidosAcotadaModel[] = [];
  listaPeConfTrueFalse = [
    { value: true, label: 'CONFIRMADO' },
    { value: false, label: 'NO CONFIRMADO' }
  ];
  listaPlatosCompleta: MenuCompletoModel[] = [];



  //CREAR PLATO A MOSTRAR Y EDITAR PLATO A MOSTRAR
  ///////////////////////////////////
  idPlato!: number;
  idPlatosAMostrar!: number;
  descripcionPlatoAMostrar!: string;
  platosAMostrar!: PlatosAMostrar;
  fecha!: string;
  hora!: string;
  tipoPlato!: string;
  precioPlato!: number;

  //CREAR PLATO A MOSTRAR Y EDITAR PLATO A MOSTRAR
  /////////////////////////////////// 
  imgPlato!: string;

  //EDITAR PEDIDO
  //////////////////
  idPedido!: number;


  nombreCliente!: string;
  telefonoCliente!: string;
  direccionCliente!: string;
  localidadCliente!: string;
  platosDelPedido!: string;
  listaPlatosDelPedidoCli!: string;
  importeTotalPedido!: number;
  pedidoConfirmado: boolean = false;
  pedidoConfirAVerdOFal!: string;



  //AGREGAR VARIOS DETALLES PEDIDO (SOLO SE PUEDE AGREGAR SI SE GENERO EL ID PEDIDO O PEDIDO)
  //////////////////
  idDetallePedido!: number;
  porcionPlato!: number;
  precioPlatosAMostrar!: number;
  totalPlato!: number;

  //EDITAR 1 DETALLE PEDIDO
  idPedidoGuardDetPed!: number;



  //EDITAR DETALLE PEDIDO
  detallePedidos!: DetallePedidos;
  nombrePlato!: string;



  //VARIOS
  botonDisabledCrPe: boolean = false;
  botonDisplayNoneCrPe: string = "";
  botonDisabledEnvDetPe: boolean = false;
  botonDisplayNonedEnvDetPe: string = "";
  botonDisabledSeleccPlato: boolean = false;
  botonDisplayNoneSeleccPlato: string = ""
  inputReadOnlyDatEnvio: boolean = false;
  inputReadOnlyPorcionPlato: boolean = false;
  inputDisabledPorcionPlato: boolean = false;
  chekBoxSelcPlat: boolean = false;
  botonEditarPlatosSelecYDat: string = "none";
  botonConfirEdicPlatosSelecYDat: string = "none";
  botonDisplayNoneDatosEnvio: string = "none";
  botonDisplayNoneGuardEdiDatEnv: string = "none";
  mensajePedEnviadoDB: string = "";
 
  mensajeLisPedDiaVacio: String = "";
  mensajeLisPlaMosVacio: String = "";




  constructor(private modalService: BsModalService,
    private plaMosServ: PlatosAMostrarService,
    private platosServ: MenuCompletoServiceService,
    private pedidosServ: PedidosService,
    private detallePedidServ: DetallePedidosService
  ) { };


  ngOnInit(): void {
    this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar completa
    //this.listaPlatosForSelect() // muestra la lista de platos para etiqueta select de editar plato a mostrar
    this.listaPedidosDeHoy(); // muestra la lista de pedidos de la fecha actual
    //this.listaDetallePedidos(); // muestra la lista de pedidos completa
    //this.listaPlatosComp();


  };


  //MODAL PLATOS A MOSTRAR
  ////////////////////////////

  openModalAgregarPlatosAMos(templateAgregarPlatoAMostrar: TemplateRef<any>) {
    this.modalAgregarPlatosAMos = this.modalService.show(templateAgregarPlatoAMostrar, { backdrop: 'static', class:'modal-lg' })
  };


  //MODAL EDITAR PLATOS A MOSTRAR
  ////////////////////////////
  openModalEditarPlatosAMos(templateEditarPlatoAMostrar: TemplateRef<any>) {
    this.modalEditarPlatosAMos = this.modalService.show(templateEditarPlatoAMostrar, { backdrop: 'static' })
  };

  //MODAL AGREGAR PEDIDOS
  ////////////////////////////
  openModalAgregarPedidos(templateAgregarPedido: TemplateRef<any>) {
    const modalConfig = {
      class: 'modal-dialog-centered modal-xl' // tamaño del modal
    };
    this.modalAgregarPedido = this.modalService.show(templateAgregarPedido, { backdrop: 'static', ...modalConfig })
  };


  //MODAL EDITAR PEDIDOS
  ////////////////////////////
  openModalEditarPedidos(templateEditarPedido: TemplateRef<any>) {
    const modalConfig = {
      class: 'modal-dialog-centered modal-lg' // tamaño del modal
    };
    this.modalEditarPedido = this.modalService.show(templateEditarPedido, { backdrop: 'static', ...modalConfig })

  };

  //MODALITO NGIF (NO BSMODALREF)
  //PARA SELECCIONAR PLATOS DEL PEDIDO
  /////////////////////////////////////////////
  mostrarOcultarModalitoAgregarDetPed() {
    this.modalitoAgregarPlatos = !this.modalitoAgregarPlatos;
  };

  //MODALITO NGIF (NO BSMODALREF)
  //PARA CONFIRMAR EL PEDIDO Y EL DETALLE PEDIDO
  mostrarOcultarModalitoEnviarPedido(): void {
    this.modalitoEnviarPedido = !this.modalitoEnviarPedido;
  };

  mostrarOcultarModalitoEditDetallePedid() {
    this.modalitoEditPedid = !this.modalitoEditPedid;
  };

  mostrarOcultarModalitoEditDetPedid() {
    this.modalitoInputEditDetPedid = !this.modalitoInputEditDetPedid;
  };

  mostrarOcultarModalitoTdEditDetPedid() {
    this.modalitoTdEditDetPedid = !this.modalitoTdEditDetPedid;
  };

  mostrarOcultarModalInfo(templateModalInfo: TemplateRef<any>): void {
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static' })

  };

  mostrarOcultarModalitoAgrDetPed() {
    this.modalitoAgrDetPed = !this.modalitoAgrDetPed;
  };



  // FUNCIONES PARA LISTAS
  ///////////////////////////////////
  listaPlatosAMostrar(): void {
    this.plaMosServ.listaPlatosAMostrar().subscribe(
      data => {
        if (data.length > 0) {
          this.platosAMostrarList = data;
          console.log("Lista de platos a mostrar recibida. ");
          this.mensajeLisPlaMosVacio = "";
        };
        if (data.length < 1) {
          this.platosAMostrarList = data;
          console.log("Lista de platos a mostrar vacia. ");
          this.mensajeLisPlaMosVacio = "Lista de platos a mostrar en la pagina web vacia";
          
        };
      },
      err => {
        console.log("Msj. Serv.: " + err.error.message);
        alert("Msj. Serv.: " + err.error.message);
      })
  };

  //listaPlatosForSelect(): void {
    //this.platosServ.listaPlatos().subscribe(data => this.platosListForSelect = data);
   // this.platosListForSelect = []
  //};

  listaPedidosDeHoy(): void {
    this.pedidosServ.listaPedidosDeHoy().subscribe(
      data => {
        this.pedidosDeHoyList = data;
        if( this.pedidosDeHoyList.length < 1){
          console.log("La lista de pedidos de hoy no contiene registros. ")
          this.mensajeLisPedDiaVacio = "Sin pedidos hasta el momento"
        };
        if(this.pedidosDeHoyList.length > 0 ){
          console.log("Lista de platos del día o fecha actual recibida");
          this.mensajeLisPedDiaVacio = ""
        };  
        this.pedidoConfiAVerdOFalso();
      
      },
      err => {     
        console.log("Msj. Servidor: " + err.error.message)
      }
    )
  };

  //listaDetallePedidos(): void {
    //this.detallePedidServ.listaDetallePedidos().subscribe(data => this.detallePedidosList = data);
 // };

  listaDetallePedidosXIdPedido(idPedido: number): void {

    this.detallePedidServ.listaDetPedXIdPedido(idPedido).subscribe(data =>
      this.detallePedidosListxIdPedido = data,
      err => {
        console.log("Msj. Serv: " + err.error.message);
        alert("Msj. Serv: " + err.error.message);
      });
  };

  listaPlatosComp(): void {
    this.platosServ.listaPlatos().subscribe(data => this.listaPlatosCompleta = data);
  };





  //AGREGAR PLATOS A MOSTRAR
  //////////////////////////
  agregarPlatoAMos(): void {
    const tipoPlat = new TipoPlato(0, "", "", "");
    const plat = new MenuCompletoModel(this.idPlato, tipoPlat, "", 0, "");
    const plaMos = new PlatosAMostrar(0, this.descripcionPlatoAMostrar, plat)
    this.plaMosServ.guardarPlatoAMostrar(plaMos).subscribe(data => {
      this.listaPlatosAMostrar();
      console.log("Plato a mostrar guardado")
      alert("Plato a mostrar guardado");
    },
      err => {
        alert(err.error.message);
        console.log("Msj. Servidor: " + err.error.message);
      }
    );
  };

  //EDITAR PLATOS A MOSTRAR
  //////////////////////////
  obtenerPlaMosXId(idPlatoAMostrar: number, idPlato: number, descripcionPlatoAMostrar: string): void {
    this.idPlatosAMostrar = idPlatoAMostrar;
    this.idPlato = idPlato;
    this.descripcionPlatoAMostrar = descripcionPlatoAMostrar;

  };

  editarPlatoAMos(): void {
    const tipoPl = new TipoPlato(0, "", "", "");
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


  //BORRAR PLATO A MOSTRAR
  /////////////////////////

  borrarPlatoAMostrar(idPlatosAMostrar: number): void {
    if (idPlatosAMostrar != undefined) {
      this.plaMosServ.borrarPlatoAMostrar(idPlatosAMostrar).subscribe(data => {
        alert("Plato a mostrar eliminado.");
        console.log("Plato eliminado.")
        this.listaPlatosAMostrar(); //refresca la lista de platos a mostrar cuando se elimina un registro
      }, err => {
        alert("Msj. Servidor: " + err.error.message);
        console.log("Msj. Servidor: " + err.error.message);
      })
    };
  };

  borrarPlatMosMensajeAdv(idPlatosAMostrar: number): void {
    const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
    if (msjAdvertenciaElim) {
      this.borrarPlatoAMostrar(idPlatosAMostrar);
    } else {
      ""
    };
  };

  //CARGAR PLATOS EN INPUT
  /////////////////////////
  agregarPlatosEnInputs(idPlato: number): void {
    this.platosServ.obtPlatoXID(idPlato).subscribe(
      (plato) => {
        // Asignar los valores del plato a las variables correspondientes
        this.idPlatosAMostrar = plato.idPlato;
        this.imgPlato = plato.imgPlato
        this.tipoPlato = plato.tipoPlato.nombreTipoPlato;
        this.nombrePlato = plato.nombrePlato;
        this.precioPlato = plato.precioPlato;

      },
      (error) => {
        // Maneja el error, si es necesario
      }
    );
  };



  //AGREGAR PEDIDO
  /////////////////////////       

  agregarListaDetPed(): void {
    this.pedidosServ.actualizarPedidosConListaPlatos(this.idPedido).subscribe(
      data => {
        this.listaPedidosDeHoy();
        console.log("Lista de platos agregada correctamente al idPedido n°: " + this.idPedido, "Msj Servidor: " + data);

      },
      err => {
        console.log("Error al agregar platos: Msj Servidor: ", err);


      }
    );
  };


  agregarPedido(): void {
    //todos los validadores de esta funcion se agregan por las dudas, ya que las funciones seleccionarChekBoxSiHayPorcionPla(index) y 
    // agregarPorcionesPlaSeleccionandoChekBox(index) agregan porcion/es o seleccionan el/los chekbox/es al hacer click en el input o el chekbox

    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]);
    const porcionesNoIngresadas = this.porcionesPlatosList.length === 0;
    const totalesPlatosIncluyeCero = this.totalesPlatosList.includes(0);
    const unPlatoSeleccionado = this.platosSeleccionadosSioNo.some(elemento => elemento === true);;

    //validador sin seleccion alguna de chekbox
    if (seleccionados.length === 0) {
      alert("Selecciona al menos un plato");
      this.modalitoEnviarPedido = false;

      return;
    };

    //validador para seleccion de su chekbox y no ingreso de porciones
    if (porcionesNoIngresadas) {
      alert("Ingresa porcion/es");
      this.modalitoEnviarPedido = false;
      //console.log(`Valor ingresado en el input: ${porcionesNoIngresadas}`);
      return;
    };

    //validador para seleccion de 2 o mas platos, uno o mas (menos q el total seleccionado) sin porciones 
    if (totalesPlatosIncluyeCero && unPlatoSeleccionado === true) {
      console.log("Ingresa porciones a todos los platos seleccionados: " + totalesPlatosIncluyeCero);
      //console.log("Lista totalesPlatos: " + this.totalesPlatosList);
      //console.log("un plato seleccionado minimo?: " + unPlatoSeleccionado);
      alert("Ingresa porciones a todos los platos seleccionados");
      this.modalitoEnviarPedido = false;
      this.botonDisabledCrPe = false;  // Desactivar el botón solo si totalesPlatos es verdadero
      return;
    };

    const pedido = new PedidosModel(
      this.idPedido,
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente,
      this.platosDelPedido,
      this.listaPlatosDelPedidoCli,
      this.fecha,
      this.hora,
      this.importeTotalPedido,
      this.pedidoConfirmado
    );

    this.pedidosServ.guardarPedido(pedido).subscribe(
      (data: PedidosModel) => {
        this.modalitoEnviarPedido = true;
        this.inputReadOnlyPorcionPlato = true;
        this.chekBoxSelcPlat = true;
        this.idPedido = data.idPedido;
        this.listaPedidosDeHoy();
        alert("Pedido N° " + this.idPedido + " creado");
        console.log("Pedido guardado con idPedido N°: " + this.idPedido + ". Msj servidor: objeto JSON instancia clase Pedidos: " + JSON.stringify(data));
        this.botonDisabledCrPe = true;
        this.inputDisabledPorcionPlato = true;
      },
      err => {
        alert("Msj. Servidor: " + err.error.message);
        console.log("Msj. Servidor: " + err.error.message);
      }
    );

  };

  //selecciona el chekbox al utilizar la flecha aumento o decremento del input
  seleccionarChekBoxSiHayPorcionPla(index: number): void {

    if (!this.porcionesPlatosList[index]) {
      this.porcionesPlatosList[index] = 1; // Establece el valor inicial solo si no hay ninguna porción ingresada
      this.platosSeleccionadosSioNo[index] = false;

    }
    this.platosSeleccionadosSioNo[index] = true;  // Establece el checkbox como seleccionado
    this.calcularTotalPlato(index);
    console.log("porcionesPlatosList: " + this.porcionesPlatosList);
    console.log("chekBoxSelcPlat: " + this.chekBoxSelcPlat);
    console.log("inputReadOnlyPorcionPlato: " + this.inputReadOnlyPorcionPlato);
  }



  //agrega 1 porcionPlato si se selecciona el chekbox
  agregarPorcionesPlaSeleccionandoChekBox(index: number): void {
    if (this.platosSeleccionadosSioNo[index] && this.chekBoxSelcPlat == false) {
      // si se selecciona el checkbox 
      this.porcionesPlatosList[index] = NaN;
      this.totalesPlatosList[index] = NaN;

    }
    else {
      // si se deselecciona el chekbox que antes se selecciono
      this.porcionesPlatosList[index] = 1;
      this.calcularTotalPlato(index);
    }
  };


  //el validador actua cuando no se ingresan todos los datos del cliente
  //en el modal agregar pedido. 
  validadorDatosCliente(): void {
    const validadorDatosCliente = [
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente
    ]

    if (validadorDatosCliente.some(valiDaCli => valiDaCli === undefined ||
      valiDaCli === null ||
      valiDaCli === "")) {

      //this.mostrarModalitoAgregarPlatos = false;
      console.log("Falta ingresar datos para envio del pedido: " + validadorDatosCliente);
      alert("Ingresa tus datos para continuar");

    } else {
      this.botonDisabledSeleccPlato = true;
      this.modalitoAgregarPlatos = true;
      this.inputReadOnlyDatEnvio = true;
      this.botonDisplayNoneDatosEnvio = "";
      this.ocultarBotonGuardarDatosEditados();
      this.mostrarBtnAgregarPlatPedido();

    }
  };

  ocultarBtonAgregarPlatPedido(): void {
    this.botonDisplayNoneSeleccPlato = "none";
    this.inputReadOnlyDatEnvio = false;
    this.botonDisplayNoneGuardEdiDatEnv = "";
    this.botonDisplayNonedEnvDetPe = "none"
    //this.botonDisplayNoneDatosEnvio = "none";
    //this.mostrarModalitoAgregarPlatos = false;

  };

  mostrarBtnAgregarPlatPedido(): void {
    this.botonDisplayNonedEnvDetPe = ""
  };

  ocultarBtonEditarDatEnv(): void {
    this.inputReadOnlyDatEnvio = true;
    this.botonDisplayNoneDatosEnvio = "";
    this.modalitoAgregarPlatos = true;
  };

  ocultarBotonGuardarDatosEditados(): void {
    this.botonDisplayNoneGuardEdiDatEnv = "none"
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
    this.hora = horaPedido;
    this.importeTotalPedido = importeTotalPedido;
    this.pedidoConfirmado = pedidoConfirmado;

  };



  editarPedido(): void {
    const pedid = new PedidosModel(
      this.idPedido,
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente,
      this.platosDelPedido,
      this.listaPlatosDelPedidoCli,
      this.fecha,
      this.hora,
      this.importeTotalPedido,
      this.pedidoConfirmado
    );

    this.pedidosServ.actualizarPedido(this.idPedido, pedid).subscribe(data => {
      this.listaPedidosDeHoy();
      console.log("Msj. Servidor: " + JSON.stringify(data));
      alert("Pedido N°: " + this.idPedido + " actualizado");
    },
      err => {
        console.log("Msj. Servidor: " + err.error.message);
        alert("Msj. Servidor: " + err.error.message);
      })
  };

  //BORRAR PEDIDO
  ///////////////////////////////////
  eliminarPedido(idPedido: number): void {

    //Advertencia para eliminar el pedido
    const confirmacion = window.confirm("El pedido N°: " + idPedido + " se eliminará. ¿Desea continuar?");

    if (confirmacion) {
      this.pedidosServ.borrarPedido(idPedido).subscribe(data => {
        console.log("Pedido N°: " + idPedido + " eliminado.");
        alert("Pedido N°: " + idPedido + " eliminado.");
        this.listaPedidosDeHoy();
      }, err => {
        // Error al eliminar el pedido
        console.log("Msj. Servidor: " + err.error.message);
        alert("Msj. Servidor: " + err.error.message);
      }
      );
    }
  };

// elimina un pedido generado en el modal para crear un pedido al que no se le han seleccionado detalles pedido o platosamostrar
  eliminarPedidoSinDetPed(): void {
    // Itera sobre cada elemento en pedidosDeHoyList
    for (const pedido of this.pedidosDeHoyList) {
      // Accede a la propiedad listaPlatosDelPedido de cada elemento
      const listaPlatos = pedido.listaPlatosDelPedido;

      // Verifica si listaPlatos está vacía antes de intentar eliminar el pedido
      if (!listaPlatos || listaPlatos.trim() === '') {
        // Elimina el pedido solo si listaPlatos está vacía
        this.pedidosServ.borrarPedido(pedido.idPedido).subscribe(
          data => {
            console.log("Pedido eliminado por falta seleccion platos. Mensaje servidor: " + JSON.stringify(data));
            this.listaPedidosDeHoy();
          },
          err => {
            console.log("No se pudo eliminar el pedido", err);
          }
        );
      }
    }
  };



  getListaDatosClienteAntesEnvio(): void {
    const listaDatos: string[] = [
      `Nombre Cliente: ${this.nombreCliente}`,
      `Teléfono Cliente: ${this.telefonoCliente}`,
      `Dirección: ${this.direccionCliente}`,
      `Localidad: ${this.localidadCliente}`
    ];
  };


  //AGREGAR DETALLE PEDIDO  (CON EL ID QUE GENERA agregarPedido())
  ///////////////////////////////////

  //cambia el chekbox del modal agregar detalle pedido a true o false
  chekBoxSeleccion(index: number): void {
    this.platosSeleccionadosSioNo[index] = !this.platosSeleccionadosSioNo[index];
  };

  //calcula el total del plato respecto a las porciones ingresadas
  calcularTotalPlato(index: number): void {
    this.totalesPlatosList[index] = this.platosAMostrarList[index].platos.precioPlato * this.porcionesPlatosList[index] || NaN;
  };

  //envia lista de detalle pedidos
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

    if (this.nombreCliente == "" ||
      this.telefonoCliente == "" ||
      this.direccionCliente == "" ||
      this.localidadCliente == "") {

      alert("Ingrese datos de envio para completar el pedido");
      console.log("Faltan ingresar datos de envio")
    }
    else {
      //console.log("nombreCliente: " + this.nombreCliente)
      //console.log('JSON a enviar:', JSON.stringify(elementosSeleccionados));
      this.detallePedidServ.guardarVariosDetallesPedido(elementosSeleccionados).subscribe(
        data => {

          this.listaPedidosDeHoy();
          this.botonDisabledEnvDetPe = true;
          this.botonEditarPlatosSelecYDat = "none";
          this.botonDisplayNoneDatosEnvio = "none";
          this.botonDisplayNoneGuardEdiDatEnv = "none";
          this.mensajePedEnviadoDB = " registrado"; // agrega enviado a la etiqueta <p class="d-flex flex-row justify-content-center h5">Pedido N° {{idPedido}}: {{mensajePedEnviadoDB}}</p>
          console.log('Detalles/platos del Pedido con idPedido N°: ' + this.idPedido + ' guardados correctamente. Msj servidor: ', data);
          alert("Pedido N°: " + this.idPedido + " enviado");
        },
        err => {
          // Manejar errores si es necesario
          console.log("Msj. Servidor: " + JSON.stringify(err.error.message));
          alert("Msj. Servidor: " + err.error.message);
        }
      );
    };
  };


  //AGREGAR 1 DETALLE PEDIDO SOLAMENTE

  seleccionarIdPedido(idPedido: number) {
    this.idPedidoGuardDetPed = idPedido;
  };

  agregarUnDetallePedido() {


    if (this.porcionPlato > 10) {
      alert("El maximo permitido de porciones es 10");
      return; // Agregado return para salir de la función si la validación falla

    }
    
    if (this.idPedidoGuardDetPed == null || this.idPedidoGuardDetPed == 0 || isNaN(this.idPedidoGuardDetPed) ||
       this.idPlatosAMostrar == null || this.idPlatosAMostrar == 0 || isNaN(this.idPlatosAMostrar) ||
       this.porcionPlato == null || this.porcionPlato <= 0 || isNaN(this.porcionPlato)) {

       

      alert("Seleccione un plato o ingrese porcion/es");
      this.modalitoAgrDetPed = true;
      return; // Agregado return para salir de la función si la validación falla
      
    } else {

     
      const DetPedAAgreg = new DetallePedidosAcotadaModel(this.idPedidoGuardDetPed, this.idPlatosAMostrar, this.porcionPlato);

      this.detallePedidServ.guardarDetPediAcotada(DetPedAAgreg).subscribe(data => {
        this.listaPedidosDeHoy();
        console.log("Msj servidor: " + JSON.stringify(data));
        alert("Plato agregado al pedido N°: " + this.idPedidoGuardDetPed);
      },
        err => {
          console.log("Msj servidor: " + err.error.message);
          alert(err.error.message);

        })
    }
  };

  //EDITAR DETALLE PEDIDO 
  /////////////////////////////


  obtenerDetPedXId(idDetallePedido: number, idPedido: number, idPlatosAMostrar: number, porcionPlato: number, nombrePlato: string) {
    const msjAdvertencia = window.confirm('El/Los dato/s a editar se reemplazarán con los datos actuales de tabla PLATOS A MOSTRAR. ¿Desea continuar?');
    if (!msjAdvertencia) {
      this.cerrarModalitosLimpiarInput();
    };
    if (msjAdvertencia) {
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
    }
  };


  editarDetallePedidos(): void {

    if ((this.idPedido == null || this.idPedido == 0 || isNaN(this.idPedido)) ||
      (this.idPlatosAMostrar == null || this.idPlatosAMostrar == 0) || isNaN(this.idPlatosAMostrar) ||
      (this.porcionPlato == null || this.porcionPlato <= 0 || isNaN(this.porcionPlato))) {

      alert("Seleccione un plato o ingrese porcion/es");
      this.modalitoInputEditDetPedid = true;
      return; // Agregado return para salir de la función si la validación falla
      //this.modalitoInputEditDetPedid = true; 
      //this.modalitoTdEditDetPedid = false;

    }
    if (this.porcionPlato > 10) {
      alert("El maximo permitido de porciones es 10");
      return; // Agregado return para salir de la función si la validación falla

    } else {

      const detPed = new DetallePedidosAcotadaModel(this.idPedido, this.idPlatosAMostrar, this.porcionPlato);

      this.detallePedidServ
        .actualizarDetallePedido(this.idDetallePedido, detPed)
        .subscribe(
          (data) => {

            this.listaDetallePedidosXIdPedido(this.idPedido);
            this.listaPedidosDeHoy();
            this.modalitoInputEditDetPedid = false;
            this.modalitoTdEditDetPedid = true;
            console.log("Msj servidor: " + JSON.stringify(data));
            alert("Detalles del pedido N°: " + this.idPedido + " actualizados.");
          },
          (err) => {

            console.log("No se pudo actualizar el detalle del pedido. ", err.error.message);
            //console.log("DetPEd: " + JSON.stringify(detPed));
            alert("Error al actualizar el detalle del pedido. " + err.error.message);
          }
        );
    }
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
        this.listaPedidosDeHoy();
      }, err => {
        // Error al eliminar el pedido
        console.log("No se pudo eliminar el detalle del pedido", err);
        alert("Error al eliminar el detalle del pedido.");
      }
      );
    }
  };

  calcularTotalPedidoAlEditarDetPed(): void {

  };





  //muestra una lista de los platos seleccionados para el pedido antes de enviarla a la DB
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
            listaPlatosDelPedido: this.platosDelPedido,
            listaPlatosDelPedidoCli: this.listaPlatosDelPedidoCli,
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
  };


  //EDITAR PLATOS SELECCIONADOS
  /////////////////////////////
  editarPlatSeleccAntesEnv(): void {
    //this.botonDisabledCrPe = false;
    this.chekBoxSelcPlat = false;
    this.inputReadOnlyPorcionPlato = false;
    this.botonDisplayNoneSeleccPlato = "none";
    this.botonDisplayNoneCrPe = "none";
    this.botonDisplayNonedEnvDetPe = "none";
    this.inputDisabledPorcionPlato = false;
    this.botonEditarPlatosSelecYDat = "none";

  };

  //oculta botones agregar platos al pedido y crear pedido
  ocultarBotonParaEditar(): void {
    this.botonEditarPlatosSelecYDat = "none"
    this.botonConfirEdicPlatosSelecYDat = "";
  };

  confirmarPlatSelecc(): void {
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]);
    const porcionesNoIngresadas = this.porcionesPlatosList.length === 0;
    const totalesPlatosIncluyeCero = this.totalesPlatosList.includes(0);
    const unPlatoSeleccionado = this.platosSeleccionadosSioNo.some(elemento => elemento === true);;

    //validador sin seleccion alguna de chekbox
    if (seleccionados.length === 0) {
      alert("Selecciona al menos un plato");


      return;
    };

    //validador para seleccion de su chekbox y no ingreso de porciones
    if (porcionesNoIngresadas) {
      alert("Ingresa porcion/es");

      //console.log(`Valor ingresado en el input: ${porcionesNoIngresadas}`);
      return;
    };

    //validador para seleccion de 2 o mas platos, uno o mas (menos q el total seleccionado) sin porciones 
    if (totalesPlatosIncluyeCero && unPlatoSeleccionado === true) {
      console.log("Ingresa porciones a todos los platos seleccionados: " + totalesPlatosIncluyeCero);
      //console.log("Lista totalesPlatos: " + this.totalesPlatosList);
      //console.log("un plato seleccionado minimo?: " + unPlatoSeleccionado);
      alert("Ingresa porciones a todos los platos seleccionados");
      return;
    };

    this.botonConfirEdicPlatosSelecYDat = "none";
    this.botonEditarPlatosSelecYDat = ""
    this.inputReadOnlyPorcionPlato = true;
    this.chekBoxSelcPlat = true;
    this.inputReadOnlyDatEnvio = true;
    //this.botonConfirEdicPlatosSelecYDat = "";
    this.botonDisplayNonedEnvDetPe = "";
    this.inputDisabledPorcionPlato = true;

  };

  mostrarONoBtnEditarPlaSelec(): void {
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]);
    //validador sin seleccion alguna de chekbox
    if (seleccionados.length === 0) {
      console.log("Selecciona al menos un plato para el pedido");
      this.modalitoEnviarPedido = false;

      return;
    };
    this.botonEditarPlatosSelecYDat = ""
  };



  //FUNCION PARA CREAR EXCEL CON LISTA COMPLETA
  ///////////////////////////////////////////////////


  //genera el excel
  generateExcel(liPedidosHoy: any[], liPlaMos: any[], pedidosHoyPlaMostrar: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Creamos la hoja de Excel para la primera lista o pedidos de hoy
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liPedidosHoy);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Pedidos Hoy');

    // Creamos la hoja de Excel para la segunda lista o platos a mostrar
    const platosAMostrarData = this.platosAMostrarList.map((plato) => {
      return {
        'ID Plato a Mostrar': plato.idPlatosAMostrar,
        'Descripción': plato.descripcionPlatoAMostrar,
        'ID Tipo Plato': plato.platos.tipoPlato.idTipoPlato,
        'Tipo de Plato': plato.platos.tipoPlato.nombreTipoPlato,
        'ID Plato': plato.platos.idPlato,
        'Nombre del Plato': plato.platos.nombrePlato,
        'Precio': plato.platos.precioPlato,
        'Imagen': plato.platos.imgPlato
      };
    });
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(platosAMostrarData);
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Platos a Mostrar');


    // Convertimos el libro de Excel en un archivo binario y creamos un enlace de descarga
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pedidosHoyPlaMostrar + '.xlsx'; // Nombre del archivo de Excel
    link.click(); // Simulamos un clic en el enlace para iniciar la descarga
    window.URL.revokeObjectURL(url); // Liberamos el recurso del enlace


  };

  //descargar el excel generado
  exportToExcelOnClick(): void {
    // Mostrar mensaje de advertencia para la descarga del archivo
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo ¿desea continuar?');

    if (msjAdvertenciaDescarga) {
      // Obtener las listas de pedidos y platos a mostrar en paralelo
      forkJoin([
        this.pedidosServ.listaPedidosDeHoy().pipe(catchError(error => of([]))), // Si ocurre un error al obtener la lista de pedidos, devuelve una lista vacía
        this.plaMosServ.listaPlatosAMostrar().pipe(catchError(error => of([])))  // Si ocurre un error al obtener la lista de platos, devuelve una lista vacía
      ]).subscribe(([pedidos, platos]) => {
        // Generar el archivo Excel con las listas obtenidas
        this.generateExcel(pedidos, platos, 'pedidosHoyPlaMostrar');
      });
    }
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
  cerrarModalitosLimpiarInput(): void {
    this.modalitoAgregarPlatos = false;
    this.modalitoEnviarPedido = false;
    //reinicia la lista de porciones para borrarla y que cuando
    //la funcion agregarPedido() valide si hay porciones por segunda vez
    //la lista de porciones comience vacio, sin esto contendria el valor agregado la 
    //primera vez que se envia un pedido
    this.porcionesPlatosList = [];
    this.botonDisabledCrPe = false;
    this.botonDisabledEnvDetPe = false;
    this.inputReadOnlyDatEnvio = false;
    this.botonDisabledSeleccPlato = false;
    this.inputReadOnlyPorcionPlato = false;
    this.chekBoxSelcPlat = false;
    this.botonEditarPlatosSelecYDat = "none";
    this.botonConfirEdicPlatosSelecYDat = "none";
    this.botonDisplayNoneSeleccPlato = "";
    this.botonDisplayNoneCrPe = "";
    this.botonDisplayNonedEnvDetPe = "";
    this.inputDisabledPorcionPlato = false;
    this.botonDisplayNoneDatosEnvio = "none";
    this.botonDisplayNoneGuardEdiDatEnv = "none";
    this.mensajePedEnviadoDB = "";
    this.totalPlato = NaN;
    this.nombreCliente = "";
    this.telefonoCliente = "";
    this.direccionCliente = "";
    this.localidadCliente = "";
    this.modalitoEditPedid = false;
    this.detallePedidosListxIdPedido = [];
    this.idPedido = NaN;
    this.modalitoInputEditDetPedid = false;
    this.modalitoTdEditDetPedid = true;

    this.imgPlato = "";

    this.idPlato = NaN;
    this.idPlatosAMostrar = NaN;
    this.descripcionPlatoAMostrar = "";
    this.fecha = "";
    this.hora = "";

    this.platosDelPedido = "";
    this.importeTotalPedido = NaN;

    this.idDetallePedido = NaN;
    this.porcionPlato = NaN;
    this.precioPlatosAMostrar = NaN;
    this.totalPlato = NaN;
    this.nombrePlato = "";

    this.tipoPlato = "";
    this.precioPlato = NaN;

    this.listaPlatosCompleta = [];

    

  };

  pedidoConfiAVerdOFalso(): void {
    this.pedidoConfirAVerdOFal = this.pedidoConfirmado ? "CONFIRMADO" : "NO CONFIRMADO";
  };

  // Evita que se ingresen numeros o porciones manualmente en el input
  handleKeydown(event: KeyboardEvent): void {
    event.preventDefault();
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
  };



}




