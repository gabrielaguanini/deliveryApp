import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPlato } from '../modelos/tipo-plato';

@Injectable({
  providedIn: 'root'
})
export class TiposPlatosService {

URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  //LISTA DE TIPOS DE PLATOS COMPLETA
  public listTiposPlatos(): Observable <TipoPlato[]> {
    return this.httpClient.get<TipoPlato[]>(this.URL + 'listatipoplatos')
  };

  //GUARDAR TIPO PLATO
  public guardarTipoPlato(tipoPlato: TipoPlato): Observable <any>{
    return this.httpClient.post<any>(this.URL + 'guardartipoplato', tipoPlato)
  };

 //ACTUALIZAR TIPO PLATO
 public actualizarTipoPla(tipoPlato: TipoPlato, idTipoPlato: number): Observable<any>{
  return this.httpClient.put<any>(this.URL + `actualizartipoplato/${idTipoPlato}`, tipoPlato)
 }

 //BORRAR TIPO PLATO
 public borrarTipoPlato(idTipoPlato: string): Observable <any>{
  return this.httpClient.delete<any>(this.URL + `eliminartipoplatos/${idTipoPlato}`)
 }

}
