import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatosAMostrar } from '../modelos/platos-amostrar';
import { TipoPlato } from '../modelos/tipo-plato';

@Injectable({
  providedIn: 'root'
})
export class PlatosAMostrarService {

  //URL = 'http://localhost:8080/';
  URL = 'https://deliveryapprender.onrender.com/'


  constructor(private httpClient: HttpClient) { }

  // Obtiene la lista de platos a mostrar
  public listaPlatosAMostrar(): Observable<PlatosAMostrar[]> {
    return this.httpClient.get<PlatosAMostrar[]>(this.URL + 'listaplatosamostrar');
  }

  // Guarda un nuevo plato a mostrar
  public guardarPlatoAMostrar(platosAMostrar: PlatosAMostrar): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'guardarplatoamostrar', platosAMostrar);
  }

  // Actualiza un plato a mostrar existente por ID
  public actualizarPlatoAMostrar(idPlatosAMostrar: number, platosAMostrar: PlatosAMostrar): Observable<any> {
    return this.httpClient.put<any>(this.URL + `editarplatoamostrar/${idPlatosAMostrar}`, platosAMostrar);
  }

  // Elimina un plato a mostrar por ID
  public borrarPlatoAMostrar(idPlatosAMostrar: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `borrarplatoamostrar/${idPlatosAMostrar}`);
  }

  // Obtiene un plato a mostrar específico por ID
  public obtPlatoAMosXId(idPlatosAMostrar: number): Observable<PlatosAMostrar> {
    return this.httpClient.get<PlatosAMostrar>(this.URL + `platosamostrarxid/${idPlatosAMostrar}`);
  }


}

//CONSOLA
//////////////////////////
console.log("Platos a mostrar service esta corriendo");
