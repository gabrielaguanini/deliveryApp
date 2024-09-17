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


  constructor(private cartSecServ: CarteleraSecundariaService) { };

  ngOnInit(): void {
    this.listaPromoNovedadSec();
  };

  listaPromoNovedadSec(): void {
    this.cartSecServ.listPromosNovSec().subscribe(data => {
      this.carteleraSec = data;
      console.log("Lista de promos/novedades para cartelera secundaria recibida correctamente.")
    }, err => {
      console.error("Error al procesar la solicitud para obtener una lista de promos/novedades para cartelera secundaria. Msj. Serv: " + err.error.message);
    }
    );
  };

}