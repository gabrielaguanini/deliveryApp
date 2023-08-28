import { Component } from '@angular/core';
import { Carteleramodel } from '../modelos/carteleramodel';
import { CartelerasliderService } from '../servicios/carteleraslider.service';

@Component({
  selector: 'app-carteleraslider',
  templateUrl: './carteleraslider.component.html',
  styleUrls: ['./carteleraslider.component.css']
})
export class CartelerasliderComponent {

cartelera: Carteleramodel[] = [];

idPromo!: number;
imgParaCelOPc!: string;
tituloPromo!: string;
textoPromo!: string;
urlImagenPromo!: string;
fechaPromo!: string;

  // Variables para controlar el carrusel
  currentIndex = 0;
  interval: any;


constructor(private cartServ: CartelerasliderService) { };

ngOnInit(): void {
  this.listaPromoNovedad();
  this.autoPlay(); // Iniciar el autoplay al cargar el componente
 };
 
 ngOnDestroy() {
  clearInterval(this.interval); // Limpiar el intervalo cuando el componente se destruye
};

listaPromoNovedad():void {
  this.cartServ.listPromosNov().subscribe(data => this.cartelera = data);
};

autoPlay() {
  this.interval = setInterval(() => {
    this.currentIndex = (this.currentIndex + 1) % 3; // Cambiar a 4 si hay 4 radio buttons
  }, 5000); // Cambiar el valor para ajustar el intervalo en milisegundos
};

}
