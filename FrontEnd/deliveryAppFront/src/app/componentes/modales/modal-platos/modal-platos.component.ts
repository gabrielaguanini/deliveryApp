import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-platos',
  templateUrl: './modal-platos.component.html',
  styleUrls: ['./modal-platos.component.css']
})
export class ModalPlatosComponent {
modalBebidas!: BsModalRef;
modalCarnes!: BsModalRef;
modalPollos!: BsModalRef;
modalGuarniciones!: BsModalRef;


constructor(private modalService:BsModalService){}

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

}
