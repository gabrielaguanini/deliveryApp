import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatosAMostrar } from '../modelos/platos-amostrar';
import { PedidosModel } from '../modelos/pedidos-model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  URL = 'http://localhost:8080/';

  constructor(private httpClient:HttpClient) {}

    public listaPedidos(): Observable<PedidosModel[]> {
      return this.httpClient.get<PedidosModel[]>(this.URL + 'listapedidos');  
    };

    public listaPedidosDeHoy(): Observable<PedidosModel[]> {
      return this.httpClient.get<PedidosModel[]>(this.URL + 'listapedidosdehoy');  
    };
  
    public guardarPedido(pedido:PedidosModel): Observable<any>{
      return this.httpClient.post<any>(this.URL + 'guardarpedido', pedido);
    };

    public borrarPedido(idPedido:number): Observable<any>{
      return this.httpClient.delete<any>(this.URL + `borrarpedido/${idPedido}`);
    };

    public actualizarPedido(idPedido:number, pedido:PedidosModel): Observable<any>{
      return this.httpClient.put<any>(this.URL + `actualizarpedido/${idPedido}`, pedido);
    };

    public obtenerPedidoXId(idPedido:number): Observable<PedidosModel>{
      return this.httpClient.get<PedidosModel>(this.URL + `obtenerpedidoxid/${idPedido}`)
    };

    public actualizarImporteTotalPedido(idPedido: number): Observable<any> {
      const body = { "importeTotalPedido": 0 }; // Puedes enviar cualquier valor, ya que el backend lo calculará
      return this.httpClient.put<any>(this.URL + `actualizartotalpedido/${idPedido}`, body);
    }
    
  
  }

  //CONSOLA
//////////////////////////
console.log("Pedidos service esta corriendo");


