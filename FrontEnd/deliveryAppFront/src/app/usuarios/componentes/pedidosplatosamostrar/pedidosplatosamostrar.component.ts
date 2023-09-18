import { Component, TemplateRef } from '@angular/core';
import { PlatosAMostrar } from '../../modelos/platos-amostrar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PlatosAMostrarService } from '../../servicios/platos-amostrar.service';
import { MenuCompletoModel } from '../../modelos/menu-completo-model';
import { TipoPlato } from '../../modelos/tipo-plato';
import { MenuCompletoServiceService } from '../../servicios/menu-completo-service.service';

@Component({
  selector: 'app-pedidosplatosamostrar',
  templateUrl: './pedidosplatosamostrar.component.html',
  styleUrls: ['./pedidosplatosamostrar.component.css']
})
export class PedidosplatosamostrarComponent {

  //MODAL MOSTRAR LISTA
  /////////////////////////////
  modalAgregarPlatosAMos!: BsModalRef;

  //MODAL MOSTRAR LISTA
  /////////////////////////////
  modalEditarPlatosAMos!: BsModalRef;



  //LISTAS
  ///////////////////////////////////
  platosAMostrarList: PlatosAMostrar[] = [];
  platosListForSelect: MenuCompletoModel [] = [];

  //CREAR PLATO A MOSTRAR Y EDITAR PLATO A MOSTRAR
  ///////////////////////////////////
  idPlato!:number;
  idPlatosAMostrar!:number;
  descripcionPlatoAMostrar!: string;  
  platosAMostrar!: PlatosAMostrar;
 


  constructor(private modalService: BsModalService,
              private plaMosServ: PlatosAMostrarService,
              private platosServ: MenuCompletoServiceService            
  ) {};


  ngOnInit(): void {
    this.listaPlatosAMostrar(); //muestra la lista de platos a mostrar
    this.listaPlatosForSelect() // muestra la lista de platos para etiqueta select de editar plato a mostrar
 
  };


  //MODAL PLATOS A MOSTRAR
  ////////////////////////////
  openModalAgregarPlatosAMos(templateAgregarPlatoAMostrar: TemplateRef<any>){
  this.modalAgregarPlatosAMos = this.modalService.show(templateAgregarPlatoAMostrar, {backdrop: 'static'})
  };


  //MODAL EDITAR PLATOS A MOSTRAR
  ////////////////////////////
  openModalEditarPlatosAMos(templateEditarPlatoAMostrar: TemplateRef<any>){
    this.modalEditarPlatosAMos = this.modalService.show(templateEditarPlatoAMostrar, {backdrop: 'static'})
  };


  // FUNCIONES PARA LISTAS
  ///////////////////////////////////
  listaPlatosAMostrar(): void{
    this.plaMosServ.listaPlatosAMostrar().subscribe(data => this.platosAMostrarList = data)
  };

  listaPlatosForSelect():void{
    this.platosServ.listaPlatos().subscribe( data => this.platosListForSelect = data);
  }


  //AGREGAR PLATOS A MOSTRAR
  //////////////////////////
  agregarPlatoAMos():void{
    const tipoPlat = new TipoPlato(0,"","","");
    const plat = new MenuCompletoModel(this.idPlato, tipoPlat, "",0, "");
    const plaMos = new PlatosAMostrar(0, this.descripcionPlatoAMostrar, plat )
    this.plaMosServ.guardarPlatoAMostrar(plaMos).subscribe(data => {
      this.listaPlatosAMostrar();
      alert("Plato guardado");},
      err => {
      alert("No se guardó el plato");
      }
      );
  };

  //EDITAR PLATOS A MOSTRAR
  //////////////////////////
  obtenerPlaMosXId(idPlatoAMostrar:number, idPlato: number, descripcionPlatoAMostrar: string): void{
   this.idPlatosAMostrar = idPlatoAMostrar;
   this.idPlato = idPlato;
   this.descripcionPlatoAMostrar = descripcionPlatoAMostrar;
   
  };

  editarPlatoAMos():void{
    const tipoPl = new TipoPlato(0,"","","");
    const platos = new MenuCompletoModel(this.idPlato, tipoPl, "", 0, "");
    const plaMos = new PlatosAMostrar(this.idPlatosAMostrar, this.descripcionPlatoAMostrar, platos);
  
    // Mostrar el JSON que se enviará en la solicitud HTTP
    const requestData = {
      idPlatosAMostrar: plaMos.idPlatosAMostrar,
      descripcionPlatoAMostrar: plaMos.descripcionPlatoAMostrar,
      platos: {
        idPlato: plaMos.platos.idPlato
        // Agrega otros campos relevantes de 'platos' si los tienes
      }
    };
    console.log("Datos del plato para editar (antes de la solicitud HTTP):", requestData);
  
    // Realizar la solicitud HTTP y el resto del código
    this.plaMosServ.actualizarPlatoAMostrar(this.idPlatosAMostrar, plaMos).subscribe(data => {
      this.listaPlatosAMostrar();
      alert("Plato actualizado");
    }, err => {
      alert("No se actualizó el plato");
    });
  }
  

  //BORRAR TIPO DE PLATO
  /////////////////////////
  
  borrarPlatoAMostrar(idPlatosAMostrar: number):void{
    if(idPlatosAMostrar != undefined){
      this.plaMosServ.borrarPlatoAMostrar(idPlatosAMostrar).subscribe( data => {
        alert("Plato a mostrar eliminado");
        this.listaPlatosAMostrar(); //refresca la lista de platos a mostrar cuando se elimina un registro
      }, err => "No se eliminó el plato a mostrar")
  };
};

 borrarPlatMosMensajeAdv(idPlatosAMostrar:number): void {
  const msjAdvertenciaElim = window.confirm('¿Estás seguro de que quieres eliminar estos datos?');
  if(msjAdvertenciaElim){
    this.borrarPlatoAMostrar(idPlatosAMostrar);
  } else {
    ""
  };
 };

  //FUNCIONES VARIAS
  ///////////////////////////////////
  borrarInputs(): void{
    this.idPlato = 0
    this.descripcionPlatoAMostrar = "";
  };

}
