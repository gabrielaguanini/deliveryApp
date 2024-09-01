import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FooterYLogoModel } from '../modelos/footer-ylogo-model';

@Injectable({
  providedIn: 'root'
})
export class FooterYLogoService {
  
  URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

 // Obtiene la lista de todos los elementos de pie de página y logotipos
public listaFooterYLogo(): Observable<FooterYLogoModel[]> {
  return this.httpClient.get<FooterYLogoModel[]>(this.URL + 'listafooterylogo');
}

// Obtiene la lista de elementos de pie de página y logotipos por IDs
public listaFooterYLogoxId(ids: number[]): Observable<FooterYLogoModel[]> {
  // Convierte la lista de IDs en una cadena separada por comas para incluir en la URL
  const idsParam = ids.join(',');
  // Realiza la solicitud GET a la API y retorna el observable
  return this.httpClient.get<FooterYLogoModel[]>(`${this.URL}listafooterylogoxid/${idsParam}`);
}

// Guarda un nuevo elemento de pie de página y logotipo
public guardarFooYLo(footerYLogoModel: FooterYLogoModel): Observable<any> {
  return this.httpClient.post<any>(this.URL + 'guardarfooylogo', footerYLogoModel);
}

// Actualiza un elemento de pie de página y logotipo existente por ID
public actualizarFooYLo(idOtrosDatos: number, footerYLogoModel: FooterYLogoModel): Observable<any> {
  return this.httpClient.put<any>(this.URL + `actualizarfooylogo/${idOtrosDatos}`, footerYLogoModel);
}

// Elimina un elemento de pie de página y logotipo por ID
public borrarFooYLo(idOtrosDatos: number): Observable<any> {
  return this.httpClient.delete<any>(this.URL + `borrarfootylo/${idOtrosDatos}`);
}

// Obtiene un elemento de pie de página y logotipo por ID
public obtenerFooterYLogoXId(idOtrosDatos: number): Observable<FooterYLogoModel> {
  return this.httpClient.get<FooterYLogoModel>(this.URL + `obtenerfooyloxid/${idOtrosDatos}`);
}



}
