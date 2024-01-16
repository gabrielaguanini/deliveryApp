package com.delivery.delivery.Controller.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Pedidos.DetallePedidosService;
import com.delivery.delivery.Service.Pedidos.PedidosService;
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
public class DetallePedidosController {

    @Autowired
    DetallePedidosService detpeServ;

    @Autowired
    PedidosService pedidosService;

    //LISTA DETALLE PEDIDOS    
    @GetMapping("/listadetallepedidos")
    public ResponseEntity<List<DetallePedidos>> listaDetallePedidos() {

        List<DetallePedidos> listaDetallePedidos = detpeServ.listaDetallePedidos();
        return new ResponseEntity(listaDetallePedidos, HttpStatus.OK);
    }

    ;
    
    //LISTA QUE OBTIENE DETALLES PEDIDOS POR ID_PEDIDO Y NO X IDDETALLEPEDIDO
    @GetMapping("/listadetpedidosidpedido/{idPedido}")
    public ResponseEntity<List<DetallePedidos>> listaXIdPedido(@PathVariable Long idPedido) {

        List<DetallePedidos> detallesPedidos = detpeServ.listaXIdPedido(idPedido);
        return new ResponseEntity<>(detallesPedidos, HttpStatus.OK);
    }

    ;    
        
       
    
    //GUARDAR UN DETALLE PEDIDO
    @PostMapping("/guardardetallepedido")
    public ResponseEntity<?> guardarDetallePedido(@RequestBody DetallePedidos detallePedidos) {
        detpeServ.guardarDetallePedido(detallePedidos);
        detpeServ.guardarIdPlatoTotalPrecio(detallePedidos); //INGRESA LOS VALORES ID_PLATO, TOTAL_PLATO Y PRECIO_PLATOSAMOSTRAR EN LA COLUMNA CORRESPONDIENTE 

        if (detpeServ.existsById(detallePedidos.getIdDetallePedido())) {
            return new ResponseEntity(new Mensaje("Detalle del pedido enviado"), HttpStatus.OK);
        } else {
            return new ResponseEntity(new Mensaje("El detalle del pedido no se pudo enviar"), HttpStatus.OK);
        }
    }

    ;
    
    
    //BORRAR DETALLE PEDIDO    
    @DeleteMapping("/borrardetallepedido/{idDetallePedido}")
    public ResponseEntity<?> borrarDetallePedido(@PathVariable("idDetallePedido") Long idDetallePedido) {
        try {
            detpeServ.borrarDetallePedido(idDetallePedido);
            return new ResponseEntity(new Mensaje("Detalle del pedido eliminado"), HttpStatus.OK);
        } catch (Exception e) {
            // Manejo de excepciones
            return new ResponseEntity(new Mensaje("Error al eliminar el detalle del pedido: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    ;
    
    
    //OBTENER 1 DETALLE PEDIDO POR ID    
    @GetMapping("/obtenerdetallepedidoxid/{idDetallePedido}")
    public ResponseEntity<DetallePedidos> obtDetallePedidoXId(@PathVariable("idDetallePedido") Long idDetallePedido) {
        DetallePedidos detallePedido = detpeServ.getOne(idDetallePedido).get();
        return new ResponseEntity(detallePedido, HttpStatus.OK);
    }

    ;
    
  
    
    
    //ACTUALIZAR 1 DETALLE PEDIDOS
    @PutMapping("/actualizardetallepedido/{idDetallePedido}")
    public ResponseEntity<?> actualizarDetallePedido(@RequestBody DetallePedidos detallePedidos, @PathVariable Long idDetallePedido) {
        DetallePedidos detPedid = detpeServ.getOne(idDetallePedido).get();

        detPedid.setPedidos(detallePedidos.getPedidos());
        detPedid.setPlatosAMostrar(detallePedidos.getPlatosAMostrar());
        detPedid.setPlatos(detallePedidos.getPlatos());
        detPedid.setPorcionPlato(detallePedidos.getPorcionPlato());
        detPedid.setPrecioPlatoAMostrar(detallePedidos.getPrecioPlatoAMostrar());
        detPedid.setTotalPlato(detallePedidos.getTotalPlato());

        detpeServ.guardarDetallePedido(detPedid);

        detpeServ.guardarIdPlatoTotalPrecio(detPedid); //INGRESA LOS VALORES ID_PLATO, TOTAL_PLATO Y PRECIO_PLATOSAMOSTRAR EN LA COLUMNA CORRESPONDIENTE 

        return new ResponseEntity(new Mensaje("Detalle del pedido actualizado"), HttpStatus.OK);
    }

    ; 
      
    
    //GUARDAR VARIOS DETALLESPEDIDOS EN UN SOLO POST
     @PostMapping("/guardarvariosdetallespedidos")
    public ResponseEntity<String> guardarDetallesPedido(@RequestBody List<DetallePedidos> detallesPedidos) {
        try {
            detpeServ.guardarVariosDetallesPedido(detallesPedidos);
            // Mensaje de éxito
            return new ResponseEntity<>("Detalles del pedido guardados correctamente.", HttpStatus.OK);
        } catch (RuntimeException e) {
            // Manejo de errores
            return new ResponseEntity<>("Error al procesar detalles del pedido: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    
    
    
    
    
};
