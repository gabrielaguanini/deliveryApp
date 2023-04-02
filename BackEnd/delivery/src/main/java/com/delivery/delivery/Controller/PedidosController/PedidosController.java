
package com.delivery.delivery.Controller.PedidosController;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Pedidos.PedidosService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PedidosController {
    
    @Autowired
    PedidosService pedidosServ;
    
    
    //LISTA PEDIDOS
    
    @GetMapping("/listapedidos")
    public ResponseEntity <List<Pedidos>> listapedidos(){
    
        List <Pedidos> listapedidos = pedidosServ.listapedidos();
        return new ResponseEntity(listapedidos, HttpStatus.OK);
    }
    
    
    
    //GUARDAR UN PEDIDO
    
    @PostMapping("/guardarpedido/{idPlatosAMostrar}/{porcionPlato}")
    public ResponseEntity <?> guardarPedido(@PathVariable @Param ("idPlatosAMostrar") Long idPlatosAMostrar, 
                                            @PathVariable @Param("porcionPlato") Integer porcionPlato){
    
        
        pedidosServ.findByIdPlatosAMosAndSave(idPlatosAMostrar, porcionPlato);
        pedidosServ.updatePedidos();
        
        return new ResponseEntity(new Mensaje("Pedido guardado"), HttpStatus.OK);
    }
    
    
    
    //BORRAR PEDIDO
    
    @DeleteMapping("/borrarpedido/{idPedido}")
    public ResponseEntity <?> borrarPedido(@PathVariable("idPedido") Long idPedido){
       
        pedidosServ.borrarPedido(idPedido);        
        return new ResponseEntity(new Mensaje("Pedido cancelado"), HttpStatus.OK);
        
    }
    
}
