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
    return this.httpClient.get<MenuCompletoModel[]>(this.URL + 'listaplatos');  
  }

  public listaTipoPlatos(idTipoPlato:number): Observable<MenuCompletoModel[]> {
    return this.httpClient.get<MenuCompletoModel[]>(this.URL + `listatipoplatos/${idTipoPlato}`);  
  }

  public guardarPlato(menuCompletoModel:MenuCompletoModel): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'guardarplato', menuCompletoModel);
  }

  public update(id:number, menuCompletoModel:MenuCompletoModel): Observable<any>{
    return this.httpClient.put<any>(this.URL + `actualizarhabilidad/${id}`, menuCompletoModel);
  }

  public delete(idPlato:number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `borrarhabilidad/${idPlato}`);
  }
  
}

//CONSOLA
//////////////////////////
console.log("Menu completo service esta corriendo");
