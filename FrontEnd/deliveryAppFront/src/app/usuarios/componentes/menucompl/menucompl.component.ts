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



  //LISTAS
  ///////////////////////////////////

  menuCompModel: MenuCompletoModel[] = [];
  tiposPlatosModel: TipoPlato[] = [];

  //CREAR PLATO
  ///////////////////////////////////

  idPlato!: number;
  tipoPlato!: TipoPlato;
  nombrePlato!: string;
  precioPlato!: any;
  idTipoPla!: number;

  //EDITAR PLATO
  ///////////////////////////////////
  menuCompMod!: MenuCompletoModel;
  idPla: any = {idPl:""};
  nombrePla: any = {nombrePla:""};
  precioPla: any = {precioPla:""};


  constructor(private modalService: BsModalService,
    private menucomServ: MenuCompletoServiceService,
    private tipoPlaServ: TiposPlatosService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.listTipPla();
    this.obtenerPlaXId(this.idPlato, this.nombrePlato, this.precioPlato);

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
   }, err => console.log("No se pueden traer los registros de la db para editar"))
  }
  };

  //EDITAR PLATO
  ///////////////////////////////////
  
  obtenerPlaXId(idPlato:number, nombrePlato:string, precioPlato:number):void{
   this.idPla = idPlato;
   this.nombrePla = nombrePlato;
   this.precioPla = precioPlato;
  };

  editarPlato(idPlato:number, menuCompletoModel:MenuCompletoModel){
   this.menucomServ.actualizarPlato(this.idPla, this.menuCompMod).subscribe( data =>
    {this.mostrarListaTipoPlato(this.idTipoPla);})
  };






//FUNCIONES VARIAS
///////////////////////////////////
 borrarInputs(): void{
  this.nombrePlato = "";
  this.precioPlato = 0;
 }
}



