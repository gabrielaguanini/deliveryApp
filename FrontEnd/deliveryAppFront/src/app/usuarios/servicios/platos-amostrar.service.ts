import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatosAMostrar } from '../modelos/platos-amostrar';

@Injectable({
  providedIn: 'root'
})
export class PlatosAMostrarService {

  URL = 'http://localhost:8080/';
  

  constructor(private httpClient:HttpClient) { }

  public listaPlatosAMostrar(): Observable<PlatosAMostrar[]> {
    return this.httpClient.get<PlatosAMostrar[]>(this.URL + 'listaplatosamostrar');  
  };


  public guardarPlatoAMostrar(platosAMostrar:PlatosAMostrar): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'guardarplatoamostrar', platosAMostrar);
  };

  public actualizarPlatoAMostrar(idPlatosAMostrar:number, platosAMostrar:PlatosAMostrar): Observable<any>{
    return this.httpClient.put<any>(this.URL + `editarplatoamostrar/${idPlatosAMostrar}`, platosAMostrar);
  };


  public borrarPlatoAMostrar(idPlatosAMostrar:number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `borrarplatoamostrar/${idPlatosAMostrar}`);
  };


  public obtPlatoAMosXId(idPlatosAMostrar:number): Observable<PlatosAMostrar>{
    return this.httpClient.get<PlatosAMostrar>(this.URL + `platosamostrarxid/${idPlatosAMostrar}`);
  };

 
}

//CONSOLA
//////////////////////////
console.log("Platos a mostrar service esta corriendo");
