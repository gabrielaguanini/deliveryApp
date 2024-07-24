import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deliveryAppFront';

  ngOnInit(): void {
    this.agradecimientosCodigo("Gracias 枠がずれてて四角に三角ある見出し hrshishym por los formatos de titulos. Codigo completo: https://codepen.io/hrshishym/pen/VwVJwMJ");
  }

  agradecimientosCodigo(agradecimiento:string):void{
    console.log(agradecimiento);
  }
}
