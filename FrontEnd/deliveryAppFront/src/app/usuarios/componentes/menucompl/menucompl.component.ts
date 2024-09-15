import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuCompletoModel } from 'src/app/usuarios/modelos/menu-completo-model';
import { TipoPlato } from 'src/app/usuarios/modelos/tipo-plato';
import { MenuCompletoServiceService } from 'src/app/usuarios/servicios/menu-completo-service.service';
import { TiposPlatosService } from 'src/app/usuarios/servicios/tipos-platos.service';
import { Cartelera } from '../../modelos/cartelera';
import { CarteleraService } from '../../servicios/cartelera.service';
import * as XLSX from 'xlsx';
import { CarteleraSecundariaService } from '../../servicios/cartelera-secundaria.service';
import { CarteleraSecundaria } from '../../modelos/cartelera-secundaria';




@Component({
  selector: 'app-menucompl',
  templateUrl: './menucompl.component.html',
  styleUrls: ['./menucompl.component.css']
})
export class MenucomplComponent {


  //MODAL MOSTRAR LISTA
  /////////////////////////////

  modalMenuComp!: BsModalRef;

  //MODAL AGREGAR PLATO
  /////////////////////////////

  modalAgregarPla!: BsModalRef;

  //MODAL EDITAR PLATO
  /////////////////////////////

  modalEditarMenuComp!: BsModalRef;
  @ViewChild('templateEditarMenuComp') templateEditarMenuComp!: TemplateRef<any>; // Declaración usando @ViewChild


  //MODAL AGREGAR TIPO DE PLATO
  //////////////////////////////

  modalAgregarTipoPlato!: BsModalRef;

  //MODAL AGREGAR TIPO DE PLATO
  //////////////////////////////

  modalEditarTipoPlato!: BsModalRef;

  //MODAL AGREGAR TARJETA
  ///////////////////////

  modalEditarPaAgregarCard!: BsModalRef;



  //MODAL VER LISTA COMPLETA DE PLATOS
  ////////////////////////////////////
  modalListaComPlatos!: BsModalRef;

  //MODAL EDITAR LISTA COMPLETA DE PLATOS
  ////////////////////////////////////
  modalEditarListCompPlatos!: BsModalRef;

  //MODALITO NGIF (NO BSMODALREF) PARA MOSTRAR COLORES E ICONOS
  //////////////////////////////////////////////////////////////
  mostrarModalitoColores: Boolean = false;
  mostrarModalitoIconos: Boolean = false;

  //MODAL VER INFORMACION DE USO
  ////////////////////////////////////
  modalInfo!: BsModalRef;


  //LISTAS
  ///////////////////////////////////
  listaIconosTipoPlato: String[] = [];
  listaColorTipoPlato: String[] = [];


  menuCompModel: MenuCompletoModel[] = [];
  tiposPlatosModel: TipoPlato[] = [];
  tiposPlatosFiltrados: TipoPlato[] = [];



  //CREAR PLATO Y EDITAR PLATO
  ///////////////////////////////////

  menuCompMod!: MenuCompletoModel;
  idPlato!: number;
  tipoPlato!: TipoPlato;
  nombrePlato!: string;
  precioPlato!: any;
  idTipoPla!: number;
  imgPlato!: string;


  //CREAR Y EDITAR TIPO DE PLATO
  ///////////////////////////////
  idTipoPlato!: number;
  nombreTipoPlato!: string;
  iconoTipoPlato!: string;
  iconoTipoPlatoParaInput!: string;
  colorCardTipoPlato!: string;
  colorCardTipoPlatoParaInput!: string;

  //EDITAR PROMO/NOVEDAD/CARTELERA
  /////////////////////////////////

  idPromo!: number;
  imgParaCelOPc!: string;
  tituloPromo!: string;
  textoPromo!: string;
  colorTexto!: string;
  urlImagenPromo!: string;
  fechaPromo!: string;



  constructor(private modalService: BsModalService,
    private menucomServ: MenuCompletoServiceService,
    private tipoPlaServ: TiposPlatosService,
    private cartServ: CarteleraService,
    private cartServSec: CarteleraSecundariaService

  ) { }

  ngOnInit(): void {

    this.listaFiltradaTipPla(); //genera las card pequeña con la lista filtrada de tipos de platos que esten en la entity platos
    this.listTipPla(); //genera la card grande con la lista completa de tipos de platos
    this.listaPlatosCompleta();
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  //MODAL MOSTRAR LISTA
  //////////////////////

  openModalMenuComp(templateMenuComp: TemplateRef<any>) {
    const modalConfig = {
      class: 'modal-dialog-centered modal-xl' // 'modal-lg' por 'modal-xl' para un modal más ancho
    };
    this.modalMenuComp = this.modalService.show(templateMenuComp, { backdrop: 'static', ...modalConfig });
  };
  //✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  //  ⋅•⋅⊰∙∘☽= MODALES =☾∘∙⊱⋅•⋅   
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  /**
  * Abre un modal para agregar un nuevo plato.
  * 
  * @param templateAgregarPlato - La plantilla del modal para agregar el plato.
  * @param idTipoPlato - El ID del tipo de plato que se va a agregar.
  */
  openModalAgregarPl(templateAgregarPlato: TemplateRef<any>, idTipoPlato: number) {
    this.idTipoPla = idTipoPlato;
    // Muestra el modal para agregar un plato con un fondo estático.
    this.modalAgregarPla = this.modalService.show(templateAgregarPlato, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
   * Abre un modal para editar un plato existente.
   * 
   * @param templateEditarMenuComp - La plantilla del modal para editar el plato.
   */
  openModalEditarMenuComp(templateEditarMenuComp: TemplateRef<any>) {
    // Muestra el modal para editar un plato con un fondo estático.
    this.modalEditarMenuComp = this.modalService.show(templateEditarMenuComp, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
   * Abre un modal para agregar un nuevo tipo de plato.
   * 
   * @param templateAgregarTipoPlato - La plantilla del modal para agregar el tipo de plato.
   */
  openModalAgregarTipoPlato(templateAgregarTipoPlato: TemplateRef<any>) {
    // Muestra el modal para agregar un tipo de plato con un fondo estático.
    this.modalAgregarTipoPlato = this.modalService.show(templateAgregarTipoPlato, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
   * Abre un modal para editar un tipo de plato existente.
   * 
   * @param templateEditarTipoPlato - La plantilla del modal para editar el tipo de plato.
   */
  openModalEditarTipoPlato(templateEditarTipoPlato: TemplateRef<any>) {
    // Muestra el modal para editar un tipo de plato con un fondo estático.
    this.modalEditarTipoPlato = this.modalService.show(templateEditarTipoPlato, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
   * Abre un modal para agregar o editar una tarjeta.
   * 
   * @param templateEditarPaAgregarCard - La plantilla del modal para agregar o editar la tarjeta.
   */
  openModalEditarcard(templateEditarPaAgregarCard: TemplateRef<any>) {
    // Muestra el modal para agregar o editar una tarjeta con un fondo estático.
    this.modalEditarPaAgregarCard = this.modalService.show(templateEditarPaAgregarCard, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
   * Abre un modal para ver la lista completa de platos.
   * 
   * @param templateListaComPlato - La plantilla del modal para ver la lista completa de platos.
   */
  openModalListaComPlatos(templateListaComPlato: TemplateRef<any>) {
    const modalConfig = {
      class: 'modal-dialog-centered modal-xl' // Ajusta el modal a un tamaño más ancho.
    };
    // Muestra el modal para ver la lista completa de platos con un fondo estático y configuración de tamaño.
    this.modalListaComPlatos = this.modalService.show(templateListaComPlato, { backdrop: 'static', ...modalConfig });
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
   * Abre un modal para editar la lista completa de platos.
   * 
   * @param templateEditarListCompPlatos - La plantilla del modal para editar la lista completa de platos.
   */
  openModalEditarListCompPlatos(templateEditarListCompPlatos: TemplateRef<any>) {
    // Muestra el modal para editar la lista completa de platos con un fondo estático.
    this.modalEditarListCompPlatos = this.modalService.show(templateEditarListCompPlatos, { backdrop: 'static' });
    
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
   * Abre un modal para mostrar información general.
   * 
   * @param templateModalInfo - La plantilla del modal para mostrar la información.
   */
  openModalInfo(templateModalInfo: TemplateRef<any>) {
    // Muestra el modal para mostrar información general con un fondo estático.
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  //⋅•⋅⊰∙∘☽= LISTAS =☾∘∙⊱⋅•⋅   
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈


  /**
  * Obtiene la lista de iconos de tipos de plato y la asigna a `listaIconosTipoPlato`.
  */
  listaIconos(): void {
    this.tipoPlaServ.listIconosTipPlat().subscribe(data => this.listaIconosTipoPlato = data);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene la lista de colores de tipos de plato y la asigna a `listaColorTipoPlato`.
   */
  listaColores(): void {
    this.tipoPlaServ.listColoresTipPlat().subscribe(data => this.listaColorTipoPlato = data);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra la lista de platos para un tipo específico de plato, basado en `idTipoPlato`.
   * 
   * @param idTipoPlato - El ID del tipo de plato para el que se deben listar los platos.
   */
  mostrarListaTipoPlato(idTipoPlato: number): void {
    this.menucomServ.listaTipoPlatos(idTipoPlato).subscribe(data => this.menuCompModel = data);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene la lista completa de tipos de platos y la asigna a `tiposPlatosModel`.
   */
  listTipPla(): void {
    this.tipoPlaServ.listTiposPlatos().subscribe(data => this.tiposPlatosModel = data);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene la lista filtrada de tipos de platos que están en la entidad de platos y la asigna a `tiposPlatosFiltrados`.
   */
  listaFiltradaTipPla(): void {
    this.tipoPlaServ.listFiltradaTiposPlatos().subscribe(data => this.tiposPlatosFiltrados = data);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Obtiene la lista completa de platos y la asigna a `menuCompModel`.
   */
  listaPlatosCompleta(): void {
    this.menucomServ.listaPlatos().subscribe(data => this.menuCompModel = data);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  //⋅•⋅⊰∙∘☽= PLATOS =☾∘∙⊱⋅•⋅   
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈

  /**
  * Crea un nuevo plato con la información proporcionada.
  * 
  * Verifica que todos los campos requeridos estén completos y sean válidos:
  * - `idTipoPla` debe ser un número válido y mayor que cero.
  * - `nombrePlato` no debe estar vacío.
  * - `precioPlato` debe ser un número válido mayor que cero.
  * - `imgPlato` debe contener una URL de imagen válida.
  * 
  * Luego, verifica si ya existe un plato con el mismo nombre en la base de datos. Si no existe, guarda el nuevo plato.
  */
  onCreate(): void {
    // Verifica si `idTipoPla` es válido
    if (this.idTipoPla == 0 || this.idTipoPla == undefined || isNaN(this.idTipoPla)) {
      alert("Seleccione un tipo de plato");
      return;
    }

    // Verifica si `nombrePlato` está vacío
    if (this.nombrePlato == "" || this.nombrePlato == undefined) {
      alert("Ingrese el nombre del plato");
      return;
    }

    // Verifica si `precioPlato` es válido
    if (this.precioPlato == 0 || this.precioPlato == undefined || isNaN(this.precioPlato)) {
      alert("Ingrese un precio para el plato");
      return;
    }

    // Verifica si `imgPlato` está vacío
    if (this.imgPlato == "" || this.imgPlato == undefined) {
      alert("Ingrese una URL a una imagen para el plato con el siguiente formato: https://images.unsplash.com/photo");
      return;
    }

    // Verifica si ya existe un plato con el mismo nombre
    this.menucomServ.existeXNombre(this.nombrePlato).subscribe(
      (existePlato: boolean) => {
        if (existePlato) {
          console.log("El plato con nombre: " + this.nombrePlato + " ya existe en la base de datos");
          alert("El plato con nombre: **" + this.nombrePlato + "** ya existe en la base de datos");
        } else {
          const tipoPlato = new TipoPlato(this.idTipoPla, "", "", "");

          const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato, this.imgPlato);
          // Guarda el nuevo plato
          this.menucomServ.guardarPlato(menuCompMod).subscribe(
            data => {
              alert("Plato guardado");
            },
            err => {
              alert("Msj. Servidor: " + err.error.message);
              console.log("Msj. Servidor: " + err.error.message);
            }
          );
        }
      },
      err => {
        alert("Msj. Servidor: " + err.error.message);
        console.log("Msj. Servidor: " + err.error.message);
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮ 
  /**
  * Elimina un plato específico dado su ID y el ID del tipo de plato.
  * 
  * Realiza una solicitud para borrar el plato con el `idPlato` proporcionado y el `idTipoPla` asociado.
  * - Si el plato se elimina con éxito, muestra un mensaje de confirmación.
  * - Luego, actualiza la lista de platos y la lista filtrada para reflejar el cambio.
  * - Si no hay más registros después de la eliminación, se vacía la lista de platos.
  * 
  * @param idPlato - El ID del plato a eliminar.
  * @param idTipoPla - El ID del tipo de plato al que pertenece el plato.
  */
  borrarPlato(idPlato: number, idTipoPla: number): void {
    // Muestra los IDs en la consola para depuración
    console.log("idPlato: " + idPlato + " idTipoPlato: " + idTipoPla);

    // Verifica si `idPlato` no está indefinido
    if (idPlato != undefined) {
      // Llama al servicio para eliminar el plato
      this.menucomServ.borrarPlato(idPlato, idTipoPla).subscribe(data => {
        // Muestra un mensaje de éxito en la consola
        console.log("El plato con idPlato N°: " + "**" + idPlato + "**" + " ha sido eliminado. " + "Msj. Servidor: " + JSON.stringify(data));
        // Muestra un mensaje de éxito al usuario
        alert("El plato con idPlato N°: " + "**" + idPlato + "**" + " ha sido eliminado.");

        // Refresca la lista de platos o vacía la lista si no hay más registros
        if (this.menuCompModel.length > 1) {
          this.mostrarListaTipoPlato(idTipoPla);
        } else {
          this.menuCompModel = []; // Lista vacía si no hay más registros
        }

        // Refresca la lista filtrada que genera las tarjetas pequeñas
        this.listaFiltradaTipPla();
      }, err => {
        // Muestra un mensaje de error en la consola
        console.log("Msj. Serv.: " + err.error.message);
        // Muestra un mensaje de error al usuario
        alert("Msj. Serv.: " + err.error.message);
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
  * Muestra un mensaje de advertencia antes de proceder con la eliminación de un plato.
  * 
  * Si el usuario confirma la eliminación, se llama a la función `borrarPlato` para eliminar el plato.
  * 
  * @param idPlato - El ID del plato a eliminar.
  * @param idTipoPla - El ID del tipo de plato al que pertenece el plato.
  */
  borrarPlaMsjEli(idPlato: number, idTipoPla: number): void {
    // Muestra un cuadro de diálogo de confirmación
    const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
    if (msjAdvertenciaElim) {
      // Si el usuario confirma, se llama a la función para eliminar el plato
      this.borrarPlato(idPlato, idTipoPla);
    } else {
      // No hace nada si el usuario cancela
      ""
    };
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Elimina un plato de la lista completa dado su ID.
   * 
   * Realiza una solicitud para borrar el plato con el `idPlato` proporcionado.
   * - Si la eliminación es exitosa, muestra un mensaje de confirmación y actualiza las listas filtradas y completas.
   * 
   * @param idPlato - El ID del plato a eliminar.
   */
  borrarPlatoLisComp(idPlato: number): void {
    // Verifica si `idPlato` no está indefinido
    if (idPlato != undefined) {
      // Llama al servicio para eliminar el plato de la lista completa
      this.menucomServ.borrarPlatoLisCompleta(idPlato).subscribe(data => {
        // Muestra un mensaje de éxito en la consola
        console.log("El plato con idPlato N°: " + "** " + idPlato + " **" + " ha sido eliminado. Msj. Serv: " + JSON.stringify(data));
        // Muestra un mensaje de éxito al usuario
        alert("El plato con idPlato N°: " + "** " + idPlato + " **" + " ha sido eliminado.");
        // Refresca la lista filtrada y la lista completa
        this.listaFiltradaTipPla();
        this.listaPlatosCompleta();
      }, err => {
        // Muestra un mensaje de error en la consola
        console.log("Msj. Serv.: " + err.error.message);
        // Muestra un mensaje de error al usuario
        alert("Msj. Serv.: " + err.error.message);
      });
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra un mensaje de advertencia antes de proceder con la eliminación de un plato de la lista completa.
   * 
   * Si el usuario confirma la eliminación, se llama a la función `borrarPlatoLisComp` para eliminar el plato.
   * 
   * @param idPlato - El ID del plato a eliminar.
   */
  borrarPlaLisComMsjEli(idPlato: number): void {
    // Muestra un cuadro de diálogo de confirmación
    const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
    if (msjAdvertenciaElim) {
      // Si el usuario confirma, se llama a la función para eliminar el plato de la lista completa
      this.borrarPlatoLisComp(idPlato);
    } else {
      // No hace nada si el usuario cancela
      ""
    };
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  // ⋅•⋅⊰∙∘☽= EDITAR PLATOS =☾∘∙⊱⋅•⋅   
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓  𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈

  /**
   * Asigna los valores proporcionados a las propiedades del plato en la instancia actual.
   * 
   * Esta función se utiliza para actualizar los detalles de un plato en la instancia actual con los valores
   * proporcionados, como el ID del plato, el nombre, el precio, el ID del tipo de plato y la URL de la imagen.
   * 
   * @param idPlato - El ID del plato.
   * @param nombrePlato - El nombre del plato.
   * @param precioPlato - El precio del plato.
   * @param idTipoPlato - El ID del tipo de plato al que pertenece el plato.
   * @param imgPlato - La URL de la imagen del plato.
   */
  obtenerPlaXId(idPlato: number, nombrePlato: string, precioPlato: number, idTipoPlato: number, imgPlato: string): void {
    // Asigna el ID del plato a la propiedad `idPlato`
    this.idPlato = idPlato;
    // Asigna el nombre del plato a la propiedad `nombrePlato`
    this.nombrePlato = nombrePlato;
    // Asigna el precio del plato a la propiedad `precioPlato`
    this.precioPlato = precioPlato;
    // Asigna el ID del tipo de plato a la propiedad `idTipoPla`
    this.idTipoPla = idTipoPlato;
    // Asigna la URL de la imagen del plato a la propiedad `imgPlato`
    this.imgPlato = imgPlato;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Valida y edita un plato en el sistema.
   * 
   * La función realiza una serie de validaciones sobre las propiedades del plato y, si todas son válidas,
   * solicita confirmación al usuario antes de proceder con la edición del plato en el sistema. Si el usuario
   * confirma, se envía una solicitud para actualizar el plato con los nuevos datos.
   * 
   * @returns {void}
   */
  editarPlato(): void {

    // Verifica si el ID del plato es válido
    if (this.idPlato == 0 || this.idPlato === undefined || isNaN(this.idPlato)) {
      alert("No se ha cargado un idPlato, informar al desarrollador");
      console.log("No se ha cargado un idPlato, informar al desarrollador");
      return;
    }

    // Verifica si el tipo de plato es válido
    if (this.idTipoPla == 0 || this.idTipoPla === undefined || isNaN(this.idTipoPla)) {
      alert("Seleccione un tipo de plato");
      return;
    }

    // Verifica si el nombre del plato es válido
    if (this.nombrePlato === "" || this.nombrePlato === undefined) {
      alert("Ingrese el nombre del plato");
      return;
    }

    // Verifica si el precio del plato es válido
    if (this.precioPlato == 0 || this.precioPlato === undefined || isNaN(this.precioPlato)) {
      alert("Ingrese un precio para el plato");
      return;
    }

    // Verifica si la URL de la imagen del plato es válida
    if (this.imgPlato === "" || this.imgPlato === undefined) {
      alert("Ingrese una URL a una imagen para el plato con el siguiente formato: https://images.unsplash.com/photo");
      return;
    }

    // Solicita confirmación al usuario antes de proceder con la edición
    const msjAdvertencia = window.confirm('Editar un plato modificará los registros asociados de la tabla PLATOS A MOSTRAR. ¿Desea continuar?');
    if (msjAdvertencia) {

      // Crea un objeto TipoPlato con el ID del tipo de plato
      const tipoPlato = new TipoPlato(this.idTipoPla, "", "", "");

      // Crea un objeto MenuCompletoModel con los datos del plato
      const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato, this.imgPlato);

      // Llama al servicio para actualizar el plato
      this.menucomServ.actualizarPlato(this.idPlato, menuCompMod).subscribe(data => {
        this.listaPlatosCompleta(); // Refresca la lista de platos
        alert("Plato editado");
      }, err => {
        alert("No se editó el plato");
      });
    }
  }


  //✮------------------------------------------------------------------------------------------------------------✮
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  //  ⋅•⋅⊰∙∘☽= TIPOS DE PLATOS =☾∘∙⊱⋅•⋅   
  //◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈


  /**
   * Valida y crea un nuevo tipo de plato en el sistema.
   * 
   * La función realiza una serie de validaciones sobre las propiedades del tipo de plato y, si todas son válidas,
   * verifica si el nombre del tipo de plato ya existe en la base de datos. Si no existe, guarda el nuevo tipo de plato
   * y actualiza la lista de tipos de platos.
   * 
   * @returns {void}
   */
  onCreateTipoPla(): void {

    // Verifica si el nombre del tipo de plato es válido
    if (this.nombreTipoPlato === "" || this.nombreTipoPlato === undefined) {
      alert("Ingrese un nombre para el tipo de plato");
      return;
    }

    // Verifica si al menos uno de los iconos es válido
    if ((this.iconoTipoPlato === undefined || this.iconoTipoPlato === '') &&
      (this.iconoTipoPlatoParaInput === undefined || this.iconoTipoPlatoParaInput === '')) {
      alert("Debe ingresar un icono para el tipo de plato");
      return;
    }

    // Verifica si al menos uno de los colores es válido
    if ((this.colorCardTipoPlato === undefined || this.colorCardTipoPlato === '') &&
      (this.colorCardTipoPlatoParaInput === undefined || this.colorCardTipoPlatoParaInput === '')) {
      alert("Debe ingresar un color para el tipo de plato");
      return;
    }

    // Verifica si el nombre del tipo de plato ya existe en la base de datos
    this.tipoPlaServ.existeXNombre(this.nombreTipoPlato).subscribe(
      (existePlato: boolean) => {
        if (existePlato) {
          alert("El nombre del tipo plato: " + "**" + this.nombreTipoPlato + "**" + " ya existe en la base de datos. No se aceptan registros duplicados.");
          console.log("El nombre del tipo plato: " + "**" + this.nombreTipoPlato + "**" + " ya existe en la base de datos. No se aceptan registros duplicados. ");
        } else {
          // Crea un objeto TipoPlato con los datos proporcionados
          const tipoPla = new TipoPlato(this.idTipoPlato, this.nombreTipoPlato, this.iconoTipoPlato || this.iconoTipoPlatoParaInput, this.colorCardTipoPlato || this.colorCardTipoPlatoParaInput);

          // Llama al servicio para guardar el nuevo tipo de plato
          this.tipoPlaServ.guardarTipoPlato(tipoPla).subscribe(
            data => {
              console.log("Msj. Servidor: " + data.mensaje);
              alert("Tipo de plato guardado");
              this.listTipPla(); // Actualiza la lista de tipos de platos
            },
            err => {
              console.log("Msj. Servidor: " + err.error.message);
              alert("Msj. Servidor: " + err.error.message);
            }
          );
        }
      },
      err => {
        alert("Campo vacío o error al intentar guardar");
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Elimina un tipo de plato dado su ID sin mostrar advertencia previa.
   * 
   * La función llama al servicio para eliminar el tipo de plato y, si la eliminación es exitosa, muestra una alerta
   * informando sobre la eliminación y actualiza las listas de tipos de platos.
   * 
   * @param idTipoPlato - El ID del tipo de plato a eliminar.
   * @returns {void}
   */
  borrarTipoPlato(idTipoPlato: number) {
    if (idTipoPlato != undefined) {
      this.tipoPlaServ.borrarTipoPlato(idTipoPlato).subscribe(
        data => {
          alert("Tipo de plato eliminado");
          this.listTipPla(); // Actualiza la lista de tipos de platos
          this.listaFiltradaTipPla(); // Actualiza la lista filtrada de tipos de platos
        },
        err => {
          console.log("Msj. Serv.: " + err.error.message);
          alert("Msj. Serv.: " + err.error.message);
        }
      );
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra una advertencia de confirmación antes de eliminar un tipo de plato.
   * 
   * La función utiliza una ventana de confirmación para solicitar la confirmación del usuario antes de proceder con la
   * eliminación del tipo de plato. Si el usuario confirma, llama a `borrarTipoPlato` para realizar la eliminación.
   * 
   * @param idTipoPlato - El ID del tipo de plato a eliminar.
   * @returns {void}
   */
  borrarTiPladvEli(idTipoPlato: number): void {
    const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
    if (msjAdvertenciaElim) {
      this.borrarTipoPlato(idTipoPlato); // Llama a la función de eliminación
    } else {
      // No hace nada si el usuario cancela
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  //EDITAR TIPO DE PLATO
  /////////////////////////

  /**
  * Asigna los valores proporcionados a las propiedades del objeto para su edición.
  * 
  * Esta función se utiliza para establecer los valores actuales de un tipo de plato en el objeto del componente,
  * permitiendo su edición posterior.
  * 
  * @param idTipoPla - El ID del tipo de plato.
  * @param nombreTipoPla - El nombre del tipo de plato.
  * @param iconoTipoPlato - El icono del tipo de plato.
  * @param colorCardTipoPlato - El color de la tarjeta del tipo de plato.
  * @returns {void}
  */
  obtenerTipoPlaXId(idTipoPla: number, nombreTipoPla: string, iconoTipoPlato: string, colorCardTipoPlato: string): void {
    this.idTipoPlato = idTipoPla;
    this.nombreTipoPlato = nombreTipoPla;
    this.iconoTipoPlato = iconoTipoPlato;
    this.colorCardTipoPlato = colorCardTipoPlato;
  }

  /**
   * Actualiza un tipo de plato existente con nuevos valores.
   * 
   * La función verifica que todos los campos requeridos estén completos y luego muestra una advertencia de confirmación
   * antes de proceder con la actualización. Si el usuario confirma, se envía una solicitud al servidor para actualizar
   * el tipo de plato y se actualizan las listas relevantes.
   * 
   * @returns {void}
   */
  editarTipoPlato() {
    if (this.nombreTipoPlato === "" || this.nombreTipoPlato === undefined) {
      alert("Ingrese un nombre para el tipo de plato");
      return;
    }

    if ((this.iconoTipoPlato === undefined || this.iconoTipoPlato === '') &&
      (this.iconoTipoPlatoParaInput === undefined || this.iconoTipoPlatoParaInput === '')) {
      alert("Debe ingresar un icono para el tipo de plato");
      return;
    }

    if ((this.colorCardTipoPlato === undefined || this.colorCardTipoPlato === '') &&
      (this.colorCardTipoPlatoParaInput === undefined || this.colorCardTipoPlatoParaInput === '')) {
      alert("Debe ingresar un color para el tipo de plato");
      return;
    }

    const msjAdvertencia = window.confirm('Editar un tipo de plato modificará los registros asociados de la tabla PLATOS y PLATOS A MOSTRAR. ¿Desea continuar?');
    if (msjAdvertencia) {
      const tipoPla = new TipoPlato(
        this.idTipoPlato,
        this.nombreTipoPlato,
        this.iconoTipoPlato || this.iconoTipoPlatoParaInput,
        this.colorCardTipoPlato || this.colorCardTipoPlatoParaInput
      );

      this.tipoPlaServ.actualizarTipoPla(this.idTipoPlato, tipoPla).subscribe(
        data => {
          console.log("Msj. Servidor: " + data.mensaje);
          alert("Tipo de plato: " + "** " + this.idTipoPlato + " - " + this.nombreTipoPlato + " **" + " actualizado.");
          this.listTipPla();
          this.listaFiltradaTipPla();
        },
        err => {
          console.log("Msj. Servidor: " + err.error.message);
          alert("Msj. Servidor: " + err.error.message);
        }
      );
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮  
  //GENERAR CARD PEQUEÑA 
  /////////////////////////

  /**
   * Crea y guarda un nuevo plato en el sistema.
   * 
   * La función realiza varias verificaciones para asegurar que los campos necesarios estén completos antes de
   * enviar la información al servidor para guardar el nuevo plato. Si todos los campos son válidos, se crea una
   * instancia del plato con los datos proporcionados y se guarda en la base de datos. Luego se actualiza la lista
   * de platos mostrados en la interfaz.
   * 
   * @returns {void}
   */
  generarCardPequena(): void {
    // Verifica si se ha seleccionado un tipo de plato válido
    if (this.idTipoPla == 0 || this.idTipoPla === undefined || isNaN(this.idTipoPla)) {
      alert("Seleccione un tipo de plato");
      return;
    }

    // Verifica si se ha ingresado un nombre para el plato
    if (this.nombrePlato === "" || this.nombrePlato === undefined) {
      alert("Ingrese el nombre del plato");
      return;
    }

    // Verifica si se ha ingresado un precio válido para el plato
    if (this.precioPlato == 0 || this.precioPlato === undefined || isNaN(this.precioPlato)) {
      alert("Ingrese un precio para el plato");
      return;
    }

    // Verifica si se ha ingresado una URL válida para la imagen del plato
    if (this.imgPlato === "" || this.imgPlato === undefined) {
      alert("Ingrese una URL a una imagen para el plato con el siguiente formato: https://images.unsplash.com/photo");
      return;
    }

    // Crea una instancia de TipoPlato con el ID seleccionado
    const tipoPlato = new TipoPlato(this.idTipoPla, "", "", "");

    // Crea una instancia de MenuCompletoModel con los datos del plato
    const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato, this.imgPlato);

    // Llama al servicio para guardar el nuevo plato
    this.menucomServ.guardarPlato(menuCompMod).subscribe(data => {
      console.log("Plato guardado.");
      alert("Plato guardado");

      // Actualiza la lista de platos filtrados para mostrar el nuevo plato
      this.listaFiltradaTipPla();
    }, err => {
      // Maneja los errores en caso de que la operación falle
      console.log("Msj. Servidor: " + err.error.message);
      alert("Msj. Servidor: " + err.error.message);
    });
  }


  //✮------------------------------------------------------------------------------------------------------------✮ 

  //FUNCION PARA CREAR EXCEL CON LISTA COMPLETA
  //////////////////////////////////////////////
  /**
   * Genera y descarga un archivo Excel con los datos de los platos y tipos de platos.
   * 
   * La función realiza una confirmación para asegurarse de que el usuario desea continuar con la descarga.
   * Luego, obtiene los datos de los platos y tipos de platos mediante servicios, los formatea, y crea un archivo
   * Excel con dos hojas: una para los platos y otra para los tipos de platos. Finalmente, inicia la descarga del archivo.
   * 
   * @returns {void}
   */
  generateExcel(): void {
    // Muestra un mensaje de confirmación antes de comenzar la descarga
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo. ¿Desea continuar?');

    if (msjAdvertenciaDescarga) {
      // Suscribirse al servicio para obtener la lista de platos
      this.menucomServ.listaPlatos().subscribe(data => {
        // Procesar los datos de platos para formatearlos como se necesita para el archivo Excel
        const menuCompModelFormatted = data.map(item => {
          // Crear un nuevo objeto solo con las propiedades deseadas
          return {
            idPlato: item.idPlato,
            nombre_plato: item.nombrePlato,
            precio_plato: item.precioPlato,
            imagen_plato: item.imgPlato,
            id_tipo_plato: item.tipoPlato.idTipoPlato,
            nombre_tipo_plato: item.tipoPlato.nombreTipoPlato,
          };
        });

        // Crear un nuevo libro de Excel
        const archivoExcel = XLSX.utils.book_new();

        // Crear y agregar la hoja para la lista de platos
        const hojaArchivoExcel = XLSX.utils.json_to_sheet(menuCompModelFormatted);
        XLSX.utils.book_append_sheet(archivoExcel, hojaArchivoExcel, 'ListaCompletaPlatos');

        // Crear y agregar la hoja para la lista de tipos de platos
        const hojaTiposPlatosFiltrados = XLSX.utils.json_to_sheet(this.tiposPlatosModel);
        XLSX.utils.book_append_sheet(archivoExcel, hojaTiposPlatosFiltrados, 'ListaTiposPlatos');

        // Guardar el archivo Excel
        const buffer = XLSX.write(archivoExcel, { type: 'buffer' });
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lista_completa_platos.xlsx'; // Nombre del archivo Excel
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }


  //✮------------------------------------------------------------------------------------------------------------✮
  // FUNCION PARA MODALITO NGIF (NO BSMODALREF) PARA MOSTRAR COLORES E ICONOS
  ///////////////////////////////////////////////////////////////////////////
  mostrarOcultarModalitoColores() {
    this.mostrarModalitoColores = !this.mostrarModalitoColores;
  };

  mostrarOcultarModalitoIconos() {
    this.mostrarModalitoIconos = !this.mostrarModalitoIconos;
  };


  //✮------------------------------------------------------------------------------------------------------------✮
  //FUNCIONES VARIAS
  ///////////////////////////////////

  borrarInputsCerrarModalito(): void {
    //borrar inputs
    this.idTipoPlato = 0;
    this.nombrePlato = "";
    this.precioPlato = 0;
    this.imgPlato = "";
    this.idTipoPla = 0;

    this.nombreTipoPlato = "";
    this.iconoTipoPlato = "";
    this.iconoTipoPlatoParaInput = "";
    this.colorCardTipoPlato = "";
    this.colorCardTipoPlatoParaInput = "";


    this.imgParaCelOPc = "";
    this.tituloPromo = "";
    this.textoPromo = "";
    this.urlImagenPromo = "";

    //cerrar modalitos
    this.mostrarModalitoColores = false;
    this.mostrarModalitoIconos = false;
  };

  //✮------------------------------------------------------------------------------------------------------------✮
}



