import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deliveryAppFront';

  ngOnInit(): void {
    this.agradecimientosCodigo("Gracias hrshishym por los formatos de titulos. Codigo completo: 枠がずれてて四角に三角ある見出し https://codepen.io/hrshishym/pen/VwVJwMJ");
  }

  /**
   * Muestra un mensaje de agradecimiento en la consola.
   * 
   * @param agradecimiento - El mensaje de agradecimiento a mostrar.
   */
  public agradecimientosCodigo(agradecimiento: string): void {
    console.log(agradecimiento);
  }

}
