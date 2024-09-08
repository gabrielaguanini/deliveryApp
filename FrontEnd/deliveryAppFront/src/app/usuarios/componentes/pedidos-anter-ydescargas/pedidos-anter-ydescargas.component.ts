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
import { MenuCompletoModel } from '../../modelos/menu-completo-model';
import { MenuCompletoServiceService } from '../../servicios/menu-completo-service.service';


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
  listaPlatosDelPedidoCli!: string;
  detPedidAcotada!: DetallePedidosAcotadaModel;
  idPedidoGuardDetPed!: number; //idPedido tomado de la lista {{pedidosXFe.idPedido}} del html. Para guardar un nuevo detalle pedido
  idPlato!: number;

  errorFormatoFechaMensaje: string = ''; // Mensaje de error para formatos de fecha incorrectos
  fechaFormato = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/; // Expresión regular para validar el formato de fecha "aaaa-mm-dd"


  //LISTAS
  listaPedidosXFecha: PedidosModel[] = [];
  detallePedidosListxIdPedido: DetallePedidos[] = [];
   // Esta lista contiene objetos que representan dos estados posibles: `CONFIRMADO`: Indicado por el valor `true`, `NO CONFIRMADO`: Indicado por el valor `false`.
   listaPeConfTrueFalse = [
    { value: true, label: 'CONFIRMADO' },
    { value: false, label: 'NO CONFIRMADO' }
  ];
  platosAMostrarList: PlatosAMostrar[] = [];
  listaPlatosCompleta: MenuCompletoModel[] = [];



  //MODALES
  modalitoEditPedid: boolean = false;
  modalEditarPedido!: BsModalRef;
  modalitoInputEditDetPedid: boolean = false; //modalito ngif (NO BSMODALREF) para editar detalles pedidos 
  modalitoTdEditDetPedid: boolean = true; //modalito ngif (NO BSMODALREF) para editar detalles pedidos  
  modalInfo!: BsModalRef;
  modalitoPedidosXId: boolean = false;
  modalitoPedidosXFecha: boolean = false;
  modalitoAgrDetPed: boolean = false;


  constructor(
    private pedidosServ: PedidosService,
    private detallePedidServ: DetallePedidosService,
    private modalService: BsModalService,
    private plaMosServ: PlatosAMostrarService,
    private platosServ: MenuCompletoServiceService
  ) { };

  ngOnInit(): void {

    this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar completa para select edicion detalle pedidos
  };

  //✮------------------------------------------------------------------------------------------------------------✮

  //FUNCIONES LISTAS


  /**
   * Valida si una fecha cumple con el formato requerido "aaaa-mm-dd".
   * 
   * @param fecha - La fecha en formato de cadena que se desea validar.
   * @returns Un valor booleano que indica si la fecha es válida (true) o no (false).
   * 
   * Esta función utiliza una expresión regular para verificar que la fecha
   * tenga el formato correcto. El formato esperado es un año de 4 dígitos,
   * seguido por un mes de 2 dígitos y un día de 2 dígitos, separados por guiones.
   */
  validarFormatoFecha(fecha: string): boolean {
    return this.fechaFormato.test(fecha); // Retorna true si la fecha cumple con el formato, false en caso contrario
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Obtiene una lista de pedidos filtrados por la fecha proporcionada.
  * 
  * @param fecha - La fecha para filtrar los pedidos en formato 'yyyy-mm-dd'. Debe ser una cadena con el año, mes y día separados por guiones.
  * @param alertConLog - Si es true, muestra alertas y mensajes de error en la consola. Si es false, solo actualiza la lista sin mostrar alertas.
  * @param isRequestByDate - Indica si la solicitud se realiza por fecha. Si es true, se muestra una alerta si no se encuentran registros. Si es false, no se muestra la alerta.
  */
  listaDePedidosXFecha(fecha: string, alertConLog: boolean = true, isRequestByDate: boolean = true): void {
    // Si la fecha es la predeterminada (1900-01-01), no realiza ninguna acción
    if (fecha === '1900-01-01') {
      return;
    }

    // Valida el formato de la fecha
    if (!this.validarFormatoFecha(fecha)) {
      this.errorFormatoFechaMensaje = 'El formato de la fecha debe ser aaaa-mm-dd. Ejemplo: 2024-10-09 para el 9 de octubre de 2024';
      if (alertConLog) {
        console.error(this.errorFormatoFechaMensaje); // Muestra el mensaje de error en la consola
        alert(this.errorFormatoFechaMensaje); // Muestra el mensaje de error en una alerta
      }
      return; // Sale de la función si la fecha tiene un formato incorrecto
    }

    if (alertConLog) {
      // Si alertConLog es true, muestra alertas y logs en la consola
      if (fecha === undefined || fecha.trim() === '' || fecha === '') {
        this.fecha = "";
        console.error('La fecha no puede estar vacía'); // Muestra el mensaje de error en la consola
        alert('La fecha no puede estar vacía'); // Muestra el mensaje de error en una alerta
      } else {
        // Realiza la solicitud para obtener la lista de pedidos por fecha
        this.pedidosServ.listaPedidosXFecha(fecha).subscribe(
          data => {
            this.listaPedidosXFecha = data; // Actualiza la lista de pedidos con los datos recibidos
            if (this.listaPedidosXFecha.length === 0 && isRequestByDate) {
              this.fecha = "";
              alert('No existen registros con la fecha ingresada'); // Muestra una alerta si no hay registros
            }
          },
          err => {
            this.fecha = "";
            console.error(err.error.message); // Muestra el mensaje de error en la consola
            alert(err.error.message); // Muestra el mensaje de error en una alerta
          }
        );
      }
    } else {
      // Si alertConLog es false, solo actualiza la lista sin mostrar alertas ni logs
      if (fecha === undefined || fecha.trim() === '' || fecha === '') {
        this.fecha = "";
      } else {
        // Realiza la solicitud para obtener la lista de pedidos por fecha sin mostrar alertas
        this.pedidosServ.listaPedidosXFecha(fecha).subscribe(
          data => {
            this.listaPedidosXFecha = data; // Actualiza la lista de pedidos con los datos recibidos
            if (this.listaPedidosXFecha.length === 0 && isRequestByDate) {
              this.fecha = "";
              alert('No existen registros con la fecha ingresada'); // Muestra una alerta si no hay registros
            }
          },
          err => {
            this.fecha = "";
            // No se muestran alertas ni logs en caso de error si alertConLog es false
          }
        );
      }
    }
  }


  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene los detalles de los pedidos filtrados por el ID del pedido.
   * 
   * @param idPedido - El ID del pedido para obtener los detalles.
   */
  listaDetallePedidosXIdPedido(idPedido: number): void {
    // Realiza la solicitud para obtener los detalles del pedido por ID
    this.detallePedidServ.listaDetPedXIdPedido(idPedido).subscribe(
      data => {
        this.detallePedidosListxIdPedido = data;
        // Se puede agregar lógica adicional aquí si es necesario
      },
      err => {
        alert("Msj. Serv: " + err.error.message);
        console.log("Msj. Serv: " + err.error.message);
        this.modalitoEditPedid = false;
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene la lista de platos a mostrar.
   */
  listaPlatosAMostrar(): void {
    // Realiza la solicitud para obtener la lista de platos a mostrar
    this.plaMosServ.listaPlatosAMostrar().subscribe(data => this.platosAMostrarList = data);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
 * Obtiene la lista completa de platos desde el servicio.
 */
  listaPlatosComp(): void {
    this.platosServ.listaPlatos().subscribe(data => this.listaPlatosCompleta = data);  // Actualiza la lista completa de platos
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //FUNCIONES MODALES

  /**
   * Alterna la visibilidad del modal para editar detalles del pedido.
   */
  mostrarOcultarModalitoEditDetallePedid() {
    // Cambia el estado de visibilidad del modal de edición de detalles del pedido
    this.modalitoEditPedid = !this.modalitoEditPedid;

    // Ajusta el estado de visibilidad del modal de entrada de edición de detalles del pedido
    // Nota: La comparación actual no tiene efecto; puede que necesite una revisión.
    !this.modalitoInputEditDetPedid == this.modalitoInputEditDetPedid;
  }

  /**
   * Abre el modal para editar un pedido.
   * 
   * @param templateEditarPedido - La plantilla del modal que se utilizará para editar el pedido.
   */
  openModalEditarPedidos(templateEditarPedido: TemplateRef<any>) {
    // Configuración del modal (centrado y tamaño grande)
    const modalConfig = {
      class: 'modal-dialog-centered modal-lg' // Tamaño del modal
    };

    // Abre el modal utilizando la configuración proporcionada
    this.modalEditarPedido = this.modalService.show(templateEditarPedido, { backdrop: 'static', ...modalConfig });
  }

  /**
   * Alterna la visibilidad del modal para editar opciones de detalles del pedido.
   */
  mostrarOcultarModalitoTdEditDetPedid() {
    // Cambia el estado de visibilidad del modal para editar opciones de detalles del pedido
    this.modalitoTdEditDetPedid = !this.modalitoTdEditDetPedid;
  }

  /**
   * Alterna la visibilidad del modal para editar detalles del pedido.
   */
  mostrarOcultarModalitoEditDetPedid() {
    // Cambia el estado de visibilidad del modal para editar detalles del pedido
    this.modalitoInputEditDetPedid = !this.modalitoInputEditDetPedid;
  }

  /**
   * Muestra el modal con la información proporcionada.
   * 
   * @param templateModalInfo - La plantilla del modal que se utilizará para mostrar la información.
   */
  mostrarOcultarModalInfo(templateModalInfo: TemplateRef<any>) {
    // Abre el modal utilizando la plantilla proporcionada
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static' });
  }

  /**
   * Alterna la visibilidad del modal para mostrar pedidos por ID.
   */
  mostrarOcultarModalitoPedidosXId() {
    // Cambia el estado de visibilidad del modal para mostrar pedidos por ID
    this.modalitoPedidosXId = !this.modalitoPedidosXId;
  }

  /**
   * Alterna la visibilidad del modal para mostrar pedidos por fecha.
   */
  mostrarOcultarModalitoPedidosXFecha() {
    // Cambia el estado de visibilidad del modal para mostrar pedidos por fecha
    this.modalitoPedidosXFecha = !this.modalitoPedidosXFecha;
  }

  /**
   * Alterna la visibilidad del modal para agregar detalles del pedido.
   */
  mostrarOcultarModalitoAgrDetPed() {
    // Cambia el estado de visibilidad del modal para agregar detalles del pedido
    this.modalitoAgrDetPed = !this.modalitoAgrDetPed;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //EDITAR PEDIDO
  /////////////////////////
  /**
   * Configura los detalles del pedido a partir de los parámetros proporcionados.
   * 
   * @param idPedido - Identificador único del pedido.
   * @param fecha - Fecha del pedido.
   * @param horaPedido - Hora en que se realizó el pedido.
   * @param nombreCliente - Nombre del cliente que hizo el pedido.
   * @param telefonoCliente - Número de teléfono del cliente.
   * @param direccionCliente - Dirección del cliente.
   * @param localidadCliente - Localidad del cliente.
   * @param listaPlatosDelPedido - Lista de platos incluidos en el pedido (como cadena de texto).
   * @param importeTotalPedido - Importe total del pedido.
   * @param pedidoConfirmado - Indicador de si el pedido ha sido confirmado.
   */
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
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Elimina un pedido basado en el ID proporcionado.
  * 
  * @param idPedido - Identificador del pedido a eliminar.
  */
  eliminarPedido(idPedido: number): void {
    // Confirmación antes de eliminar el pedido
    const confirmacion = window.confirm("El pedido se eliminará. ¿Desea continuar?");

    if (confirmacion) {
      // Llamada al servicio para eliminar el pedido
      this.pedidosServ.borrarPedido(idPedido).subscribe(data => {
        // Actualiza la lista de pedidos por fecha y elimina el pedido de la pantalla
        this.listaDePedidosXFecha(this.fecha, false, false);
        this.pedidosXIdVacio();
        alert("Pedido eliminado.");
        console.log(data);
      }, err => {
        // Manejo de errores en caso de fallo al eliminar el pedido
        this.fecha = "";
        console.log("No se pudo eliminar el pedido", err);
        alert("Error al eliminar el pedido.");
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Edita un pedido existente con los datos actuales.
  */
  editarPedido(): void {
    // Crea una instancia del modelo de pedido con los datos actuales
    const pedid = new PedidosModel(
      this.idPedido,
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente,
      this.platosDelPedido,
      this.listaPlatosDelPedidoCli,
      this.fecha,
      this.horaPedido,
      this.importeTotalPedido,
      this.pedidoConfirmado
    );

    // Llama al servicio para actualizar el pedido
    this.pedidosServ.actualizarPedido(this.idPedido, pedid).subscribe(data => {
      // Actualiza la lista de pedidos por fecha y obtiene el pedido actualizado
      this.listaDePedidosXFecha(this.fecha, false, false);
      this.obtenerPedidoXId(this.idPedido);
      console.log("Msj. Servidor: " + JSON.stringify(data));
      alert("Pedido actualizado");
    },
      err => {
        // Manejo de errores en caso de fallo al actualizar el pedido
        console.log("Msj. Servidor: " + err.error.message);
        alert("Error, no se pudo editar el pedido");
        console.log(err);
      });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Obtiene un pedido completo basado en el ID proporcionado.
  * 
  * @param idPedido - Identificador del pedido a obtener.
  */
  obtenerPedidoXId(idPedido: number): void {
    // Verifica si el ID es válido
    if (idPedido == null || isNaN(idPedido) || idPedido == 0) {
      alert("Ingrese un Id válida");
      this.idPedido = NaN;
    } else {
      // Llama al servicio para obtener los detalles del pedido por ID
      this.pedidosServ.obtenerPedidoXId(idPedido).subscribe(data => {
        this.pedidos = data;
      }, err => {
        // Manejo de errores en caso de fallo al obtener el pedido
        console.log("Msj. Servidor: " + err.error.message);
        alert(err.error.message);
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //EDITAR DETALLE PEDIDO 
  /////////////////////////////

  /**
  * Obtiene los detalles de un pedido específico basado en el ID del detalle del pedido.
  * 
  * @param idDetallePedido - Identificador del detalle del pedido a obtener.
  * @param idPedido - Identificador del pedido asociado.
  * @param idPlatosAMostrar - Identificador del plato a mostrar.
  * @param porcionPlato - Porción del plato.
  * @param nombrePlato - Nombre del plato.
  */
  obtenerDetPedXId(idDetallePedido: number, idPedido: number, porcionPlato: number, nombrePlato: string, idPlato: number) {
    // Solicita confirmación para reemplazar los datos actuales con los nuevos datos de la tabla PLATOS A MOSTRAR
    const msjAdvertencia = window.confirm("El pedido N°: " + this.idPedidoGuardDetPed + " se editara. El/Los dato/s a editar podría/n contener diferencia/s en el/los precios unitario/s, total/es, etc. ¿Desea continuar?");

    if (!msjAdvertencia) {
      this.modalitoEditPedid = false; // Cierra el modal si el usuario cancela la operación
      return;
    }

    // Si el usuario confirma, realiza la solicitud para obtener los detalles del pedido
    this.detallePedidServ.obtDetallePedidoXId(idDetallePedido).subscribe(data => {
      // Configura los detalles del pedido con los datos obtenidos
      this.idDetallePedido = idDetallePedido;
      this.idPedido = idPedido;
      this.porcionPlato = porcionPlato;
      this.nombrePlato = nombrePlato;
      this.idPlato = idPlato;
      console.log("Detalles del pedido obtenidos con idDetallePedido: " + idDetallePedido);
    }, err => {
      // Maneja errores en caso de fallo al obtener los detalles del pedido
      console.log(err);
      alert("Error, no se trajeron los detalles del pedido");
    });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Elimina un detalle de pedido específico basado en el ID del detalle del pedido.
  * 
  * @param idDetallePedido - Identificador del detalle del pedido a eliminar.
  * @param idPedido - Identificador del pedido asociado.
  */
  eliminarDetallePedidos(idDetallePedido: number, idPedido: number): void {
    // Solicita confirmación para eliminar el detalle del pedido
    const confirmacion = window.confirm("El detalle del pedido se eliminará");

    if (confirmacion) {
      // Llama al servicio para eliminar el detalle del pedido
      this.detallePedidServ.eliminarDetallePedido(idDetallePedido, idPedido).subscribe(data => {
        alert("Detalle del pedido eliminado.");
        // Actualiza las listas después de eliminar el detalle
        this.listaDetallePedidosXIdPedido(idPedido);
        this.listaDePedidosXFecha(this.fecha);
        this.obtenerPedidoXId(idPedido);
      }, err => {
        // Maneja errores en caso de fallo al eliminar el detalle del pedido
        console.log("No se pudo eliminar el detalle del pedido", err);
        alert("Error al eliminar el detalle del pedido.");
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Edita un detalle de pedido existente con los datos actuales.
  */
  editarDetallePedidos(): void {
    // Valida los datos antes de proceder con la edición
    if ((this.idPedido == null || this.idPedido == 0 || isNaN(this.idPedido)) ||
      (this.idPlato == null || this.idPlato == 0 || isNaN(this.idPlato)) ||
      (this.porcionPlato == null || this.porcionPlato <= 0 || isNaN(this.porcionPlato))) {

      alert("Seleccione un plato o ingrese porcion/es");
      return; // Sale de la función si la validación falla
    }

    // Valida el rango de porciones permitido
    if (this.porcionPlato > 10) {
      alert("El máximo permitido de porciones es 10");
      return; // Sale de la función si la validación falla
    } else {
      // Crea una instancia del modelo de detalle de pedido con los datos actuales
      const detPed = new DetallePedidosAcotadaModel(this.idPedido, this.idPlato, this.porcionPlato);

      // Llama al servicio para actualizar el detalle del pedido
      this.detallePedidServ.actualizarDetallePedido(this.idDetallePedido, detPed).subscribe(data => {
        // Actualiza las vistas después de editar el detalle
        this.modalitoTdEditDetPedid = true; // Abre modal con lista para editar detalles del pedido
        this.modalitoInputEditDetPedid = false; // Cierra modal con formulario para editar detalles del pedido
        this.listaDetallePedidosXIdPedido(this.idPedido); // Actualiza la lista de detalles de pedidos
        this.listaDePedidosXFecha(this.fecha, false, false); // Actualiza la lista de pedidos por fecha
        this.obtenerPedidoXId(this.idPedido); // Actualiza la búsqueda del pedido por ID
        console.log("Msj servidor: " + JSON.stringify(data));
        alert("Detalles del pedido actualizados.");
      }, err => {
        // Maneja errores en caso de fallo al actualizar el detalle del pedido
        console.log("No se pudo actualizar el detalle del pedido. ", err.error.message);
        alert("Error al actualizar el detalle del pedido. " + err.error.message);
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //AGREGAR DETALLE PEDIDO

  /**
  * Guarda el ID del pedido seleccionado para agregar un nuevo detalle de pedido.
  * 
  * @param idPedido - Identificador del pedido que se utilizará para el nuevo detalle.
  */
  seleccionarIdPedido(idPedido: number) {
    this.idPedidoGuardDetPed = idPedido; // Almacena el ID del pedido seleccionado
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Agrega un nuevo detalle de pedido al pedido seleccionado.
  */
  agregarDetallePedidos() {
    // Actualiza el ID del pedido con el valor guardado
    this.idPedido = this.idPedidoGuardDetPed;

    // Valida los datos ingresados antes de agregar el detalle del pedido
    if (this.idPedido == null || this.idPedido == 0 || isNaN(this.idPedido) ||
      this.idPlato == null || this.idPlato == 0 || isNaN(this.idPlato) ||
      this.porcionPlato == null || this.porcionPlato <= 0 || isNaN(this.porcionPlato)) {

      alert("Seleccione un plato o ingrese porcion/es");
      return; // Sale de la función si la validación falla
    }

    // Valida que la porción esté dentro del rango permitido
    if (this.porcionPlato > 10) {
      alert("El máximo permitido de porciones es 10");
      return; // Sale de la función si la validación falla
    } else {
      // Inicializa un nuevo objeto DetallePedidosAcotadaModel con los datos del pedido    
      this.detPedidAcotada = new DetallePedidosAcotadaModel(this.idPedido, this.idPlato, this.porcionPlato);

      // Llama al servicio para guardar el nuevo detalle del pedido
      this.detallePedidServ.guardarDetPediAcotada(this.detPedidAcotada).subscribe(data => {
        // Actualiza las listas después de agregar el detalle
        this.listaDetallePedidosXIdPedido(this.idPedido); // Actualiza la lista de detalles de pedidos
        this.listaDePedidosXFecha(this.fecha, false, false); // Actualiza la lista de pedidos por fecha
        this.obtenerPedidoXId(this.idPedido); // Actualiza la búsqueda del pedido por ID
        console.log("Msj servidor: " + JSON.stringify(data));
        alert("Detalles del pedido guardados.");
      },
        (err) => {
          // Maneja errores en caso de fallo al guardar el detalle del pedido
          console.log("No se pudo guardar el detalle del pedido. ", err.error.message);
          console.log("zzzz: " + this.idPedidoGuardDetPed.toString())
          alert("Msj Serv: " + err.error.message);
        });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
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
    // Mostrar mensaje de advertencia para la descarga
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo. ¿Desea continuar?');

    // Suscribirse al servicio para obtener la lista completa de pedidos y generar el archivo Excel
    if (msjAdvertenciaDescarga) {
      this.pedidosServ.listaPedidos().subscribe(
        (pedidos) => {
          const liPedComp: string = "listaPedidoHistorica";
          this.generateExcel(pedidos, liPedComp);
          console.log("Lista de pedidos completa recibida")
        },
        (err) => {
          // Manejar el error de la suscripción al servicio
          console.error('Msj. Servidor: :' + err.error.message);
          alert('Msj. Servidor: ' + err.error.message);
          // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
      );
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //FUNCIONES VARIAS

  /**
  * Limpia todos los campos de entrada y variables utilizadas en el formulario.
  */
  limpiarInputs(): void {
    // Limpia las propiedades relacionadas con el cliente
    this.nombreCliente = "";               // Establece el nombre del cliente como cadena vacía
    this.telefonoCliente = "";             // Establece el teléfono del cliente como cadena vacía
    this.direccionCliente = "";            // Establece la dirección del cliente como cadena vacía
    this.localidadCliente = "";            // Establece la localidad del cliente como cadena vacía

    // Limpia la lista de detalles del pedido actual
    this.detallePedidosListxIdPedido = []; // Reinicia la lista de detalles del pedido a un array vacío


    // Restablece el ID del pedido a un valor no definido
    this.idPedido = NaN;                   // Establece el ID del pedido como NaN (Not-a-Number)

    // Limpia las propiedades relacionadas con los platos del pedido
    this.idPlatosAMostrar = NaN;           // Establece el ID del plato a mostrar como NaN
    this.platosDelPedido = "";             // Establece los platos del pedido como cadena vacía
    this.importeTotalPedido = NaN;         // Establece el importe total del pedido como NaN

    // Limpia las propiedades relacionadas con los detalles del pedido
    this.idDetallePedido = NaN;            // Establece el ID del detalle del pedido como NaN
    this.porcionPlato = NaN;               // Establece la porción del plato como NaN

    // Limpia el nombre del plato
    this.nombrePlato = "";                // Establece el nombre del plato como cadena vacía

    // Restablece el ID del pedido guardado para detalles
    this.idPedidoGuardDetPed = NaN;       // Establece el ID del pedido guardado para detalles como NaN

    this.idPlato = NaN;       // Establece el ID del plato guardado para detalles como NaN
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Establece una fecha predeterminada para el campo de fecha del input "buscar por fecha".
  * Esta función se utiliza cuando se busca un pedido por idPedido, ya que activa
  * los validadores de la función listaDePedidosXFecha().
  */
  fechaPredeterminada(): void {
    this.fecha = "1900-01-01"; // Establece la fecha a un valor predeterminado específico
  };

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Genera una lista de pedidos vacía para eliminar los registros actuales de la pantalla.
  * Esta función se utiliza para borrar los pedidos mostrados en la interfaz de usuario.
  */
  listaPedXFechaVacia(): void {
    this.fecha = ""; // Limpia el valor del campo de fecha
    this.listaPedidosXFecha = []; // Establece la lista de pedidos por fecha a un array vacío
  };

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Genera un objeto de tipo PedidosModel vacío para eliminar los registros actuales.
  * Se utiliza para borrar los datos de un pedido específico mostrado en la pantalla.
  * @returns {PedidosModel | null} - Devuelve el objeto de pedido vacío (null) o de tipo PedidosModel vacío.
  */
  pedidosXIdVacio(): PedidosModel | null {
    this.idPedido = NaN; // Elimina el ID del pedido ingresado, estableciéndolo a NaN
    this.pedidos = null; // Establece el objeto de pedidos a null, vaciando su contenido
    return this.pedidos; // Retorna el objeto de pedidos vacío (null)
  };

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Realiza un desplazamiento suave hacia una sección específica del documento.
  * Se utiliza para navegar a una sección de la página mediante un botón.
  * @param {string} sectionId - El ID de la sección a la que se desea desplazar.
  */
  scrollASeccion(sectionId: string): void {
    try {
      const tryScroll = () => {
        const section = document.getElementById(sectionId); // Obtiene el elemento con el ID especificado

        if (!section) {
          console.error(`La sección con ID '${sectionId}' no fue encontrada.`); // Muestra un error si no se encuentra la sección
          return;
        }

        section.scrollIntoView({ behavior: 'smooth' }); // Realiza un desplazamiento suave hacia la sección encontrada
      };

      // Ejecuta la función de desplazamiento después de un retraso de 500 milisegundos
      setTimeout(tryScroll, 600);
    } catch (error) {
      console.error('Error al intentar hacer scroll:', error); // Muestra un error en caso de fallo al intentar hacer scroll
    }
  };

  //✮------------------------------------------------------------------------------------------------------------✮

}
