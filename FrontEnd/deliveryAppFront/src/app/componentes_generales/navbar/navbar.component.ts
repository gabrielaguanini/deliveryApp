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
  footYLogModel!: FooterYLogoModel;

  constructor(private footYLogServ: FooterYLogoService){};

  ngOnInit(): void {
    this.obtenerLogo(1);;
  };

  isExpanded? = false;
  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
  };

  obtenerLogo(idOtrosDatos: number):void {
    this.footYLogServ.obtenerFooterYLogoXId(idOtrosDatos).subscribe(data => {
      this.footYLogModel = data;
      console.log("Logo recibido");
    }, err => {
      console.error('Msj. Servidor: :' + err.error.message);
    })
   };



}
