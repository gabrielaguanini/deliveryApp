import { Component, TemplateRef } from '@angular/core';
import { Cartelera } from '../../modelos/cartelera';
import { CarteleraSecundaria } from '../../modelos/cartelera-secundaria';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CarteleraService } from '../../servicios/cartelera.service';
import { CarteleraSecundariaService } from '../../servicios/cartelera-secundaria.service';

@Component({
  selector: 'app-carteleras-crud',
  templateUrl: './carteleras-crud.component.html',
  styleUrls: ['./carteleras-crud.component.css']
})
export class CartelerasCrudComponent {

  idPromo !:number;
  imgParaCelOPc !:string;
  tituloPromo !:string;
  textoPromo !:string;
  colorTexto !:string;
  urlImagenPromo !:string;
  fechaPromo !:string;

    //MODAL EDITAR PROMO NOVEDAD PRINCIPAL
  ///////////////////////
  modalEditarPromoNovedad!: BsModalRef;

  //MODAL EDITAR PROMO NOVEDAD SECUNDARIA
  ///////////////////////
  modalEditarPromoNovedadSec!: BsModalRef;


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
    this.modalEditarPromoNovedad = this.modalService.show(templateEditarPromoNovedad, {backdrop: 'static'});
  };

  //MODAL EDITAR PROMO/NOVEDAD SECUNDARIA
  ////////////////////////////

  openModalEditarPromoNovedadSec(templateEditarPromoNovedadSec: TemplateRef<any>) {
    this.modalEditarPromoNovedadSec = this.modalService.show(templateEditarPromoNovedadSec, {backdrop: 'static'});
  }


//✮------------------------------------------------------------------------------------------------------------✮

   //EDITAR PROMOCION/NOVEDAD/CARTELERA PRINCIPAL
  /////////////////////////

  obtenerPromoXId(idPromo:number, imgParaCelOPc:string, tituloPromo:string, textoPromo:string, colorTexto:string, urlImagenPromo:string, fechaPromo: string):void{
    this.idPromo = idPromo;
    this.imgParaCelOPc = imgParaCelOPc;
    this.tituloPromo = tituloPromo;
    this.textoPromo = textoPromo;
    this.colorTexto = colorTexto;
    this.urlImagenPromo = urlImagenPromo;
    this.fechaPromo = fechaPromo;

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

    if(this.tituloPromo.length > 21 ) {
      alert("El maximo de caracteres permitidos para el titulo de la promo es 21.");      
      return
    };

    if(this.textoPromo === "" || this.textoPromo === undefined){
      alert("Ingrese una descripcion para la promo");
      return
    };

    if(this.textoPromo.length > 70 ) {
      alert("El maximo de caracteres permitidos para la descripcion de la promo es 70.");      
      return
    };

    if(this.colorTexto === "" || this.colorTexto === undefined){
      alert("Ingrese una color para la promo");
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

    const cartelera = new Cartelera (this.idPromo, this.imgParaCelOPc, this.tituloPromo, this.textoPromo, this.colorTexto, this.urlImagenPromo, this.fechaPromo)
    this.cartServ.actualizarPromosNov(this.idPromo, cartelera).subscribe(data => 
      {        
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

  
  obtenerPromoSecXId(idPromo:number, imgParaCelOPc:string, tituloPromo:string, textoPromo:string, colorTexto:string, urlImagenPromo:string, fechaPromo: string):void{
    this.idPromo = idPromo;
    this.imgParaCelOPc = imgParaCelOPc;
    this.tituloPromo = tituloPromo;
    this.textoPromo = textoPromo;
    this.colorTexto = colorTexto;
    this.urlImagenPromo = urlImagenPromo;
    this.fechaPromo = fechaPromo;

  };

  
  editarCarteleraSec(): void{

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

    if(this.tituloPromo.length > 22 ) {
      alert("El maximo de caracteres permitidos para el titulo de la promo es 22.");      
      return
    };

    if(this.textoPromo === "" || this.textoPromo === undefined){
      alert("Ingrese una descripcion para la promo");
      return
    };

    if(this.textoPromo.length > 96 ) {
      alert("El maximo de caracteres permitidos para la descripcion de la promo es 96.");      
      return
    };

    if(this.colorTexto === "" || this.colorTexto === undefined){
      alert("Ingrese una color para la promo");
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

    const carteleraSec = new CarteleraSecundaria (this.idPromo, this.imgParaCelOPc, this.tituloPromo, this.textoPromo, this.colorTexto, this.urlImagenPromo, this.fechaPromo)
    this.cartServSec.actualizarPromosNovSec(this.idPromo, carteleraSec).subscribe(data => 
      {        
        alert("Cartelera secundaria editada");   
        console.log("Msj. Servidor: " + JSON.stringify(data)); 
        this.listaPromoNovedadSec();   
      }, err => {
        console.log("Msj. Serv: " + err.error.message);
        alert("Msj. Serv: " + err.error.message);
      });
  };




}
