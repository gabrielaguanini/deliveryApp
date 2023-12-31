package com.delivery.delivery.Controller.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Pedidos.DetallePedidosService;
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
    DetallePedidosService detpeServ;

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
    
    
    
    // GUARDA LA LISTA DE STRINGS GENERADA A PARTIR DE PASAR UN ID A DETALLE PEDIDOS EN LA COLUMNA lista_platos_del_pedido DE LA TABLA PEDIDOS
    // ESTE METODO SE USA EN CONJUNTO, DESDE EL FRONT, CON EL METODO guardarPedido()
    @PostMapping("/actualizarpedidosconlistastring/{idPedido}")
    public ResponseEntity<String> actualizarListaPlatos(@PathVariable Long idPedido) {
        try {
            List<String> listaCadenas = detpeServ.generarListaCadenasDesdeDetallesPorIdPedido(idPedido);
            pedidosServ.guardarListaPlatosEnPedido(idPedido, listaCadenas);
            return new ResponseEntity<>("Lista de platos de detalle pedidos guardada correctamente.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar la lista de platos de detalle pedidos.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };  
    
    
   // GUARDAR UN PEDIDO
   // ESTE METODO SE USA EN CONJUNTO, DESDE EL FRONT, CON EL METODO actualizarListaPlatos()
   @PostMapping("/guardarpedido")
    public ResponseEntity<Pedidos> guardarPedido(@RequestBody Pedidos pedidos) {
        Pedidos pedidoGuardado = pedidosServ.guardarPedido(pedidos);
        pedidosServ.updateFechaHora(pedidos.getIdPedido());
 
        if (pedidosServ.existsById(pedidos.getIdPedido())) {
            return new ResponseEntity<>(pedidoGuardado, HttpStatus.CREATED);
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
@PutMapping("/actualizarpedido/{idPedido}")
public ResponseEntity<?> actualizarPedido(@RequestBody Pedidos pedidos, @PathVariable Long idPedido) {
    Pedidos pedid = pedidosServ.getOne(idPedido).get();       
    pedid.setListaPlatosDelPedido(pedidos.getListaPlatosDelPedido());
    pedid.setNombreCliente(pedidos.getNombreCliente());
    pedid.setTelefonoCliente(pedidos.getTelefonoCliente());
    pedid.setDireccionCliente(pedidos.getDireccionCliente());
    pedid.setLocalidadCliente(pedidos.getLocalidadCliente());
    pedid.setFecha(pedidos.getFecha());
    pedid.setHora(pedidos.getHora());
    pedid.setImporteTotalPedido(pedidos.getImporteTotalPedido());
    pedid.setPedidoConfirmado(pedidos.getPedidoConfirmado());
    pedidosServ.guardarPedido(pedid);      
    return new ResponseEntity(new Mensaje("Plato actualizado"), HttpStatus.OK);
 };


@PutMapping("/actualizartotalpedido/{idPedido}")
public ResponseEntity<?> actualizarImporteTotalPedido(@PathVariable Long idPedido, @RequestBody Pedidos pedid) {
    Pedidos pedidoActualizado = pedidosServ.actualizarImporteTotalPedido(idPedido);
    
    if (pedidoActualizado != null) {
        return new ResponseEntity<>(new Mensaje("Importe total del pedido actualizado"), HttpStatus.OK);
    } else {
        return new ResponseEntity<>(new Mensaje("Error al actualizar el importe total del pedido"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
};



 
}
