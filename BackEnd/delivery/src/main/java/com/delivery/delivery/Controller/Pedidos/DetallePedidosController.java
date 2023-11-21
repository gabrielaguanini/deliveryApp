package com.delivery.delivery.Controller.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Pedidos.DetallePedidosService;
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
    
    
    //LISTA DETALLE PEDIDOS    
    @GetMapping("/listadetallepedidos")
    public ResponseEntity <List<DetallePedidos>> listaDetallePedidos(){
    
        List <DetallePedidos> listaDetallePedidos = detpeServ.listaDetallePedidos();
        return new ResponseEntity(listaDetallePedidos, HttpStatus.OK);
    };
    
    //LISTA QUE FILTRA DE LA TABLA DETALLE PEDIDOS POR ID_PEDIDO
    @GetMapping("/listadetpedidpedido/{idPedido}")
    public ResponseEntity<List<DetallePedidos>> listaXIdPedido(@PathVariable Long idPedido) {
        List<DetallePedidos> detallesPedidos = detpeServ.listaXIdPedido(idPedido);
        return new ResponseEntity<>(detallesPedidos, HttpStatus.OK);
    };    
    
       
    
    //GUARDAR UN PEDIDO
    @PostMapping("/guardardetallepedido")
    public ResponseEntity<?> guardarDetallePedido(@RequestBody DetallePedidos detallePedidos) {
        detpeServ.guardarDetallePedido(detallePedidos); 
        detpeServ.guardarIdPlatoTotalPrecio(detallePedidos); //INGRESA LOS VALORES ID_PLATO, TOTAL_PLATO Y PRECIO_PLATOSAMOSTRAR EN LA COLUMNA CORRESPONDIENTE 
     
        if (detpeServ.existsById(detallePedidos.getIdDetallePedido())) {
            return new ResponseEntity(new Mensaje("Detalle del pedido enviado"), HttpStatus.OK);
        } else {
            return new ResponseEntity(new Mensaje("El detalle del pedido no se pudo enviar"), HttpStatus.OK);
        }
    };
    
    
    //BORRAR DETALLE PEDIDO    
    @DeleteMapping("/borrardetallepedido/{idDetallePedido}")
    public ResponseEntity <?> borrarDetallePedido(@PathVariable("idDetallePedido") Long idDetallePedido){
       
        detpeServ.borrarDetallePedido(idDetallePedido);        
        return new ResponseEntity(new Mensaje("Detalle del pedido elminado"), HttpStatus.OK);
        
    };
    
    //OBTENER 1 DETALLE PEDIDO POR ID    
    @GetMapping("/obtenerdetallepedidoxid/{idDetallePedido}")
    public ResponseEntity<DetallePedidos> obtDetallePedidoXId(@PathVariable("idDetallePedido") Long idDetallePedido) {
        DetallePedidos detallePedido = detpeServ.getOne(idDetallePedido).get();
        return new ResponseEntity(detallePedido, HttpStatus.OK);
    };
    
    //ACTUALIZAR DETALLE PEDIDOS
    @PutMapping("/actualizardetallepedido/{idDetallePedido}")
    public ResponseEntity <?> actualizarDetallePedido(@RequestBody DetallePedidos detallePedidos, @PathVariable Long idDetallePedido){
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
    };
    
 
    
    //OBTIENE UNA LISTA DE STRING FILTRADA X EL IDPEDIDO DE LA TABLA DETALLE PEDIDOS, SE GUARDARÁ EN 
    // LA TABLA PEDIDOS, COLUMNA lista_platos_del_pedido
    @GetMapping("/listastringxidpedidodesdedetalles/{idPedido}")
    public ResponseEntity<List<String>> obtenerListaCadenasPorIdPedido(@PathVariable Long idPedido) {
        try {
            List<String> listaCadenas = detpeServ.generarListaCadenasDesdeDetallesPorIdPedido(idPedido);
            return new ResponseEntity<>(listaCadenas, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    
}
