import { Injectable } from '@angular/core';
import { DetallePedidos } from '../modelos/detalle-pedidos';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetallePedidosAcotadaModel } from '../modelos/detalle-pedidos-acotadaModel';


@Injectable({
  providedIn: 'root'
})
export class DetallePedidosService {

  URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }



  public listaDetallePedidos(): Observable<DetallePedidos[]> {
    return this.httpClient.get<DetallePedidos[]>(this.URL + 'listadetallepedidos');
  };

  public listaDetPedXIdPedido(idPedido: number): Observable<DetallePedidos[]> {
    return this.httpClient.get<DetallePedidos[]>(this.URL + `listadetpedidosidpedido/${idPedido}`);
  };

  public guardarDetallePedido(detallePedidos: DetallePedidos): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'guardardetallepedido', detallePedidos);
  };

  public actualizarDetallePedido(idDetallePedido: number, detallePedidos: DetallePedidos): Observable<any> {
    return this.httpClient.put<any>(this.URL + `actualizardetallepedido/${idDetallePedido}`, detallePedidos);
  };


  public obtDetallePedidoXId(idDetallePedido: number): Observable<DetallePedidos> {
    return this.httpClient.get<DetallePedidos>(this.URL + `obtenerdetallepedidoxid/${idDetallePedido}`);
  };


  public guardarVariosDetallesPedido(detallesPedidosAcotada: DetallePedidosAcotadaModel[]): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.URL + 'guardarvariosdetallespedidos', detallesPedidosAcotada, {
      headers: headers,
      responseType: 'text', // Indica que la respuesta es texto
    })
      .pipe(
        catchError(this.handleError) // Manejo errores
      );
  };


  public eliminarDetallePedido(idDetallePedido: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `borrardetallepedido/${idDetallePedido}`)
  };

 
  //METODO PARA MANEJO DE ERRORES
  private handleError(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    throw error;
  };


}
