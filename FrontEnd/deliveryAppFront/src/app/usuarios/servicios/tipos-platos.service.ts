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
  }

  //LISTA DE ID DE TIPOS DE PLATOS 
  public listIdTiPla(): Observable <number[]>{
    return this.httpClient.get<number[]>(this.URL + 'listaidtipoplatos')
  }
}
