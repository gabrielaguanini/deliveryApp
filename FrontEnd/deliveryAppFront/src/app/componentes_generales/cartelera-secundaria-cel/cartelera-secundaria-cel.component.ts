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


  carteleraSec: CarteleraSecundaria[] = [];


  constructor(private cartSecServ: CarteleraSecundariaService) { };

  ngOnInit(): void {
    this.listaPromoNovedadSec();
    this.agradSlidDesarrollador();
  };

  // Obtiene y asigna la lista de promociones y novedades a 'carteleraSec'
  listaPromoNovedadSec(): void {
    this.cartSecServ.listPromosNovSec().subscribe(data => {
      this.carteleraSec = data;
      console.log("Lista de promos/novedades para cartelera secundaria cel recibida correctamente.")
    }, err => {
      console.error("Error al procesar la solicitud para obtener una lista de Lista de promos/novedades para cartelera secundaria cel. Msj. Serv: " + err.error.message);
    }
    );
  };

  // Muestra un mensaje en consola sobre la adaptación del slider
  agradSlidDesarrollador(): void {
    console.log("Slider secundario adaptado del código original proporcionado por Script Raccoon. Link a su trabajo en codepen: https://codepen.io/scriptraccoon");
  };


}
