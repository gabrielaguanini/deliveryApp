import { Component } from '@angular/core';
import { SliderIntervalService } from '../servicios/Slider-interval.service';
import { Cartelera } from 'src/app/usuarios/modelos/cartelera';
import { CarteleraService } from 'src/app/usuarios/servicios/cartelera.service';

@Component({
  selector: 'app-carteleraslidercel',
  templateUrl: './carteleraslidercel.component.html',
  styleUrls: ['./carteleraslidercel.component.css']
})
export class CarteleraslidercelComponent {

  carteleraCel: Cartelera[] = [];

  idPromo!: number;
  imgParaCelOPc!: string;
  tituloPromo!: string;
  textoPromo!: string;
  colorTexto!: string;
  urlImagenPromo!: string;
  fechaPromo!: string;

  // Variables para controlar el carrusel
  private intervalId!: number;
  currentIndexCel = 0;
  intervalCel: any;


  constructor(private cartServ: CarteleraService, private slidIntServ: SliderIntervalService) { };

  ngOnInit(): void {
    this.listaPromoNovedadCel();
    this.startAutoPlay();
  };

//✮------------------------------------------------------------------------------------------------------------✮

  // Obtiene y asigna la lista de promociones y novedades a 'carteleraCel'
  listaPromoNovedadCel(): void {
    this.cartServ.listPromosNov().subscribe(data => {
      this.carteleraCel = data;
      console.log("Lista de promos/novedades para cartelera slider cel recibida correctamente.");
    }, err => {
      console.error("Error al procesar la solicitud para obtener una lista de promos/novedades para cartelera slider cel. Msj. Serv: " + err.error.message);

    });
  };

//✮------------------------------------------------------------------------------------------------------------✮

  // Inicia el auto-play del slider en móvil, avanzando cada 5 segundos
  startAutoPlay() {
    this.intervalId = this.slidIntServ.startInterval(5000, () => {
      this.currentIndexCel = (this.currentIndexCel + 1) % 3; // o 4 si es necesario
    }, 'carteleraslidercel');
  };

//✮------------------------------------------------------------------------------------------------------------✮

  // Detiene el auto-play del slider si está en ejecución
  stopAutoPlay() {
    if (this.intervalId !== undefined) {
      this.slidIntServ.stopInterval('carteleraslider');
    };
  };

//✮------------------------------------------------------------------------------------------------------------✮

}
