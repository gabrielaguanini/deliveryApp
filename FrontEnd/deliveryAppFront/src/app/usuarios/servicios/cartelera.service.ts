import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartelera } from '../modelos/cartelera';

@Injectable({
  providedIn: 'root'
})
export class CarteleraService {

  URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  //LISTA DE PROMOS Y NOVEDADES
  public listPromosNov(): Observable <Cartelera[]> {
    return this.httpClient.get<Cartelera[]>(this.URL + 'listacartelera')
  };

  //GUARDAR PROMO O NOVEDAD
  public guardarPromosNov(cartelera: Cartelera): Observable <any>{
    return this.httpClient.post<any>(this.URL + 'guardarpromonovedades', cartelera)
  };

 //ACTUALIZAR PROMO O NOVEDAD
 public actualizarPromosNov(idPromo: number, cartelera: Cartelera): Observable<any>{
  return this.httpClient.put<any>(this.URL + `actualizarpromonov/${idPromo}`, cartelera)
 }

 //BORRAR PROMO O NOVEDAD
 public borrarPromosNov(idPromo: number): Observable <any>{
  return this.httpClient.delete<any>(this.URL + `eliminarpromonovedades/${idPromo}`)
 }
 
 //OBTENER PROMO POR ID
 public obtenerPromoXId(idPromo: number): Observable <Cartelera>{
  return this.httpClient.get<Cartelera>(this.URL + `obtenertiplaxid/${idPromo}`)
 }

}
