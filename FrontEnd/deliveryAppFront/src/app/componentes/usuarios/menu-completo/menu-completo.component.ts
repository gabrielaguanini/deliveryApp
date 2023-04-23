import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuCompletoModel } from 'src/app/usuarios/modelos/menu-completo-model';
import { MenuCompletoServiceService } from 'src/app/usuarios/servicios/menu-completo-service.service';

@Component({
  selector: 'app-menu-completo',
  templateUrl: './menu-completo.component.html',
  styleUrls: ['./menu-completo.component.css']
})
export class MenuCompletoComponent {

//MODALES
/////////////////////////////

  modalBebidas!: BsModalRef;
  modalCarnes!: BsModalRef;
  modalPollos!: BsModalRef;
  modalGuarniciones!: BsModalRef;

//LISTAS
///////////////////////////////////

menuCompModel:MenuCompletoModel[] = [];




  
  constructor(private modalService:BsModalService,
              private menucomServ:MenuCompletoServiceService){}

  ngOnInit(): void {

    this.mostrarListaMenu();

    
  }

//MODALES
/////////

  openModalBebidas(templateBebidas: TemplateRef<any>){
    this.modalBebidas = this.modalService.show(templateBebidas);
  }
  
  openModalCarnes(templateCarnes: TemplateRef<any>){
    this.modalCarnes = this.modalService.show(templateCarnes);
  }
  
  openModalPollos(templatePollos: TemplateRef<any>){
    this.modalPollos = this.modalService.show(templatePollos);
  }
  
  openModalGuarniciones(templateGuarniciones: TemplateRef<any>){
    this.modalGuarniciones = this.modalService.show(templateGuarniciones);
  }

//LISTAS
///////////////////////////////////


mostrarListaMenu():void{

  
this.menucomServ.listaPlatos().subscribe(data => this.menuCompModel = data);  
 
  
  }
}
