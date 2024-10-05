import { Injectable } from '@angular/core';
import { CarteleraSecundaria } from '../modelos/cartelera-secundaria';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarteleraSecundariaService {

  //URL = 'http://localhost:8080/';
  URL = 'https://deliveryapprender.onrender.com/'

  constructor(private httpClient: HttpClient) { }

  //LISTA DE PROMOS Y NOVEDADES CARTELERA SECUNDARIA
  public listPromosNovSec(): Observable <CarteleraSecundaria[]> {
    return this.httpClient.get<CarteleraSecundaria[]>(this.URL + 'listacartelerasec')
  };

  //GUARDAR PROMO O NOVEDAD CARTELERA SECUNDARIA
  public guardarPromosNovSec(carteleraSec: CarteleraSecundaria): Observable <any>{
    return this.httpClient.post<any>(this.URL + 'guardarpromonovedadessec', carteleraSec)
  };

 //ACTUALIZAR PROMO O NOVEDAD CARTELERA SECUNDARIA
 public actualizarPromosNovSec(idPromoSec: number, carteleraSec: CarteleraSecundaria): Observable<any>{
  return this.httpClient.put<any>(this.URL + `actualizarpromonovsec/${idPromoSec}`, carteleraSec)
 };

 //BORRAR PROMO O NOVEDAD CARTELERA SECUNDARIA
 public borrarPromosNovSec(idPromoSec: number): Observable <any>{
  return this.httpClient.delete<any>(this.URL + `eliminarpromonovedadessec/${idPromoSec}`)
 };
 
 //OBTENER PROMO SEC POR ID
 public obtenerPromoSecXId(idPromoSec: number): Observable <CarteleraSecundaria>{
  return this.httpClient.get<CarteleraSecundaria>(this.URL + `obtenerpromosecxid/${idPromoSec}`)
 };

}
 //CONSOLA
//////////////////////////
console.log("CarteleraSecundaria service esta corriendo");