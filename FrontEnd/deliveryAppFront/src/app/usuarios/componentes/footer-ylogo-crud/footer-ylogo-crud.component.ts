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
    //console.log('Datos recibidos:', this.footerYLogoList); // Muestra los datos en la consola
  });
}


  //MODAL EDITAR FOOTER Y LOGO
  ///////////////////////
  modalEditarFooYLo!: BsModalRef;

    //MODAL INFO
  ///////////////////////
  modalInfo!: BsModalRef;

  //FUNCIONES PARA MODAL EDITAR FOOTER Y LOGO
  ////////////////////////////

  openModalEditarfooYLo(templateEditarFooterYLogo: TemplateRef<any>) {
    this.modalEditarFooYLo = this.modalService.show(templateEditarFooterYLogo, {backdrop: 'static'});
  };

  mostrarOcultarModalInfo(templateModalInfo: TemplateRef<any>): void {
    this.modalInfo = this.modalService.show(templateModalInfo, { backdrop: 'static' })

  };

  //✮------------------------------------------------------------------------------------------------------------✮

   //EDITAR PROMOCION/NOVEDAD/CARTELERA PRINCIPAL
  /////////////////////////

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

  editarFooyLo(): void{

    if(this.idOtrosDatos === 0 || this.idOtrosDatos === undefined || isNaN(this.idOtrosDatos)){
      alert("No se ha cargado el idOtrosDatos, contactar al desarrollador");
      return
    };

    if(this.nombreDatoAMostrar === "" || this.nombreDatoAMostrar === undefined){
      alert("No se ingreso un nombre para el registro de la tabla FooterYLogo. Ingrese uno para continuar.");
      return
    };

   

    if(this.textoAMostrar.length > 60 ) {
      alert("El maximo de caracteres permitidos para el texto es 60.");      
      return
    };
    

    const footYLogo = new FooterYLogoModel (this.idOtrosDatos, this.nombreDatoAMostrar, this.textoAMostrar, this.urlAMostrar, this.iconoOImgAMostrar)
    this.fooYLoServ.actualizarFooYLo(this.idOtrosDatos, footYLogo).subscribe(data => 
      {        
        alert("Footr y logo editados");   
        console.log("Msj. Servidor: " + JSON.stringify(data)); 
        this.listaFooteryLogo();  
      }, err => {
        console.log("Msj. Serv: " + err.error.message);
        alert("Msj. Serv: " + err.error.message);
      });
  };

//✮------------------------------------------------------------------------------------------------------------✮

 //FUNCION PARA CREAR EXCEL CON LISTA COMPLETA
  ///////////////////////////////////////////////////


  //genera el archivo excel
  generateExcel(liNavBarFoot: any[], datosNavBarYFooter: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Creamos la hoja de Excel para la lista 
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(liNavBarFoot);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Lista navbar y footer');




    // Convierte el libro de Excel en un archivo binario y crea un enlace de descarga
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = datosNavBarYFooter + '.xlsx'; // Nombre del archivo de Excel
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
        
        this.fooYLoServ.listaFooterYLogo().pipe(catchError(error => of([])))  // Si ocurre un error al obtener la  lista, devuelve una lista vacía
      ]).subscribe(([footerYLogoList]) => {
        // Generar el archivo Excel con las listas obtenidas
        this.generateExcel(footerYLogoList, 'footerYLogoLista');
      });
    }
  };

//✮------------------------------------------------------------------------------------------------------------✮
isImage(url: string): boolean {
  // Verifica si la URL comienza con https://
  return /^https:\/\/.*/i.test(url);
}


//Funcion para traer img por defecto cuando hay una url a un icono o una imagen
onImageError(event: Event): void {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = '../assets/fondoblanco.jpg';   //si hay error redirige a una imagen en blanco
  imgElement.style.opacity = '0'; //deja transparente la img si hay error
  
}

}
