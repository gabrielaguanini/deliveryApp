import { Component } from '@angular/core';
import { Carteleramodel } from '../modelos/carteleramodel';
import { CartelerasliderService } from '../servicios/carteleraslider.service';
import { SliderIntervalService } from '../servicios/Slider-interval.service';

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
  private intervalId!: number;
  currentIndexCel = 0;
  intervalCel: any;


constructor(private cartServ: CartelerasliderService, private slidIntServ: SliderIntervalService) { };

ngOnInit(): void {
  this.listaPromoNovedadCel();
  this.startAutoPlay();
 };
 


listaPromoNovedadCel():void {
  this.cartServ.listPromosNov().subscribe(data => this.carteleraCel = data);
};

startAutoPlay() {
  this.intervalId = this.slidIntServ.startInterval(5000, () => {
    this.currentIndexCel = (this.currentIndexCel + 1) % 3; // o 4, si es necesario
  }, 'carteleraslidercel');
};

stopAutoPlay() {
  if (this.intervalId !== undefined) {
    this.slidIntServ.stopInterval('carteleraslider');
  };
};


}
