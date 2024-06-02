import { Component, HostListener } from '@angular/core';
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


  //VARIABLES

  nombreCliente: string = "";
  telefonoCliente: string = "";
  direccionCliente: string = "";
  localidadCliente: string = "";
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

  //MODALITOS NGIF

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

  //BOTONES

  //botones para seleccion y edicion de platos 
  butComePed: boolean = true;
  butEdiPlaSel: boolean = false;

  //botones para datos de envio de platos 
  butConfDatEnv: boolean = true;

  //botones "agregar al pedido" y cerrar (texto del button)
  botonesEstado: boolean[] = []; //esto es una "matriz de estado" para los botones que mantiene el estado de cada botón en la lista de forma individual.

  //boton enviar pedido
  botonEnvPedido: boolean = true;

  // SOLO LECTURA U OFFLINE DE INPUTS Y BOTONES

  // solo lectura de inputs y chekbox asociados a la seleccion de platosamostrar
  disabledInpSelPla: boolean = false;
  disabledInDatEnv: boolean = false;

  //MENSAJE PARA ALERT Y CONFIRMACION DE PEDIDO ENVIADO
  mensaje!: String;



  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  


  constructor(private pedidosServ: PedidosService,
    private detallePedidServ: DetallePedidosService,
    private plaMosServ: PlatosAMostrarService
  ) { };

  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

  ngOnInit(): void {
    this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar completa
    this.inicBtnTextAgrePed(); // Inicializa todos los botones "agregar al pedido" en estado de true o con el texto "Agregar al pedido"
  };

  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  


  // FUNCIONES PARA LISTAS
  /////////////////////////


  listaPlatosAMostrar(): void {
    this.plaMosServ.listaPlatosAMostrar().subscribe(
      data => {
        if (data.length > 0) {
          this.platosAMostrarList = data;
          console.log("Lista de platos a mostrar recibida. ");
        }
      },
      err => {
        console.log("Msj. Serv.: " + err.error.message);
        alert("Msj. Serv.: " + err.error.message);
      })
  };

  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  



  // FUNCIONES PARA MODALES
  ///////////////////////// 

  // abre o cierra el pequeño modalito de platosamostrar para seleccionar un plato y las porciones
  opCloModSelecPlaMos(modalName: string, index: number): void {

    if (this.platosSeleccionadosSioNo[index] == true) {
      this.modalitosPlaPed[modalName] = false;
    };

    this.modalitosPlaPed[modalName] = !this.modalitosPlaPed[modalName];
  };

  //muestra el modal para ingreso de datos de envio, oculto al iniciar el componente
  mostrarModalitoNgIfDatEnv(): void {
    this.modalitoNgIfDatEnv = true;
  };

  //muestra el modal para ingreso de datos de envio, oculto al iniciar el componente
  mostrarModalitoNgIfConfYEnvPed(): void {
    this.modalitoNgIfConfYEnvPed = true;
  };

  //abre el modalitoNgIfAlert
  mostrarModalitoNgIfAlert(): void {
    this.modalitoNgIfAlert = true;
  };

  //cierra el modalitoNgIfAlert
  cerrarModalitoNgIfAlert(): void {
    this.modalitoNgIfAlert = false;
  };

  //abre el modalitoNgIfConf
  mostrarModalitoNgIfConf(): void {
    this.modalitoNgIfConf = true;
  };

  //cierra el modalitoNgIfConf
  cerrarModalitoNgIfConf(): void {
    this.modalitoNgIfConf = false;
  };



  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

  // FUNCIONES PARA MENSAJES (ALERT, CONFIRMACION DE PEDIDOS)
  ///////////////////////// 

  mostrarMensaje(mensaje: String): void {
    this.mensaje = mensaje;
  };

  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

  // FUNCIONES PARA BOTONES
  ///////////////////////// 

  //muestra el texto "agregar al pedido" en su button al iniciar el componente
  inicBtnTextAgrePed(): void {
    this.platosAMostrarList.forEach(() => {
      this.botonesEstado.push(true);
    });
  };

  //cambiar texto del boton "Agregar al pedido" por "Cerrar"  
  cambiarTextoBtn(index: number): void {
    if (this.platosSeleccionadosSioNo[index] == true) {
      this.botonesEstado[index] = false;
    };
    // Cambia el estado del botón correspondiente al índice dado
    this.botonesEstado[index] = !this.botonesEstado[index];
  };

  //muestra el boton botonEnvPedido
  mostrarBotonEnvPedido(): void {
    this.botonEnvPedido = true;
  };

  //oculta el boton botonEnvPedido
  ocultarBotonEnvPedido(): void {
    this.botonEnvPedido = false;
  };


  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

  // FUNCIONES PARA DEJAR OFFLINE INPUT HTML
  ///////////////////////////////////////////

  disabledSelcPla(): void {
    this.disabledInpSelPla = true
  };

  enabledSelcPla(): void {
    this.disabledInpSelPla = false;
  };

  disabledInputDatEnv(): void {
    this.disabledInDatEnv = true;
  };

  enabledInputDatEnv(): void {
    this.disabledInDatEnv = false;
  };



  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

  //SELECCION DE PLATOS A MOSTRAR PARA EL PEDIDO

  //selecciona el chekbox al utilizar la flecha aumento o decremento del input
  seleccionarChekBoxSiHayPorcionPla(index: number): void {

    if (!this.porcionesPlatosList[index]) {
      this.porcionesPlatosList[index] = 1; // Establece el valor inicial solo si no hay ninguna porción ingresada
      this.platosSeleccionadosSioNo[index] = false;

    }
    this.platosSeleccionadosSioNo[index] = true;  // Establece el checkbox como seleccionado
    this.calcularTotalPlato(index);
    //console.log("porcionesPlatosList: " + this.porcionesPlatosList);
    //console.log("chekBoxSelcPlat: " + this.chekBoxSelcPlat);
    //console.log("inputReadOnlyPorcionPlato: " + this.inputReadOnlyPorcionPlato);
  };


  //✮------------------------------------------------------------------------------------------------------------✮
  //CALCULAR TOTAL PLATOSAMOSTRAR Y TOTAL PEDIDO. ELIMINAR PEDIDO Y DETALLES PEDIDOS SI HAY DIFERENCIAS EN EL TOTAL DEL FRONT Y BACK

  //calcula el total del plato respecto a las porciones ingresadas
  calcularTotalPlato(index: number): void {
    this.totalesPlatosList[index] = this.platosAMostrarList[index].platos.precioPlato * this.porcionesPlatosList[index] || NaN;
  };

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


  //Elimina un pedido y detalle pedidos si hay diferencias entre el total calculado por el front y el calculado por el back
  obtenerPedidoXIdYEliminar(): any {

    this.pedidosServ.obtenerPedidoXId(this.idPedido).subscribe(data => {
      //console.log("Pedido obtenido:", data);
      //console.log("idPedido del front: " + this.calcularTotalPedido());
      //console.log("idPedido del back: ", data.importeTotalPedido);
      //console.log("idPedido formato: " + this.idPedido);      
      //console.log("calcularTotalPedido(): " + this.calcularTotalPedido());
      //console.log("data.importeTotalPedido: " +  JSON.stringify(data.importeTotalPedido));       

      if (this.calcularTotalPedido() != data.importeTotalPedido) {

        this.detallePedidServ.eliminarVariosDetPedXIdPedido(this.idPedido).subscribe(data => {

          console.log("el detalle del pedido con idPedido n°: " + this.idPedido + " ha sido eliminado por diferencias entre el importe del total del pedido calculado por el front y el calculado por el backend")
        }
        )

        this.pedidosServ.borrarPedido(this.idPedido).subscribe(data => {

          console.log("el idPedido n°: " + this.idPedido + " ha sido eliminado por diferencias entre el importe del total del pedido calculado por el front y el calculado por el backend")
        }
        )
      };

    });
  };



  //✮------------------------------------------------------------------------------------------------------------✮

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
  //✮------------------------------------------------------------------------------------------------------------✮

  //cambia el chekbox del modal agregar detalle pedido a true o false
  chekBoxSeleccion(index: number): void {
    this.platosSeleccionadosSioNo[index] = !this.platosSeleccionadosSioNo[index];
  };

  //✮------------------------------------------------------------------------------------------------------------✮

  getListaDatosClienteAntesEnvio(): void {
    const listaDatos: string[] = [
      `Nombre Cliente: ${this.nombreCliente}`,
      `Teléfono Cliente: ${this.telefonoCliente}`,
      `Dirección: ${this.direccionCliente}`,
      `Localidad: ${this.localidadCliente}`
    ];
  };

  //✮------------------------------------------------------------------------------------------------------------✮

  agregarPedidoYDetPed(): void {

    //crea una lista con los platosAMostrar seleccionados mediante el chekbox
    const seleccionados = this.platosAMostrarList
      .filter((_, index) => this.platosSeleccionadosSioNo[index]);
    const porcionesNoIngresadas = this.porcionesPlatosList.length === 0;
    const totalesPlatosIncluyeCero = this.totalesPlatosList.includes(0);
    const unPlatoSeleccionado = this.platosSeleccionadosSioNo.some(elemento => elemento === true);


    // crea un objeto del tipo PedidosModel con los datos del cliente o de envio
    const pedido = new PedidosModel(
      this.idPedido,
      this.nombreCliente,
      this.telefonoCliente,
      this.direccionCliente,
      this.localidadCliente,
      this.platosDelPedido,
      this.fecha,
      this.hora,
      this.importeTotalPedido,
      this.pedidoConfirmado
    );

   //validador para datos del cliente
    if (this.nombreCliente == "" || 
      this.telefonoCliente == "" || 
      this.direccionCliente == "" || 
      this.localidadCliente == ""  ){
      
      this.mostrarModalitoNgIfAlert();  
      this.mostrarMensaje("El nombre del cliente, direccion, localidad ó teléfono no se han completado. Por favor completelos para continuar el pedido. ");
      //alert("El nombre del cliente, direccion, localidad ó teléfono no se han completado. Por favor completelos para continuar el pedido. ");
      return;
    };


    //validadores para seleccion de platosAMostrar:

    //validador sin seleccion alguna de chekbox
    if (seleccionados.length === 0) {
      //alert("Selecciona al menos un plato");
      this.mostrarModalitoNgIfAlert();
      this.mostrarMensaje("Selecciona al menos un plato para continuar con el pedido");

      return;
    };

    //validador para seleccion de su chekbox y no ingreso de porciones
    if (porcionesNoIngresadas) {
      //console.log(`Valor ingresado en el input: ${porcionesNoIngresadas}`);
      //alert("Ingresa porcion/es");
      this.mostrarModalitoNgIfAlert();
      this.mostrarMensaje("Ingresa porcion/es");
      return;
    };

    //validador para seleccion de 2 o mas platos, uno o mas (menos q el total seleccionado) sin porciones 
    if (totalesPlatosIncluyeCero && unPlatoSeleccionado === true) {
      console.log("Ingresa porciones a todos los platos seleccionados: " + totalesPlatosIncluyeCero);
      //console.log("Lista totalesPlatos: " + this.totalesPlatosList);
      //console.log("un plato seleccionado minimo?: " + unPlatoSeleccionado);
      //alert("Ingresa porciones a todos los platos seleccionados");
      this.mostrarMensaje("Ingresa porciones a todos los platos seleccionados");
      return;
    };

    this.pedidosServ.guardarPedido(pedido).subscribe(
      (data: PedidosModel) => {
        this.chekBoxSelcPlat = true;
        this.idPedido = data.idPedido;
        //alert("Pedido N° " + this.idPedido + " creado");
        this.cerrarModalitoNgIfAlert(); // oculta el modalitoNgIfAlert
        this.mostrarModalitoNgIfConf(); // abre el modalitoNgIfConf
        this.mostrarMensaje("Pedido N° " + this.idPedido + " creado");// muestra el mensaje de pedido n° XXX creado
        console.log("Pedido guardado con idPedido N°: " + this.idPedido + ". Msj servidor: objeto JSON instancia clase Pedidos: " + JSON.stringify(data));

        //envia la lista de platosAMostrar una vez que se genere el pedido o idPedido
        // se agrega la funcion aca y no en el boton para que el idPedido necesario para guardar 
        //la lista de platosAMostrar vuelva del servidor (el servidor devuelve el idPedido con "data")
        this.enviarDetallePedidos();

        //oculta el boton botonEnvPedido
        this.ocultarBotonEnvPedido();

        //deja offline o solo lectura los input para selecciond de platosamostrar
        this.disabledSelcPla();

        //deja offline o solo lectura los input para datos del cliente
        this.disabledInputDatEnv();

      },
      err => {
        //alert("Msj. Servidor: " + err.error.message);
        this.mostrarModalitoNgIfAlert();
        this.mostrarMensaje(err.error.message);
        console.log("Msj. Servidor: " + err.error.message);
      }
    );
  };


  //✮------------------------------------------------------------------------------------------------------------✮


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

          //this.mensajePedEnviadoDB = " creado"; // agrega enviado a la etiqueta <p class="d-flex flex-row justify-content-center h5">Pedido N° {{idPedido}}: {{mensajePedEnviadoDB}}</p>
          this.obtenerPedidoXIdYEliminar(); //elimina el pedido y sus detalles pedidos asociados por idPedido de sus respectivas tablas al calcular diferencias entre el total del pedido calculado por el front y por el back
          console.log('Detalles/platos del Pedido con idPedido N°: ' + this.idPedido + ' guardados correctamente. Msj servidor: ', data);
          //alert("Pedido N°: " + this.idPedido + " enviado");
        },
        err => {
          // Manejar errores si es necesario

          console.log("elementosSeleccionaods: " + JSON.stringify(elementosSeleccionados))

          console.log("Msj. Servidor: " + JSON.stringify(err.error.message));
          alert("Msj. Servidor: " + err.error.message);
        }
      );
    };
  };

  //✮------------------------------------------------------------------------------------------------------------✮

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


  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

  //FUNCIONES VARIAS

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

  //para ejecutar funcione al hacer scroll en pc o en pantallas tactiles. La annotation @HostListener capta el evento scroll
  //@HostListener('window:scroll', ['$event'])
  //cerrarModalitoNgIfAlertConfScroll(event: Event): void {
  //  this.cerrarModalitoNgIfAlert();
  //};


}
