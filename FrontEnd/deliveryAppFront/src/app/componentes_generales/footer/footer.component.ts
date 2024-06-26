import { Component } from '@angular/core';
import { FooterYLogoModel } from 'src/app/usuarios/modelos/footer-ylogo-model';
import { FooterYLogoService } from 'src/app/usuarios/servicios/footer-ylogo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  footerYLogoList: FooterYLogoModel[]=[];


  constructor(private footYLogServ: FooterYLogoService) { };

  ngOnInit(): void {
     this.listaFootYLogo();
   };

   listaFootYLogo():void {
    this.footYLogServ.listaFooterYLogo().subscribe(data => {
      this.footerYLogoList = data
    })
   };
}
