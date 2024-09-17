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
      //elimina los bordes si no hubiese icono o imagen a mostrar en la lista de redes y pedidosya y rappi. 
      //SetTimeOut para dar tiempo a que se renderice la lista, sin setTimeOut, eliminarBordes se ejecuta antes de renderizarla y no funciona
      setTimeout(() => {
        this.eliminarBordes();
      }, 1000);
      console.log("Lista para footer y logo completa recibida correctamente.");
    }, err => {
      console.error("Error al procesar la solicitud para obtener una lista para footer y logo completa. Msj. Serv: " + err.error.message);
    }
    );
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
  };
  

  //✮------------------------------------------------------------------------------------------------------------✮

  /**
  * Ajusta la alineación de los elementos del pie de página si hay propiedades vacías.
  * Oculta los elementos con propiedades vacías y centra los elementos restantes.
  * 
  * Si los elementos en las posiciones 8 y 9 de la lista `footerYLogoList` tienen 
  * `iconoOImgAMostrar` vacío, elimina los bordes de los íconos correspondientes.
  * 
  * Si los elementos en las posiciones 5, 6, y 7 de la lista `footerYLogoList` tienen 
  * `iconoOImgAMostrar` vacío, elimina los bordes de los íconos correspondientes y oculta el título de las redes sociales.
  */
  eliminarBordes(): void {

    // Verifica si los elementos en las posiciones 8 y 9 no tienen íconos o imágenes.
    if (this.footerYLogoList[8].iconoOImgAMostrar == "" && this.footerYLogoList[9].iconoOImgAMostrar == "") {
      // Obtiene los elementos del DOM con los IDs 'footer-social-icons-1', 'footer-social-icons-2' y 'footer-social-icons'.
      const footerSocialIcons = document.getElementById('footer-social-icons-1');
      const footerSocialIcons1 = document.getElementById('footer-social-icons-2');
      const espacioSinIcRedes = document.getElementById('footer-social-icons');

      // Si los elementos existen, elimina sus bordes y disminuye el espacio del faltante
      if (footerSocialIcons && footerSocialIcons1) {
        footerSocialIcons.style.border = 'none';
        footerSocialIcons1.style.border = 'none';
        espacioSinIcRedes!.style.display = 'none';
      }
    }

    // Verifica si los elementos en las posiciones 5, 6, y 7 no tienen íconos o imágenes.
    if (this.footerYLogoList[5].iconoOImgAMostrar == "" && this.footerYLogoList[6].iconoOImgAMostrar == ""
      && this.footerYLogoList[7].iconoOImgAMostrar == "") {
      // Obtiene los elementos del DOM con los IDs 'icono1', 'icono2', 'icono3', footer-social-icons y 'tituloRedesSo'.
      const icono1 = document.getElementById('icono1');
      const icono2 = document.getElementById('icono2');
      const icono3 = document.getElementById('icono3');
      const tituloRedesSo = document.getElementById('tituloRedesSo');
      const espacioSinPedYRapp = document.getElementById('footer-social-icons');

      // Si los elementos existen, elimina sus bordes, oculta el título de redes sociales y disminuye el espacio del faltante
      if (icono1 && icono2 && icono3) {
        icono1.style.border = 'none';
        icono2.style.border = 'none';
        icono3.style.border = 'none';
        espacioSinPedYRapp!.style.display = 'none';
        tituloRedesSo!.style.display = 'none';
      }
    }
  }


  //✮------------------------------------------------------------------------------------------------------------✮
}



