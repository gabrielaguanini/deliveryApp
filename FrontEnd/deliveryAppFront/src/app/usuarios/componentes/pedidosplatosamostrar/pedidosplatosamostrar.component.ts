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
  // Esta lista contiene objetos que representan dos estados posibles: `CONFIRMADO`: Indicado por el valor `true`, `NO CONFIRMADO`: Indicado por el valor `false`.
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


  //ELIMINAR 1 PEDIDO SIN DETALLE PEDIDO
  idPedidoGuardpEl!: number;

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

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Muestra un modal para agregar platos a mostrar.
  * 
  * @param {TemplateRef<any>} templateAgregarPlatoAMostrar - La plantilla del modal para agregar platos.
  */
  openModalAgregarPlatosAMos(templateAgregarPlatoAMostrar: TemplateRef<any>) {
    this.modalAgregarPlatosAMos = this.modalService.show(templateAgregarPlatoAMostrar, { backdrop: 'static', class: 'modal-lg' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra un modal para editar los platos a mostrar.
   * 
   * @param {TemplateRef<any>} templateEditarPlatoAMostrar - La plantilla del modal para editar platos.
   */
  openModalEditarPlatosAMos(templateEditarPlatoAMostrar: TemplateRef<any>) {
    this.modalEditarPlatosAMos = this.modalService.show(templateEditarPlatoAMostrar, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra un modal para agregar pedidos.
   * 
   * @param {TemplateRef<any>} templateAgregarPedido - La plantilla del modal para agregar pedidos.
   */
  openModalAgregarPedidos(templateAgregarPedido: TemplateRef<any>) {
    const modalConfig = {
      class: 'modal-dialog-centered modal-xl' // Tamaño del modal para agregar pedidos
    };
    this.modalAgregarPedido = this.modalService.show(templateAgregarPedido, { backdrop: 'static', ...modalConfig });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra un modal para editar pedidos.
   * 
   * @param {TemplateRef<any>} templateEditarPedido - La plantilla del modal para editar pedidos.
   */
  openModalEditarPedidos(templateEditarPedido: TemplateRef<any>) {
    const modalConfig = {
      class: 'modal-dialog-centered modal-lg' // Tamaño del modal para editar pedidos
    };
    this.modalEditarPedido = this.modalService.show(templateEditarPedido, { backdrop: 'static', ...modalConfig });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Alterna la visibilidad del modal para seleccionar platos del pedido.
   * Este modal es utilizado para agregar platos a un pedido.
   */
  mostrarOcultarModalitoAgregarDetPed() {
    this.modalitoAgregarPlatos = !this.modalitoAgregarPlatos;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Alterna la visibilidad del modal para confirmar el pedido y el detalle del pedido.
   * Este modal es utilizado para confirmar los detalles antes de realizar el pedido.
   */
  mostrarOcultarModalitoEnviarPedido(): void {
    this.modalitoEnviarPedido = !this.modalitoEnviarPedido;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Alterna la visibilidad del modal para editar el pedido.
   * Este modal se utiliza para editar el pedido existente.
   */
  mostrarOcultarModalitoEditDetallePedid() {
    this.modalitoEditPedid = !this.modalitoEditPedid;
    this.modalitoInputEditDetPedid = false;
    this.modalitoTdEditDetPedid = true;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Alterna la visibilidad del modal para editar el detalle del pedido.
   * Este modal se utiliza para editar detalles específicos del pedido.
   */
  mostrarOcultarModalitoEditDetPedid() {
    this.modalitoInputEditDetPedid = !this.modalitoInputEditDetPedid;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Alterna la visibilidad del modal para la edición de detalles del pedido.
   * Este modal se utiliza para la edición avanzada de detalles del pedido.
   */
  mostrarOcultarModalitoTdEditDetPedid() {
    this.modalitoTdEditDetPedid = !this.modalitoTdEditDetPedid;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra un modal de información con la plantilla proporcionada.
   * 
   * @param {TemplateRef<any>} templateModalInfo - La plantilla del modal de información.
   */
  mostrarOcultarModalInfo(templateModalInfo: TemplateRef<any>): void {
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Alterna la visibilidad del modal para agregar detalles al pedido.
   * Este modal se utiliza para agregar detalles adicionales a un pedido.
   */
  mostrarOcultarModalitoAgrDetPed() {
    this.modalitoAgrDetPed = !this.modalitoAgrDetPed;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  // FUNCIONES PARA LISTAS
  ///////////////////////////////////
  /**
  * Obtiene la lista de platos a mostrar desde el servicio y actualiza el estado del componente.
  * Muestra un mensaje si la lista está vacía.
  */

  listaPlatosAMostrar(): void {
    this.plaMosServ.listaPlatosAMostrar().subscribe(
      data => {
        if (data.length > 0) {
          this.platosAMostrarList = data;  // Actualiza la lista de platos a mostrar
          console.log("Lista de platos a mostrar recibida.");
          this.mensajeLisPlaMosVacio = "";  // Limpia el mensaje de lista vacía
        } else {
          this.platosAMostrarList = data;  // Actualiza la lista de platos a mostrar
          console.log("Lista de platos a mostrar vacía.");
          this.mensajeLisPlaMosVacio = "Lista de platos a mostrar en la página web vacía";  // Mensaje de lista vacía
        }
      },
      err => {
        console.error("Error al solicitar la lista de platos a mostrar. Msj. Serv: " + err.error.message);
        alert("Error al solicitar la lista de platos a mostrar");  // Muestra un mensaje de error
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  listaPlatosForSele(): void {
    this.platosServ.listaPlatos().subscribe(
      data => {

        this.platosListForSelect = data;  // Actualiza la lista de platos

        if (this.platosListForSelect.length > 0 && !this.idPlato) {
          this.idPlato = this.platosListForSelect[0].idPlato; // O el valor adecuado para tu caso
        }

        console.log("Lista de platos recibida.");
      },
      err => {
        console.log("Error en la solicitud para obtener una lista de platos: Msj. Serv.: " + err.error.message);
        alert("Error en la solicitud para obtener una lista de platos: ");  // Muestra un mensaje de error
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene la lista de pedidos del día desde el servicio y actualiza el estado del componente.
   * Muestra un mensaje si no hay pedidos y llama a la función para verificar el estado del pedido.
   */
  listaPedidosDeHoy(): void {
    this.pedidosServ.listaPedidosDeHoy().subscribe(
      data => {
        this.pedidosDeHoyList = data;  // Actualiza la lista de pedidos del día
        if (this.pedidosDeHoyList.length < 1) {
          console.log("La lista de pedidos de hoy no contiene registros.");
          this.mensajeLisPedDiaVacio = "Sin pedidos hasta el momento";  // Mensaje si no hay pedidos
        } else {
          console.log("Lista de pedidos del día o fecha actual recibida.");
          this.mensajeLisPedDiaVacio = "";  // Limpia el mensaje de lista vacía
        }
        this.pedidoConfiAVerdOFalso();  // Llama a función para verificar el estado del pedido
      },
      err => {
        console.error("Error en la solicitud para obtener una lista de pedidos del dia");  // Muestra un mensaje de error
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene la lista de detalles de un pedido específico utilizando su ID.
   * 
   * @param {number} idPedido - El ID del pedido para obtener los detalles.
   */
  listaDetallePedidosXIdPedido(idPedido: number): void {
    this.detallePedidServ.listaDetPedXIdPedido(idPedido).subscribe(
      data => this.detallePedidosListxIdPedido = data,  // Actualiza la lista de detalles del pedido
      err => {
        console.error("Error en la solicitud para obtener una lista de detalles del pedido por idPedido. Msj. Serv: " + err.error.message);  // Muestra un mensaje de error
        alert("Error en la solicitud para obtener una lista de detalles del pedido por idPedido");  // Muestra un mensaje de error
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene la lista completa de platos desde el servicio.
   */
  listaPlatosComp(): void {
    this.platosServ.listaPlatos().subscribe(data => {
      this.listaPlatosCompleta = data
    }, err =>
        // Muestra un mensaje de error en caso de fallo
        console.error("Error en la solicitud para obtener una lista de platos completa. Msj. Serv: " + err.error.message)
    );  
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //AGREGAR PLATOS A MOSTRAR
  //////////////////////////
  /**
  * Agrega un nuevo plato a mostrar utilizando el servicio `plaMosServ`.
  * Después de guardar el plato, actualiza la lista de platos a mostrar y muestra un mensaje de confirmación.
  */
  agregarPlatoAMos(): void {
    const tipoPlat = new TipoPlato(0, "", "", "");  // Crea un nuevo tipo de plato vacío
    const plat = new MenuCompletoModel(this.idPlato, tipoPlat, "", 0, "");  // Crea un nuevo modelo de plato completo
    const plaMos = new PlatosAMostrar(0, this.descripcionPlatoAMostrar, plat);  // Crea un nuevo plato a mostrar

    this.plaMosServ.guardarPlatoAMostrar(plaMos).subscribe(data => {
      this.listaPlatosAMostrar();  // Actualiza la lista de platos a mostrar
      console.log("Plato a mostrar guardado");
      alert("Plato a mostrar guardado");  // Muestra un mensaje de confirmación
    },
      err => {
        alert("Error al agregar un plato a mostrar.");  // Muestra un mensaje de error
        console.error("Error al agregar un plato a mostrar. Msj. Servidor: " + err.error.message);
      });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Establece los valores necesarios para editar un plato a mostrar utilizando su ID.
   * 
   * @param {number} idPlatoAMostrar - ID del plato a mostrar que se va a editar.
   * @param {number} idPlato - ID del plato asociado.
   * @param {string} descripcionPlatoAMostrar - Descripción del plato a mostrar.
   */
  obtenerPlaMosXId(idPlatoAMostrar: number, idPlato: number, descripcionPlatoAMostrar: string): void {
    this.idPlatosAMostrar = idPlatoAMostrar;
    this.idPlato = idPlato;
    this.descripcionPlatoAMostrar = descripcionPlatoAMostrar;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Actualiza un plato a mostrar con los valores actuales.
   * Muestra el JSON enviado en la solicitud HTTP y actualiza la lista de platos a mostrar después de la actualización.
   */
  editarPlatoAMos(): void {
    const tipoPl = new TipoPlato(0, "", "", "");  // Crea un nuevo tipo de plato vacío
    const platos = new MenuCompletoModel(this.idPlato, tipoPl, "", 0, "");  // Crea un nuevo modelo de plato completo
    const plaMos = new PlatosAMostrar(this.idPlatosAMostrar, this.descripcionPlatoAMostrar, platos);  // Crea un plato a mostrar con los nuevos valores

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
      this.listaPlatosAMostrar();  // Actualiza la lista de platos a mostrar
      alert("Plato actualizado");  // Muestra un mensaje de confirmación
    }, err => {
      alert("No se actualizó el plato");  // Muestra un mensaje de error
      // Muestra un mensaje de error en la consola en caso de fallo
      console.error("Error al editar un platos a mostrar. Msj. Serv: " + err.error.message)
    });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Elimina un plato a mostrar utilizando su ID.
   * Muestra un mensaje de confirmación y actualiza la lista de platos a mostrar después de eliminar el plato.
   * 
   * @param {number} idPlatosAMostrar - ID del plato a mostrar que se va a eliminar.
   */
  borrarPlatoAMostrar(idPlatosAMostrar: number): void {
    if (idPlatosAMostrar != undefined) {
      this.plaMosServ.borrarPlatoAMostrar(idPlatosAMostrar).subscribe(data => {
        alert("Plato a mostrar eliminado.");  // Muestra un mensaje de confirmación
        console.log("Plato eliminado.");
        this.listaPlatosAMostrar();  // Actualiza la lista de platos a mostrar
      }, err => {
        alert("Error al procesar la solicitud para eliminar un plato a mostrar");  // Muestra un mensaje de error
        console.error("Error al procesar la solicitud para eliminar un plato a mostrar. Msj. Servidor: " + err.error.message);
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra un mensaje de advertencia antes de eliminar un plato.
   * Si el usuario confirma, llama a la función para eliminar el plato.
   * 
   * @param {number} idPlatosAMostrar - ID del plato a mostrar que se va a eliminar.
   */
  borrarPlatMosMensajeAdv(idPlatosAMostrar: number): void {
    const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
    if (msjAdvertenciaElim) {
      this.borrarPlatoAMostrar(idPlatosAMostrar);  // Llama a la función para eliminar el plato
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Carga los detalles de un plato en los campos de entrada del formulario utilizando su ID.
   * 
   * @param {number} idPlato - ID del plato que se va a cargar.
   */
  agregarPlatosEnInputs(idPlato: number): void {
    this.platosServ.obtPlatoXID(idPlato).subscribe(
      (plato) => {
        // Asigna los valores del plato a las variables correspondientes
        this.idPlatosAMostrar = plato.idPlato;
        this.imgPlato = plato.imgPlato;
        this.tipoPlato = plato.tipoPlato.nombreTipoPlato;
        this.nombrePlato = plato.nombrePlato;
        this.precioPlato = plato.precioPlato;
      },
      (error) => {
        // Maneja el error, si es necesario
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //AGREGAR PEDIDO
  /////////////////////////       

  /**
   * Agrega una lista de platos a un pedido existente utilizando el servicio `pedidosServ`.
   * Actualiza la lista de pedidos del día después de agregar los platos.
   */
  agregarListaDetPed(): void {
    this.pedidosServ.actualizarPedidosConListaPlatos(this.idPedido).subscribe(
      data => {
        this.listaPedidosDeHoy();  // Actualiza la lista de pedidos del día
        console.log("Lista de platos agregada correctamente al idPedido n°: " + this.idPedido, "Msj Servidor: " + data);
      },
      err => {
        console.error("Error al agregar platos: Msj Servidor: ", err);  // Muestra un mensaje de error
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Crea un nuevo pedido validando la selección de platos y porciones.
   * 
   * - Valida que al menos un plato esté seleccionado.
   * - Valida que se ingresen porciones para los platos seleccionados.
   * - Valida que todos los platos seleccionados tengan porciones ingresadas.
   * 
   * Luego guarda el pedido utilizando el servicio `pedidosServ` y actualiza la lista de pedidos del día.
   */
  agregarPedido(): void {
    // Filtra los platos seleccionados basándose en los índices y valores booleanos de selección
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]);
    const porcionesNoIngresadas = this.porcionesPlatosList.length === 0;  // Verifica si no se ingresaron porciones
    const totalesPlatosIncluyeCero = this.totalesPlatosList.includes(0);  // Verifica si hay platos sin porciones ingresadas
    const unPlatoSeleccionado = this.platosSeleccionadosSioNo.some(elemento => elemento === true);  // Verifica si al menos un plato está seleccionado

    // Valida que se haya seleccionado al menos un plato
    if (seleccionados.length === 0) {
      alert("Selecciona al menos un plato");
      this.modalitoEnviarPedido = false;
      return;
    }

    // Valida que se ingresen porciones para todos los platos seleccionados
    if (porcionesNoIngresadas) {
      alert("Ingresa porción/es");
      this.modalitoEnviarPedido = false;
      return;
    }

    // Valida que todos los platos seleccionados tengan porciones ingresadas
    if (totalesPlatosIncluyeCero && unPlatoSeleccionado) {
      alert("Ingresa porciones a todos los platos seleccionados");
      this.modalitoEnviarPedido = false;
      this.botonDisabledCrPe = false;  // Desactiva el botón si hay platos sin porciones
      return;
    }

    // Crea un objeto de pedido con los datos ingresados
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

    // Guarda el pedido utilizando el servicio `pedidosServ`
    this.pedidosServ.guardarPedido(pedido).subscribe(
      (data: PedidosModel) => {
        this.idPedidoGuardpEl = data.idPedido;
        this.modalitoEnviarPedido = true;
        this.inputReadOnlyPorcionPlato = true;
        this.chekBoxSelcPlat = true;
        this.idPedido = data.idPedido;  // Actualiza el ID del pedido con el recibido del servidor
        this.listaPedidosDeHoy();  // Actualiza la lista de pedidos del día
        alert("Pedido N° " + this.idPedido + " creado");  // Muestra un mensaje de confirmación
        console.log("Pedido guardado con idPedido N°: " + this.idPedido);
        this.botonDisabledCrPe = true;
        this.inputDisabledPorcionPlato = true;
      },
      err => {
        alert("Error al procesar la solicitud para agregar un pedido");  // Muestra un mensaje de error
        console.error("Error al procesar la solicitud para agregar un pedido. Msj. Servidor: " + err.error.message);
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
 * Selecciona el checkbox asociado a un plato si se ingresan porciones en el input.
 * - Si no hay porciones ingresadas, establece el valor inicial como 1.
 * - Marca el checkbox como seleccionado y recalcula el total del plato.
 * 
 * @param index - El índice del plato en las listas.
 */
  seleccionarChekBoxSiHayPorcionPla(index: number): void {
    if (!this.porcionesPlatosList[index]) {
      this.porcionesPlatosList[index] = 1; // Establece el valor inicial si no hay porción ingresada
      this.platosSeleccionadosSioNo[index] = false;
    }
    this.platosSeleccionadosSioNo[index] = true; // Marca el checkbox como seleccionado
    this.calcularTotalPlato(index); // Recalcula el total del plato
    //console.log("porcionesPlatosList: " + this.porcionesPlatosList);
    //console.log("chekBoxSelcPlat: " + this.chekBoxSelcPlat);
    //console.log("inputReadOnlyPorcionPlato: " + this.inputReadOnlyPorcionPlato);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Agrega o elimina porciones de un plato al seleccionar o deseleccionar el checkbox.
   * - Si se selecciona el checkbox, se elimina la porción del plato (establece NaN).
   * - Si se deselecciona, se establece una porción inicial y se recalcula el total.
   * 
   * @param index - El índice del plato en las listas.
   */
  agregarPorcionesPlaSeleccionandoChekBox(index: number): void {
    if (this.platosSeleccionadosSioNo[index] && !this.chekBoxSelcPlat) {
      // Si se selecciona el checkbox, se elimina la porción del plato
      this.porcionesPlatosList[index] = NaN;
      this.totalesPlatosList[index] = NaN;
    } else {
      // Si se deselecciona el checkbox, se establece una porción y se recalcula el total
      this.porcionesPlatosList[index] = 1;
      this.calcularTotalPlato(index);
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Valida que se hayan ingresado todos los datos del cliente antes de continuar con el pedido.
   * - Muestra un mensaje de alerta si falta algún dato.
   * - Si todos los datos están presentes, habilita la selección de platos y muestra los botones correspondientes.
   */
  validadorDatosCliente(): void {
    const validadorDatosCliente = [
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente
    ];

    if (validadorDatosCliente.some(valiDaCli => valiDaCli === undefined ||
      valiDaCli === null ||
      valiDaCli === "")) {
      // Muestra un mensaje de alerta si falta algún dato
      console.log("Falta ingresar datos para envío del pedido: " + validadorDatosCliente);
      alert("Ingresa los datos del cliente para continuar");
    } else {
      // Habilita la selección de platos y muestra los botones correspondientes
      this.botonDisabledSeleccPlato = true;
      this.modalitoAgregarPlatos = true;
      this.inputReadOnlyDatEnvio = true;
      this.botonDisplayNoneDatosEnvio = "";
      this.ocultarBotonGuardarDatosEditados();
      this.mostrarBtnAgregarPlatPedido();
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Oculta el botón para agregar platos al pedido y restablece el estado de los campos de datos del cliente.
   */
  ocultarBtonAgregarPlatPedido(): void {
    this.botonDisplayNoneSeleccPlato = "none";
    this.inputReadOnlyDatEnvio = false;
    this.botonDisplayNoneGuardEdiDatEnv = "";
    this.botonDisplayNonedEnvDetPe = "none";
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra el botón para agregar platos al pedido.
   */
  mostrarBtnAgregarPlatPedido(): void {
    this.botonDisplayNonedEnvDetPe = "";
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Oculta el botón para editar datos de envío y muestra el modal para agregar platos.
   */
  ocultarBtonEditarDatEnv(): void {
    this.inputReadOnlyDatEnvio = true;
    this.botonDisplayNoneDatosEnvio = "";
    this.modalitoAgregarPlatos = true;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Oculta el botón para guardar datos editados.
   */
  ocultarBotonGuardarDatosEditados(): void {
    this.botonDisplayNoneGuardEdiDatEnv = "none";
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //EDITAR PEDIDO
  /////////////////////////
  /**
  * Asigna los valores del pedido a las propiedades de la clase.
  * 
  * @param idPedido - El identificador del pedido.
  * @param fecha - La fecha del pedido.
  * @param horaPedido - La hora del pedido.
  * @param nombreCliente - El nombre del cliente.
  * @param telefonoCliente - El teléfono del cliente.
  * @param direccionCliente - La dirección del cliente.
  * @param localidadCliente - La localidad del cliente.
  * @param listaPlatosDelPedido - La lista de platos del pedido.
  * @param importeTotalPedido - El importe total del pedido.
  * @param pedidoConfirmado - Indica si el pedido está confirmado.
  */
  obtPedidoXId(
    idPedido: number,
    fecha: string,
    horaPedido: string,
    nombreCliente: string,
    telefonoCliente: string,
    direccionCliente: string,
    localidadCliente: string,
    listaPlatosDelPedido: string,
    importeTotalPedido: number,
    pedidoConfirmado: boolean
  ): void {
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
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Actualiza un pedido con los datos actuales y notifica al usuario del éxito o fracaso de la operación.
   * - Envía los datos actualizados al servidor y maneja la respuesta.
   */
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
      this.listaPedidosDeHoy(); // Actualiza la lista de pedidos del día
      console.log("Msj. Servidor: " + JSON.stringify(data));
      alert("Pedido N°: " + this.idPedido + " actualizado");
    },
      err => {
        console.error("Error al procesar la solicitud para editar un pedido. Msj. Servidor: " + err.error.message);
        alert("Error al procesar la solicitud para editar un pedido");
      });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Elimina un pedido después de la confirmación del usuario.
   * - Muestra una advertencia de confirmación antes de proceder con la eliminación.
   * 
   * @param idPedido - El identificador del pedido a eliminar.
   */
  eliminarPedido(idPedido: number): void {
    const confirmacion = window.confirm("El pedido N°: " + idPedido + " se eliminará. ¿Desea continuar?");

    if (confirmacion) {
      this.pedidosServ.borrarPedido(idPedido).subscribe(data => {
        console.log("Pedido N°: " + idPedido + " eliminado.");
        alert("Pedido N°: " + idPedido + " eliminado.");
        this.listaPedidosDeHoy(); // Actualiza la lista de pedidos del día
      }, err => {
        console.error("Error al procesar la solicitud para eliminar un pedido. Msj. Servidor: " + err.error.message);
        alert("Error al procesar la solicitud para eliminar un pedido");
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Elimina pedidos que no tienen detalles asociados ni platos seleccionados.
   * - Obtiene un pedido por su ID y verifica si no tiene platos seleccionados ni detalles asociados.
   * - Si el pedido no tiene datos de platos, lo elimina del sistema.
   * - Muestra un mensaje en la consola al eliminar el pedido o si ocurre un error.
   */
  eliminarPedidoSinDetPed(): void {
    // Muestra el ID del pedido que se intenta eliminar en la consola
    //console.log("idPedidoGuardpEl: " + this.idPedidoGuardpEl);

    // Obtiene el pedido por su ID desde el servicio
    this.pedidosServ.obtenerPedidoXId(this.idPedidoGuardpEl).subscribe(data => {
      // Verifica si el pedido no tiene detalles ni platos asociados
      if (!data.listaPlatosDelPedido && !data.listaPlatosDelPedidoCli) {
        // Elimina el pedido si no tiene platos ni detalles asociados
        this.pedidosServ.borrarPedido(this.idPedidoGuardpEl).subscribe(() => {
          // Actualiza la lista de pedidos después de eliminar
          this.listaPedidosDeHoy();
          // Muestra un mensaje en la consola indicando que el pedido ha sido eliminado
          console.log("El pedido N°: " + this.idPedidoGuardpEl + " ha sido eliminado por falta de carga de detalles del pedido o platos.");
          alert("El pedido N°: " + this.idPedidoGuardpEl + " ha sido eliminado por falta de carga de detalles del pedido o platos.");
        }, err =>
          // Muestra un mensaje de error en caso de fallo al eliminar el pedido
          console.error("Error al eliminar el pedido. " + "Msj. Serv: " + err.error.message)
        );
      }
    }, err => {
      // Muestra un mensaje de error si falla al obtener el pedido
      console.error("Error al obtener el pedido. " + "Msj. Serv.: " + err.error.message);
    });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Obtiene y muestra la lista de datos del cliente antes del envío.
  * Este método construye una lista de strings con la información del cliente.
  */
  getListaDatosClienteAntesEnvio(): void {
    const listaDatos: string[] = [
      `Nombre Cliente: ${this.nombreCliente}`,
      `Teléfono Cliente: ${this.telefonoCliente}`,
      `Dirección: ${this.direccionCliente}`,
      `Localidad: ${this.localidadCliente}`
    ];
    // Nota: Aquí no se hace nada con `listaDatos`. Podrías mostrarlo en la interfaz o usarlo de alguna manera si es necesario.
  }

  /**
   * Cambia el estado del checkbox para seleccionar un plato en el modal de agregar detalle pedido.
   * 
   * @param index - El índice del plato en la lista de platos.
   */
  chekBoxSeleccion(index: number): void {
    this.platosSeleccionadosSioNo[index] = !this.platosSeleccionadosSioNo[index];
  }

  /**
   * Calcula el total del plato basado en el precio del plato y la cantidad de porciones ingresadas.
   * 
   * @param index - El índice del plato en la lista de platos.
   */
  calcularTotalPlato(index: number): void {
    this.totalesPlatosList[index] = this.platosAMostrarList[index].platos.precioPlato * this.porcionesPlatosList[index] || NaN;
  }

  /**
  * Envía los detalles del pedido al servidor.
  * 
  * Este método realiza las siguientes acciones:
  * 1. Filtra y construye una lista de objetos `DetallePedidos` basados en los platos seleccionados
  *    por el usuario y las porciones correspondientes.
  * 2. Verifica que todos los datos del cliente (nombre, teléfono, dirección y localidad) estén completos.
  * 3. Si los datos del cliente están completos, envía la lista de detalles del pedido al servidor utilizando
  *    el servicio `detallePedidServ`.
  * 4. Maneja la respuesta del servidor, actualizando la interfaz según sea necesario.
  * 5. Si algún dato del cliente falta, muestra un mensaje de alerta solicitando completar la información.
  */
  enviarDetallePedidos(): void {
    // Construye la lista de DetallePedidos basada en la selección del usuario y las porciones
    const elementosSeleccionados: DetallePedidos[] = this.platosAMostrarList
      .map((PlatosAMostrar, index) => {
        // Verifica si el plato está seleccionado y si la porción correspondiente está definida
        if (this.platosSeleccionadosSioNo[index] && this.porcionesPlatosList[index] !== undefined) {
          // Devuelve un objeto DetallePedidos
          return {
            pedidos: { idPedido: this.idPedido }, // Asocia el pedido con su id,
            platos: { idPlato: PlatosAMostrar.platos.idPlato }, // Asocia el id del plato
            porcionPlato: this.porcionesPlatosList[index], // Asigna la porción seleccionada
          };
        }
        return null;
      })
      // Filtra los elementos nulos para quedarse solo con los seleccionados correctamente
      .filter(elemento => elemento !== null) as DetallePedidos[];

    // Verifica que los datos del cliente estén completos antes de enviar el pedido
    if (this.nombreCliente === "" ||
      this.telefonoCliente === "" ||
      this.direccionCliente === "" ||
      this.localidadCliente === "") {
      alert("Ingrese datos de envío para completar el pedido");
    } else {
      // Envía los detalles del pedido al servidor si los datos del cliente son válidos
      this.detallePedidServ.guardarVariosDetallesPedido(elementosSeleccionados).subscribe(
        data => {
          this.listaPedidosDeHoy(); // Actualiza la lista de pedidos de hoy
          this.botonDisabledEnvDetPe = true; // Deshabilita el botón de envío de pedidos
          this.botonEditarPlatosSelecYDat = "none"; // Oculta el botón de editar platos seleccionados
          this.botonDisplayNoneDatosEnvio = "none"; // Oculta la sección de datos de envío
          this.botonDisplayNoneGuardEdiDatEnv = "none"; // Oculta el botón de guardar/editar datos de envío
          this.mensajePedEnviadoDB = " registrado"; // Actualiza el mensaje de confirmación       
          console.log('Msj servidor: ', data);
          alert("Pedido N°: " + this.idPedido + " enviado"); // Muestra una alerta de confirmación
        },
        err => {
          // Maneja errores si el envío al servidor falla
          console.error("Error al procesar la solicitud para guardar varios detalles del pedido.  Msj. Servidor: " + JSON.stringify(err.error.message));
          alert("Error al procesar la solicitud para guardar varios detalles del pedido");
        }
      );
    }
  }


  //✮------------------------------------------------------------------------------------------------------------✮
  //AGREGAR 1 DETALLE PEDIDO SOLAMENTE

  /**
 * Selecciona el ID del pedido para agregar detalles.
 * 
 * @param idPedido - El ID del pedido a seleccionar.
 */
  seleccionarIdPedido(idPedido: number): void {
    this.idPedidoGuardDetPed = idPedido;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Agrega un detalle al pedido.
   * - Verifica si la porción es válida y si todos los campos necesarios están presentes.
   * - Si los datos son válidos, crea un nuevo detalle de pedido y lo guarda en el servidor.
   */
  agregarUnDetallePedido(): void {
    const confirmacion = window.confirm("El pedido N°: " + this.idPedidoGuardDetPed + " se editara. El/Los dato/s a editar podría/n contener diferencia/s en el/los precios unitario/s, total/es, etc. ¿Desea continuar?");

    if (confirmacion) {
      // Validación de porciones
      if (this.porcionPlato > 10) {
        alert("El máximo permitido de porciones es 10");
        return; // Salir de la función si la validación falla
      }

      // Validación de datos
      if (this.idPedidoGuardDetPed == null || this.idPedidoGuardDetPed <= 0 || isNaN(this.idPedidoGuardDetPed) ||
        this.idPlato == null || this.idPlato <= 0 || isNaN(this.idPlato) ||
        this.porcionPlato == null || this.porcionPlato <= 0 || isNaN(this.porcionPlato)) {

        alert("Seleccione un plato o ingrese porción/es");
        this.modalitoAgrDetPed = true;
        return; // Salir de la función si la validación falla

      } else {
        // Crear el objeto DetallePedidosAcotadaModel y enviarlo al servidor
        const DetPedAAgreg = new DetallePedidosAcotadaModel(this.idPedidoGuardDetPed, this.idPlato, this.porcionPlato);

        this.detallePedidServ.guardarDetPediAcotada(DetPedAAgreg).subscribe(data => {
          this.listaPedidosDeHoy(); // Actualiza la lista de pedidos del día
          console.log("Msj servidor: " + JSON.stringify(data));
          //console.log("DetPedListaEnviar: " + JSON.stringify(DetPedAAgreg))
          alert("Plato agregado al pedido N°: " + this.idPedidoGuardDetPed);
        },
          err => {
            console.error("Error al procesar la solicitud para guardar un detalle del pedido. Msj servidor: " + err.error.message);
            alert("Error al procesar la solicitud para guardar un detalle del pedido");
          });
      }
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene los detalles de un pedido específico para su edición.
   * - Muestra una advertencia al usuario sobre la sustitución de datos.
   * - Si el usuario confirma, recupera los detalles del pedido desde el servidor.
   * 
   * @param idDetallePedido - El ID del detalle del pedido a obtener.
   * @param idPedido - El ID del pedido asociado.
   * @param idPlatosAMostrar - El ID del plato a mostrar.
   * @param porcionPlato - La porción del plato.
   * @param nombrePlato - El nombre del plato.
   */
  obtenerDetPedXId(idDetallePedido: number, idPedido: number, porcionPlato: number, nombrePlato: string, idPlato: number): void {
    const msjAdvertencia = window.confirm('El/Los dato/s a editar podría/n contener diferencia/s en el/los precios unitario/s, total/es, etc. ¿Desea continuar?');
    if (!msjAdvertencia) {
      this.cerrarModalitosLimpiarInput(); // Cierra el modal y limpia los campos si el usuario cancela
    }
    if (msjAdvertencia) {
      this.detallePedidServ.obtDetallePedidoXId(idDetallePedido).subscribe(data => {
        this.idDetallePedido = idDetallePedido;
        this.idPedido = idPedido;
        this.porcionPlato = porcionPlato;
        this.nombrePlato = nombrePlato;
        this.idPlato = idPlato;
        console.log("Detalles del pedido obtenidos con idDetallePedido: " + idDetallePedido);
      }, err => {
        console.error("Error al procesar la solicitud para obtener un detalle del pedido. Msj. Serv.: " + err);
        alert("Error al procesar la solicitud para obtener un detalle del pedido");
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Actualiza un detalle de pedido.
  * - Realiza validaciones para asegurar que todos los datos necesarios son válidos.
  * - Si los datos son válidos, envía una solicitud para actualizar el detalle del pedido.
  */
  editarDetallePedidos(): void {
    // Validación de datos
    if (this.idPedido == null || this.idPedido == 0 || isNaN(this.idPedido) ||
      this.idPlato == null || this.idPlato == 0 || isNaN(this.idPlato) ||
      this.porcionPlato == null || this.porcionPlato <= 0 || isNaN(this.porcionPlato)) {

      alert("Seleccione un plato o ingrese porción/es");
      this.modalitoInputEditDetPedid = true;
      return; // Salir de la función si la validación falla
    }

    if (this.porcionPlato > 10) {
      alert("El máximo permitido de porciones es 10");
      return; // Salir de la función si la validación falla
    } else {
      // Crear el objeto DetallePedidosAcotadaModel
      const detPed = new DetallePedidosAcotadaModel(this.idPedido, this.idPlato, this.porcionPlato);

      // Enviar solicitud para actualizar el detalle del pedido
      this.detallePedidServ
        .actualizarDetallePedido(this.idDetallePedido, detPed)
        .subscribe(
          (data) => {
            this.listaDetallePedidosXIdPedido(this.idPedido); // Actualizar la lista de detalles del pedido
            this.listaPedidosDeHoy(); // Actualizar la lista de pedidos del día
            this.modalitoInputEditDetPedid = false; // Cerrar el modal de edición
            this.modalitoTdEditDetPedid = true; // Mostrar el modal de detalles editados
            console.log("Msj servidor: " + JSON.stringify(data));
            alert("Detalles del pedido N°: " + this.idPedido + " actualizados.");
          },
          (err) => {
            console.error("No se pudo actualizar el detalle del pedido. Msj. Serv.: " + err.error.message);
            alert("Error al actualizar el detalle del pedido.");
          }
        );
    }
  }


  //✮------------------------------------------------------------------------------------------------------------✮
  //BORRAR DETALLE PEDIDO 
  /////////////////////////////

  /**
  * Elimina un detalle de pedido específico.
  * - Solicita confirmación del usuario antes de proceder con la eliminación.
  * - Si el usuario confirma, envía una solicitud para eliminar el detalle del pedido.
  */
  eliminarDetallePedidos(idDetallePedido: number, idPedido: number): void {
    // Solicita confirmación al usuario
    const confirmacion = window.confirm("El detalle del pedido se eliminará. ¿Desea continuar?");

    if (confirmacion) {
      // Envía solicitud para eliminar el detalle del pedido
      this.detallePedidServ.eliminarDetallePedido(idDetallePedido, idPedido).subscribe(
        data => {
          // Muestra un mensaje de éxito y actualiza las listas
          alert("Detalle del pedido eliminado.");
          this.listaDetallePedidosXIdPedido(idPedido); // Actualiza la lista de detalles del pedido
          this.listaPedidosDeHoy(); // Actualiza la lista de pedidos del día
        },
        err => {
          // Maneja errores si ocurre un problema al eliminar
          console.error("Error al procesar la solicitud para eliminar un detalle del pedido. Msj. Serv.: ", err);
          alert("Error al procesar la solicitud para eliminar un detalle del pedido");
        }
      );
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Devuelve una lista de platos seleccionados con los detalles del pedido.
  * - Filtra y mapea los elementos seleccionados de la lista de platos a mostrar.
  * - Incluye detalles del pedido, plato y porción.
  * @returns {DetallePedidos[]} Lista de platos seleccionados para el pedido.
  */
  getPlatosSeleccionados(): DetallePedidos[] {
    // Filtra los platos seleccionados
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]) // Filtra según los platos seleccionados
      .map((platoAMostrar, index) => {
        // Mapea los platos seleccionados a un formato adecuado para la base de datos
        return {
          idDetallePedido: 0, // Asigna un valor adecuado si es necesario

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
          porcionPlato: this.porcionesPlatosList[this.platosSeleccionadosSioNo.indexOf(true)] || 0,
          precioPlato: platoAMostrar.platos.precioPlato, // Asegúrate de que esta propiedad exista
          totalPlato: this.totalesPlatosList[this.platosSeleccionadosSioNo.indexOf(true)] || 0
        };
      });

    // Log para verificar los elementos seleccionados
    //console.log('Platos seleccionados:', seleccionados);

    return seleccionados;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //EDITAR PLATOS SELECCIONADOS
  /////////////////////////////
  /**
 * Configura el estado de la interfaz de usuario para permitir la edición de platos seleccionados.
 * Desmarca los checkboxes, habilita los campos de entrada y ajusta la visibilidad de los botones.
 */
  editarPlatSeleccAntesEnv(): void {
    // Desmarca los checkboxes de selección de platos
    this.chekBoxSelcPlat = false;

    // Permite la edición de porciones de platos
    this.inputReadOnlyPorcionPlato = false;

    // Oculta el botón para seleccionar platos
    this.botonDisplayNoneSeleccPlato = "none";

    // Oculta el botón para crear un nuevo pedido
    this.botonDisplayNoneCrPe = "none";

    // Oculta el botón para enviar detalles del pedido
    this.botonDisplayNonedEnvDetPe = "none";

    // Habilita el campo de entrada para porciones
    this.inputDisabledPorcionPlato = false;

    // Oculta el botón de editar platos y datos
    this.botonEditarPlatosSelecYDat = "none";
  };

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Oculta el botón para editar platos seleccionados y muestra el botón para confirmar la edición.
   * Se utiliza para cambiar la interfaz después de iniciar el proceso de edición.
   */
  ocultarBotonParaEditar(): void {
    // Oculta el botón de editar platos y datos
    this.botonEditarPlatosSelecYDat = "none";

    // Muestra el botón de confirmar edición de platos y datos
    this.botonConfirEdicPlatosSelecYDat = "";
  };

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Valida la selección de platos y porciones antes de permitir la confirmación de los platos seleccionados.
   * Muestra alertas en caso de que falten datos y ajusta la visibilidad de los botones según el estado.
   */
  confirmarPlatSelecc(): void {
    // Filtra los platos seleccionados según los checkboxes
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]);

    // Verifica si no se han ingresado porciones
    const porcionesNoIngresadas = this.porcionesPlatosList.length === 0;

    // Verifica si hay platos seleccionados sin porciones ingresadas
    const totalesPlatosIncluyeCero = this.totalesPlatosList.includes(0);

    // Verifica si al menos un plato está seleccionado
    const unPlatoSeleccionado = this.platosSeleccionadosSioNo.some(elemento => elemento === true);

    // Valida que al menos un plato esté seleccionado
    if (seleccionados.length === 0) {
      alert("Selecciona al menos un plato");
      return;
    }

    // Valida que se hayan ingresado porciones
    if (porcionesNoIngresadas) {
      alert("Ingresa porción/es");
      return;
    }

    // Valida que todos los platos seleccionados tengan porciones ingresadas
    if (totalesPlatosIncluyeCero && unPlatoSeleccionado === true) {
      alert("Ingresa porciones a todos los platos seleccionados");
      return;
    }

    // Oculta el botón de confirmar edición de platos y datos
    this.botonConfirEdicPlatosSelecYDat = "none";

    // Muestra el botón para editar platos y datos
    this.botonEditarPlatosSelecYDat = "";

    // Establece los campos de entrada como solo lectura
    this.inputReadOnlyPorcionPlato = true;
    this.chekBoxSelcPlat = true; // Desmarca los checkboxes de selección de platos
    this.inputReadOnlyDatEnvio = true; // Establece los datos de envío como solo lectura

    // Muestra el botón para enviar detalles del pedido
    this.botonDisplayNonedEnvDetPe = "";

    // Desactiva el campo de entrada de porciones
    this.inputDisabledPorcionPlato = true;
  };

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Controla la visibilidad del botón para editar platos seleccionados.
   * Muestra u oculta el botón de edición basado en la selección de platos.
   */
  mostrarONoBtnEditarPlaSelec(): void {
    // Filtra los platos seleccionados según los checkboxes
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]);

    // Valida si no se ha seleccionado ningún plato
    if (seleccionados.length === 0) {
      // Muestra un mensaje en la consola si no hay platos seleccionados
      console.log("Selecciona al menos un plato para el pedido");

      // Oculta el modal para enviar el pedido
      this.modalitoEnviarPedido = false;

      // Sale de la función si no se ha seleccionado ningún plato
      return;
    }

    // Muestra el botón de editar platos seleccionados y datos
    this.botonEditarPlatosSelecYDat = "";
  };


  //✮------------------------------------------------------------------------------------------------------------✮
  //FUNCION PARA CREAR EXCEL CON LISTA COMPLETA
  ///////////////////////////////////////////////////
  /**
 * Genera un archivo Excel con dos hojas: una para los pedidos de hoy y otra para los platos a mostrar.
 * 
 * @param liPedidosHoy Lista de pedidos para el día de hoy.
 * @param liPlaMos Lista de platos a mostrar.
 * @param pedidosHoyPlaMostrar Nombre base para el archivo Excel a generar.
 */
  generateExcel(liPedidosHoy: any[], liPlaMos: any[], pedidosHoyPlaMostrar: string): void {
    // Crear un nuevo libro de trabajo de Excel
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Crear la hoja de Excel para la lista de pedidos de hoy
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liPedidosHoy);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Pedidos Hoy');

    // Crear la hoja de Excel para la lista de platos a mostrar
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

    // Convertir el libro de Excel a un buffer binario
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Crear un blob con el buffer binario y generar una URL para la descarga
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(dataBlob);

    // Crear un enlace de descarga y simular un clic para iniciar la descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = pedidosHoyPlaMostrar + '.xlsx'; // Nombre del archivo de Excel
    link.click(); // Simular clic en el enlace para descargar el archivo

    // Liberar el recurso del enlace
    window.URL.revokeObjectURL(url);
  };

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Maneja el clic para exportar datos a un archivo Excel.
   * Muestra un mensaje de advertencia y, si el usuario confirma, obtiene los datos y genera el archivo Excel.
   */
  exportToExcelOnClick(): void {
    // Mostrar un mensaje de advertencia antes de iniciar la descarga
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo ¿desea continuar?');

    if (msjAdvertenciaDescarga) {
      // Obtener las listas de pedidos y platos a mostrar en paralelo
      forkJoin([
        this.pedidosServ.listaPedidosDeHoy().pipe(catchError(error => of([]))), // Manejo de errores para la lista de pedidos
        this.plaMosServ.listaPlatosAMostrar().pipe(catchError(error => of([])))  // Manejo de errores para la lista de platos
      ]).subscribe(([pedidos, platos]) => {
        // Generar el archivo Excel con los datos obtenidos
        this.generateExcel(pedidos, platos, 'pedidosHoyPlaMostrar');
      });
    }
  };

  //✮------------------------------------------------------------------------------------------------------------✮
  //FUNCIONES VARIAS
  ///////////////////////////////////


  /**
  * Resetea el formulario especificado por su ID y deselecciona los checkboxes.
  * 
  * @param idFormulario ID del formulario que se desea resetear.
  */
  resetFormCleanChekBox(idFormulario: string): void {
    // Obtiene el formulario por su ID
    const formulario = document.getElementById(idFormulario) as HTMLFormElement | null;

    // Si el formulario existe, se resetea
    if (formulario) {
      formulario.reset();
    }

    // Deselecciona los checkboxes correspondientes
    for (let i = 0; i < this.platosSeleccionadosSioNo.length; i++) {
      if (this.platosSeleccionadosSioNo[i]) {
        this.chekBoxSeleccion(i);
      }
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Cierra los modales y limpia los inputs y estados relacionados.
   * Reinicia varios estados y variables para que los formularios y modales estén en su estado inicial.
   */
  cerrarModalitosLimpiarInput(): void {
    // Cierra los modales
    this.modalitoAgregarPlatos = false;
    this.modalitoEnviarPedido = false;

    this.modalitoEditPedid = false;
    this.modalitoInputEditDetPedid = false;
    this.modalitoTdEditDetPedid = true;

    // Reinicia la lista de porciones para que se valide vacía al enviar un pedido
    this.porcionesPlatosList = [];

    // Reinicia los botones y campos de entrada
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

    // Limpia los mensajes y campos de datos del cliente
    this.mensajePedEnviadoDB = "";
    this.totalPlato = NaN;
    this.nombreCliente = "";
    this.telefonoCliente = "";
    this.direccionCliente = "";
    this.localidadCliente = "";

    // Limpia los datos de los pedidos y platos   
    // this.detallePedidosListxIdPedido = [];
    this.idPedido = NaN;
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
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Actualiza el estado de confirmación del pedido como "CONFIRMADO" o "NO CONFIRMADO".
   */
  pedidoConfiAVerdOFalso(): void {
    this.pedidoConfirAVerdOFal = this.pedidoConfirmado ? "CONFIRMADO" : "NO CONFIRMADO";
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Maneja el evento de teclado para evitar la entrada de números o porciones manualmente en el input.
   * 
   * @param event Evento de teclado que se va a manejar.
   */
  handleKeydown(event: KeyboardEvent): void {
    event.preventDefault();
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Desplaza la vista hacia la sección especificada por su ID con un comportamiento de desplazamiento suave.
   * 
   * @param sectionId ID de la sección a la que se desea hacer scroll.
   */
  scrollASeccion(sectionId: string): void {
    try {
      const tryScroll = () => {
        const section = document.getElementById(sectionId);

        if (!section) {
          console.error(`La sección con ID '${sectionId}' no fue encontrada.`);
          return;
        }

        // Desplazar suavemente hacia la sección
        section.scrollIntoView({ behavior: 'smooth' });
      };

      // Ejecutar el scroll después de 500 milisegundos
      setTimeout(tryScroll, 500);
    } catch (error) {
      console.error('Error al intentar hacer scroll:', error);
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮

}




