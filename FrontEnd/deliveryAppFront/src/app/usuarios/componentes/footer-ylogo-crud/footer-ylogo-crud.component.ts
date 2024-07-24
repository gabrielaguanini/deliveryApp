import { Component, TemplateRef } from '@angular/core';
import { FooterYLogoModel } from '../../modelos/footer-ylogo-model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FooterYLogoService } from '../../servicios/footer-ylogo.service';

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
    this.fooYLoServ.listaFooterYLogo().subscribe(data => this.footerYLogoList = data);
  };

  //MODAL EDITAR FOOTER Y LOGO
  ///////////////////////
  modalEditarFooYLo!: BsModalRef;

  //FUNCIONES PARA MODAL EDITAR FOOTER Y LOGO
  ////////////////////////////

  openModalEditarfooYLo(templateEditarFooterYLogo: TemplateRef<any>) {
    this.modalEditarFooYLo = this.modalService.show(templateEditarFooterYLogo, {backdrop: 'static'});
  };


  //✮------------------------------------------------------------------------------------------------------------✮

   //EDITAR PROMOCION/NOVEDAD/CARTELERA PRINCIPAL
  /////////////////////////

  obtenerXId(idOtrosDatos:number, nombreDatoAMostrar:string, textoAMostrar:string, urlAMostrar: string, iconoOImgAMostrar: string):void{
    this.idOtrosDatos = idOtrosDatos;
    this.nombreDatoAMostrar = nombreDatoAMostrar;
    this.textoAMostrar = textoAMostrar;
    this.urlAMostrar = urlAMostrar;
    this.iconoOImgAMostrar = iconoOImgAMostrar;
  };

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

//Funcion para traer img por defecto cuando hay una url a un icono o una imagen
onImageError(event: Event): void {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = '../assets/fondoblanco.jpg';   //si hay error redirige a una imagen en blanco
  imgElement.style.opacity = '0'; //deja transparente la img si hay error
  
}

}
