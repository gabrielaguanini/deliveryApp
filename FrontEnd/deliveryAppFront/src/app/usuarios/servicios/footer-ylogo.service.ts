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

  public listaFooterYLogo(): Observable<FooterYLogoModel[]> {
    return this.httpClient.get<FooterYLogoModel[]>(this.URL + 'listafooterylogo');
  };

  public listaFooterYLogoxId(ids: number[]): Observable<FooterYLogoModel[]> {
   
    // Convierte la lista de IDs en una cadena separada por comas para incluir en la URL
    const idsParam = ids.join(',');
    // Realiza la solicitud GET a la API y retorna el observable
    return this.httpClient.get<FooterYLogoModel[]>(`${this.URL}listafooterylogoxid/${idsParam}`);
  }
  
  public guardarFooYLo(footerYLogoModel: FooterYLogoModel): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'guardarfooylogo', footerYLogoModel);
  };

  public actualizarFooYLo(idOtrosDatos: number, footerYLogoModel: FooterYLogoModel): Observable<any> {
    return this.httpClient.put<any>(this.URL + `actualizarfooylogo/${idOtrosDatos}`, footerYLogoModel);
  };

  public borrarFooYLo(idOtrosDatos: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `borrarfootylo/${idOtrosDatos}`)
  };

  public obtenerFooterYLogoXId(idOtrosDatos: number): Observable<FooterYLogoModel> {
    return this.httpClient.get<FooterYLogoModel>(this.URL + `obtenerfooyloxid/${idOtrosDatos}`);
  };


}
