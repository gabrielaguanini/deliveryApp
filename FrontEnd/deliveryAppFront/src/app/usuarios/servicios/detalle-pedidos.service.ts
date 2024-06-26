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

  public guardarDetPediAcotada(detallePedidosAc: DetallePedidosAcotadaModel): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'guardardetallepedido', detallePedidosAc);
  };


  public actualizarDetallePedido(idDetallePedido: number, detallePedidos: DetallePedidosAcotadaModel): Observable<any> {
   
    return this.httpClient.put<any>(this.URL + `actualizardetallepedido/${idDetallePedido}`, detallePedidos);
  };


  public obtDetallePedidoXId(idDetallePedido: number): Observable<DetallePedidos> {
    return this.httpClient.get<DetallePedidos>(this.URL + `obtenerdetallepedidoxid/${idDetallePedido}`);
  };


  public guardarVariosDetallesPedido(detallesPedidosAcotada: DetallePedidosAcotadaModel[]): Observable<string> {
    
    return this.httpClient.post<any>(this.URL + 'guardarvariosdetallespedidos', detallesPedidosAcotada)
    
  };


  public eliminarDetallePedido(idDetallePedido: number, idPedido: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `borrardetallepedido/${idDetallePedido}/${idPedido}`)
  };

  public eliminarVariosDetPedXIdPedido(idPedido: number): Observable<any> {
    return this.httpClient.delete(this.URL + `eliminardetpedporidped/${idPedido}`, { responseType: 'text' }); //responseType: parsea la response a texto
  };

 
  //METODO PARA MANEJO DE ERRORES
  //private handleError(error: any): Observable<any> {
   // console.error('Error en la solicitud:', error);
    // throw error;
 // };


}
