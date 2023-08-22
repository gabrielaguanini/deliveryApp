import { Component } from '@angular/core';
import { Carteleramodel } from '../modelos/carteleramodel';
import { CartelerasliderService } from '../servicios/carteleraslider.service';

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
urlImagenPromo!: string;
fechaPromo!: string;


constructor(private cartServ: CartelerasliderService) { };

ngOnInit(): void {
  this.listaPromoNovedad();
 };


listaPromoNovedad():void {
  this.cartServ.listPromosNov().subscribe(data => this.cartelera = data);
};

}
