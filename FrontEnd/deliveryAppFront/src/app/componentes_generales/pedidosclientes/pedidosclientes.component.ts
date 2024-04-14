import { Component } from '@angular/core';
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

  nombreCliente!: string;
  telefonoCliente!: string;
  direccionCliente!: string;
  localidadCliente!: string;
  fecha!: string;
  hora!: string;
  importeTotalPedido!: number;
  pedidoConfirmado: boolean = false;
  precioPlatosAMostrar!: number;

  platosDelPedido!: string;

  idPedido!: number;

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
  

//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  


constructor(private pedidosServ: PedidosService,
            private detallePedidServ: DetallePedidosService,
            private plaMosServ: PlatosAMostrarService
) { };

//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

ngOnInit(): void {
  this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar completa
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

 opCloMod(modalName: string, index: number): void {
  if(this.platosSeleccionadosSioNo[index] == true){
    this.modalitosPlaPed[modalName] = false;
  }

  this.modalitosPlaPed[modalName] = !this.modalitosPlaPed[modalName];
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


    //calcula el total del plato respecto a las porciones ingresadas
    calcularTotalPlato(index: number): void {
      this.totalesPlatosList[index] = this.platosAMostrarList[index].platos.precioPlato * this.porcionesPlatosList[index] || NaN;
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

    this.pedidosServ.guardarPedido(pedido).subscribe(
      (data: PedidosModel) => {
        this.chekBoxSelcPlat = true;
        this.idPedido = data.idPedido;
        alert("Pedido N° " + this.idPedido + " creado");
        console.log("Pedido guardado con idPedido N°: " + this.idPedido + ". Msj servidor: objeto JSON instancia clase Pedidos: " + JSON.stringify(data));
      },
      err => {
        alert("Msj. Servidor: " + err.error.message);
        console.log("Msj. Servidor: " + err.error.message);
      }
    );
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

 //✮------------------------------------------------------------------------------------------------------------✮


//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
//___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

//FUNCIONES VARIAS

    // Evita que se ingresen numeros o porciones manualmente en el input
    handleKeydown(event: KeyboardEvent): void {
      event.preventDefault();
    };
}
