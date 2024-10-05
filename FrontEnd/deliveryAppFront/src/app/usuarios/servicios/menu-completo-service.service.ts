import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuCompletoModel } from '../modelos/menu-completo-model';


@Injectable({
  providedIn: 'root'
})
export class MenuCompletoServiceService {

  //URL = 'http://localhost:8080/';
  URL = 'https://deliveryapprender.onrender.com/'
  

  constructor(private httpClient:HttpClient) { }

 // Obtiene la lista de todos los platos
public listaPlatos(): Observable<MenuCompletoModel[]> {
  return this.httpClient.get<MenuCompletoModel[]>(this.URL + 'listadeplatos');
}

// Obtiene la lista de platos de un tipo específico por ID
public listaTipoPlatos(idTipoPlato: number): Observable<MenuCompletoModel[]> {
  return this.httpClient.get<MenuCompletoModel[]>(this.URL + `listatipoplatos/${idTipoPlato}`);
}

// Guarda un nuevo plato
public guardarPlato(menuCompletoModel: MenuCompletoModel): Observable<any> {
  return this.httpClient.post<any>(this.URL + 'guardarplato', menuCompletoModel);
}

// Actualiza un plato existente por ID
public actualizarPlato(idPlato: number, menuCompletoModel: MenuCompletoModel): Observable<any> {
  return this.httpClient.put<any>(this.URL + `actualizarplato/${idPlato}`, menuCompletoModel);
}

// Elimina un plato por ID (para tarjetas pequeñas)
public borrarPlato(idPlato: number, idTipoPlato: number): Observable<any> {
  return this.httpClient.delete<any>(this.URL + `borrarplato/${idPlato}`);
}

// Elimina un plato por ID (para lista completa de platos)
public borrarPlatoLisCompleta(idPlato: number): Observable<any> {
  return this.httpClient.delete<any>(this.URL + `borrarplato/${idPlato}`);
}

// Obtiene un plato específico por ID
public obtPlatoXID(idPlato: number): Observable<MenuCompletoModel> {
  return this.httpClient.get<MenuCompletoModel>(this.URL + `obtenerplatoxid/${idPlato}`);
}

// Verifica si un plato existe en la base de datos por nombre
public existeXNombre(nombrePlato: string): Observable<boolean> {
  return this.httpClient.get<boolean>(this.URL + `platoexistenombre/${nombrePlato}`);
}

  
}

//CONSOLA
//////////////////////////
console.log("Menu completo service esta corriendo");
