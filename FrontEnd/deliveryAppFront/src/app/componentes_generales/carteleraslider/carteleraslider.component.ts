import { Component } from '@angular/core';
import { Carteleramodel } from '../modelos/carteleramodel';
import { CartelerasliderService } from '../servicios/carteleraslider.service';
import { SliderIntervalService } from '../servicios/Slider-interval.service';

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
  colorTexto!: string;
  urlImagenPromo!: string;
  fechaPromo!: string;

  // Variables para controlar el carrusel
  private intervalId!: number;
  currentIndex = 0;
  interval: any;

  constructor(private cartServ: CartelerasliderService, private slidIntServ: SliderIntervalService) { };

  ngOnInit(): void {
    this.listaPromoNovedad();
    this.startAutoPlay(); // Iniciar el autoplay al cargar el componente
  };

  listaPromoNovedad(): void {
    this.cartServ.listPromosNov().subscribe(data => this.cartelera = data);
  };

  startAutoPlay() {
    this.intervalId = this.slidIntServ.startInterval(5000, () => {
      this.currentIndex = (this.currentIndex + 1) % 3; // o 4, si es necesario
    }, 'carteleraslider');
  };

  stopAutoPlay() {
    if (this.intervalId !== undefined) {
      this.slidIntServ.stopInterval('carteleraslider');
    };
  };
}