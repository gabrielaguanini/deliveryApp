package com.delivery.delivery.Controller.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeDataAccessException;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.Pedidos.DetallePedidosService;
import com.delivery.delivery.Service.Pedidos.PedidosService;
import com.delivery.delivery.Service.Platos.PlatosService;
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
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "https://deliveryappfe.web.app")
public class DetallePedidosController {

    @Autowired
    DetallePedidosService detpeServ;

    @Autowired
    PedidosService pedidosService;

    @Autowired
    PlatosAMostrarService plaMosSer;

    @Autowired
    PlatosService plaSer;

    private static final Logger logger = LoggerFactory.getLogger(DetallePedidosController.class);

// ======================================================================================================= //
    /**
     * Retorna una lista de todos los detalles de pedidos.
     *
     * @return ResponseEntity<List<DetallePedidos>> - ResponseEntity que
     * contiene la lista de todos los detalles de pedidos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @GetMapping("/listadetallepedidos")
    public ResponseEntity<List<DetallePedidos>> listaDetallePedidos() {
        try {
            List<DetallePedidos> listaDetallePedidos = detpeServ.listaDetallePedidos();
            return new ResponseEntity<>(listaDetallePedidos, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de detalles del pedidos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de detalles del pedidos. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= //
    /**
     * Obtiene una lista de detalles de pedidos asociados a un pedido específico
     * en la base de datos.
     *
     * @param idPedido El ID del pedido para el que se van a buscar los detalles
     * de pedidos.
     * @return Una respuesta HTTP con una lista de detalles de pedidos asociados
     * al pedido especificado. Devuelve un estado HTTP 200 OK si se encuentran
     * los detalles de los pedidos y se devuelven correctamente. Devuelve un
     * estado HTTP 404 NOT FOUND si el ID del pedido no se encuentra en la base
     * de datos. Devuelve un estado HTTP 400 BAD REQUEST si uno o más platos
     * asociados al pedido no existen en la base de datos. Devuelve un estado
     * HTTP 500 INTERNAL SERVER ERROR si se produce un error al acceder a la
     * base de datos o al procesar la solicitud.
     */
    @GetMapping("/listadetpedidosidpedido/{idPedido}")
    public ResponseEntity<List<DetallePedidos>> listaXIdPedido(@PathVariable Long idPedido) {
        try {
            // Verifica si el IdPedido existe en la base de datos
            if (!pedidosService.existsById(idPedido)) {
                // Si el IdPedido no existe, lanza una excepción con un mensaje personalizado
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idPedido n°: " + idPedido + " solicitado para generar una lista no existe", HttpStatus.NOT_FOUND);
            }

            // Obtiene una lista de IDs de platos relacionados con el IdPedido dado
            List<Long> idPlatosFromList = detpeServ.findIdPlatosXIdPedido(idPedido);

            // Supone que todos los platos existen inicialmente
            boolean todosPlatosExisten = true;

            // Verifica la existencia de cada plato en la base de datos
            for (Long idPlat : idPlatosFromList) {
                Boolean platoExiste = plaSer.existsById(idPlat);
                // Si algún plato no existe, cambia la variable todosPlatosExisten a false
                if (!platoExiste) {
                    todosPlatosExisten = false;
                    // Sale del bucle tan pronto como se encuentre un plato que no existe
                    break;
                }
            }

            // Si algunos platos no existen, lanza una excepción
            if (!todosPlatosExisten) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("Uno o más platos ya no existen en la tabla Platos, no se puede editar", HttpStatus.BAD_REQUEST, null);
            };

            // Si todos los platos existen, obtiene y devuelve la lista de detalles de los pedidos
            List<DetallePedidos> detallesPedidosEncontrados = detpeServ.listaXIdPedido(idPedido);

            // Retorna una respuesta HTTP con una lista de detalles de pedidos y un estado HTTP 200 OK
            return new ResponseEntity<>(detallesPedidosEncontrados, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de detalles del pedido filtrada por idPedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de detalles del pedido filtrada por idPedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= //
    /**
     * Guarda un detalle de pedido y actualiza los datos relacionados.
     *
     * @param detallePedidos El detalle de pedido que se desea guardar.
     * @return ResponseEntity<?> La respuesta HTTP con el mensaje de éxito o
     * error.
     */
    @PostMapping("/guardardetallepedido")
    public ResponseEntity<?> guardarDetallePedido(@RequestBody DetallePedidos detallePedidos) {
        try {

            // Verifica si el pedido asociado al detalle de pedido existe
            if (!pedidosService.existsById(detallePedidos.getPedidos().getIdPedido())) {
                // Si no existe, lanza una excepción con un mensaje personalizado y realiza el registro en el log
                logger.info(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException(new Mensaje("El idPedido n°: " + detallePedidos.getPedidos().getIdPedido() + " no existe.").getMensaje(), HttpStatus.NOT_FOUND, null);
            }
            // Obtiene una lista de IDs de platos relacionados con el IdPedido dado
            List<Long> idPlatosFromList = detpeServ.findIdPlatosXIdPedido(detallePedidos.getPedidos().getIdPedido());

            // Supone que todos los platos existen inicialmente
            boolean todosPlatosExisten = true;

            // Verifica la existencia de cada plato en la base de datos
            for (Long idPlat : idPlatosFromList) {
                Boolean platoExiste = plaSer.existsById(idPlat);
                // Si algún plato no existe, cambia la variable todosPlatosExisten a false
                if (!platoExiste) {
                    todosPlatosExisten = false;
                    // Sale del bucle tan pronto como se encuentre un plato que no existe
                    break;
                }
            }

            // Si algunos platos no existen, lanza una excepción
            if (!todosPlatosExisten) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("Uno o más platos ya no existen en la tabla Platos, no se puede editar", HttpStatus.BAD_REQUEST, null);
            };

            // Verifica si el detalle de pedido es nulo o ausente
            if (detallePedidos == null || detallePedidos.getPorcionPlato() == null) {
                // Si es nulo o ausente, lanza una excepción con un mensaje personalizado y realiza el registro en el log

                logger.info(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("Detalle del pedido nulo o ausente").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

            // Guarda el detalle de pedido y realiza las actualizaciones correspondientes
            detpeServ.guardarDetallePedido(detallePedidos);
            detpeServ.generarListaCadenasDesdeDetallesPorIdPedido(detallePedidos.getPedidos().getIdPedido());
            detpeServ.generarListaCadenasDesdeDetallesPorIdPedidoCli(detallePedidos.getPedidos().getIdPedido());
            //detpeServ.guardarIdPlatoTotalPrecio(detallePedidos);
            //detpeServ.actualizarImporteTotalPedido(detallePedidos.getPedidos().getIdPedido());

            // Retorna una respuesta de éxito
            return new ResponseEntity<Mensaje>(new Mensaje("Detalles del pedido enviados"), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para guardar un detalle del pedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud  para guardar un detalle del pedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= //
    /**
     * Borra un detalle de pedido por su ID y actualiza el pedido
     * correspondiente.
     *
     * @param idDetallePedido El ID del detalle de pedido que se desea borrar.
     * @param idPedido El ID del pedido al que pertenece el detalle de pedido
     * que se va a borrar.
     * @return ResponseEntity<?> La respuesta HTTP con el mensaje de éxito o
     * error.
     */
    @DeleteMapping("/borrardetallepedido/{idDetallePedido}/{idPedido}")
    public ResponseEntity<?> borrarDetallePedido(@PathVariable("idDetallePedido") Long idDetallePedido, @PathVariable("idPedido") Long idPedido) {
        try {
            // Verifica si el detalle de pedido existe
            if (!detpeServ.existsById(idDetallePedido)) {
                // Si no existe, lanza una excepción con un mensaje personalizado y lo registra en el log
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idDetallePedido N°: " + idDetallePedido + " solicitado para eliminar no existe", HttpStatus.NOT_FOUND, null);
            }

            // Verifica si el pedido existe
            if (!pedidosService.existsById(idPedido)) {
                // Si no existe, lanza una excepción con un mensaje personalizado y lo registra en el log
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idPedido N°: " + idPedido + " no existe. Es necesario para eliminar el detalle del pedido", HttpStatus.NOT_FOUND, null);
            }

            // Borra el detalle de pedido y actualiza el pedido correspondiente
            detpeServ.borrarDetallePedido(idDetallePedido, idPedido);

            // Retorna una respuesta de éxito
            return new ResponseEntity(new Mensaje("Detalle del pedido eliminado"), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para eliminar un detalle del pedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para eliminar un detalle del pedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= //
    /**
     * Obtiene un detalle de pedido por su ID.
     *
     * @param idDetallePedido El ID del detalle de pedido que se desea obtener.
     * @return Un ResponseEntity que contiene el detalle de pedido
     * correspondiente al ID especificado y un código de estado HTTP OK, o un
     * ResponseEntity con un mensaje de error y un código de estado HTTP NOT
     * FOUND si no se encuentra ningún detalle de pedido con ese ID.
     */
    @GetMapping("/obtenerdetallepedidoxid/{idDetallePedido}")
    public ResponseEntity<DetallePedidos> obtDetallePedidoXId(@PathVariable("idDetallePedido") Long idDetallePedido) {
        try {
            // Verifica si el detalle de pedido con el ID especificado existe en la base de datos
            if (!detpeServ.existsById(idDetallePedido)) {
                // Si no existe, lanza una excepción con un mensaje personalizado y un estado HTTP NOT FOUND y lo registra en el log
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idDetallePedido N°: " + idDetallePedido + " no existe", HttpStatus.NOT_FOUND, null);
            }

            // Obtiene el detalle de pedido por su ID
            DetallePedidos detallePedido = detpeServ.getOne(idDetallePedido).get();

            // Retorna el detalle de pedido encontrado con un código de estado HTTP OK
            return new ResponseEntity(detallePedido, HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de obtener un detalle pedido por idDetallePedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de obtener un detalle pedido por idDetallePedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= //
    /**
     * Actualiza un detalle de pedido y realiza las actualizaciones
     * correspondientes.
     *
     * @param detallePedidos El detalle de pedido actualizado.
     * @param idDetallePedido El ID del detalle de pedido que se desea
     * actualizar.
     * @return ResponseEntity<?> La respuesta HTTP con el mensaje de éxito o
     * error.
     */
    @Transactional
    @PutMapping("/actualizardetallepedido/{idDetallePedido}")
    public ResponseEntity<?> actualizarDetallePedido(@RequestBody DetallePedidos detallePedidos, @PathVariable Long idDetallePedido) {
        try {

            // Verificar la existencia del idPedido
            if (!pedidosService.existsById(detallePedidos.getPedidos().getIdPedido())) {
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException(new Mensaje("Pedido no encontrado con idPedido:" + detallePedidos.getPedidos().getIdPedido()).getMensaje(), HttpStatus.NOT_FOUND, null);
            }

            // Obtener el detalle de pedido actual
            DetallePedidos detPedid = detpeServ.getOne(idDetallePedido).get();

            // Verificar si el idPlato es igual, pero la porcionPlato ha cambiado
            if (detPedid.getPlatos().getIdPlato().equals(detallePedidos.getPlatos().getIdPlato())
                    && !detPedid.getPorcionPlato().equals(detallePedidos.getPorcionPlato())) {
                // Realizar la actualización solo si hay cambios en la porcionPlato
                detPedid.setPorcionPlato(detallePedidos.getPorcionPlato());

                detpeServ.guardarIdPlatoTotalPrecio(detPedid);
                detpeServ.actualizarImporteTotalPedido(detPedid.getPedidos().getIdPedido());
                //genera lista de strings o cadenas de los detalles del pedido para visualizacion de usuarios
                detpeServ.generarListaCadenasDesdeDetallesPorIdPedido(detPedid.getPedidos().getIdPedido());
                //genera lista de strings o cadenas de los detalles del pedido para visualizacion de clientes
                detpeServ.generarListaCadenasDesdeDetallesPorIdPedidoCli(detPedid.getPedidos().getIdPedido());

                return new ResponseEntity(new Mensaje("Detalle del pedido actualizado"), HttpStatus.OK);
            }

            // Realizar la actualización completa si hay cambios en otros campos
            detPedid.setPedidos(detallePedidos.getPedidos());
            detPedid.setPlatos(detallePedidos.getPlatos());
            detPedid.setPorcionPlato(detallePedidos.getPorcionPlato());
            detPedid.setPrecioPlato(detallePedidos.getPrecioPlato());
            detPedid.setTotalPlato(detallePedidos.getTotalPlato());

            detpeServ.guardarIdPlatoTotalPrecio(detPedid);
            detpeServ.actualizarImporteTotalPedido(detPedid.getPedidos().getIdPedido());
            //genera lista de strings o cadenas de los detalles del pedido para visualizacion de usuarios
            detpeServ.generarListaCadenasDesdeDetallesPorIdPedido(detPedid.getPedidos().getIdPedido());
            //genera lista de strings o cadenas de los detalles del pedido para visualizacion de clientes
            detpeServ.generarListaCadenasDesdeDetallesPorIdPedidoCli(detPedid.getPedidos().getIdPedido());

            return new ResponseEntity(new Mensaje("Detalle del pedido actualizado"), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para actualizar un detalle pedido por idDetallePedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para actualizar un detalle pedido por idDetallePedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= //
    /**
     * Método para guardar varios detalles de pedidos en la base de datos.
     *
     * Este método recibe una lista de detalles de pedidos y valida su
     * contenido. Si la validación es exitosa, guarda los detalles en la base de
     * datos y actualiza los importes totales del pedido correspondiente.
     *
     * @param detallesPedidos La lista de objetos DetallePedidos a guardar. No
     * debe ser nula ni estar vacía.
     * @return ResponseEntity<String> con el estado HTTP 200 OK y un mensaje
     * indicando que los detalles del pedido fueron actualizados correctamente.
     * @throws MensajeResponseStatusException Si los detalles del pedido son
     * nulos o vacíos, o si el IdPlato o IdPedido no se encuentran en la base de
     * datos, o si las porciones están fuera del rango permitido (1 a 15).
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos durante el proceso de guardado.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @PostMapping("/guardarvariosdetallespedidos")
    public ResponseEntity<String> guardarDetallesPedido(@RequestBody List<DetallePedidos> detallesPedidos) {
        if (detallesPedidos == null || detallesPedidos.isEmpty()) {
            logger.error(HttpStatus.BAD_REQUEST.toString());
            throw new MensajeResponseStatusException("Detalles del pedido nulos o ausentes", HttpStatus.BAD_REQUEST, null);
        }

        try {
            // Itera sobre cada detalle de pedido recibido
            for (DetallePedidos detallitos : detallesPedidos) {
                Long idPedido = detallitos.getPedidos().getIdPedido();
                Long idPlato = detallitos.getPlatos().getIdPlato();
                Integer porcionPlato = detallitos.getPorcionPlato();

                // Verifica si existe el IdPlato en la base de datos
                if (!plaSer.existsById(idPlato)) {
                    logger.error(HttpStatus.NOT_FOUND.toString());
                    throw new MensajeResponseStatusException("No se encontró el IdPlato n°: " + idPlato, HttpStatus.NOT_FOUND, null);
                }

                // Verifica si existe el IdPedido en la base de datos
                if (!pedidosService.existsById(idPedido)) {
                    logger.error(HttpStatus.NOT_FOUND.toString());
                    throw new MensajeResponseStatusException("No se encontró el IdPedido n°: " + idPedido, HttpStatus.NOT_FOUND, null);
                }

                // Verifica si alguna de las porciones es mayor a 15 o menor a 1
                if (porcionPlato > 15 || porcionPlato < 1) {
                    logger.error(HttpStatus.BAD_REQUEST.toString());
                    throw new MensajeResponseStatusException("La/s porcion/es no pueden ser mayores a 15.", HttpStatus.BAD_REQUEST, null);
                }
            }

            // Realiza operaciones adicionales sobre los detalles de pedido
            for (DetallePedidos detallitos : detallesPedidos) {
                detpeServ.guardarIdPlatoTotalPrecio(detallitos);
                detpeServ.actualizarImporteTotalPedido(detallitos.getPedidos().getIdPedido());
                detpeServ.generarListaCadenasDesdeDetallesPorIdPedido(detallitos.getPedidos().getIdPedido());
                detpeServ.generarListaCadenasDesdeDetallesPorIdPedidoCli(detallitos.getPedidos().getIdPedido());
            }

            // Llama al servicio para guardar varios detalles de pedidos
            detpeServ.guardarVariosDetallesPedido(detallesPedidos);

            // Retorna una respuesta con el estado HTTP OK indicando el éxito de la operación
            return new ResponseEntity(new Mensaje("Detalles del pedido actualizados"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para guardar varios detalles pedidos.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar varios detalles pedidos."), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= //
    /**
     * Elimina los detalles de un pedido específico por su ID.
     *
     * @param idPedido El identificador único del pedido del cual se eliminarán
     * los detalles.
     * @return ResponseEntity con un mensaje de éxito si la eliminación se
     * realiza correctamente.
     * @throws MensajeResponseStatusException Si el pedido no existe, se lanza
     * una excepción con un mensaje personalizado.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos durante el proceso de eliminación.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante el
     * procesamiento de la solicitud.
     */
    @DeleteMapping("/eliminardetpedporidped/{idPedido}")
    public ResponseEntity<?> eliminarDetallesPorIdsPedido(@PathVariable Long idPedido) {
        try {
            // Verifica si el pedido existe
            if (!pedidosService.existsById(idPedido)) {
                // Si no existe, lanza una excepción con un mensaje personalizado y lo registra en el log
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idPedido N°: " + idPedido + " no existe. Es necesario para eliminar los detalles del pedido", HttpStatus.NOT_FOUND, null);
            }
            // Elimina los detalles del pedido
            detpeServ.eliminarVariosDetallesPorIdPedido(idPedido);
            // Retorna una respuesta exitosa con un mensaje indicando el éxito de la eliminación
            return new ResponseEntity(new Mensaje("Detalle/s del pedido eliminados exitosamente. El parametro de eliminacion fue el idPedido: " + idPedido), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para eliminar el/los detalle/s del pedido con el parametro idPedido: " + idPedido, HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para eliminar el/los detalle/s del pedido con el parametro idPedido: " + idPedido), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= //
}
