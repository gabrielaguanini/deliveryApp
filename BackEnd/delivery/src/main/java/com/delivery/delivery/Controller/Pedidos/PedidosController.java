package com.delivery.delivery.Controller.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Pedidos.PedidosService;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PedidosController {

    @Autowired
    PedidosService pedidosServ;

    @Autowired
    PlatosAMostrarService platosAMosServ;

    //LISTA PEDIDOS
    @GetMapping("/listapedidos")
    public ResponseEntity<List<Pedidos>> listapedidos() {

        List<Pedidos> listapedidos = pedidosServ.listapedidos();
        return new ResponseEntity(listapedidos, HttpStatus.OK);
    };
    
    //LISTA PEDIDOS DE LA FECHA SOLAMENTE
    @GetMapping("/listapedidosdehoy")
    public ResponseEntity<List<Pedidos>> listapedidosdehoy() {

        List<Pedidos> listapedidosdeldia = pedidosServ.obtenerPedidosDelDia();
        return new ResponseEntity(listapedidosdeldia, HttpStatus.OK);
    };
    
    //LISTA DE CADENAS DE TEXTO GENERADA DE DETALLEPEDIDO PARA GUARDAR EN LA COLUMNA listaPlatosDelPedido
 
    
      // GUARDAR UN PEDIDO
   @PostMapping("/guardarpedido")
    public ResponseEntity<?> guardarPedido(@RequestBody Pedidos pedidos) {
        pedidosServ.guardarPedido(pedidos);
        pedidosServ.updateFechaHora(pedidos.getIdPedido());       

        if (pedidosServ.existsById(pedidos.getIdPedido())) {
            return new ResponseEntity(new Mensaje("El id del pedido ha sido creado"), HttpStatus.OK);
        } else {
            return new ResponseEntity(new Mensaje("El id del pedido no se creo"), HttpStatus.OK);
        }
    };    
    
    //BORRAR PEDIDO    
    @DeleteMapping("/borrarpedido/{idPedido}")
    public ResponseEntity<?> borrarPedido(@PathVariable("idPedido") Long idPedido) {

        if (pedidosServ.existsById(idPedido)) {
             pedidosServ.borrarPedido(idPedido);
            return new ResponseEntity(new Mensaje("Id del pedido eliminado"), HttpStatus.OK);
        } else {
            return new ResponseEntity(new Mensaje("El id del pedido no existe"), HttpStatus.OK);
        }
    };
    
     //OBTENER 1 PEDIDO POR ID
    
    @GetMapping("/obtenerpedidoxid/{idPedido}")
    public ResponseEntity<Pedidos> obtPedidoXId(@PathVariable("idPedido") Long idPedido) {
        Pedidos pedido = pedidosServ.getOne(idPedido).get();
        return new ResponseEntity(pedido, HttpStatus.OK);
    };

//ACTUALIZAR PEDIDOS (ESTA ENTIDAD SOLO GUARDA UN IDPEDIDO, NO SE NECESITA ACTUALIZAR) 
//@PutMapping("/actualizarpedido/{idPedido}")
// public ResponseEntity<?> actualizarPedido(@RequestBody Pedidos pedidos, @PathVariable Long idPedido) {
//    Pedidos pedid = pedidosServ.getOne(idPedido).get();       
//    pedid.setDetallePedidos(pedidos.getDetallePedidos());      
//    pedidosServ.guardarPedido(pedid);      
//    return new ResponseEntity(new Mensaje("Plato actualizado"), HttpStatus.OK);
// };
}
