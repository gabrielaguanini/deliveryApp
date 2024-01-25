package com.delivery.delivery.Controller.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.Pedidos.DetallePedidosService;
import com.delivery.delivery.Service.Pedidos.PedidosService;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.util.List;
import javax.transaction.Transactional;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DetallePedidosController {

    @Autowired
    DetallePedidosService detpeServ;

    @Autowired
    PedidosService pedidosService;
    
    @Autowired
    PlatosAMostrarService plaMosSer;

    private static final Logger logger = LoggerFactory.getLogger(DetallePedidosService.class);

    //LISTA DETALLE PEDIDOS    
    @GetMapping("/listadetallepedidos")
    public ResponseEntity<List<DetallePedidos>> listaDetallePedidos() {

        try {
            List<DetallePedidos> listaDetallePedidos = detpeServ.listaDetallePedidos();
            return new ResponseEntity<>(listaDetallePedidos, HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de lista de detalle pedidos"), e);
        }
    }

    //LISTA QUE OBTIENE DETALLES PEDIDOS POR ID_PEDIDO Y NO X IDDETALLEPEDIDO
    @GetMapping("/listadetpedidosidpedido/{idPedido}")
    public ResponseEntity<List<DetallePedidos>> listaXIdPedido(@PathVariable Long idPedido) {
        try { 
            List<DetallePedidos> detallesPedidosEncontrados = detpeServ.listaXIdPedido(idPedido);

            logger.info("Lista de detalles del pedido filtrada enviada con el idPedido: " + idPedido);

            return new ResponseEntity<>(detallesPedidosEncontrados, HttpStatus.OK);

        } catch (MensajeResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al generar la lista por idPedido "), e);
        }
    }

  // GUARDAR UN DETALLE PEDIDO

@PostMapping("/guardardetallepedido")
public ResponseEntity<?> guardarDetallePedido(@RequestBody DetallePedidos detallePedidos) {
    try {
             
        detpeServ.guardarDetallePedido(detallePedidos);  
        detpeServ.guardarIdPlatoTotalPrecio(detallePedidos);     
        detpeServ.actualizarImporteTotalPedido(detallePedidos.getPedidos().getIdPedido());

        logger.info("Detalle del pedido guardado correctamente");

        return new ResponseEntity<Mensaje>(new Mensaje("Detalles del pedido enviados"), HttpStatus.OK);

    } catch (MensajeResponseStatusException e) {
        throw e; 
    } catch (Exception e) {
    
        logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
      throw new MensajeRunTimeException(new Mensaje("Error inesperado al guardar el detalle del pedido"), e);
    }
}


    //BORRAR DETALLE PEDIDO    
    @DeleteMapping("/borrardetallepedido/{idDetallePedido}")
    public ResponseEntity<?> borrarDetallePedido(@PathVariable("idDetallePedido") Long idDetallePedido) {
        try {
          
            detpeServ.borrarDetallePedido(idDetallePedido);
            return new ResponseEntity(new Mensaje("Detalle del pedido eliminado"), HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para elminar el detalle del pedido"), e);
        }
    }

    /**
     * Obtiene un detalle de pedido por su ID.
     *
     * Este endpoint permite obtener un detalle de pedido específico
     * proporcionando su identificador único.
     *
     * @param idDetallePedido El identificador único del detalle de pedido.
     * @return ResponseEntity con el detalle de pedido y el estado HTTP
     * correspondiente.
     */
    //OBTENER 1 DETALLE PEDIDO POR ID    
    @GetMapping("/obtenerdetallepedidoxid/{idDetallePedido}")
    public ResponseEntity<DetallePedidos> obtDetallePedidoXId(@PathVariable("idDetallePedido") Long idDetallePedido) {
        try {    
            DetallePedidos detallePedido = detpeServ.getOne(idDetallePedido).get();
            logger.info("IdDetallePedido obtenido.");
            return new ResponseEntity(detallePedido, HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al obtener 1 detalle del pedido buscandolo por idDetallePedido "), e);
        }
    }

    //ACTUALIZAR 1 DETALLE PEDIDOS
    @Transactional
    @PutMapping("/actualizardetallepedido/{idDetallePedido}")
    public ResponseEntity<?> actualizarDetallePedido(@RequestBody DetallePedidos detallePedidos, @PathVariable Long idDetallePedido) {
        try { 
            if(!plaMosSer.existsById(detallePedidos.getPlatosAMostrar().getIdPlatosAMostrar())){
              throw new MensajeResponseStatusException(new Mensaje("Pedido no encontrado con idPlatoAMostrar:" + detallePedidos.getPlatosAMostrar().getIdPlatosAMostrar()).getMensaje(), HttpStatus.NOT_FOUND, null);
            }
              if(!pedidosService.existsById(detallePedidos.getPedidos().getIdPedido())){
              throw new MensajeResponseStatusException(new Mensaje("Pedido no encontrado con idPedido:" + detallePedidos.getPedidos().getIdPedido()).getMensaje(), HttpStatus.NOT_FOUND, null);
            
        }
            
            
            DetallePedidos detPedid = detpeServ.getOne(idDetallePedido).get();

            detPedid.setPedidos(detallePedidos.getPedidos());
            detPedid.setPlatosAMostrar(detallePedidos.getPlatosAMostrar());
            detPedid.setPlatos(detallePedidos.getPlatos());
            detPedid.setPorcionPlato(detallePedidos.getPorcionPlato());
            detPedid.setPrecioPlatoAMostrar(detallePedidos.getPrecioPlatoAMostrar());
            detPedid.setTotalPlato(detallePedidos.getTotalPlato());
            
            detpeServ.guardarIdPlatoTotalPrecio(detPedid);
            detpeServ.actualizarImporteTotalPedido(detPedid.getPedidos().getIdPedido());          
            detpeServ.generarListaCadenasDesdeDetallesPorIdPedido(detPedid.getPedidos().getIdPedido());
           
            
            return new ResponseEntity(new Mensaje("Detalle del pedido actualizado"), HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            throw e;

        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al actualizar el detalle del pedido"), e);
        }
    }

    /**
     * Guarda varios detalles de pedido en una sola operación POST.
     *
     * @param detallesPedidos Lista de detalles de pedido a ser guardados.
     * @return ResponseEntity con un mensaje indicando el resultado de la
     * operación y el código de estado correspondiente.
     *
     */
    @PostMapping("/guardarvariosdetallespedidos")
    public ResponseEntity<String> guardarDetallesPedido(@RequestBody List<DetallePedidos> detallesPedidos) {
        try {
            detpeServ.guardarVariosDetallesPedido(detallesPedidos);

            return new ResponseEntity<>("Detalles del pedido guardados correctamente.", HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar varios detalles del pedido"), e);

        }
    }

}
