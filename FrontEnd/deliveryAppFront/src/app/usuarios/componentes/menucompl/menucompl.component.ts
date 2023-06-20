import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuCompletoModel } from 'src/app/usuarios/modelos/menu-completo-model';
import { TipoPlato } from 'src/app/usuarios/modelos/tipo-plato';
import { MenuCompletoServiceService } from 'src/app/usuarios/servicios/menu-completo-service.service';
import { TiposPlatosService } from 'src/app/usuarios/servicios/tipos-platos.service';

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

  modalAgregarTiPla!: BsModalRef;


  //LISTAS
  ///////////////////////////////////

  menuCompModel: MenuCompletoModel[] = [];
  tiposPlatosModel: TipoPlato[] = [];

  //CREAR PLATO
  ///////////////////////////////////

  idPlato!: number;
  tipoPlato!: TipoPlato;
  nombrePlato!: string;
  precioPlato!: number;
  idTipoPla!: number;


  constructor(private modalService: BsModalService,
    private menucomServ: MenuCompletoServiceService,
    private tipoPlaServ: TiposPlatosService,

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

  openModalAgregarTiPl(templateAgregarTipoPlato: TemplateRef<any>, idTipoPlato: number) {
    this.idTipoPla = idTipoPlato;
    this.modalAgregarTiPla = this.modalService.show(templateAgregarTipoPlato);
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
    }, err => {
      alert("No se guardó el plato");
    });
  }


}
