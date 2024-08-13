import { Component } from '@angular/core';
import { FooterYLogoModel } from 'src/app/usuarios/modelos/footer-ylogo-model';
import { FooterYLogoService } from 'src/app/usuarios/servicios/footer-ylogo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  idOtrosDatos!: number;
  footerYLogoList: FooterYLogoModel[] = [];
  ids:number[] = [1,4,6,7,8,9,10] //para usar con la funcion obtenerFooterYLogoList(ids: number[]) cambiar a los ids que se quieran

  constructor(private footYLogServ: FooterYLogoService){};

  ngOnInit(): void {
    this.obtenerFooterYLogoList(this.ids);   
  };

  isExpanded? = false;
  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
  };

  obtenerFooterYLogoList(ids: number[]): void {
    this.footYLogServ.listaFooterYLogoxId(ids).subscribe(
      data => {
        this.footerYLogoList = data; // Asigna los datos recibidos a la propiedad
        console.log('listaFooterYLogoxId recibida');
       
      },
      err => {
        console.error('Msj. Servidor: :' + err.error.message);
      }
    );
  }

   }




