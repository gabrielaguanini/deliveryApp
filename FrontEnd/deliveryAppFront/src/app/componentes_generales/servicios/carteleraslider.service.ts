import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carteleramodel } from '../modelos/carteleramodel';

@Injectable({
  providedIn: 'root'
})
export class CartelerasliderService {

  URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }


   //LISTA DE PROMOS Y NOVEDADES
   public listPromosNov(): Observable <Carteleramodel[]> {
    return this.httpClient.get<Carteleramodel[]>(this.URL + 'listacartelera')
  };


  //GUARDAR PROMO O NOVEDAD
  public guardarPromosNov(cartelera: Carteleramodel): Observable <any>{
    return this.httpClient.post<any>(this.URL + 'guardarpromonovedades', cartelera)
  };

 //ACTUALIZAR PROMO O NOVEDAD
 public actualizarPromosNov(idPromo: number, cartelera: Carteleramodel): Observable<any>{
  return this.httpClient.put<any>(this.URL + `actualizarpromonov/${idPromo}`, cartelera)
 }

 //BORRAR PROMO O NOVEDAD
 public borrarPromosNov(idPromo: number): Observable <any>{
  return this.httpClient.delete<any>(this.URL + `eliminarpromonovedades/${idPromo}`)
 }
 
 //OBTENER PROMO POR ID
 public obtenerPromoXId(idPromo: number): Observable <Carteleramodel>{
  return this.httpClient.get<Carteleramodel>(this.URL + `obtenertiplaxid/${idPromo}`)
 }
  
}
