import { Component } from '@angular/core';
import { Carteleramodel } from '../modelos/carteleramodel';
import { CartelerasliderService } from '../servicios/carteleraslider.service';

@Component({
  selector: 'app-carteleraslidercel',
  templateUrl: './carteleraslidercel.component.html',
  styleUrls: ['./carteleraslidercel.component.css']
})
export class CarteleraslidercelComponent {
  
carteleraCel: Carteleramodel[] = [];

idPromo!: number;
imgParaCelOPc!: string;
tituloPromo!: string;
textoPromo!: string;
urlImagenPromo!: string;
fechaPromo!: string;

  // Variables para controlar el carrusel
  currentIndexCel = 0;
  intervalCel: any;


constructor(private cartServ: CartelerasliderService) { };

ngOnInit(): void {
  this.listaPromoNovedadCel();
  this.autoPlay();
 };
 
 ngOnDestroy() {
  clearInterval(this.intervalCel); // Limpiar el intervalo cuando el componente se destruye
};


listaPromoNovedadCel():void {
  this.cartServ.listPromosNov().subscribe(data => this.carteleraCel = data);
};

autoPlay() {
  this.intervalCel = setInterval(() => {
    this.currentIndexCel = (this.currentIndexCel + 1) % 3; // Cambiar a 4 si hay 4 radio buttons
  }, 5000); // Cambiar el valor para ajustar el intervalo en milisegundos
};


}
