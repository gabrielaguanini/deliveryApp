import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuCompletoModel } from '../modelos/menu-completo-model';


@Injectable({
  providedIn: 'root'
})
export class MenuCompletoServiceService {

  URL = 'http://localhost:8080/';
  

  constructor(private httpClient:HttpClient) { }

  public listaPlatos(): Observable<MenuCompletoModel[]> {
    return this.httpClient.get<MenuCompletoModel[]>(this.URL + 'listadeplatos');  
  }

  public listaTipoPlatos(idTipoPlato:number): Observable<MenuCompletoModel[]> {
    return this.httpClient.get<MenuCompletoModel[]>(this.URL + `listatipoplatos/${idTipoPlato}`);  
  }

  public guardarPlato(menuCompletoModel:MenuCompletoModel): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'guardarplato', menuCompletoModel);
  }

  public actualizarPlato(idPlato:number, menuCompletoModel:MenuCompletoModel): Observable<any>{
    return this.httpClient.put<any>(this.URL + `actualizarplato/${idPlato}`, menuCompletoModel);
  }
//Borra plato con el idPlato y el isTipoPlato, es para usar con las tarjetas pequeñas
  public borrarPlato(idPlato:number, idTipoPlato:number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `borrarplato/${idPlato}`);
  }

//Borra plato solo con el idPlato y el isTipoPlato, es para usar con la lista de platos completa
  public borrarPlatoLisCompleta(idPlato:number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `borrarplato/${idPlato}`);
  }


  public obtPlatoXID(idPlato:number): Observable<MenuCompletoModel>{
    return this.httpClient.get<MenuCompletoModel>(this.URL + `obtenerplatoxid/${idPlato}`);
  }
  
}

//CONSOLA
//////////////////////////
console.log("Menu completo service esta corriendo");
