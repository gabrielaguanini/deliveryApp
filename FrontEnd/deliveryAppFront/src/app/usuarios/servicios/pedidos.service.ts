import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatosAMostrar } from '../modelos/platos-amostrar';
import { PedidosModel } from '../modelos/pedidos-model';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient,
  ) { }

  // Obtiene la lista de todos los pedidos
  public listaPedidos(): Observable<PedidosModel[]> {
    return this.httpClient.get<PedidosModel[]>(this.URL + 'listapedidos');
  }

  // Obtiene la lista de pedidos realizados hoy
  public listaPedidosDeHoy(): Observable<PedidosModel[]> {
    return this.httpClient.get<PedidosModel[]>(this.URL + 'listapedidosdehoy');
  }

  // Guarda un nuevo pedido
  public guardarPedido(pedido: PedidosModel): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'guardarpedido', pedido);
  }

  // Elimina un pedido por ID
  public borrarPedido(idPedido: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.URL}borrarpedido/${idPedido}`, { responseType: 'text' as 'json' });
  }
  

  // Actualiza un pedido existente por ID
  public actualizarPedido(idPedido: number, pedido: PedidosModel): Observable<any> {
    return this.httpClient.put<any>(this.URL + `actualizarpedido/${idPedido}`, pedido);
  }

  // Obtiene un pedido específico por ID
  public obtenerPedidoXId(idPedido: number): Observable<PedidosModel> {
    return this.httpClient.get<PedidosModel>(this.URL + `obtenerpedidoxid/${idPedido}`);
  }

  // Verifica si un pedido existe en la base de datos por ID
  public existeXIdPedido(idPedido: number): Observable<boolean> {
    return this.httpClient.get<boolean>(this.URL + `existexidpedido/${idPedido}`);
  }

  // Actualiza pedidos con una lista de platos en formato de cadena
  public actualizarPedidosConListaPlatos(idPedido: number): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.URL + `actualizarpedidosconlistastring/${idPedido}`, null, { headers, responseType: 'text' });
  }

  // Obtiene la lista de pedidos por fecha
  public listaPedidosXFecha(fecha: string): Observable<PedidosModel[]> {
    return this.httpClient.get<PedidosModel[]>(this.URL + `listapedidosxfecha/${fecha}`);
  }

}

//CONSOLA
//////////////////////////
console.log("Pedidos service esta corriendo");


