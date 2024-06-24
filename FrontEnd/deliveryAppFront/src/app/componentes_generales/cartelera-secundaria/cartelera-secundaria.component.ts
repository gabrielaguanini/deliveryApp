import { Component } from '@angular/core';
import { CarteleraSecundaria } from 'src/app/usuarios/modelos/cartelera-secundaria';
import { CarteleraSecundariaService } from 'src/app/usuarios/servicios/cartelera-secundaria.service';
import { SliderIntervalService } from '../servicios/Slider-interval.service';

@Component({
  selector: 'app-cartelera-secundaria',
  templateUrl: './cartelera-secundaria.component.html',
  styleUrls: ['./cartelera-secundaria.component.css']
})
export class CarteleraSecundariaComponent {

  carteleraSec: CarteleraSecundaria[] = [];

  idPromoSec!: number;
  imgParaCelOPc!: string;
  tituloPromo!: string;
  textoPromo!: string;
  colorTexto!: string;
  urlImagenPromo!: string;
  fechaPromo!: string;

  // Variables para controlar el carrusel
  private intervalId!: number;
  currentIndexSec = 0;
  intervalSec: any;

  constructor(private cartSecServ: CarteleraSecundariaService, private slidIntServ: SliderIntervalService) { };

  ngOnInit(): void {
    this.listaPromoNovedadSec();
    this.startAutoPlay(); // Iniciar el autoplay al cargar el componente
  };

  listaPromoNovedadSec(): void {
    this.cartSecServ.listPromosNovSec().subscribe(data => this.carteleraSec = data);
  };

  startAutoPlay() {
    this.intervalId = this.slidIntServ.startInterval(5000, () => {
      this.currentIndexSec = (this.currentIndexSec + 1) % 3; // o 4, si es necesario
    }, 'carteleraSecundaria');
  };

  stopAutoPlay() {
    if (this.intervalId !== undefined) {
      this.slidIntServ.stopInterval('carteleraSecundaria');
    };
  };

 
}