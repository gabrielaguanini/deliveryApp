import { Component } from '@angular/core';
import { FooterYLogoModel } from 'src/app/usuarios/modelos/footer-ylogo-model';
import { FooterYLogoService } from 'src/app/usuarios/servicios/footer-ylogo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  footerYLogoList: FooterYLogoModel[] = [];

  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  

  constructor(private footYLogServ: FooterYLogoService) { };

  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___    

  ngOnInit(): void {
    this.listaFootYLogo();
  };

  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___  
  //___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___ღ___       


  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈
  //⋅•⋅⊰∙∘☽= FUNCIONES =☾∘∙⊱⋅•⋅
  //◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈◈𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 𝅒 𝅓 ◈


/**
 * Obtiene los datos del pie de página y los logos desde el servicio y actualiza la lista local.
 * Después de que se obtienen los datos, verifica si hay elementos faltantes y ajusta la alineación si es necesario.
 */
listaFootYLogo(): void {
  // Se suscribe al observable listaFooterYLogo del servicio para obtener los datos
  this.footYLogServ.listaFooterYLogo().subscribe(data => {
    // Actualiza la lista local footerYLogoList con los datos obtenidos
    this.footerYLogoList = data;
    // Llama a alinearSiFalta para ajustar la alineación si hay elementos faltantes
    this.alinearSiFalta();
  });
}


//✮------------------------------------------------------------------------------------------------------------✮

/**
 * Ajusta la alineación de los elementos del pie de página si hay propiedades vacías.
 * Oculta los elementos con propiedades vacías y centra los elementos restantes.
 */
alinearSiFalta(): void {
  // Verifica que la lista footerYLogoList tenga elementos
  if (this.footerYLogoList.length > 0) {

    // Obtiene los elementos por sus IDs
    const elemento1 = document.getElementById('elemento1');
    const elemento2 = document.getElementById('elemento2');
    const elemento3 = document.getElementById('icono1');
    const elemento4 = document.getElementById('icono2');
    const elemento5 = document.getElementById('icono3');

    // Crea una lista con los elementos obtenidos por su ID, utilizando su posición en la lista
    const elements = [
      { elemento: elemento1, item: this.footerYLogoList[8] },
      { elemento: elemento2, item: this.footerYLogoList[9] },
      { elemento: elemento3, item: this.footerYLogoList[5] },
      { elemento: elemento4, item: this.footerYLogoList[6] },
      { elemento: elemento5, item: this.footerYLogoList[7] }
    ];

    // Recorre cada elemento de la lista anterior
    elements.forEach(({ elemento, item }) => {
      if (elemento) {
        // Verifica si las propiedades están vacías
        const hasEmptyProperty = !item.textoAMostrar || !item.urlAMostrar || !item.iconoOImgAMostrar;
        
        // Si textoAMostrar, urlAMostrar o iconoOImgAMostrar están vacías, oculta el elemento
        if (hasEmptyProperty) {
          elemento.style.display = 'none';
        } else {
          elemento.style.display = 'inline-block'; // Muestra el elemento si todas las propiedades están presentes
        }
      }
    });
  }
}
;

//✮------------------------------------------------------------------------------------------------------------✮

}


