import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuCompletoModel } from 'src/app/usuarios/modelos/menu-completo-model';
import { TipoPlato } from 'src/app/usuarios/modelos/tipo-plato';
import { MenuCompletoServiceService } from 'src/app/usuarios/servicios/menu-completo-service.service';
import { TiposPlatosService } from 'src/app/usuarios/servicios/tipos-platos.service';
import { Cartelera } from '../../modelos/cartelera';
import { CarteleraService } from '../../servicios/cartelera.service';
import { Router } from '@angular/router';
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

  //MODALITO NGIF (NO BSMODALREF) PARA MOSTRAR COLORES E ICONOS
  //////////////////////////////////////////////////////////////
  mostrarModalitoColores: Boolean = false;
  mostrarModalitoIconos: Boolean = false;

  //MODAL VER LISTA COMPLETA DE PLATOS
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



  constructor(private modalService: BsModalService,
    private menucomServ: MenuCompletoServiceService,
    private tipoPlaServ: TiposPlatosService,
    private router: Router,
    private cartServ: CarteleraService,  
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

  //MODAL INFORMACION
  ////////////////////////////////////
  
  openModalInfo(templateModalInfo: TemplateRef<any>) {
    this.modalInfo = this.modalService.show(templateModalInfo, {backdrop: 'static'});
  }

  //MODAL EDITAR PROMO/NOVEDAD
  ////////////////////////////

  

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
  onCreate(): void {

    const tipoPlato = new TipoPlato(this.idTipoPla, "", "", "");

    const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato, this.imgPlato);
    this.menucomServ.guardarPlato(menuCompMod).subscribe(data => {
      alert("Plato guardado");
    }, err => {
      alert("No se guardó el plato");
    });
  }

  //BORRAR PLATO CON IDTIPOPLATO E IDPLATO
  ///////////////////////////////////
  borrarPlato(idPlato: number, idTipoPla: number): void {
    if (idPlato != undefined) {
      this.menucomServ.borrarPlato(idPlato, idTipoPla).subscribe(data => {
        alert("Plato eliminado");      
        this.mostrarListaTipoPlato(this.idTipoPla); //refresca la lista de platos con el registro eliminado  
        this.listaFiltradaTipPla();  //refresca la lista que genera las card pequeñas
       }, err => console.log("No se pueden traer los registros de la db para borrar"))
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
        this.listaPlatosCompleta();
       }, err => console.log("No se pueden traer los registros de la db para borrar"))
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
    const tipoPlato = new TipoPlato(this.idTipoPla, "", "", "");

    const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato, this.imgPlato);
    this.menucomServ.actualizarPlato(this.idPlato, menuCompMod).subscribe(data => {
      alert("Plato editado");
    }, err => {
      alert("No se editó el plato");
    });
  }


  //CREAR TIPO DE PLATO
  ///////////////////////

  onCreateTipoPla(): void {

    const tipoPla = new TipoPlato(this.idTipoPlato, this.nombreTipoPlato, this.iconoTipoPlato||this.iconoTipoPlatoParaInput, this.colorCardTipoPlato||this.colorCardTipoPlatoParaInput);
    this.tipoPlaServ.guardarTipoPlato(tipoPla).subscribe(data => {
      alert("Tipo de plato guardado");
      this.listTipPla();
    },
      err => { alert("No se creo el tipo de plato") })
  };

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
        err => { alert("no se pudo eliminar el tipo de plato") })
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

    const tipoPla = new TipoPlato(this.idTipoPlato, this.nombreTipoPlato, this.iconoTipoPlato||this.iconoTipoPlatoParaInput, this.colorCardTipoPlato||this.colorCardTipoPlatoParaInput);
    this.tipoPlaServ.actualizarTipoPla(this.idTipoPlato, tipoPla).subscribe(data => {
      alert("Tipo de plato editado");
      this.listTipPla();
      this.listaFiltradaTipPla();
    }, err => {
      alert("No se pudo editar el tipo de plato")
    })
  };

  
  //GENERAR CARD PEQUEÑA (PARA HACERLO SE DEBE AGREGAR UN PLATO, LA FUNCION EN REALIDAD HACE ESO Y X ESO GENERA LA CARD PEQUEÑA)
  /////////////////////////

  generarCardPequena(): void {
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

    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo ¿desea continuar?');
    if(msjAdvertenciaDescarga){

      
    // Crear una nueva lista con los registros transformados del tipoPlato
    const menuCompModelFormatted = this.menuCompModel.map(item => {
      // Crear un nuevo objeto solo con las propiedades que deseas mantener
      return {
        idPlato: item.idPlato,
        nombre_plato: item.nombrePlato,
        precio_plato: item.precioPlato,
        imagen_plato: item.imgPlato,
        id_tipo_plato: item.tipoPlato.idTipoPlato,
        nombre_tipo_plato: item.tipoPlato.nombreTipoPlato,
        // Otras propiedades que deseas mantener...
      };
    });
  
    // Crear un nuevo libro de Excel
    const archivoExcel = XLSX.utils.book_new();
    const hojaArchivoExcel = XLSX.utils.json_to_sheet(menuCompModelFormatted);
  
    // Agregar la hoja "ListaCompletaPlatos" al libro de Excel
    XLSX.utils.book_append_sheet(archivoExcel, hojaArchivoExcel, 'ListaCompletaPlatos');
  
    // Agregar la hoja "TLiostaTiposPlatos"
    const hojaTiposPlatosFiltrados = XLSX.utils.json_to_sheet(this.tiposPlatosModel);
    XLSX.utils.book_append_sheet(archivoExcel, hojaTiposPlatosFiltrados, 'ListaTiposPlatos');
  
    // Agregar la hoja "promosyNovedadesModel"
    const hojaPromosyNovedadesModel = XLSX.utils.json_to_sheet(this.promosyNovedadesModel);
    XLSX.utils.book_append_sheet(archivoExcel, hojaPromosyNovedadesModel, "PromosyNovedadesModel");
  
    // Guardar el archivo Excel
    const buffer = XLSX.write(archivoExcel, { type: 'buffer' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista_completa_platos.xlsx'; // Nombre del archivo Excel
    a.click();
    window.URL.revokeObjectURL(url);
      
    } else {
      ""
    };
  };


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
  
  this.idTipoPlato = 0;
  this.nombrePlato = "";
  this.precioPlato = 0;
  this.imgPlato  = "";

  this.nombreTipoPlato = "";
  this.iconoTipoPlato = "";
  this.iconoTipoPlatoParaInput = "";
  this.colorCardTipoPlato = "";
  this.colorCardTipoPlatoParaInput = "";
  

  this. imgParaCelOPc = "";
  this. tituloPromo = "";
  this.textoPromo = "";
  this.urlImagenPromo = "";
 
  //NO BORRA INPUTS, CIERRA MODALITOS
  this.mostrarModalitoColores = false;
  this.mostrarModalitoIconos = false;
 
 };
}



