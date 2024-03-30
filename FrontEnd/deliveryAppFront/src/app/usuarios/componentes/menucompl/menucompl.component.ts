import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuCompletoModel } from 'src/app/usuarios/modelos/menu-completo-model';
import { TipoPlato } from 'src/app/usuarios/modelos/tipo-plato';
import { MenuCompletoServiceService } from 'src/app/usuarios/servicios/menu-completo-service.service';
import { TiposPlatosService } from 'src/app/usuarios/servicios/tipos-platos.service';
import { Cartelera } from '../../modelos/cartelera';
import { CarteleraService } from '../../servicios/cartelera.service';
import * as XLSX from 'xlsx';




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

  //MODAL AGREGAR TARJETA
  ///////////////////////
  modalEditarPromoNovedad!: BsModalRef;

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
  listaIconosTipoPlato: String [] = [];
  listaColorTipoPlato: String [] = [];


  menuCompModel: MenuCompletoModel[] = [];
  tiposPlatosModel: TipoPlato[] = [];
  tiposPlatosFiltrados: TipoPlato[] = [];
  promosyNovedadesModel: Cartelera[] = [];

 
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
  urlImagenPromo!: string;
  fechaPromo!: string;

 //EDITAR PROMO/NOVEDAD/CARTELERA
/////////////////////////////////



  constructor(private modalService: BsModalService,
    private menucomServ: MenuCompletoServiceService,
    private tipoPlaServ: TiposPlatosService,   
    private cartServ: CarteleraService
    
  ) { }

  ngOnInit(): void {
    
    this.listaFiltradaTipPla(); //genera las card pequeña con la lista filtrada de tipos de platos que esten en la entity platos
    this.listTipPla(); //genera la card grande con la lista completa de tipos de platos
    this.listaPromoNovedad();
    this.listaPlatosCompleta();
    
  
  }



  //MODAL MOSTRAR LISTA
  //////////////////////

  openModalMenuComp(templateMenuComp: TemplateRef<any>) {
    const modalConfig = {
      class: 'modal-dialog-centered modal-xl' // 'modal-lg' por 'modal-xl' para un modal más ancho
    };
    this.modalMenuComp = this.modalService.show(templateMenuComp, { backdrop: 'static', ...modalConfig });
  };

  //MODAL AGREGAR PLATO
  //////////////////////////

  openModalAgregarPl(templateAgregarPlato: TemplateRef<any>, idTipoPlato: number) {
    this.idTipoPla = idTipoPlato;
    this.modalAgregarPla = this.modalService.show(templateAgregarPlato, {backdrop: 'static'});
  }

  //MODAL EDITAR PLATO
  //////////////////////

  openModalEditarMenuComp(templateEditarMenuComp: TemplateRef<any>) {
    this.modalEditarMenuComp = this.modalService.show(templateEditarMenuComp, {backdrop: 'static'});
  }


  //MODAL AGREGAR TIPO PLATO
  //////////////////////

  openModalAgregarTipoPlato(templateAgregarTipoPlato: TemplateRef<any>) {
    this.modalAgregarTipoPlato = this.modalService.show(templateAgregarTipoPlato, {backdrop: 'static'});
  }

  //MODAL AGREGAR TIPO PLATO
  //////////////////////

  openModalEditarTipoPlato(templateEditarTipoPlato: TemplateRef<any>) {
    this.modalEditarTipoPlato = this.modalService.show(templateEditarTipoPlato, {backdrop: 'static'});
  }

 //MODAL AGREGAR TARJETA
  //////////////////////

  openModalEditarcard(templateEditarPaAgregarCard: TemplateRef<any>) {
    this.modalEditarPaAgregarCard = this.modalService.show(templateEditarPaAgregarCard, {backdrop: 'static'});
  }

  //MODAL EDITAR PROMO/NOVEDAD
  ////////////////////////////

  openModalEditarPromoNovedad(templateEditarPromoNovedad: TemplateRef<any>) {
    this.modalEditarPromoNovedad = this.modalService.show(templateEditarPromoNovedad, {backdrop: 'static'});
  }

  //MODAL VER LISTA COMPLETA DE PLATOS
  ////////////////////////////////////

  openModalListaComPlatos(templateListaComPlato: TemplateRef<any>){
    const modalConfig = {
      class: 'modal-dialog-centered modal-xl' // 'modal-lg' por 'modal-xl' para un modal más ancho
    };
    this.modalListaComPlatos = this.modalService.show(templateListaComPlato, { backdrop: 'static', ...modalConfig });
    
  };

  //MODAL EDITAR LISTA COMPLETA DE PLATOS
  ////////////////////////////////////

  openModalEditarListCompPlatos(templateEditarListCompPlatos: TemplateRef<any>) {
    this.modalEditarListCompPlatos = this.modalService.show(templateEditarListCompPlatos, {backdrop: 'static'});
  }


  //MODAL INFORMACION
  ////////////////////////////////////
  
  openModalInfo(templateModalInfo: TemplateRef<any>) {
    this.modalInfo = this.modalService.show(templateModalInfo, {backdrop: 'static'});
  }


  // FUNCIONES PARA LISTAS
  ///////////////////////////////////

  listaIconos(): void {
    this.tipoPlaServ.listIconosTipPlat().subscribe(data => this.listaIconosTipoPlato = data)
  };

  listaColores(): void {
    this.tipoPlaServ.listColoresTipPlat().subscribe(data => this.listaColorTipoPlato = data)
  };

  mostrarListaTipoPlato(idTipoPlato: number): void {
    this.menucomServ.listaTipoPlatos(idTipoPlato).subscribe(data => this.menuCompModel = data);
  };

  listTipPla(): void {
    this.tipoPlaServ.listTiposPlatos().subscribe(data => this.tiposPlatosModel = data); //genera la card grande con la lista completa de tipos de platos
  };

  listaFiltradaTipPla(): void {
    this.tipoPlaServ.listFiltradaTiposPlatos().subscribe(data => this.tiposPlatosFiltrados = data);//genera las card pequeña con la lista filtrada de tipos de platos que esten en la entity platos
  };

  listaPromoNovedad():void {
    this.cartServ.listPromosNov().subscribe(data => this.promosyNovedadesModel = data);
  };

  listaPlatosCompleta(): void{
    this.menucomServ.listaPlatos().subscribe(data => this.menuCompModel = data);
  };




  //CREAR PLATO
  ///////////////////////////////////
  //verifica antes de guardar que no exista el plato
  onCreate(): void {

    if(this.idTipoPla == 0 || this.idTipoPla === undefined || isNaN(this.idTipoPla)){
      alert("Seleccione un tipo de plato");
      return
    };

    if(this.nombrePlato === "" || this.nombrePlato === undefined){
      alert("Ingrese el nombre del plato");
      return
    };

    if(this.precioPlato == 0 || this.precioPlato === undefined || isNaN(this.precioPlato)){
      alert("Ingrese un precio para el plato");
      return
    };
    
    if(this.imgPlato === "" || this.imgPlato === undefined){
      alert("Ingrese una URL a una imagen para el plato con el siguiente formato: https://images.unsplash.com/photo");
      return
    };

    this.menucomServ.existeXNombre(this.nombrePlato).subscribe(
      (existePlato: boolean) => {
        if (existePlato) {
          alert("el plato ya existe");
        } else {
          const tipoPlato = new TipoPlato(this.idTipoPla, "", "", "");
  
          const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato, this.imgPlato);
          this.menucomServ.guardarPlato(menuCompMod).subscribe(
            data => {
              alert("Plato guardado");
            },
            err => {
              alert("No se guardó el plato");
            }
          );
        }
      },
      err => {
        alert("Campo vacío o error al intentar guardar");
      }
    );
  }
  
  

  //BORRAR PLATO CON IDTIPOPLATO E IDPLATO
  ///////////////////////////////////
  borrarPlato(idPlato: number, idTipoPla: number): void {
    if (idPlato != undefined) {
      this.menucomServ.borrarPlato(idPlato, idTipoPla).subscribe(data => {
        alert("Plato eliminado");
        this.mostrarListaTipoPlato(idTipoPla); //refresca la lista de platos con el registro eliminado  
        this.listaFiltradaTipPla();  //refresca la lista que genera las card pequeñas
      }, err => {
        console.log("Msj. Serv.:" + err.error.message);
        alert("Msj. Serv.:" + err.error.message);
      }
      )
    }
  };

    //funcion que muestra un cartel de warning antes de borrar
    borrarPlaMsjEli(idPlato:number, idTipoPla: number): void{
      const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
      if(msjAdvertenciaElim){
        this.borrarPlato(idPlato, idTipoPla);
      } else {
        ""
      };
    };

  
    
  //BORRAR PLATO SOLO CON IDPLATO
  ///////////////////////////////////
  borrarPlatoLisComp(idPlato: number): void {
    if (idPlato != undefined) {
      this.menucomServ.borrarPlatoLisCompleta(idPlato).subscribe(data => {
        alert("Plato eliminado");
        this.listaFiltradaTipPla();
        this.listaPlatosCompleta();
      }, err => {
        console.log("Msj. Serv.:" + err.error.message);
        alert("Msj. Serv.:" + err.error.message);
      })
    }
  };

    //funcion que muestra un cartel de warning antes de borrar
    borrarPlaLisComMsjEli(idPlato:number): void{
      const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
      if(msjAdvertenciaElim){
        this.borrarPlatoLisComp(idPlato);
        } else {
        ""
      };
    };
  

  //EDITAR PLATO
  ///////////////////////////////////

  obtenerPlaXId(idPlato: number, nombrePlato: string, precioPlato: number, idTipoPlato: number, imgPlato: string): void {
    this.idPlato = idPlato;
    this.nombrePlato = nombrePlato;
    this.precioPlato = precioPlato;
    this.idTipoPla = idTipoPlato;
    this.imgPlato = imgPlato;
  };

  editarPlato(): void {

    if (this.idPlato == 0 || this.idPlato === undefined || isNaN(this.idPlato)) {
      alert("No se ha cargado un idPlato, informar al desarrollador");
      console.log("No se ha cargado un idPlato, informar al desarrollador");
      return
    };

    if (this.idTipoPla == 0 || this.idTipoPla === undefined || isNaN(this.idTipoPla)) {
      alert("Seleccione un tipo de plato");
      return
    };

    if (this.nombrePlato === "" || this.nombrePlato === undefined) {
      alert("Ingrese el nombre del plato");
      return
    };

    if (this.precioPlato == 0 || this.precioPlato === undefined || isNaN(this.precioPlato)) {
      alert("Ingrese un precio para el plato");
      return
    };

    if (this.imgPlato === "" || this.imgPlato === undefined) {
      alert("Ingrese una URL a una imagen para el plato con el siguiente formato: https://images.unsplash.com/photo");
      return
    };

    const msjAdvertencia = window.confirm('Editar un plato modificará los registros asociados de la tabla PLATOS A MOSTRAR. ¿Desea continuar?');
    if (msjAdvertencia) {

      const tipoPlato = new TipoPlato(this.idTipoPla, "", "", "");

      const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato, this.imgPlato);
      this.menucomServ.actualizarPlato(this.idPlato, menuCompMod).subscribe(data => {
        this.listaPlatosCompleta();
        alert("Plato editado");
      }, err => {
        alert("No se editó el plato");
      });
    }
  };



  //CREAR TIPO DE PLATO
  ///////////////////////
     //antes de crear el tipo de plato, verifica que no exista en la tabla
  onCreateTipoPla(): void {

   if(this.nombreTipoPlato === "" || this.nombreTipoPlato === undefined){
       alert("Ingrese un nombre para el tipo de plato");
       return
   };
   
    if ((this.iconoTipoPlato === undefined || this.iconoTipoPlato === '') &&
      (this.iconoTipoPlatoParaInput === undefined || this.iconoTipoPlatoParaInput === '')) {
      alert("Debe ingresar un icono para el tipo de plato");
      return;
    };

    if ((this.colorCardTipoPlato === undefined || this.colorCardTipoPlato === '') &&
      (this.colorCardTipoPlatoParaInput === undefined || this.colorCardTipoPlatoParaInput === '')) {
      alert("Debe ingresar un color para el tipo de plato");
      return;
    };

    this.tipoPlaServ.existeXNombre(this.nombreTipoPlato).subscribe(
      (existePlato: boolean) => {
        if (existePlato) {
          alert("El tipo de plato ya existe");
        } else {
          const tipoPla = new TipoPlato(this.idTipoPlato, this.nombreTipoPlato, this.iconoTipoPlato || this.iconoTipoPlatoParaInput, this.colorCardTipoPlato || this.colorCardTipoPlatoParaInput);
          this.tipoPlaServ.guardarTipoPlato(tipoPla).subscribe(
            data => {
              console.log(data.mensajePersonalizado);
              alert("Tipo de plato guardado");
              this.listTipPla();
            },
            err => {
              alert("No se pudo guardar el tipo de plato");
            }
          );
        }
      },
      err => {
        alert("Campo vacío o error al intentar guardar");
      }
    );
  }
  

  //BORRAR TIPO DE PLATO
  /////////////////////////

  //funcion que elimina el plato sin advertir
  borrarTipoPlato(idTipoPlato: number) {
    

    if (idTipoPlato != undefined) {
      

      this.tipoPlaServ.borrarTipoPlato(idTipoPlato).subscribe(data => {
        alert("Tipo de plato eliminado");
        this.listTipPla();
        this.listaFiltradaTipPla();
        },
        err => { 
          console.log("Msj. Serv.: " + err.error.message);
          alert("Msj. Serv.: " + err.error.message);
        }
        )
    }
  };


  //funcion que muestra un cartel de warning antes de borrar
  borrarTiPladvEli(idTipoPlato:number): void{
    const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
    if(msjAdvertenciaElim){
      this.borrarTipoPlato(idTipoPlato); //refresca la lista con el registro eliminado
    } else {
      ""
    };
  };


  //EDITAR TIPO DE PLATO
  /////////////////////////

  obtenerTipoPlaXId(idTipoPla: number, nombreTipoPla: string, iconoTipoPlato: string, colorCardTipoPlato: string): void {
    this.idTipoPlato = idTipoPla;
    this.nombreTipoPlato = nombreTipoPla;
    this.iconoTipoPlato = iconoTipoPlato;
    this.colorCardTipoPlato = colorCardTipoPlato;
    
    
    
  };

  editarTipoPlato() {

    if (this.nombreTipoPlato === "" || this.nombreTipoPlato === undefined) {
      alert("Ingrese un nombre para el tipo de plato");
      return
    };


    if ((this.iconoTipoPlato === undefined || this.iconoTipoPlato === '') &&
      (this.iconoTipoPlatoParaInput === undefined || this.iconoTipoPlatoParaInput === '')) {
      alert("Debe ingresar un icono para el tipo de plato");
      return;
    };

    if ((this.colorCardTipoPlato === undefined || this.colorCardTipoPlato === '') &&
      (this.colorCardTipoPlatoParaInput === undefined || this.colorCardTipoPlatoParaInput === '')) {
      alert("Debe ingresar un color para el tipo de plato");
      return;
    };

    const msjAdvertencia = window.confirm('Editar un tipo de plato modificará los registros asociados de la tabla PLATOS y PLATOS A MOSTRAR. ¿Desea continuar?');
    if (msjAdvertencia) {

      const tipoPla = new TipoPlato(this.idTipoPlato, this.nombreTipoPlato, this.iconoTipoPlato || this.iconoTipoPlatoParaInput, this.colorCardTipoPlato || this.colorCardTipoPlatoParaInput);
      this.tipoPlaServ.actualizarTipoPla(this.idTipoPlato, tipoPla).subscribe(data => {
        console.log("Msj. Servidor: " + data.mensaje);
        alert(data.mensaje);
        this.listTipPla();
        this.listaFiltradaTipPla();
      }, err => {
        console.log("Msj. Servidor: " + err.error.message);
        alert("Msj. Servidor: " + err.error.message);
      })
    }
  };

  
  //GENERAR CARD PEQUEÑA (PARA HACERLO SE DEBE AGREGAR UN PLATO, LA FUNCION EN REALIDAD HACE ESO Y X ESO GENERA LA CARD PEQUEÑA)
  /////////////////////////

  generarCardPequena(): void {

  
    if(this.idTipoPla == 0 || this.idTipoPla === undefined || isNaN(this.idTipoPla)){
      alert("Seleccione un tipo de plato");
      return
    };

    if(this.nombrePlato === "" || this.nombrePlato === undefined){
      alert("Ingrese el nombre del plato");
      return
    };

    if(this.precioPlato == 0 || this.precioPlato === undefined || isNaN(this.precioPlato)){
      alert("Ingrese un precio para el plato");
      return
    };
    
    if(this.imgPlato === "" || this.imgPlato === undefined){
      alert("Ingrese una URL a una imagen para el plato con el siguiente formato: https://images.unsplash.com/photo");
      return
    };
     

    const tipoPlato = new TipoPlato(this.idTipoPla, "", "", "");
    const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato, this.imgPlato);
    this.menucomServ.guardarPlato(menuCompMod).subscribe(data => {
      alert("Plato guardado");
      this.listaFiltradaTipPla(); //refresca la lista de cards de tipos de platos cuando se agrega
    }, err => {
      alert("No se guardó el plato");
    });
  
  };
  

  //EDITAR PROMOCION/NOVEDAD/CARTELERA
  /////////////////////////

  obtenerPromoXId(idPromo:number, imgParaCelOPc:string, tituloPromo:string, textoPromo:string, urlImagenPromo:string, fechaPromo: string):void{
    this.idPromo = idPromo;
    this.imgParaCelOPc = imgParaCelOPc;
    this. tituloPromo = tituloPromo;
    this. textoPromo = textoPromo;
    this. urlImagenPromo = urlImagenPromo;
    this. fechaPromo = fechaPromo;

  };

  editarCartelera(): void{

    if(this.idPromo === 0 || this.idPromo === undefined || isNaN(this.idPromo)){
      alert("No se ha cargado el idPromo, contactar al desarrollador");
      return
    };

    if(this.imgParaCelOPc === "" || this.imgParaCelOPc === undefined){
      alert("En imagen para PC o CELULARES Ingrese 'Celulares' para imagen a renderizar en celulares o ingrese 'Pc' para una imagen a renderizar en computadoras");
      return
    };

    if(this.tituloPromo === "" || this.tituloPromo === undefined){
      alert("Ingrese una titulo para la promo");
      return
    };

    if(this.textoPromo === "" || this.textoPromo === undefined){
      alert("Ingrese una descripcion para la promo");
      return
    };

    if(this.urlImagenPromo === "" || this.urlImagenPromo === undefined){
      alert("Ingrese una URL para la imagen de la promo con el siguiente formato: https://images.unsplash.com/photo");
      return
    };

    if(this.fechaPromo === "" || this.fechaPromo === undefined){
      alert("Ingrese una fecha para la imagen de la promo");
      return
    };



    const cartelera = new Cartelera (this.idPromo, this.imgParaCelOPc, this.tituloPromo, this.textoPromo, this.urlImagenPromo, this.fechaPromo)
    this.cartServ.actualizarPromosNov(this.idPromo, cartelera).subscribe(data => 
      {        
        alert("Cartelera editada");    
        this.listaPromoNovedad();   
      }, err => {
        alert("No se editó la cartelera");
      });
  };



  //FUNCION PARA CREAR EXCEL CON LISTA COMPLETA
  ///////////////////////////////////////////////////

  generateExcel() {
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo. ¿Desea continuar?');
    
    if (msjAdvertenciaDescarga) {
      // Suscribirse al servicio para obtener los datos necesarios
      this.menucomServ.listaPlatos().subscribe(data => {
        // Procesar los datos recibidos para formatearlos como lo necesitas para el Excel
        const menuCompModelFormatted = data.map(item => {
          // Crear un nuevo objeto solo con las propiedades que deseas mantener
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
        const hojaArchivoExcel = XLSX.utils.json_to_sheet(menuCompModelFormatted);
  
        // Agregar la hoja al libro de Excel
        XLSX.utils.book_append_sheet(archivoExcel, hojaArchivoExcel, 'ListaCompletaPlatos');
  
         // Agregar la hoja "ListaTiposPlatos"
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


  // FUNCION PARA MODALITO NGIF (NO BSMODALREF) PARA MOSTRAR COLORES E ICONOS
  ///////////////////////////////////////////////////////////////////////////
  mostrarOcultarModalitoColores(){
    this.mostrarModalitoColores = !this.mostrarModalitoColores;
  };

  mostrarOcultarModalitoIconos(){
    this.mostrarModalitoIconos = !this.mostrarModalitoIconos;
  };
  
  

  //FUNCIONES VARIAS
  ///////////////////////////////////
  
 borrarInputsCerrarModalito(): void{
  //borrar inputs
  this.idTipoPlato = 0;
  this.nombrePlato = "";
  this.precioPlato = 0;
  this.imgPlato  = "";
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
}



