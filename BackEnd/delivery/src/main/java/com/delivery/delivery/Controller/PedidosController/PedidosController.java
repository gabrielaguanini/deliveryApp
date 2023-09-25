
package com.delivery.delivery.Controller.PedidosController;

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
    public ResponseEntity <List<Pedidos>> listapedidos(){
    
        List <Pedidos> listapedidos = pedidosServ.listapedidos();
        return new ResponseEntity(listapedidos, HttpStatus.OK);
    }
    
    
    
    //GUARDAR UN PEDIDO
    
    @PostMapping("/guardarpedido")
    public ResponseEntity <?> guardarPedido(@RequestBody Pedidos pedidos){
         
        if(platosAMosServ.existsById(pedidos.getPlatosAMostrar().getIdPlatosAMostrar())){
        pedidosServ.guardarPedido(pedidos);
        pedidosServ.updateFecha(pedidos.getIdPedido());
        pedidosServ.updateTotalPedidos(pedidos.getIdPedido());
        return new ResponseEntity(new Mensaje("Pedido enviado"), HttpStatus.OK);
        } else {
        return new ResponseEntity(new Mensaje("El pedido no se pudo enviar"), HttpStatus.OK);
        }
    };   
    
    
    //BORRAR PEDIDO
    
    @DeleteMapping("/borrarpedido/{idPedido}")
    public ResponseEntity <?> borrarPedido(@PathVariable("idPedido") Long idPedido){
       
        pedidosServ.borrarPedido(idPedido);        
        return new ResponseEntity(new Mensaje("Pedido cancelado"), HttpStatus.OK);
        
    };
    
     //OBTENER 1 PEDIDO POR ID
    
    @GetMapping("/obtenerpedidoxid/{idPedido}")
    public ResponseEntity<Pedidos> obtPedidoXId(@PathVariable("idPedido") Long idPedido) {
        Pedidos pedido = pedidosServ.getOne(idPedido).get();
        return new ResponseEntity(pedido, HttpStatus.OK);
    };
    
    //ACTUALIZAR PEDIDOS  

    @PutMapping("/actualizarpedido/{idPedido}")
    public ResponseEntity <?> actualizarPedido(@RequestBody Pedidos pedidos, @PathVariable Long idPedido){
      Pedidos pedid = pedidosServ.getOne(idPedido).get();
      
      pedid.setIdPedido(pedidos.getIdPedido());
      pedid.setPlatosAMostrar(pedidos.getPlatosAMostrar());
      pedid.setPorcionPlato(pedidos.getPorcionPlato());
      pedid.setTotalPedido(pedidos.getTotalPedido());
      pedid.setFecha(pedidos.getFecha());
      
      pedidosServ.guardarPedido(pedid);      
      pedidosServ.updateFecha(pedidos.getIdPedido());
      pedidosServ.updateTotalPedidos(pedidos.getIdPedido());
      
      return new ResponseEntity(new Mensaje("Plato actualizado"), HttpStatus.OK);
    };
    
}
