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
 

  constructor(private cartSecServ: CarteleraSecundariaService, private slidIntServ: SliderIntervalService) { };

  ngOnInit(): void {
    this.listaPromoNovedadSec();
    this.agradSlidDesarrollador();
  };

  listaPromoNovedadSec(): void {
    this.cartSecServ.listPromosNovSec().subscribe(data => this.carteleraSec = data);
  };


  agradSlidDesarrollador(): void{
    console.log("Slider secundario adaptado del codigo original proporcionado por Script Raccoon. Link a su trabajo en codepen: https://codepen.io/scriptraccoon")
  };
  
  }
  
