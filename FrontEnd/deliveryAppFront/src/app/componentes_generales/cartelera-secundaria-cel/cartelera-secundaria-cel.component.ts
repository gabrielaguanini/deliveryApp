import { Component } from '@angular/core';
import { CarteleraSecundaria } from 'src/app/usuarios/modelos/cartelera-secundaria';
import { CarteleraSecundariaService } from 'src/app/usuarios/servicios/cartelera-secundaria.service';
import { SliderIntervalService } from '../servicios/Slider-interval.service';

@Component({
  selector: 'app-cartelera-secundaria-cel',
  templateUrl: './cartelera-secundaria-cel.component.html',
  styleUrls: ['./cartelera-secundaria-cel.component.css']
})
export class CarteleraSecundariaCelComponent {

  
  carteleraSecCel: CarteleraSecundaria[] = [];

  idPromoSec!: number;
  imgParaCelOPc!: string;
  tituloPromo!: string;
  textoPromo!: string;
  urlImagenPromo!: string;
  fechaPromo!: string;
  
    // Variables para controlar el carrusel
    private intervalId!: number;
    currentIndexSecCel = 0;
    intervalCel: any;
  
  
  constructor(private cartSecServ: CarteleraSecundariaService, private slidIntServ: SliderIntervalService) { };
  
  ngOnInit(): void {
    this.listaPromoNovedadSecCel();
    this.startAutoPlay();
   };

  
  listaPromoNovedadSecCel():void {
    this.cartSecServ.listPromosNovSec().subscribe(data => this.carteleraSecCel = data);
  };
  
  startAutoPlay() {
    this.intervalId = this.slidIntServ.startInterval(5000, () => {
      this.currentIndexSecCel = (this.currentIndexSecCel + 1) % 3; // o 4, si es necesario
    }, 'carteleraslider');
  };

  stopAutoPlay() {
    if (this.intervalId !== undefined) {
      this.slidIntServ.stopInterval('carteleraslider');
    };
  };
  
  
  }
  
