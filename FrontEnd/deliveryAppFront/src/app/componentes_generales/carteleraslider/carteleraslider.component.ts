import { Component } from '@angular/core';
import { SliderIntervalService } from '../servicios/Slider-interval.service';
import { Cartelera } from 'src/app/usuarios/modelos/cartelera';
import { CarteleraService } from 'src/app/usuarios/servicios/cartelera.service';

@Component({
  selector: 'app-carteleraslider',
  templateUrl: './carteleraslider.component.html',
  styleUrls: ['./carteleraslider.component.css']
})
export class CartelerasliderComponent {


  cartelera: Cartelera[] = [];

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

  constructor(private cartServ: CarteleraService, private slidIntServ: SliderIntervalService) { };

  ngOnInit(): void {
    this.listaPromoNovedad();
    this.startAutoPlay(); // Iniciar el autoplay al cargar el componente
  };

  //✮------------------------------------------------------------------------------------------------------------✮

  // Obtiene y asigna la lista de promociones y novedades a 'cartelera'
  listaPromoNovedad(): void {
    this.cartServ.listPromosNov().subscribe(data => {
      this.cartelera = data;
      console.log("Lista de promos/novedades para cartelera slider recibida correctamente.")
    }, err => {
      console.error("Error al procesar la solicitud para obtener una lista de promos/novedades para cartelera slider. Msj. Serv: " + err.error.message);
    }
    );
  };

  //✮------------------------------------------------------------------------------------------------------------✮

  // Inicia el auto-play del slider, avanzando cada 5 segundos
  startAutoPlay() {
    this.intervalId = this.slidIntServ.startInterval(5000, () => {
      this.currentIndex = (this.currentIndex + 1) % 3; // o 4 si es necesario
    }, 'carteleraslider');
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