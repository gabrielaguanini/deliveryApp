import { Injectable } from '@angular/core';
import { DetallePedidos } from '../modelos/detalle-pedidos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetallePedidosAcotadaModel } from '../modelos/detalle-pedidos-acotadaModel';


@Injectable({
  providedIn: 'root'
})
export class DetallePedidosService {

  URL= 'http://localhost:8080/';

  constructor(private httpClient:HttpClient) { }

  

  public listaDetallePedidos(): Observable<DetallePedidos[]> {
    return this.httpClient.get<DetallePedidos[]>(this.URL + 'listadetallepedidos');  
  };

  public listaXIdPedido(idPedido:number): Observable<DetallePedidos[]> {
    return this.httpClient.get<DetallePedidos[]>(this.URL + `listadetpedidpedido/${idPedido}`);  
  };

  public guardarDetallePedido(detallePedidos:DetallePedidos): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'guardardetallepedido', detallePedidos);
  };

  public actualizarDetallePedido(idDetallePedido:number, detallePedidos:DetallePedidos): Observable<any>{
    return this.httpClient.put<any>(this.URL + `actualizardetallepedido/${idDetallePedido}`, detallePedidos);
  };


  public obtDetallePedidoXId(idDetallePedido:number): Observable<DetallePedidos>{
    return this.httpClient.get<DetallePedidos>(this.URL + `obtenerdetallepedidoxid/${idDetallePedido}`);
  };

  public guardarVariosDetallesPedido(detallesPedidosAcotada: DetallePedidosAcotadaModel[]): Observable<any> {  
    return this.httpClient.post<any>(this.URL + 'guardarvariosdetallespedido', detallesPedidosAcotada);
  };

}
