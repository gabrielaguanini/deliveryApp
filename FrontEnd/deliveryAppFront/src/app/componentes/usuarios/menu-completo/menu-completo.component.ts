import { Component, TemplateRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuCompletoModel } from 'src/app/usuarios/modelos/menu-completo-model';
import { TipoPlato } from 'src/app/usuarios/modelos/tipo-plato';
import { MenuCompletoServiceService } from 'src/app/usuarios/servicios/menu-completo-service.service';
import { TiposPlatosService } from 'src/app/usuarios/servicios/tipos-platos.service';


@Component({
  selector: 'app-menu-completo',
  templateUrl: './menu-completo.component.html',
  styleUrls: ['./menu-completo.component.css']
})
export class MenuCompletoComponent {



//MODAL
/////////////////////////////

  modalMenuComp!: BsModalRef;
 

//LISTAS
///////////////////////////////////

menuCompModel:MenuCompletoModel[] = [];
tiposPlatosModel:TipoPlato[]=[];





  
  constructor(private modalService:BsModalService,
              private menucomServ:MenuCompletoServiceService,
              private tipoPlaServ:TiposPlatosService
              ){}

  ngOnInit(): void {

    this.listTipPla();
    
  }

  

//MODAL
/////////

  openModalMenuComp(templateMenuComp: TemplateRef<any>){
    this.modalMenuComp = this.modalService.show(templateMenuComp);
  }
  
 
//LISTAS
///////////////////////////////////

mostrarListaTipoPlato(idTipoPlato:number):void{  
  this.menucomServ.listaTipoPlatos(idTipoPlato).subscribe(data => this.menuCompModel = data);
  
    }

listTipPla():void{
  this.tipoPlaServ.listTiposPlatos().subscribe(data => this.tiposPlatosModel = data);
}
}


 