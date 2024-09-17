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

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Obtiene la lista de promociones y novedades y la asigna a 'promosyNovedadesModel'.
  */
  listaPromoNovedad(): void {
    this.cartServ.listPromosNov().subscribe(data => this.promosyNovedadesModel = data);
  }


  //✮------------------------------------------------------------------------------------------------------------✮
  /**
  * Obtiene la lista de promociones y novedades  y la asigna a 'promosyNovedadesModelSec'.
  */
  listaPromoNovedadSec(): void {
    this.cartServSec.listPromosNovSec().subscribe(data => this.promosyNovedadesModelSec = data);
  };

  //✮------------------------------------------------------------------------------------------------------------✮

  // FUNCIONES PARA MODAL EDITAR PROMO/NOVEDAD PRINCIPAL
  ////////////////////////////

  /**
   * Abre el modal para editar una promoción o novedad principal.
   */
  openModalEditarPromoNovedad(templateEditarPromoNovedad: TemplateRef<any>) {
    this.modalEditarPromoNovedad = this.modalService.show(templateEditarPromoNovedad, { backdrop: 'static' });
  }

  /**
   * Abre el modal para editar una promoción o novedad secundaria.
   */
  openModalEditarPromoNovedadSec(templateEditarPromoNovedadSec: TemplateRef<any>) {
    this.modalEditarPromoNovedadSec = this.modalService.show(templateEditarPromoNovedadSec, { backdrop: 'static' });
  }

  /**
   * Muestra u oculta el modal de información.
   */
  mostrarOcultarModalInfo(templateModalInfo: TemplateRef<any>): void {
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static' });
  }


  //✮------------------------------------------------------------------------------------------------------------✮

  //EDITAR PROMOCION/NOVEDAD/CARTELERA PRINCIPAL
  /////////////////////////

  /**
   * Asigna los valores proporcionados a las propiedades relacionadas con la promoción.
   * @param idPromo - ID de la promoción.
   * @param imgParaCelOPc - Indicador de imagen para celulares o PC.
   * @param tituloPromo - Título de la promoción.
   * @param textoPromo - Descripción de la promoción.
   * @param colorTexto - Color del texto de la promoción.
   * @param urlImagenPromo - URL de la imagen de la promoción.
   * @param fechaPromo - Fecha de la promoción.
   */
  obtenerPromoXId(idPromo: number, imgParaCelOPc: string, tituloPromo: string, textoPromo: string, colorTexto: string, urlImagenPromo: string, fechaPromo: string): void {
    this.idPromo = idPromo;
    this.imgParaCelOPc = imgParaCelOPc;
    this.tituloPromo = tituloPromo;
    this.textoPromo = textoPromo;
    this.colorTexto = colorTexto;
    this.urlImagenPromo = urlImagenPromo;
    this.fechaPromo = fechaPromo;
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Valida los datos de la promoción y actualiza la promoción si todos los datos son válidos.
   * Muestra alertas si faltan datos o si los datos no cumplen con los requisitos.
   */
  editarCartelera(): void {
    if (this.idPromo === 0 || this.idPromo === undefined || isNaN(this.idPromo)) {
      alert("No se ha cargado el idPromo, contactar al desarrollador");
      return;
    }

    if (this.imgParaCelOPc === "" || this.imgParaCelOPc === undefined) {
      alert("Ingrese 'Celulares' o 'Pc' para imagen según el dispositivo.");
      return;
    }

    if (this.tituloPromo === "" || this.tituloPromo === undefined) {
      alert("Ingrese un título para la promo");
      return;
    }

    if (this.tituloPromo.length > 21) {
      alert("El título no puede exceder 21 caracteres.");
      return;
    }

    if (this.textoPromo === "" || this.textoPromo === undefined) {
      alert("Ingrese una descripción para la promo");
      return;
    }

    if (this.textoPromo.length > 70) {
      alert("La descripción no puede exceder 70 caracteres.");
      return;
    }

    if (this.colorTexto === "" || this.colorTexto === undefined) {
      alert("Ingrese un color para el texto de la promo");
      return;
    }

    if (this.urlImagenPromo === "" || this.urlImagenPromo === undefined) {
      alert("Ingrese una URL válida para la imagen de la promo.");
      return;
    }

    if (this.fechaPromo === "" || this.fechaPromo === undefined) {
      alert("Ingrese una fecha para la promo");
      return;
    }

    // Crea una nueva instancia de Cartelera con los datos proporcionados y la actualiza
    const cartelera = new Cartelera(this.idPromo, this.imgParaCelOPc, this.tituloPromo, this.textoPromo, this.colorTexto, this.urlImagenPromo, this.fechaPromo);
    this.cartServ.actualizarPromosNov(this.idPromo, cartelera).subscribe(
      data => {
        alert("Cartelera editada");
        console.log("Cartelera editada. Msj. Servidor: " + JSON.stringify(data));
        this.listaPromoNovedad(); // Actualiza la lista de promociones y novedades
      },
      err => {
        console.error("Error al procesar la solicitud para editar la cartelera. Msj. Serv: " + err.error.message);
        alert("Error al procesar la solicitud para editar la cartelera.");
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮ 

  //EDITAR PROMOCION/NOVEDAD/CARTELERA SECUNDARIA
  /////////////////////////


  /**
   * Asigna valores a las propiedades relacionadas con la promoción secundaria.
   * @param idPromo - ID de la promoción.
   * @param imgParaCelOPc - Indicador de imagen para celulares o PC.
   * @param tituloPromo - Título de la promoción.
   * @param textoPromo - Descripción de la promoción.
   * @param colorTexto - Color del texto de la promoción.
   * @param urlImagenPromo - URL de la imagen de la promoción.
   * @param fechaPromo - Fecha de la promoción.
   */
  obtenerPromoSecXId(idPromo: number, imgParaCelOPc: string, tituloPromo: string, textoPromo: string, colorTexto: string, urlImagenPromo: string, fechaPromo: string): void {
    this.idPromo = idPromo;
    this.imgParaCelOPc = imgParaCelOPc;
    this.tituloPromo = tituloPromo;
    this.textoPromo = textoPromo;
    this.colorTexto = colorTexto;
    this.urlImagenPromo = urlImagenPromo;
    this.fechaPromo = fechaPromo;
  }

  //✮------------------------------------------------------------------------------------------------------------✮ 

  /**
   * Valida los datos de la promoción secundaria y actualiza la promoción si todos los datos son válidos.
   * Muestra alertas si faltan datos o si los datos no cumplen con los requisitos.
   */
  editarCarteleraSec(): void {
    if (this.idPromo === 0 || this.idPromo === undefined || isNaN(this.idPromo)) {
      alert("No se ha cargado el idPromo, contactar al desarrollador");
      return;
    }

    if (this.imgParaCelOPc === "" || this.imgParaCelOPc === undefined) {
      alert("Ingrese 'Celulares' o 'Pc' para la imagen según el dispositivo.");
      return;
    }

    if (this.tituloPromo === "" || this.tituloPromo === undefined) {
      alert("Ingrese un título para la promoción.");
      return;
    }

    if (this.tituloPromo.length > 22) {
      alert("El título no puede exceder 22 caracteres.");
      return;
    }

    if (this.textoPromo === "" || this.textoPromo === undefined) {
      alert("Ingrese una descripción para la promoción.");
      return;
    }

    if (this.textoPromo.length > 96) {
      alert("La descripción no puede exceder 96 caracteres.");
      return;
    }

    if (this.colorTexto === "" || this.colorTexto === undefined) {
      alert("Ingrese un color para el texto de la promoción.");
      return;
    }

    if (this.urlImagenPromo === "" || this.urlImagenPromo === undefined) {
      alert("Ingrese una URL válida para la imagen de la promoción.");
      return;
    }

    if (this.fechaPromo === "" || this.fechaPromo === undefined) {
      alert("Ingrese una fecha para la promoción.");
      return;
    }

    // Crea una nueva instancia de CarteleraSecundaria con los datos proporcionados y actualiza la promoción secundaria
    const carteleraSec = new CarteleraSecundaria(this.idPromo, this.imgParaCelOPc, this.tituloPromo, this.textoPromo, this.colorTexto, this.urlImagenPromo, this.fechaPromo);
    this.cartServSec.actualizarPromosNovSec(this.idPromo, carteleraSec).subscribe(
      data => {
        alert("Cartelera secundaria editada");
        console.log("Cartelera secundaria editada. Msj. Servidor: " + JSON.stringify(data));
        this.listaPromoNovedadSec(); // Actualiza la lista de promociones secundarias
      },
      err => {
        console.error("Error al procesar la solicitud para editar la cartelera secundaria. Msj. Serv: " + err.error.message);
        alert("Error al procesar la solicitud para editar la cartelera secundaria");
      }
    );
  }


  //✮------------------------------------------------------------------------------------------------------------✮ 

  //FUNCION PARA CREAR EXCEL CON LISTA COMPLETA
  ///////////////////////////////////////////////////


  /**
 * Genera un archivo Excel con dos hojas a partir de las listas proporcionadas y lo descarga.
 * @param liCartPrin - Lista de datos para la hoja "Cartelera secundaria".
 * @param liCartSec - Lista de datos para la hoja "Cartelera primaria".
 * @param cartelerasCompletas - Nombre del archivo Excel que se descargará.
 */
  generateExcel(liCartPrin: any[], liCartSec: any[], cartelerasCompletas: string): void {
    // Crear un nuevo libro de Excel
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Crear y agregar la hoja para la primera lista
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liCartPrin);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Cartelera secundaria');

    // Crear y agregar la hoja para la segunda lista
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liCartSec);
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Cartelera primaria');

    // Convertir el libro a un buffer y crear un archivo Blob
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Crear un enlace de descarga y simular un clic para iniciar la descarga
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = cartelerasCompletas + '.xlsx';
    link.click();
    window.URL.revokeObjectURL(url); // Liberar el recurso del enlace
  }

  /**
   * Muestra un mensaje de advertencia para la descarga del archivo Excel y, si el usuario acepta, 
   * obtiene las listas de promociones y genera el archivo Excel.
   */
  exportToExcelOnClick(): void {
    // Confirmar con el usuario si desea continuar con la descarga
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo ¿desea continuar?');

    if (msjAdvertenciaDescarga) {
      // Obtener las listas de promociones primaria y secundaria
      forkJoin([
        this.cartServ.listPromosNov().pipe(catchError(error => of([]))), // Manejar errores devolviendo una lista vacía
        this.cartServSec.listPromosNovSec().pipe(catchError(error => of([]))) // Manejar errores devolviendo una lista vacía
      ]).subscribe(([carteleraPrimaria, carteleraSecundaria]) => {
        // Generar el archivo Excel y descargarlo
        this.generateExcel(carteleraSecundaria, carteleraPrimaria, 'carteleras');
      });
    }
  }

}