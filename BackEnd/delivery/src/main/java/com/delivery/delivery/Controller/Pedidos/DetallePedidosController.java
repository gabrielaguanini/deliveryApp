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

    /**
     * Obtiene la lista completa de DetallePedidos.
     *
     * @throw "e" toma del metodo del servicio que implementa el
     * MensajeResponseStatusException que genere este
     * @throw MensajeRunTimeException Si hay un error interno del servidor
     * @return ResponseEntity con la lista de DetallePedidos y el estado HTTP
     * correspondiente.
     */
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

// ======================================================================================================= //
    
    /**
     * Obtiene la lista de DetallesPedidos filtrados por ID_PEDIDO.
     *
     * @throw "e" toma del metodo del servicio que implementa el
     * MensajeResponseStatusException que genere este
     * @throw MensajeRunTimeException Si hay un error interno del servidor
     * @param idPedido ID del pedido para filtrar los DetallesPedidos.
     * @return ResponseEntity con la lista de DetallePedidos y el estado HTTP
     * correspondiente.
     */
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

// ======================================================================================================= //
    
    /**
     * Guarda un nuevo DetallePedido.
     *
     * @throw "e" toma del metodo del servicio que implementa el
     * MensajeResponseStatusException que genere este
     * @throw MensajeRunTimeException Si hay un error interno del servidor
     * @param detallePedidos DetallePedido a guardar.
     * @return ResponseEntity con un mensaje indicando el resultado de la
     * operación y el código de estado correspondiente.
     */
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

// ======================================================================================================= //
    
    /**
     * Borra un DetallePedido.
     *
     * @throw "e" toma del metodo del servicio que implementa el
     * MensajeResponseStatusException que genere este
     * @throw MensajeRunTimeException Si hay un error interno del servidor
     * @param idDetallePedido ID del DetallePedido a borrar.
     * @param idPedido ID del pedido al que pertenece el detalle.
     * @return ResponseEntity con un mensaje indicando el resultado de la
     * operación y el código de estado correspondiente.
     */
    @DeleteMapping("/borrardetallepedido/{idDetallePedido}/{idPedido}")
    public ResponseEntity<?> borrarDetallePedido(@PathVariable("idDetallePedido") Long idDetallePedido, @PathVariable("idPedido") Long idPedido) {
        try {

            detpeServ.borrarDetallePedido(idDetallePedido, idPedido);
            return new ResponseEntity(new Mensaje("Detalle del pedido eliminado"), HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para elminar el detalle del pedido"), e);
        }
    }

// ======================================================================================================= //
    
    /**
     * Obtiene un DetallePedido por su ID.
     *
     * @throw "e" toma del metodo del servicio que implementa el
     * MensajeResponseStatusException que genere este
     * @throw MensajeRunTimeException Si hay un error interno del servidor
     * @param idDetallePedido ID del DetallePedido a obtener.
     * @return ResponseEntity con el DetallePedido y el estado HTTP
     * correspondiente.
     */
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

// ======================================================================================================= //
    
 /**
 * Actualiza un detalle de pedido existente.
 *
 * @param detallePedidos DetallePedido actualizado.
 * @param idDetallePedido ID del DetallePedido a actualizar.
 * @return ResponseEntity con un mensaje indicando el resultado de la operación y el código de estado correspondiente.
 * @throws MensajeResponseStatusException Si no se encuentra el idPlatoAMostrar o el idPedido.
 * @throws MensajeResponseStatusException Si no se realizan modificaciones al detalle del pedido.
 * @throws MensajeRunTimeException Si hay un error interno del servidor.
 */
@Transactional
@PutMapping("/actualizardetallepedido/{idDetallePedido}")
public ResponseEntity<?> actualizarDetallePedido(@RequestBody DetallePedidos detallePedidos, @PathVariable Long idDetallePedido) {
    try {
        // Verificar la existencia del idPlatoAMostrar
        if (!plaMosSer.existsById(detallePedidos.getPlatosAMostrar().getIdPlatosAMostrar())) {
            throw new MensajeResponseStatusException(new Mensaje("Pedido no encontrado con idPlatoAMostrar:" + detallePedidos.getPlatosAMostrar().getIdPlatosAMostrar()).getMensaje(), HttpStatus.NOT_FOUND, null);
        }

        // Verificar la existencia del idPedido
        if (!pedidosService.existsById(detallePedidos.getPedidos().getIdPedido())) {
            throw new MensajeResponseStatusException(new Mensaje("Pedido no encontrado con idPedido:" + detallePedidos.getPedidos().getIdPedido()).getMensaje(), HttpStatus.NOT_FOUND, null);
        }

        DetallePedidos detPedid = detpeServ.getOne(idDetallePedido).get();

        // Verificar si se han realizado modificaciones al detalle del pedido
        if (detPedid.getPlatosAMostrar().getIdPlatosAMostrar().equals(detallePedidos.getPlatosAMostrar().getIdPlatosAMostrar())
                && detPedid.getPorcionPlato().equals(detallePedidos.getPorcionPlato())) {
            throw new MensajeResponseStatusException(new Mensaje("No se han realizado modificaciones al detalle del pedido").getMensaje(), HttpStatus.BAD_REQUEST, null);
        }

        // Verificar si el idPlatosAMostrar es igual, pero la porcionPlato ha cambiado
        if (detPedid.getPlatosAMostrar().getIdPlatosAMostrar().equals(detallePedidos.getPlatosAMostrar().getIdPlatosAMostrar())
                && !detPedid.getPorcionPlato().equals(detallePedidos.getPorcionPlato())) {
            // Realizar la actualización solo si hay cambios en la porcionPlato
            detPedid.setPorcionPlato(detallePedidos.getPorcionPlato());

            detpeServ.guardarIdPlatoTotalPrecio(detPedid);
            detpeServ.actualizarImporteTotalPedido(detPedid.getPedidos().getIdPedido());
            detpeServ.generarListaCadenasDesdeDetallesPorIdPedido(detPedid.getPedidos().getIdPedido());

            return new ResponseEntity(new Mensaje("Detalle del pedido actualizado"), HttpStatus.OK);
        }

        // Realizar la actualización completa si hay cambios en otros campos
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


// ======================================================================================================= //
    
    /**
     * Guarda varios detalles de pedido en una sola operación POST.
     *
     * @throw "e" toma del metodo del servicio que implementa el
     * MensajeResponseStatusException que genere este
     * @throw MensajeRunTimeException Si hay un error interno del servidor
     * @param detallesPedidos Lista de detalles de pedido a ser guardados.
     * @return ResponseEntity con un mensaje indicando el resultado de la
     * operación y el código de estado correspondiente.
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

// ======================================================================================================= //
    
    
    
}
