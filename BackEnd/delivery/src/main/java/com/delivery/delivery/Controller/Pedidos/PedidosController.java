package com.delivery.delivery.Controller.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.Pedidos.DetallePedidosService;
import com.delivery.delivery.Service.Pedidos.PedidosService;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.time.LocalDate;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

    private static final Logger logger = LoggerFactory.getLogger(DetallePedidosService.class);

    //LISTA PEDIDOS COMPLETA
    @GetMapping("/listapedidos")
    public ResponseEntity<List<Pedidos>> listapedidos() {

        List<Pedidos> listapedidos = pedidosServ.listapedidos();
        return new ResponseEntity(listapedidos, HttpStatus.OK);
    }

    ;
    
    //LISTA PEDIDOS DE LA FECHA SOLAMENTE
    @GetMapping("/listapedidosdehoy")
    public ResponseEntity<List<Pedidos>> listapedidosdehoy() {

        List<Pedidos> listapedidosdeldia = pedidosServ.obtenerPedidosDelDia();
        return new ResponseEntity(listapedidosdeldia, HttpStatus.OK);
    }

    ;
    
    //LISTA DE PEDIDOS POR FECHA
    @GetMapping("/listapedidosxfecha/{fecha}")
    public ResponseEntity<List<Pedidos>> listaPedidosXFecha(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {

        try {
            List<Pedidos> listapedidosxfecha = pedidosServ.listaPedidosXFecha(fecha);
            return new ResponseEntity(listapedidosxfecha, HttpStatus.OK);

        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de lista por fecha"), e);
        }
    }

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
    }

    ;
    
     
    
    //BORRAR PEDIDO    
    @DeleteMapping("/borrarpedido/{idPedido}")
    public ResponseEntity<?> borrarPedido(@PathVariable("idPedido") Long idPedido) {

        if (pedidosServ.existsById(idPedido)) {
            pedidosServ.borrarPedido(idPedido);
            return new ResponseEntity(new Mensaje("Pedido eliminado"), HttpStatus.OK);
        }
        if (!pedidosServ.existsById(idPedido)) {
            return new ResponseEntity(new Mensaje("El id del pedido no existe"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity(new Mensaje("El pedido no se pudo eliminar"), HttpStatus.BAD_REQUEST);
        }
    }

    //OBTENER 1 PEDIDO POR ID
    @GetMapping("/obtenerpedidoxid/{idPedido}")
    public ResponseEntity<Pedidos> obtPedidoXId(@PathVariable("idPedido") Long idPedido) {
        try {
            Pedidos pedido = pedidosServ.getOne(idPedido).get();
            logger.info("idPedido obtenido.");
            return new ResponseEntity(pedido, HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al obtener 1 pedido buscandolo por idPedido "), e);
        }
    }

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
        return new ResponseEntity(new Mensaje("Pedido actualizado"), HttpStatus.OK);
    }

}
