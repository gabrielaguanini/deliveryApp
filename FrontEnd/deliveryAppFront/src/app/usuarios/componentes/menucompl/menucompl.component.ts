import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuCompletoModel } from 'src/app/usuarios/modelos/menu-completo-model';
import { TipoPlato } from 'src/app/usuarios/modelos/tipo-plato';
import { MenuCompletoServiceService } from 'src/app/usuarios/servicios/menu-completo-service.service';
import { TiposPlatosService } from 'src/app/usuarios/servicios/tipos-platos.service';
import { Location } from '@angular/common';

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


  //LISTAS
  ///////////////////////////////////

  menuCompModel: MenuCompletoModel[] = [];
  tiposPlatosModel: TipoPlato[] = [];

  //CREAR PLATO Y EDITAR PLATO
  ///////////////////////////////////
  
  menuCompMod!: MenuCompletoModel;
  idPlato!: number;
  tipoPlato!: TipoPlato;
  nombrePlato!: string;
  precioPlato!: any;
  idTipoPla!: number;

  //CREAR Y EDITAR TIPO DE PLATO
  ///////////////////////////////

  idTipoPlato!:number;
  nombreTipoPlato! : string;
  imgTipoPlato!: string;

 
 



  constructor(private modalService: BsModalService,
    private menucomServ: MenuCompletoServiceService,
    private tipoPlaServ: TiposPlatosService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.listTipPla();   

  }



  //MODAL MOSTRAR LISTA
  //////////////////////

  openModalMenuComp(templateMenuComp: TemplateRef<any>) {
    this.modalMenuComp = this.modalService.show(templateMenuComp);
  }

  //MODAL AGREGAR PLATO
  //////////////////////////

  openModalAgregarPl(templateAgregarPlato: TemplateRef<any>, idTipoPlato: number) {
    this.idTipoPla = idTipoPlato;
    this.modalAgregarPla = this.modalService.show(templateAgregarPlato, { ignoreBackdropClick: true });
  }

  //MODAL EDITAR PLATO
  //////////////////////

  openModalEditarMenuComp(templateEditarMenuComp: TemplateRef<any>) {
    this.modalEditarMenuComp = this.modalService.show(templateEditarMenuComp);
  }

  //MODAL AGREGAR TIPO PLATO
  //////////////////////

  openModalAgregarTipoPlato(templateAgregarTipoPlato: TemplateRef<any>) {
      this.modalAgregarTipoPlato = this.modalService.show(templateAgregarTipoPlato);
  }

  //MODAL AGREGAR TIPO PLATO
  //////////////////////

  openModalEditarTipoPlato(templateEditarTipoPlato: TemplateRef<any>) {
    this.borrarInputs();
    this.modalEditarTipoPlato = this.modalService.show(templateEditarTipoPlato);
}



  //LISTAS
  ///////////////////////////////////

  mostrarListaTipoPlato(idTipoPlato: number): void {
    this.menucomServ.listaTipoPlatos(idTipoPlato).subscribe(data => this.menuCompModel = data);

  }

  listTipPla(): void {
    this.tipoPlaServ.listTiposPlatos().subscribe(data => this.tiposPlatosModel = data);
  }

  //CREAR PLATO
  ///////////////////////////////////
  onCreate(): void {

    const tipoPlato = new TipoPlato(this.idTipoPla, "", "");

    const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato);
    this.menucomServ.guardarPlato(menuCompMod).subscribe(data => {
      alert("Plato guardado");
      this.nombrePlato = "";
      this.precioPlato = "";
    }, err => {
      alert("No se guardó el plato");
    });
  }

  //BORRAR PLATO
  ///////////////////////////////////
  borrarPlato(idPlato:number, idTipoPla:number):void{
  if(idPlato!= undefined){
   this.menucomServ.borrarPlato(idPlato, idTipoPla).subscribe(data => {
    alert("Plato eliminado");
    this.mostrarListaTipoPlato(this.idTipoPla);
   }, err => console.log("No se pueden traer los registros de la db para borrar"))
  }
  };

  //EDITAR PLATO
  ///////////////////////////////////
  
  obtenerPlaXId(idPlato:number, nombrePlato:string, precioPlato:number, idTipoPlato:number):void{
   this.idPlato = idPlato;
   this.nombrePlato = nombrePlato;
   this.precioPlato = precioPlato;
   this.idTipoPla = idTipoPlato;
  };

  editarPlato(): void {
  

    const tipoPlato = new TipoPlato(this.idTipoPla,"", "");

    const menuCompMod = new MenuCompletoModel(this.idPlato, tipoPlato, this.nombrePlato, this.precioPlato);
    this.menucomServ.actualizarPlato(this.idPlato, menuCompMod).subscribe(data => {
      alert("Plato editado");
      this.nombrePlato = "";
      this.precioPlato = "";
      this.mostrarListaTipoPlato(this.idTipoPla);
    }, err => {
      alert("No se editó el plato");
    });
  }


//CREAR TIPO DE PLATO
///////////////////////

onCreateTipoPla(): void {

 const tipoPla = new TipoPlato(this.idTipoPlato, this.nombreTipoPlato, this.imgTipoPlato);
 this.tipoPlaServ.guardarTipoPlato(tipoPla).subscribe(data => {alert("Tipo de plato guardado");
 this.listTipPla()},
 err => {alert("No se creo el tipo de plato")})
};

//BORRAR TIOPO DE PLATO
/////////////////////////

borrarTipoPlato(idTipoPlato:number){
  if(idTipoPlato != undefined){
    this.tipoPlaServ.borrarTipoPlato(idTipoPlato).subscribe(data => {alert("Tipo de plato eliminado");
    this.listTipPla()},
   err => {alert("no se pudo eliminar el tipo de plato")})
  }
};


//EDITAR TIPO DE PLATO
/////////////////////////

obtenerTipoPlaXId(idTipoPla:number, nombreTipoPla:string, imgTipoPla:string):void{
  this.idTipoPlato = idTipoPla;
  this.nombreTipoPlato = nombreTipoPla;
  this.imgTipoPlato = imgTipoPla;
 };

editarTipoPlato(){

  const tipoPla = new TipoPlato(this.idTipoPlato, this.nombreTipoPlato, this.imgTipoPlato);
  this.tipoPlaServ.actualizarTipoPla(this.idTipoPlato, tipoPla).subscribe( data =>{
   alert("Tipo de plato editado");
   this.nombreTipoPlato = "";
   this.imgTipoPlato = "";
  this.mostrarListaTipoPlato(this.idTipoPla);
  }, err =>{
    alert("No se pudo editar el tipo de plato")
  })
};







//FUNCIONES VARIAS
///////////////////////////////////
 borrarInputs(): void{
  this.nombrePlato = "";
  this.precioPlato = 0;

  
  this.nombreTipoPlato = "";
  this.imgTipoPlato= "";

 }
}



