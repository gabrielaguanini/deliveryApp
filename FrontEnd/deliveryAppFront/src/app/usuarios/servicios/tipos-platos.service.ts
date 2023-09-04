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

  //LISTA FILTRADA DE TIPOS DE PLATOS (toma los registros de la entity TipoPlato presentes en la entity Platos)
  //ESTA LISTA SE GENERA SOLO PARA GENERAR CARDS PEQUEÑAS CUYA LISTA DE PLATOS CORRESPONDIENTE TENGA REGISTROS 
  public listFiltradaTiposPlatos(): Observable<TipoPlato[]> {
    return this.httpClient.get<TipoPlato[]>(this.URL + 'listafiltradatipoplatos')
  };

  //LISTA DE COLORES PARA LAS CARDS PEQUEÑAS
  public listColoresTipPlat(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.URL + 'listacolorestipoplatos')
  };

  //LISTA DE ICONOS PARA LAS CARDS PEQUEÑAS O LISTA TIPOSPLATO
  public listIconosTipPlat(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.URL + 'listaiconostipoplatos')
  };


  //GUARDAR TIPO PLATO
  public guardarTipoPlato(tipoPlato: TipoPlato): Observable <any>{
    return this.httpClient.post<any>(this.URL + 'guardartipoplato', tipoPlato)
  };

 //ACTUALIZAR TIPO PLATO
 public actualizarTipoPla(idTipoPlato: number, tipoPlato: TipoPlato): Observable<any>{
  return this.httpClient.put<any>(this.URL + `actualizartipoplato/${idTipoPlato}`, tipoPlato)
 }

 //BORRAR TIPO PLATO
 public borrarTipoPlato(idTipoPlato: number): Observable <any>{
  return this.httpClient.delete<any>(this.URL + `eliminartipoplatos/${idTipoPlato}`)
 }
 
 //OBTENER TIPO PLATO POR ID
 public obtenerTipoPlatoXId(idTipoPlato: number): Observable <TipoPlato>{
  return this.httpClient.get<TipoPlato>(this.URL + `obtenertiplaxid/${idTipoPlato}`)
 }

//SABER SI UN PLATO EXISTE EN LA DB POR SU NOMBRE
public existeXNombre(nombreTipoPlato: string){
  return this.httpClient.get<boolean>(this.URL + `tipoplatoexistenombre/${nombreTipoPlato}`)
};

}

//CONSOLA
//////////////////////////
console.log("Tipos Platos service esta corriendo");
