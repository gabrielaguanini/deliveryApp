import { Component, TemplateRef } from '@angular/core';
import { FooterYLogoModel } from '../../modelos/footer-ylogo-model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FooterYLogoService } from '../../servicios/footer-ylogo.service';
import * as XLSX from 'xlsx';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-footer-ylogo-crud',
  templateUrl: './footer-ylogo-crud.component.html',
  styleUrls: ['./footer-ylogo-crud.component.css']
})
export class FooterYLogoCrudComponent {

  footerYLogoList: FooterYLogoModel[] = [];
  footYLogo!: FooterYLogoModel;

  idOtrosDatos!: number;
  nombreDatoAMostrar!: string;
  textoAMostrar!: string;
  urlAMostrar!: string;
  iconoOImgAMostrar!: string;


  constructor(private fooYLoServ: FooterYLogoService, private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.listaFooteryLogo();
  }

  listaFooteryLogo(): void {
    this.fooYLoServ.listaFooterYLogo().subscribe(data => {
      this.footerYLogoList = data;
      console.log("Lista de footer y logo recibida correctamente")
      //console.log('Datos recibidos:', this.footerYLogoList); // Muestra los datos en la consola
    }, err => {
      console.error("Error al procesar la solicitud para obtener una lista de de footer y logo. Msj. Serv: " + err.error.message);
    }
    );
  }


  //MODAL EDITAR FOOTER Y LOGO
  ///////////////////////
  modalEditarFooYLo!: BsModalRef;

  //MODAL INFO
  ///////////////////////
  modalInfo!: BsModalRef;


  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽=   FUNCIONES PARA MODAL EDITAR FOOTER Y LOGO =☾∘∙⊱⋅•⋅   
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈

  /**
   * Abre un modal para editar el pie de página y el logo.
   * @param templateEditarFooterYLogo - Plantilla del modal para editar el pie de página y el logo.
   */
  openModalEditarfooYLo(templateEditarFooterYLogo: TemplateRef<any>) {
    this.modalEditarFooYLo = this.modalService.show(templateEditarFooterYLogo, { backdrop: 'static' });
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra u oculta un modal con información adicional.
   * @param templateModalInfo - Plantilla del modal con información adicional.
   */
  mostrarOcultarModalInfo(templateModalInfo: TemplateRef<any>): void {
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static' });
  }


  //✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈
  //⋅•⋅⊰∙∘☽= EDITAR PROMOCION/NOVEDAD/CARTELERA PRINCIPAL =☾∘∙⊱⋅•⋅   
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓◈

  /**
  * Configura los detalles de un objeto usando el identificador y los datos proporcionados.
  * @param idOtrosDatos - Identificador único del objeto.
  * @param nombreDatoAMostrar - Nombre del dato a mostrar.
  * @param textoAMostrar - (Opcional) Texto adicional a mostrar.
  * @param urlAMostrar - (Opcional) URL asociada al dato.
  * @param iconoOImgAMostrar - (Opcional) Icono o imagen a mostrar. Puede ser undefined, se asigna un valor por defecto si es necesario.
  */
  obtenerXId(
    idOtrosDatos: number,
    nombreDatoAMostrar: string,
    textoAMostrar?: string,
    urlAMostrar?: string,
    iconoOImgAMostrar?: string  // Puede ser undefined
  ): void {
    this.idOtrosDatos = idOtrosDatos;
    this.nombreDatoAMostrar = nombreDatoAMostrar;
    this.textoAMostrar = textoAMostrar ?? '';
    this.urlAMostrar = urlAMostrar ?? '';
    this.iconoOImgAMostrar = iconoOImgAMostrar ?? '';  // Asigna un valor por defecto si es undefined
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
   * Edita los detalles de un registro de la entidad FooterYLogo utilizando el identificador y datos proporcionados.
   * Realiza validaciones para asegurar que todos los campos requeridos estén completos y dentro de los límites permitidos.
   * Si los datos son válidos, actualiza el registro en el servidor y muestra mensajes de éxito o error.
   */
  editarFooyLo(): void {

    // Verifica si el identificador es válido
    if (this.idOtrosDatos === 0 || this.idOtrosDatos === undefined || isNaN(this.idOtrosDatos)) {
      alert("No se ha cargado el idOtrosDatos, contactar al desarrollador");
      return;
    }

    // Verifica si el nombre del dato está presente
    if (this.nombreDatoAMostrar === "" || this.nombreDatoAMostrar === undefined) {
      alert("No se ingresó un nombre para el registro de la tabla FooterYLogo. Ingrese uno para continuar.");
      return;
    }

    // Verifica si el texto a mostrar cumple con el límite de caracteres
    if (this.textoAMostrar.length > 60) {
      alert("El máximo de caracteres permitidos para el texto es 60.");
      return;
    }

    // Crea un objeto FooterYLogoModel con los datos proporcionados
    const footYLogo = new FooterYLogoModel(
      this.idOtrosDatos,
      this.nombreDatoAMostrar,
      this.textoAMostrar,
      this.urlAMostrar,
      this.iconoOImgAMostrar
    );

    // Llama al servicio para actualizar el registro y maneja la respuesta
    this.fooYLoServ.actualizarFooYLo(this.idOtrosDatos, footYLogo).subscribe(
      data => {
        alert("Footer y logo editados");
        console.log("Footer y logo editados. Msj. Serv.: " + JSON.stringify(data));
        this.listaFooteryLogo();  // Actualiza la lista de FooterYLogo después de la edición
      },
      err => {
        console.error("Error al procesar la solicitud para actualizar un registro de footer y logo. Msj. Serv: " + err.error.message);
        alert("Error al procesar la solicitud para actualizar un registro de footer y logo");
      }
    );
  }


  //✮------------------------------------------------------------------------------------------------------------✮

  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= FUNCION PARA CREAR EXCEL CON LISTA COMPLETA =☾∘∙⊱⋅•⋅   
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈

  /**
  * Genera un archivo Excel con los datos proporcionados y lo descarga automáticamente.
  * 
  * @param liNavBarFoot - Lista de datos para incluir en la hoja de Excel.
  * @param datosNavBarYFooter - Nombre del archivo de Excel que se descargará.
  */
  generateExcel(liNavBarFoot: any[], datosNavBarYFooter: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Crea una hoja de Excel con la lista de datos
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liNavBarFoot);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Lista navbar y footer');

    // Convierte el libro de Excel a un formato binario y crea un enlace de descarga
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = datosNavBarYFooter + '.xlsx'; // Nombre del archivo de Excel
    link.click(); // Simula un clic en el enlace para iniciar la descarga
    window.URL.revokeObjectURL(url); // Libera el recurso del enlace
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Muestra un mensaje de advertencia y, si el usuario confirma, genera y descarga el archivo Excel con los datos.
   */
  exportToExcelOnClick(): void {
    // Muestra un mensaje de advertencia antes de comenzar la descarga
    const msjAdvertenciaDescarga = window.confirm('Comenzará la descarga del archivo ¿desea continuar?');

    if (msjAdvertenciaDescarga) {
      // Obtiene la lista de FooterYLogo y maneja errores en caso de fallo
      forkJoin([
        this.fooYLoServ.listaFooterYLogo().pipe(catchError(error => of([])))  // Devuelve una lista vacía en caso de error
      ]).subscribe(([footerYLogoList]) => {
        // Genera el archivo Excel con la lista obtenida
        this.generateExcel(footerYLogoList, 'footerYLogoLista');
      });
    }
  }


  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Verifica si una URL es una imagen basándose en el protocolo https.
   * 
   * @param url - La URL a verificar.
   * @returns `true` si la URL comienza con 'https://', `false` en caso contrario.
   */
  isImage(url: string): boolean {
    // Verifica si la URL comienza con 'https://'
    return /^https:\/\/.*/i.test(url);
  }

  //✮------------------------------------------------------------------------------------------------------------✮
  /**
   * Maneja el error de carga de una imagen y establece una imagen por defecto.
   * 
   * @param event - El evento de error de carga de la imagen.
   */
  onImageError(event: Event): void {
    // Obtiene el elemento de imagen que generó el error
    const imgElement = event.target as HTMLImageElement;
    // Establece una imagen por defecto en caso de error de carga
    imgElement.src = '../assets/fondoblanco.jpg'; // Redirige a una imagen en blanco
    // Hace que la imagen sea transparente en caso de error
    imgElement.style.opacity = '0'; // Deja la imagen transparente
  }
  //✮------------------------------------------------------------------------------------------------------------✮

}
