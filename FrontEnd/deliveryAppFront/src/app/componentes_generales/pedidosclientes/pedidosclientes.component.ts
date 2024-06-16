import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { DetallePedidos } from 'src/app/usuarios/modelos/detalle-pedidos';
import { DetallePedidosAcotadaModel } from 'src/app/usuarios/modelos/detalle-pedidos-acotadaModel';
import { PedidosModel } from 'src/app/usuarios/modelos/pedidos-model';
import { PlatosAMostrar } from 'src/app/usuarios/modelos/platos-amostrar';
import { DetallePedidosService } from 'src/app/usuarios/servicios/detalle-pedidos.service';
import { PedidosService } from 'src/app/usuarios/servicios/pedidos.service';
import { PlatosAMostrarService } from 'src/app/usuarios/servicios/platos-amostrar.service';


@Component({
  selector: 'app-pedidosclientes',
  templateUrl: './pedidosclientes.component.html',
  styleUrls: ['./pedidosclientes.component.css']
})
export class PedidosclientesComponent {

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  //⋅•⋅⊰∙∘☽= VARIABLES =☾∘∙⊱⋅•⋅   
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈


  nombreCliente: string = "";
  telefonoCliente: string = "";
  direccionCliente: string = "";
  localidadCliente: string = "";
  listaPlatosDelPedido: string = "";
  listaPlatosDelPedidoCli: string = "";
  fecha!: string;
  hora!: string;
  importeTotalPedido!: number;
  pedidoConfirmado: boolean = false;
  precioPlatosAMostrar!: number;

  platosDelPedido!: string;

  idPedido!: number;

  pedidos!: PedidosModel;

  mensajePedEnviadoDB: string = "";

  platosAMostrarList: PlatosAMostrar[] = [];
  porcionesPlatosList: number[] = []; // Array para almacenar las porciones de cada plato, esta lista se itera con el let i = index del componente
  totalesPlatosList: number[] = []; // Array para almacenar los totales de cada plato, esta lista se itera con el let i = index del componente
  platosSeleccionadosSioNo: Boolean[] = []; //lista en la que se agregan los datos de los chekbox seleccionados

  chekBoxSelcPlat: boolean = false;

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  //⋅•⋅⊰∙∘☽= MODALITOS NGIF =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈

  //objeto para que los modales de seleccion de plato se abran uno a la vez
  modalitosPlaPed: { [key: string]: boolean } = {};
  modalitoNgIfPedCli: boolean = false;

  //modalitos para selecccion de platos, ingreso datos de envio, confirmacion pedido y envio a la DB
  modalitoNgIfSelPLaMos: boolean = true;
  modalitoNgIfDatEnv: boolean = false;
  modalitoNgIfConfYEnvPed: boolean = false;

  //modalito alert
  modalitoNgIfAlert: boolean = false;

  //modalito alert
  modalitoNgIfConf: boolean = false;


  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= BOTONES =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈

  //botones para seleccion y edicion de platos 
  butComePed: boolean = true;
  butEdiPlaSel: boolean = false;

  //botones para datos de envio de platos 
  butConfDatEnv: boolean = true;

  //botones "agregar al pedido" y cerrar (texto del button)
  botonesEstado: boolean[] = []; //esto es una "matriz de estado" para los botones que mantiene el estado de cada botón en la lista de forma individual.

  //boton enviar pedido
  botonEnvPedido: boolean = true;

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= SOLO LECTURA U OFFLINE DE INPUTS Y BOTONES =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈ 

  // solo lectura de inputs y chekbox asociados a la seleccion de platosamostrar
  disabledInpSelPla: boolean = false;
  disabledInDatEnv: boolean = false;

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓𝅒 𝅓𝅒 𝅓𝅒 𝅓𝅒 𝅓◈ 
  //⋅•⋅⊰∙∘☽= MENSAJE PARA ALERT Y CONFIRMACION DE PEDIDO ENVIADO  =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓𝅒 𝅓𝅒 𝅓𝅒 𝅓𝅒 𝅓◈ 
  mensaje!: String;



//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  


  constructor(private pedidosServ: PedidosService,
    private detallePedidServ: DetallePedidosService,
    private plaMosServ: PlatosAMostrarService
  ) { };

//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

  ngOnInit(): void {
    this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar completa
    this.inicBtnTextAgrePed(); // Inicializa todos los botones "agregar al pedido" en estado de true o con el texto "Agregar al pedido"
  };

//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  


  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= FUNCIONES PARA LISTAS   =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈


  /**
  * Obtiene la lista de platos a mostrar desde el servidor.
  * 
  * La función `listaPlatosAMostrar` realiza una solicitud HTTP GET a través del servicio `plaMosServ`
  * para obtener una lista de platos a mostrar. Si la respuesta contiene datos, la lista se almacena
  * en la propiedad `platosAMostrarList` y se muestra un mensaje en la consola. En caso de error, se 
  * muestra un mensaje de error en la consola y se muestra una alerta al usuario.
  */
  listaPlatosAMostrar(): void {
    // Realiza la solicitud al servicio para obtener la lista de platos
    this.plaMosServ.listaPlatosAMostrar().subscribe(
      data => {
        // Verifica si la respuesta contiene datos
        if (data.length > 0) {
          // Asigna los datos recibidos a la propiedad `platosAMostrarList`
          this.platosAMostrarList = data;
          // Muestra un mensaje en la consola indicando que se recibió la lista
          console.log("Lista de platos a mostrar recibida.");
        }
      },
      err => {
        // Muestra un mensaje de error en la consola si ocurre un error en la solicitud
        console.log("Msj. Serv.: " + err.error.message);
        // Muestra una alerta al usuario con el mensaje de error
        alert("Msj. Serv.: " + err.error.message);
      }
    );
  };


//✮------------------------------------------------------------------------------------------------------------✮


  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅓 ◈
  //⋅•⋅⊰∙∘☽= FUNCIONES PARA MODALES   =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅓 ◈

  /**
  * Alterna la visibilidad de un modal para seleccionar platos y porciones.
  *
  * @param modalName - Nombre del modal a alternar.
  * @param index - Índice del plato en la lista.
  */
  opCloModSelecPlaMos(modalName: string, index: number): void {
    // Si el plato ya está seleccionado, cierra el modal.
    if (this.platosSeleccionadosSioNo[index] == true) {
      this.modalitosPlaPed[modalName] = false;
    }

    // Alterna el estado del modal.
    this.modalitosPlaPed[modalName] = !this.modalitosPlaPed[modalName];
  };

  /**
   * Muestra el modal para el ingreso de datos de envío.
   * 
   * Inicialmente, el modal está oculto al iniciar el componente.
   */
  mostrarModalitoNgIfDatEnv(): void {
    // Establece la visibilidad del modal a true, mostrando el modal.
    this.modalitoNgIfDatEnv = true;
  };


  /**
   * Muestra el modal para la confirmación y envío del pedido.
   * 
   * Inicialmente, el modal está oculto al iniciar el componente.
   */
  mostrarModalitoNgIfConfYEnvPed(): void {
    // Establece la visibilidad del modal a true, mostrando el modal.
    this.modalitoNgIfConfYEnvPed = true;
  };

  /**
   * Muestra el modal de alerta.
   * 
   * Inicialmente, el modal de alerta está oculto al iniciar el componente.
   */
  mostrarModalitoNgIfAlert(): void {
    // Establece la visibilidad del modal de alerta a true, mostrando el modal.
    this.modalitoNgIfAlert = true;
  };


  /**
   * Cierra el modal de alerta.
   * 
   * Inicialmente, el modal de alerta está visible.
   */
  cerrarModalitoNgIfAlert(): void {
    // Establece la visibilidad del modal de alerta a false, ocultando el modal.
    this.modalitoNgIfAlert = false;
  };


  /**
   * Abre el modal de confirmación.
   * 
   * Inicialmente, el modal de confirmación está oculto.
   */
  mostrarModalitoNgIfConf(): void {
    // Establece la visibilidad del modal de confirmación a true, mostrando el modal.
    this.modalitoNgIfConf = true;
  };

  /**
   * Cierra el modal de confirmación.
   * 
   * Oculta el modal de confirmación estableciendo su visibilidad a false.
   */
  cerrarModalitoNgIfConf(): void {
    // Establece la visibilidad del modal de confirmación a false, ocultando el modal.
    this.modalitoNgIfConf = false;
  };


//✮------------------------------------------------------------------------------------------------------------✮


  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= FUNCIONES PARA MENSAJES (ALERT, CONFIRMACION DE PEDIDOS) =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈

  /**
   * Establece un mensaje de alerta o confirmación.
   * 
   * @param mensaje - El mensaje que se desea mostrar.
   * 
   * Asigna el valor del parámetro `mensaje` a la variable `mensaje` de la clase,
   * permitiendo mostrar un mensaje de alerta o confirmación.
   */
  mostrarMensaje(mensaje: String): void {
    // Asigna el mensaje recibido al atributo 'mensaje' de la clase.
    this.mensaje = mensaje;
  };


//✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= FUNCIONES PARA BOTONES =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈

  /**
   * Inicializa los botones de agregar al pedido con el texto "agregar al pedido" al iniciar el componente.
   * 
   * Recorre la lista de platos a mostrar y establece el estado de los botones de agregar al pedido
   * en verdadero para cada plato.
   */
  inicBtnTextAgrePed(): void {
    // Recorre la lista de platos a mostrar.
    this.platosAMostrarList.forEach(() => {
      // Agrega el estado verdadero para cada botón de agregar al pedido.
      this.botonesEstado.push(true);
    }
    );
  };

  /**
   * Cambia el texto del botón "Agregar al pedido" por "Cerrar".
   * 
   * @param index El índice del botón en la lista de platos seleccionados.
   * 
   * Si el plato correspondiente al índice dado está seleccionado, establece el estado del botón
   * en falso, de lo contrario, invierte el estado del botón.
   */
  cambiarTextoBtn(index: number): void {
    // Verifica si el plato correspondiente al índice dado está seleccionado.
    if (this.platosSeleccionadosSioNo[index] == true) {
      // Establece el estado del botón en falso si el plato está seleccionado.
      this.botonesEstado[index] = false;
    };

    // Cambia el estado del botón correspondiente al índice dado.
    this.botonesEstado[index] = !this.botonesEstado[index];
  };


  /**
   * Muestra el botón 'botonEnvPedido'.
   */
  mostrarBotonEnvPedido(): void {
    this.botonEnvPedido = true;
  };

  /**
   * Oculta el botón 'botonEnvPedido'.
   */
  ocultarBotonEnvPedido(): void {
    this.botonEnvPedido = false;
  };


//✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= FUNCIONES PARA DEJAR OFFLINE INPUT HTML =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅒 𝅓 𝅒 𝅓 ◈

  /**
   * Deshabilita el input para la selección de platos.
   */
  disabledSelcPla(): void {
    this.disabledInpSelPla = true;
  };

  /**
   * Deshabilita el input para la selección de platos.
   */
  enabledSelcPla(): void {
    this.disabledInpSelPla = false;
  };

  /**
   * Habilita el input para la selección de platos.
   */
  disabledInputDatEnv(): void {
    this.disabledInDatEnv = true;
  };

  /**
   * Deshabilita el input para enviar datos de envio del pedido.
   */
  enabledInputDatEnv(): void {
    this.disabledInDatEnv = false;
  };


//✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= SELECCION DE PLATOS A MOSTRAR PARA EL PEDIDO, CREACION DEL PEDIDO, CREACION DE DETALLES DEL PEDIDO Y GUARDARLOS EN LA DB =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈

  /**
  * Selecciona el checkbox al utilizar la flecha de aumento o decremento del input de porciones.
  * @param index El índice del plato en la lista.
  */
  seleccionarChekBoxSiHayPorcionPla(index: number): void {
    // Verifica si no hay ninguna porción ingresada para el plato en el índice dado
    if (!this.porcionesPlatosList[index]) {
      // Establece el valor inicial solo si no hay ninguna porción ingresada
      this.porcionesPlatosList[index] = 1;
      // Establece el checkbox como no seleccionado
      this.platosSeleccionadosSioNo[index] = false;
    }
    // Establece el checkbox como seleccionado
    this.platosSeleccionadosSioNo[index] = true;
    // Calcula el total del plato
    this.calcularTotalPlato(index);
  };



//calcular total platosamostrar y total pedido. eliminar pedido y detalles pedidos si hay diferencias en el total del front y back

  /**
   * Calcula el total del plato multiplicando su precio por la cantidad de porciones ingresadas.
   * @param index El índice del plato en la lista.
   */
  calcularTotalPlato(index: number): void {
    // Obtiene el precio del plato en el índice dado y lo multiplica por la cantidad de porciones ingresadas.
    // Si no hay porciones ingresadas o si el precio del plato no está definido, establece el total como NaN.
    this.totalesPlatosList[index] = this.platosAMostrarList[index].platos.precioPlato * this.porcionesPlatosList[index] || NaN;
  };

  /**
   * Calcula el total del pedido sumando el precio total de todos los platos seleccionados.
   * @returns El total del pedido.
   */
  calcularTotalPedido(): number {
    let totalPlatosSeleccionados = 0;

    // Recorre todos los platos seleccionados y suma sus totales
    for (let i = 0; i < this.platosAMostrarList.length; i++) {
      if (this.platosSeleccionadosSioNo[i] && this.porcionesPlatosList[i] !== undefined) {
        totalPlatosSeleccionados += this.platosAMostrarList[i].platos.precioPlato * this.porcionesPlatosList[i];
      }
    }

    return totalPlatosSeleccionados;
  };


  /**
 * Obtiene un pedido por su ID y lo elimina junto con sus detalles de pedido asociados si hay diferencias
 * entre el importe total del pedido calculado por el front y el calculado por el backend.
 * 
 * @returns Una promesa que indica si se realizó la operación correctamente.
 */
  async obtenerPedidoXIdYEliminar(): Promise<void> {
    try {
      // Intenta obtener el pedido actual por su ID desde el backend
      const pedido = await this.pedidosServ.obtenerPedidoXId(this.idPedido).toPromise();

      // Verifica si el pedido existe y si hay diferencias en el importe total del pedido
      if (pedido && this.calcularTotalPedido() !== pedido.importeTotalPedido) {
        // Si hay diferencias, procede a eliminar los detalles de pedido asociados al pedido actual
        await this.detallePedidServ.eliminarVariosDetPedXIdPedido(this.idPedido).toPromise();
        // Imprime un mensaje de registro indicando que los detalles del pedido han sido eliminados
        console.log("Los detalles del pedido con ID " + this.idPedido + " han sido eliminados debido a diferencias en el importe total del pedido.");

        // A continuación, se elimina el propio pedido
        await this.pedidosServ.borrarPedido(this.idPedido).toPromise();
        // Imprime un mensaje de registro indicando que el pedido ha sido eliminado
        console.log("El pedido con ID " + this.idPedido + " ha sido eliminado debido a diferencias en el importe total del pedido.");
      }
    } catch (error) {
      // Captura cualquier error que pueda ocurrir durante el proceso de obtención y eliminación del pedido
      console.error("Error al obtener o eliminar el pedido:", error);
    }
  };


  /**
  * Agrega una porción al plato seleccionado si se marca el checkbox de selección.
  * Si se desmarca el checkbox, se restablece el número de porciones a 1 y se recalcula el total del plato.
  * 
  * @param index El índice del plato en la lista de platos mostrados.
  */
  agregarPorcionesPlaSeleccionandoChekBox(index: number): void {
    // Verifica si se ha seleccionado el plato y se ha marcado el checkbox
    if (this.platosSeleccionadosSioNo[index] && this.chekBoxSelcPlat == false) {
      // Si se marca el checkbox, establece el número de porciones y el total del plato como NaN
      this.porcionesPlatosList[index] = NaN;
      this.totalesPlatosList[index] = NaN;
    } else {
      // Si se desmarca el checkbox previamente seleccionado, restablece el número de porciones a 1
      this.porcionesPlatosList[index] = 1;
      // Calcula el nuevo total del plato
      this.calcularTotalPlato(index);
    }
  };


  /**
   * Cambia el estado del checkbox del plato en el modal de agregar detalle del pedido a true o false.
   * 
   * @param index El índice del plato en la lista de platos mostrados.
   */
  chekBoxSeleccion(index: number): void {
    // Cambia el estado del checkbox del plato en la posición 'index'
    this.platosSeleccionadosSioNo[index] = !this.platosSeleccionadosSioNo[index];
  };



  /**
  * Guarda un pedido y sus respectivos detalles de pedido en la base de datos.
  * Se validan los datos del cliente y la selección de platos antes de realizar el pedido.
  * Se muestra un mensaje de alerta si los datos están incompletos o si no se ha seleccionado ningún plato.
  * 
  * Si los datos son válidos, se crea un objeto de tipo `PedidosModel` con los datos del cliente y del pedido.
  * Luego se envía una solicitud al servicio para guardar el pedido en la base de datos.
  * 
  * @remarks
  * Se realizan las siguientes validaciones antes de guardar el pedido:
  * - Se verifica que los campos de nombre, teléfono, dirección y localidad del cliente estén completos.
  * - Se verifica que al menos un plato haya sido seleccionado.
  * - Se verifica que se haya ingresado al menos una porción para cada plato seleccionado.
  * - Se verifica que se hayan ingresado porciones para todos los platos seleccionados.
  * 
  * Si alguna de las validaciones falla, se muestra un mensaje de alerta al usuario.
  * 
  * Si el pedido se guarda correctamente, se muestra un mensaje de confirmación con el número de pedido generado.
  * Además, se envía la lista de platos seleccionados para crear los detalles de pedido asociados al pedido principal.
  * 
  * Si ocurre algún error en la solicitud al servidor, se muestra un mensaje de error.
  */
  agregarPedidoYDetPed(): void {
    // Crea una lista con los platos seleccionados mediante el checkbox
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]);
    const porcionesNoIngresadas = this.porcionesPlatosList.length === 0;
    const totalesPlatosIncluyeCero = this.totalesPlatosList.includes(0);
    const unPlatoSeleccionado = this.platosSeleccionadosSioNo.some(elemento => elemento === true);

    // Crea un objeto de tipo PedidosModel con los datos del cliente o de envío
    const pedido = new PedidosModel(
      this.idPedido,
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente,
      this.listaPlatosDelPedido,
      this.listaPlatosDelPedidoCli,
      this.fecha,
      this.hora,
      this.importeTotalPedido,
      this.pedidoConfirmado
    );

    // Validador para datos del cliente
    if (this.nombreCliente == "" ||
      this.telefonoCliente == "" ||
      this.direccionCliente == "" ||
      this.localidadCliente == "") {
      this.mostrarModalitoNgIfAlert();
      this.mostrarMensaje("El nombre del cliente, dirección, localidad o teléfono no se han completado. Por favor complételos para continuar el pedido.");
      return;
    }

    // Validadores para selección de platos
    // Validador sin selección alguna de checkbox
    if (seleccionados.length === 0) {
      this.mostrarModalitoNgIfAlert();
      this.mostrarMensaje("Selecciona al menos un plato para continuar con el pedido.");
      return;
    }

    // Validador para selección de su checkbox y no ingreso de porciones
    if (porcionesNoIngresadas) {
      this.mostrarModalitoNgIfAlert();
      this.mostrarMensaje("Ingresa porción/es para cada plato seleccionado.");
      return;
    }

    // Validador para selección de 2 o más platos con uno o más (menos que el total seleccionado) sin porciones
    if (totalesPlatosIncluyeCero && unPlatoSeleccionado === true) {
      this.mostrarMensaje("Ingresa porciones para todos los platos seleccionados.");
      return;
    }

    // Se envía la solicitud al servicio para guardar el pedido en la base de datos
    this.pedidosServ.guardarPedido(pedido).subscribe(
      (data: PedidosModel) => {
        this.chekBoxSelcPlat = true;
        this.idPedido = data.idPedido;
        this.cerrarModalitoNgIfAlert(); // Oculta el modalitoNgIfAlert
        this.mostrarModalitoNgIfConf(); // Abre el modalitoNgIfConf
        this.mostrarMensaje("Pedido N° " + this.idPedido + " creado."); // Muestra el mensaje de pedido creado
        console.log("Pedido guardado con idPedido N°: " + this.idPedido + ". Msj servidor: objeto JSON instancia clase Pedidos: " + JSON.stringify(data));

        // Envía la lista de platos seleccionados para crear los detalles de pedido asociados al pedido principal.
        // Se agrega la función aquí y no en el botón para que el idPedido necesario para guardar
        // la lista de platosAMostrar vuelva del servidor (el servidor devuelve el idPedido con "data")
        this.enviarDetallePedidos();

        // Oculta el botón botonEnvPedido
        this.ocultarBotonEnvPedido();

        // Deja offline o solo lectura los inputs para la selección de platosAMostrar
        this.disabledSelcPla();

        // Deja offline o solo lectura los inputs para datos del cliente
        this.disabledInputDatEnv();
      },
      err => {
        // Muestra un mensaje de error si ocurre algún problema con la solicitud al servidor
        this.mostrarModalitoNgIfAlert();
        this.mostrarMensaje(err.error.message);
        console.log("Msj. Servidor: " + err.error.message);
      }
    );
  };


  /**
   * Verifica la existencia de un pedido completo en la base de datos.
   * Utiliza el ID del pedido para realizar la verificación.
   * Retorna un Observable que emite un valor booleano indicando si el pedido existe o no.
   */
  existexIdPedido(idPedido: number): Observable<boolean> {
    return this.pedidosServ.existeXIdPedido(idPedido);
  };


  /**
  * Envia la lista de detalles de pedidos a la base de datos.
  * Utiliza los platos seleccionados y las porciones ingresadas para crear los detalles de pedido.
  * Antes de enviar los detalles de pedido, valida que los datos de envío del cliente estén completos.
  * Si los datos de envío están incompletos, muestra una alerta y no realiza el envío.
  * Si los datos de envío están completos, guarda los detalles de pedido en la base de datos y luego ejecuta la función para obtener el pedido por ID y eliminarlo si es necesario.
  * Una vez guardados los detalles de pedido y, si es necesario, eliminado el pedido, envía el pedido por WhatsApp.
  * 
  * @remarks
  * Se crea una lista de objetos `DetallePedidosAcotadaModel` con los platos seleccionados y las porciones ingresadas.
  * Se valida que los datos de envío del cliente estén completos antes de enviar los detalles de pedido.
  * Se muestra una alerta si faltan datos de envío del cliente.
  * Se guarda la lista de detalles de pedido en la base de datos y se elimina el pedido si hay diferencias en el total del pedido calculado por el front y el calculado por el backend.
  * Se envía el pedido por WhatsApp una vez que se hayan guardado los detalles de pedido y, si es necesario, eliminado el pedido.
  */
  async enviarDetallePedidos(): Promise<void> {
    try {
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

      if (this.nombreCliente == "" ||
        this.telefonoCliente == "" ||
        this.direccionCliente == "" ||
        this.localidadCliente == "") {
        alert("Ingrese datos de envio para completar el pedido");
        console.log("Faltan ingresar datos de envio");
      } else {
        // Guarda los detalles de pedido en la base de datos
        const guardarDetallePedido = this.detallePedidServ.guardarVariosDetallesPedido(elementosSeleccionados).toPromise();
        await guardarDetallePedido;

        console.log('Detalles/platos del Pedido con idPedido N°: ' + this.idPedido + ' guardados correctamente.');

        // Si hay diferencias en el total del pedido, elimina el pedido
        await this.obtenerPedidoXIdYEliminar();

        console.log("Enviando pedido por WhatsApp...");
        // Envía el pedido por WhatsApp
        await this.obtenerPedidoYEnviarWhatsApp(this.idPedido);
      }
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
  };



//✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= ENVIO POR WHATSAPP DEL PEDIDO COMPLETO (PEDIDOS Y DETALLE DEL PEDIDOS) =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈


  /**
  * Obtiene un pedido por su ID y lo envía por WhatsApp.
  * Se ejecuta una vez guardado el pedido y el detalle del pedido en la base de datos.
  * 
  * @param idPedido - El ID del pedido que se va a obtener y enviar por WhatsApp.
  * 
  * @remarks
  * Se verifica si el pedido existe en la base de datos antes de proceder.
  * Si el pedido no existe, se muestra un mensaje de alerta indicando que el pedido fue eliminado.
  * Si el pedido existe, se obtienen los detalles del pedido y se construye un mensaje con la información del pedido y los datos de envío.
  * Finalmente, se abre un enlace de WhatsApp con el mensaje predefinido.
  */
  async obtenerPedidoYEnviarWhatsApp(idPedido: number): Promise<void> {
    try {
      // Verifica si el pedido existe en la base de datos
      const existe = await this.existexIdPedido(idPedido).toPromise();

      // Si el pedido no existe, muestra un mensaje de alerta
      if (!existe) {
        this.cerrarModalitoNgIfConf(); // Cierra el modalitoNgIfConf ya que el pedido se creó inicialmente, pero luego se eliminó por diferencias en el total del pedido
        this.mostrarModalitoNgIfAlert(); // Abre el modalito mostrarModalitoNgIfAlert ya que el pedido ya no existe
        this.mostrarMensaje("El pedido N°: " + this.idPedido + " fue eliminado por problemas internos de la aplicación web. Por favor realiza el pedido nuevamente o contáctanos."); // Muestra un mensaje de alerta al cliente
      }

      // Si el pedido existe, obtiene los detalles del pedido y lo envía por WhatsApp
      if (existe) {
        const pedido = await this.pedidosServ.obtenerPedidoXId(idPedido).toPromise();

        if (pedido) {
          // Construye el mensaje de WhatsApp con la información del pedido y los datos de envío
          const mensaje =
            `Hola, mi nombre es: ${pedido.nombreCliente} y este es mi pedido: \n` +
            `${pedido.listaPlatosDelPedidoCli}.\n` +
            `Total del pedido: $${pedido.importeTotalPedido}.\n` +
            `Los datos de envío del pedido son:\n` +
            `Dirección: ${pedido.direccionCliente};\n` +
            `Localidad: ${pedido.localidadCliente};\n` +
            `Teléfono: ${pedido.telefonoCliente};\n` +
            `\n` +
            `Pedido N° : ${pedido.idPedido}.\n` +
            `¡Muchas gracias!`;

          // Abre un enlace de WhatsApp con el mensaje predefinido
          const url = `https://web.whatsapp.com/send?phone=541169996458&text=${encodeURIComponent(mensaje)}`;
          window.open(url, '_blank');
        } else {
          console.log("El pedido con ID " + idPedido + " no existe.");
        }
      } else {
        console.log("El pedido con ID " + idPedido + " no existe.");
      }
    } catch (error) {
      console.error("Error al obtener o enviar el pedido:", error);
    }
  };


//✮------------------------------------------------------------------------------------------------------------✮


  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒  𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= VISUALIZACIÓN DE DATOS DE ENVIO Y PLATOS A MOSTRAR SELECCIONADOS PARA EL CLIENTE, ANTES DE ENVIARLOS A LA DB =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒  𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈


  /**
   * Muestra los datos del cliente en pantalla antes de enviarlos a la base de datos.
   * 
   * @remarks
   * Esta función crea una lista con los datos del cliente, incluyendo nombre, teléfono, dirección y localidad.
   * Los datos se muestran en pantalla para que el usuario pueda revisarlos antes de enviarlos a la base de datos.
   */
  getListaDatosClienteAntesEnvio(): void {
    const listaDatos: string[] = [
      `Nombre Cliente: ${this.nombreCliente}`,
      `Teléfono Cliente: ${this.telefonoCliente}`,
      `Dirección: ${this.direccionCliente}`,
      `Localidad: ${this.localidadCliente}`
    ];
  };



  /**
  * Muestra una lista de los platos seleccionados para el pedido para visualización del cliente antes de enviarla a la base de datos.
  * 
  * @remarks
  * Esta función filtra los elementos seleccionados de la lista de platos a mostrar. Luego, crea una lista de objetos de tipo `DetallePedidos`
  * con los datos necesarios para mostrarlos al cliente antes de enviarlos a la base de datos. Esta lista incluye información como el nombre del cliente,
  * teléfono, dirección, localidad, platos seleccionados, porción de cada plato y el total del pedido.
  * 
  * @returns Una lista de objetos de tipo `DetallePedidos` con los platos seleccionados y sus detalles para visualización del cliente.
  */
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


//✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  //⋅•⋅⊰∙∘☽= FUNCIONES VARIAS =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈

  /**
   * Evita la entrada manual de números en el input de porciones.
   */
  handleKeydown(event: KeyboardEvent): void {
    event.preventDefault();
  };

  /**
  * Ancla para desplazarse a secciones mediante un botón.
  * @param sectionId El ID de la sección a la que se desea desplazar.
  */
  scrollASeccion(sectionId: string): void {
    try {
      const tryScroll = () => {
        const section = document.getElementById(sectionId);

        if (!section) {
          console.error(`La sección con ID '${sectionId}' no fue encontrada.`);
          return;
        }

        section.scrollIntoView({ behavior: 'smooth' });
      };

      // Desplaza a la sección después de 500 milisegundos
      setTimeout(tryScroll, 500);
    } catch (error) {
      console.error('Error al intentar hacer scroll:', error);
    }
  };


  //para ejecutar funcione al hacer scroll en pc o en pantallas tactiles. La annotation @HostListener capta el evento scroll
  //@HostListener('window:scroll', ['$event'])
  //cerrarModalitoNgIfAlertConfScroll(event: Event): void {
  //  this.cerrarModalitoNgIfAlert();
  //};


}
