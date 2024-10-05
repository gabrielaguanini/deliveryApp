import { Injectable } from '@angular/core';
import { DetallePedidos } from '../modelos/detalle-pedidos';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetallePedidosAcotadaModel } from '../modelos/detalle-pedidos-acotadaModel';


@Injectable({
  providedIn: 'root'
})
export class DetallePedidosService {

  //URL = 'http://localhost:8080/';
  URL = 'https://deliveryapprender.onrender.com/'

  constructor(private httpClient: HttpClient) { }



  // Obtiene la lista de todos los detalles de pedidos
  public listaDetallePedidos(): Observable<DetallePedidos[]> {
    return this.httpClient.get<DetallePedidos[]>(this.URL + 'listadetallepedidos');
  }

  // Obtiene la lista de detalles de un pedido específico por ID
  public listaDetPedXIdPedido(idPedido: number): Observable<DetallePedidos[]> {
    return this.httpClient.get<DetallePedidos[]>(this.URL + `listadetpedidosidpedido/${idPedido}`);
  }

  // Guarda un detalle de pedido acotado
  public guardarDetPediAcotada(detallePedidosAc: DetallePedidosAcotadaModel): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'guardardetallepedido', detallePedidosAc);
  }

  // Actualiza un detalle de pedido específico por ID
  public actualizarDetallePedido(idDetallePedido: number, detallePedidos: DetallePedidosAcotadaModel): Observable<any> {
    return this.httpClient.put<any>(this.URL + `actualizardetallepedido/${idDetallePedido}`, detallePedidos);
  }

  // Obtiene un detalle de pedido específico por ID
  public obtDetallePedidoXId(idDetallePedido: number): Observable<DetallePedidos> {
    return this.httpClient.get<DetallePedidos>(this.URL + `obtenerdetallepedidoxid/${idDetallePedido}`);
  }

  // Guarda varios detalles de pedidos acotados
  public guardarVariosDetallesPedido(detallesPedidosAcotada: DetallePedidosAcotadaModel[]): Observable<string> {
    return this.httpClient.post(`${this.URL}guardarvariosdetallespedidos`, detallesPedidosAcotada, { responseType: 'text' });
  }

  // Elimina un detalle de pedido específico por ID
  public eliminarDetallePedido(idDetallePedido: number, idPedido: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `borrardetallepedido/${idDetallePedido}/${idPedido}`);
  }

  // Elimina varios detalles de pedido por ID de pedido
  public eliminarVariosDetPedXIdPedido(idPedido: number): Observable<any> {
    return this.httpClient.delete(this.URL + `eliminardetpedporidped/${idPedido}`, { responseType: 'text' });
  }



}
