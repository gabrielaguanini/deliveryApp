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
  ids: number[] = [1, 4, 6, 7, 8, 9, 10] //para usar con la funcion obtenerFooterYLogoList(ids: number[]) cambiar a los ids que se quieran

  constructor(private footYLogServ: FooterYLogoService) { };

  ngOnInit(): void {
    this.obtenerFooterYLogoList(this.ids);
  };

  isExpanded? = false;
  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
  };

  /**
   * Obtiene la lista de footer y logo por IDs y asigna a 'footerYLogoList'.
   * Llama a 'eliminarBordes' después de 1 segundo para permitir la renderización completa.
   * Elimina los bordes si `iconoOImgAMostrar` está vacío en posiciones específicas.
   */
  obtenerFooterYLogoList(ids: number[]): void {
    this.footYLogServ.listaFooterYLogoxId(ids).subscribe(
      data => {
        this.footerYLogoList = data; // Asigna los datos a la propiedad
        console.log('listaFooterYLogoxId recibida correctamente');
        // Llama a eliminarBordes después de 1 segundo
        setTimeout(() => {
          this.eliminarBordes();
        }, 1000);
      },
      err => {
        console.error('Error al procesar la solicitud para obtener una listaFooterYLogoxId. Msj. Serv.: :' + err.error.message);
      }
    );
  }

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
    * Si los elementos en las posiciones 1, 2, 3 y 4 de la lista `footerYLogoList` tienen 
    * `iconoOImgAMostrar` vacío, elimina los bordes de los íconos correspondientes.
    * 
    * Si los elementos en las posiciones 5 y 6 de la lista `footerYLogoList` tienen 
    * `iconoOImgAMostrar` vacío, elimina los bordes de los íconos correspondientes
    */
  eliminarBordes(): void {

    // Verifica si los elementos en las posiciones 1, 2, 3 y 4 no tienen íconos o imágenes.
    if (this.footerYLogoList[1].iconoOImgAMostrar == "" && this.footerYLogoList[2].iconoOImgAMostrar == ""
      && this.footerYLogoList[3].iconoOImgAMostrar == "" && this.footerYLogoList[4].iconoOImgAMostrar == ""
    ) {
      // Obtiene los elementos del DOM con el IDs
      const borderRedSoc = document.getElementById('borderRedSoc');
      // Si los elementos existen, elimina sus bordes bootstrap.
      if (borderRedSoc) {
        borderRedSoc.classList.remove('border', 'border-secondary', 'border-2', 'rounded', 'rounded-pill');
      }
    }
    // Verifica si los elementos en las posiciones 5 y 6 no tienen íconos o imágenes.
    if (this.footerYLogoList[5].iconoOImgAMostrar == "" && this.footerYLogoList[6].iconoOImgAMostrar == "") {
      // Obtiene los elementos del DOM con el IDs
      const borderPedYRap = document.getElementById('borderPedYRap');
      // Si los elementos existen, elimina sus bordes bootstrap
      if (borderPedYRap) {
        borderPedYRap.classList.remove('border', 'border-secondary', 'border-2', 'rounded', 'rounded-pill');
      }
    }
  }

  //✮------------------------------------------------------------------------------------------------------------✮

}





