import { Component, TemplateRef } from '@angular/core';
import { Cartelera } from '../../modelos/cartelera';
import { CarteleraSecundaria } from '../../modelos/cartelera-secundaria';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CarteleraService } from '../../servicios/cartelera.service';
import { CarteleraSecundariaService } from '../../servicios/cartelera-secundaria.service';
import * as XLSX from 'xlsx';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-carteleras-crud',
  templateUrl: './carteleras-crud.component.html',
  styleUrls: ['./carteleras-crud.component.css']
})
export class CartelerasCrudComponent {

  carteleraPrimaria!: Cartelera;
  carteleraSecundaria!: CarteleraSecundaria;

  idPromo !: number;
  imgParaCelOPc !: string;
  tituloPromo !: string;
  textoPromo !: string;
  colorTexto !: string;
  urlImagenPromo !: string;
  fechaPromo !: string;

  //MODAL EDITAR PROMO NOVEDAD PRINCIPAL
  ///////////////////////
  modalEditarPromoNovedad!: BsModalRef;

  //MODAL EDITAR PROMO NOVEDAD SECUNDARIA
  ///////////////////////
  modalEditarPromoNovedadSec!: BsModalRef;

  //MODAL INFO
  ///////////////////////
  modalInfo!: BsModalRef;


  promosyNovedadesModel: Cartelera[] = [];
  promosyNovedadesModelSec: CarteleraSecundaria[] = [];


  constructor(private cartServ: CarteleraService,
    private cartServSec: CarteleraSecundariaService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listaPromoNovedad();
    this.listaPromoNovedadSec();
  }


  listaPromoNovedad(): void {
    this.cartServ.listPromosNov().subscribe(data => this.promosyNovedadesModel = data);
  };

  listaPromoNovedadSec(): void {
    this.cartServSec.listPromosNovSec().subscribe(data => this.promosyNovedadesModelSec = data);
  };




  // FUNCIONES PARA MODAL EDITAR PROMO/NOVEDAD PRINCIPAL
  ////////////////////////////

  openModalEditarPromoNovedad(templateEditarPromoNovedad: TemplateRef<any>) {
    this.modalEditarPromoNovedad = this.modalService.show(templateEditarPromoNovedad, { backdrop: 'static' });
  };

  //MODAL EDITAR PROMO/NOVEDAD SECUNDARIA
  ////////////////////////////

  openModalEditarPromoNovedadSec(templateEditarPromoNovedadSec: TemplateRef<any>) {
    this.modalEditarPromoNovedadSec = this.modalService.show(templateEditarPromoNovedadSec, { backdrop: 'static' });
  }

  mostrarOcultarModalInfo(templateModalInfo: TemplateRef<any>): void {
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static' })

  };

  //✮------------------------------------------------------------------------------------------------------------✮

  //EDITAR PROMOCION/NOVEDAD/CARTELERA PRINCIPAL
  /////////////////////////

  obtenerPromoXId(idPromo: number, imgParaCelOPc: string, tituloPromo: string, textoPromo: string, colorTexto: string, urlImagenPromo: string, fechaPromo: string): void {
    this.idPromo = idPromo;
    this.imgParaCelOPc = imgParaCelOPc;
    this.tituloPromo = tituloPromo;
    this.textoPromo = textoPromo;
    this.colorTexto = colorTexto;
    this.urlImagenPromo = urlImagenPromo;
    this.fechaPromo = fechaPromo;

  };

  editarCartelera(): void {

    if (this.idPromo === 0 || this.idPromo === undefined || isNaN(this.idPromo)) {
      alert("No se ha cargado el idPromo, contactar al desarrollador");
      return
    };

    if (this.imgParaCelOPc === "" || this.imgParaCelOPc === undefined) {
      alert("En imagen para PC o CELULARES Ingrese 'Celulares' para imagen a renderizar en celulares o ingrese 'Pc' para una imagen a renderizar en computadoras");
      return
    };

    if (this.tituloPromo === "" || this.tituloPromo === undefined) {
      alert("Ingrese una titulo para la promo");
      return
    };

    if (this.tituloPromo.length > 21) {
      alert("El maximo de caracteres permitidos para el titulo de la promo es 21.");
      return
    };

    if (this.textoPromo === "" || this.textoPromo === undefined) {
      alert("Ingrese una descripcion para la promo");
      return
    };

    if (this.textoPromo.length > 70) {
      alert("El maximo de caracteres permitidos para la descripcion de la promo es 70.");
      return
    };

    if (this.colorTexto === "" || this.colorTexto === undefined) {
      alert("Ingrese una color para la promo");
      return
    };


    if (this.urlImagenPromo === "" || this.urlImagenPromo === undefined) {
      alert("Ingrese una URL para la imagen de la promo con el siguiente formato: https://images.unsplash.com/photo");
      return
    };

    if (this.fechaPromo === "" || this.fechaPromo === undefined) {
      alert("Ingrese una fecha para la imagen de la promo");
      return
    };

    const cartelera = new Cartelera(this.idPromo, this.imgParaCelOPc, this.tituloPromo, this.textoPromo, this.colorTexto, this.urlImagenPromo, this.fechaPromo)
    this.cartServ.actualizarPromosNov(this.idPromo, cartelera).subscribe(data => {
      alert("Cartelera editada");
      console.log("Msj. Servidor: " + JSON.stringify(data));
      this.listaPromoNovedad();
    }, err => {
      console.log("Msj. Serv: " + err.error.message);
      alert("Msj. Serv: " + err.error.message);
    });
  };



  //✮------------------------------------------------------------------------------------------------------------✮ 

  //EDITAR PROMOCION/NOVEDAD/CARTELERA SECUNDARIA
  /////////////////////////


  obtenerPromoSecXId(idPromo: number, imgParaCelOPc: string, tituloPromo: string, textoPromo: string, colorTexto: string, urlImagenPromo: string, fechaPromo: string): void {
    this.idPromo = idPromo;
    this.imgParaCelOPc = imgParaCelOPc;
    this.tituloPromo = tituloPromo;
    this.textoPromo = textoPromo;
    this.colorTexto = colorTexto;
    this.urlImagenPromo = urlImagenPromo;
    this.fechaPromo = fechaPromo;

  };


  editarCarteleraSec(): void {

    if (this.idPromo === 0 || this.idPromo === undefined || isNaN(this.idPromo)) {
      alert("No se ha cargado el idPromo, contactar al desarrollador");
      return
    };

    if (this.imgParaCelOPc === "" || this.imgParaCelOPc === undefined) {
      alert("En imagen para PC o CELULARES Ingrese 'Celulares' para imagen a renderizar en celulares o ingrese 'Pc' para una imagen a renderizar en computadoras");
      return
    };

    if (this.tituloPromo === "" || this.tituloPromo === undefined) {
      alert("Ingrese una titulo para la promo");
      return
    };

    if (this.tituloPromo.length > 22) {
      alert("El maximo de caracteres permitidos para el titulo de la promo es 22.");
      return
    };

    if (this.textoPromo === "" || this.textoPromo === undefined) {
      alert("Ingrese una descripcion para la promo");
      return
    };

    if (this.textoPromo.length > 96) {
      alert("El maximo de caracteres permitidos para la descripcion de la promo es 96.");
      return
    };

    if (this.colorTexto === "" || this.colorTexto === undefined) {
      alert("Ingrese una color para la promo");
      return
    };


    if (this.urlImagenPromo === "" || this.urlImagenPromo === undefined) {
      alert("Ingrese una URL para la imagen de la promo con el siguiente formato: https://images.unsplash.com/photo");
      return
    };

    if (this.fechaPromo === "" || this.fechaPromo === undefined) {
      alert("Ingrese una fecha para la imagen de la promo");
      return
    };

    const carteleraSec = new CarteleraSecundaria(this.idPromo, this.imgParaCelOPc, this.tituloPromo, this.textoPromo, this.colorTexto, this.urlImagenPromo, this.fechaPromo)
    this.cartServSec.actualizarPromosNovSec(this.idPromo, carteleraSec).subscribe(data => {
      alert("Cartelera secundaria editada");
      console.log("Msj. Servidor: " + JSON.stringify(data));
      this.listaPromoNovedadSec();
    }, err => {
      console.log("Msj. Serv: " + err.error.message);
      alert("Msj. Serv: " + err.error.message);
    });
  };

  //✮------------------------------------------------------------------------------------------------------------✮ 

  //FUNCION PARA CREAR EXCEL CON LISTA COMPLETA
  ///////////////////////////////////////////////////


  //genera el archivo excel
  generateExcel(liCartPrin: any[], liCartSec: any[], cartelerasCompletas: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Creamos la hoja de Excel para la primera lista 
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liCartPrin);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Cartelera secundaria');

    // Creamos la hoja de Excel para la segunda lista
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liCartSec);
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Cartelera primaria');


    // Convierte el libro de Excel en un archivo binario y crea un enlace de descarga
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = cartelerasCompletas + '.xlsx'; // Nombre del archivo de Excel
    link.click(); // Simula un clic en el enlace para iniciar la descarga
    window.URL.revokeObjectURL(url); // Libera el recurso del enlace


  };

  //descarga el excel generado
  exportToExcelOnClick(): void {
    // Mostrar mensaje de advertencia para la descarga del archivo
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo ¿desea continuar?');

    if (msjAdvertenciaDescarga) {
      // Obtener las listas de la cartelera primaria y secundaria
      forkJoin([
        this.cartServ.listPromosNov().pipe(catchError(error => of([]))), // Si ocurre un error al obtener la primer lista, devuelve una lista vacía
        this.cartServSec.listPromosNovSec().pipe(catchError(error => of([])))  // Si ocurre un error al obtener la segunda lista, devuelve una lista vacía
      ]).subscribe(([carteleraPrimaria, carteleraSecundaria]) => {
        // Generar el archivo Excel con las listas obtenidas
        this.generateExcel(carteleraSecundaria, carteleraPrimaria, 'carteleras');
      });
    }
  };

}
