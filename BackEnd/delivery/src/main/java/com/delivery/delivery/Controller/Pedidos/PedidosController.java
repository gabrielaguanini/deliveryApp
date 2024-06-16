package com.delivery.delivery.Controller.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeDataAccessException;
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

    private static final Logger logger = LoggerFactory.getLogger(PedidosController.class);

//============================================================================================================
    /**
     * Método HTTP GET para obtener una lista de todos los pedidos.
     *
     * @return ResponseEntity List Pedidos. ResponseEntity con la lista de
     * pedidos y un estado HTTP OK si la operación se realiza con éxito.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos durante la obtención de la lista de pedidos. Devuelve un
     * estado HTTP INTERNAL SERVER ERROR con un mensaje descriptivo.
     * @throws MensajeRunTimeException Si se produce un error inesperado durante
     * la ejecución del método. Devuelve un estado HTTP INTERNAL SERVER ERROR
     * con un mensaje descriptivo.
     */
    @GetMapping("/listapedidos")
    public ResponseEntity<List<Pedidos>> listapedidos() {
        try {
            // Recupera la lista de pedidos del servicio
            List<Pedidos> listapedidos = pedidosServ.listapedidos();

            // Devuelve la lista de pedidos y un estado HTTP OK
            return new ResponseEntity(listapedidos, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de pedidos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de pedidos. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//============================================================================================================
    /**
     * Obtiene la lista de pedidos del día actual y los devuelve como una
     * respuesta HTTP.
     *
     * @return La respuesta HTTP que contiene la lista de pedidos del día
     * actual.
     */
    @GetMapping("/listapedidosdehoy")
    public ResponseEntity<List<Pedidos>> listapedidosdehoy() {
        try {
            // Obtiene la lista de pedidos del día actual desde el servicio
            List<Pedidos> listapedidosdeldia = pedidosServ.obtenerPedidosDelDia();

            return new ResponseEntity(listapedidosdeldia, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP de INTERNAL_SERVER_ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de pedidos del día o fecha actual. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP de INTERNAL_SERVER_ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de pedidos del día o fecha actual. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//============================================================================================================
    /**
     * Retorna una lista de pedidos realizados en una fecha específica.
     *
     * @param fecha LocalDate - La fecha para la cual se desean obtener los
     * pedidos.
     * @return ResponseEntity<List<Pedidos>> - ResponseEntity que contiene la
     * lista de pedidos realizados en la fecha especificada.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @GetMapping("/listapedidosxfecha/{fecha}")
    public ResponseEntity<List<Pedidos>> listaPedidosXFecha(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        try {
            // Obtiene la lista de pedidos por fecha desde el servicio
            List<Pedidos> listaPedidosXFecha = pedidosServ.listaPedidosXFecha(fecha);
            // Retorna la lista de pedidos con un estado HTTP de OK
            return new ResponseEntity<>(listaPedidosXFecha, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP de INTERNAL_SERVER_ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de pedidos por fecha. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP de INTERNAL_SERVER_ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de pedidos por fecha. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//============================================================================================================
    /**
     * Método HTTP POST para guardar un pedido en el sistema.
     *
     * @param pedidos El objeto Pedidos que contiene la información del pedido a
     * guardar.
     * @return ResponseEntity Pedidos. ResponseEntity que contiene el pedido
     * guardado y el estado HTTP correspondiente.
     * @throws MensajeResponseStatusException Si alguno de los campos
     * obligatorios del pedido está vacío o el pedido es nulo. Devuelve un
     * estado HTTP BAD REQUEST con un mensaje descriptivo.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos durante la operación de guardado del pedido. Devuelve un
     * estado HTTP INTERNAL SERVER ERROR con un mensaje descriptivo.
     * @throws MensajeRunTimeException Si se produce un error inesperado durante
     * la ejecución del método. Devuelve un estado HTTP INTERNAL SERVER ERROR
     * con un mensaje descriptivo.
     */
    @PostMapping("/guardarpedido")
    public ResponseEntity<Pedidos> guardarPedido(@RequestBody Pedidos pedidos) {
        try {
            // Verifica si alguno de los campos obligatorios del pedido está vacío o si el pedido es nulo
            if (pedidos == null
                    || pedidos.getNombreCliente() == null || pedidos.getNombreCliente().isEmpty()
                    || pedidos.getTelefonoCliente() == null || pedidos.getTelefonoCliente().isEmpty()
                    || pedidos.getDireccionCliente() == null || pedidos.getDireccionCliente().isEmpty()
                    || pedidos.getLocalidadCliente() == null || pedidos.getLocalidadCliente().isEmpty()
                    || pedidos.getPedidoConfirmado() == null) {
                // Registra la excepcion en el looger
                logger.error(HttpStatus.BAD_REQUEST.toString());
                // Lanza una excepción con un mensaje descriptivo y un estado HTTP BAD REQUEST
                throw new MensajeResponseStatusException("No se han ingresado el nombre del cliente, teléfono, dirección o localidad. Por favor ingrese el/los dato/s faltante/s para continuar con el pedido. ", HttpStatus.BAD_REQUEST);
            }

            // Guarda el pedido en la base de datos
            Pedidos pedidoGuardado = pedidosServ.guardarPedido(pedidos);
            // Actualiza la fecha y hora del pedido
            pedidosServ.updateFechaHora(pedidos.getIdPedido());

            // Verifica si el pedido se creó correctamente
            if (pedidosServ.existsById(pedidos.getIdPedido())) {
                // Si el pedido se creó correctamente, devuelve un estado HTTP CREATED y el pedido guardado
                return new ResponseEntity<>(pedidoGuardado, HttpStatus.CREATED);
            } else {
                // Si el pedido no se creó correctamente, lanza una excepción con un mensaje descriptivo y un estado HTTP BAD REQUEST
                throw new MensajeResponseStatusException("El pedido no se creó correctamente", HttpStatus.BAD_REQUEST);
            }
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para guardar un pedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar un pedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//============================================================================================================
    /**
     * Método HTTP DELETE para eliminar un pedido del sistema según su ID.
     *
     * @param idPedido El ID del pedido que se desea eliminar.
     * @return ResponseEntity<?> ResponseEntity con un mensaje de confirmación
     * si se elimina correctamente o un estado HTTP NOT FOUND si el pedido no
     * existe.
     * @throws MensajeResponseStatusException Si el ID del pedido no existe en
     * el sistema. Devuelve un estado HTTP NOT FOUND con un mensaje descriptivo.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos durante la operación de eliminación del pedido. Devuelve un
     * estado HTTP INTERNAL SERVER ERROR con un mensaje descriptivo.
     * @throws MensajeRunTimeException Si se produce un error inesperado durante
     * la ejecución del método. Devuelve un estado HTTP INTERNAL SERVER ERROR
     * con un mensaje descriptivo.
     */
    @DeleteMapping("/borrarpedido/{idPedido}")
    public ResponseEntity<?> borrarPedido(@PathVariable("idPedido") Long idPedido) {
        try {
            // Verifica si el pedido con el ID proporcionado existe en el sistema
            if (pedidosServ.existsById(idPedido)) {
                // Si existe, elimina el pedido y devuelve un mensaje de confirmación con estado HTTP OK
                pedidosServ.borrarPedido(idPedido);
                return new ResponseEntity(new Mensaje("Pedido eliminado"), HttpStatus.OK);
            } else {
                // Si el pedido no existe, lanza una excepción con un mensaje descriptivo y un estado HTTP NOT FOUND
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idPedido N°: " + idPedido + " no existe en la base de datos", HttpStatus.NOT_FOUND);
            }
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para eliminar un pedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw e;
        }
    }

    //============================================================================================================
    /**
     * Método HTTP GET para obtener un pedido del sistema según su ID.
     *
     * @param idPedido El ID del pedido que se desea obtener.
     * @return ResponseEntity Pedidos. ResponseEntity con el pedido obtenido y
     * un estado HTTP OK si se encuentra en la base de datos.
     * @throws MensajeResponseStatusException Si el ID del pedido no existe en
     * la base de datos. Devuelve un estado HTTP NOT FOUND con un mensaje
     * descriptivo.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos durante la operación de obtención del pedido. Devuelve un
     * estado HTTP INTERNAL SERVER ERROR con un mensaje descriptivo.
     * @throws MensajeRunTimeException Si se produce un error inesperado durante
     * la ejecución del método. Devuelve un estado HTTP INTERNAL SERVER ERROR
     * con un mensaje descriptivo.
     */
    @GetMapping("/obtenerpedidoxid/{idPedido}")
    public ResponseEntity<Pedidos> obtPedidoXId(@PathVariable("idPedido") Long idPedido) {
        try {

            // Intenta obtener el pedido con el ID proporcionado
            Pedidos pedido = pedidosServ.getOne(idPedido).get();

            // Verifica si el pedido con el ID proporcionado existe en la base de datos
            if (!pedidosServ.existsById(idPedido)) {
                // Si no existe, lanza una excepción con un mensaje descriptivo y un estado HTTP NOT FOUND
                throw new MensajeResponseStatusException("El idPedido N°: " + idPedido + " no existe en la base de datos", HttpStatus.NOT_FOUND);
            }

            // Si se encuentra, devuelve el pedido con estado HTTP OK
            return new ResponseEntity(pedido, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para obtener un pedido por idPedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);

        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para obtener un pedido por idPedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//============================================================================================================
    /**
     * Método HTTP PUT para actualizar un pedido existente en el sistema.
     *
     * @param pedidos El pedido actualizado que se desea guardar en el sistema.
     * @param idPedido El ID del pedido que se desea actualizar.
     * @return ResponseEntity<?> ResponseEntity con un mensaje indicando que el
     * pedido ha sido actualizado y un estado HTTP OK si la operación se realiza
     * con éxito.
     * @throws MensajeResponseStatusException Si alguno de los campos
     * obligatorios del pedido está vacío, si el pedido es nulo o si el ID del
     * pedido no existe en la base de datos. Devuelve un estado HTTP BAD REQUEST
     * o NOT FOUND según corresponda, junto con un mensaje descriptivo.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos durante la operación de actualización del pedido. Devuelve
     * un estado HTTP INTERNAL SERVER ERROR con un mensaje descriptivo.
     * @throws MensajeRunTimeException Si se produce un error inesperado durante
     * la ejecución del método. Devuelve un estado HTTP INTERNAL SERVER ERROR
     * con un mensaje descriptivo.
     */
    @PutMapping("/actualizarpedido/{idPedido}")
    public ResponseEntity<?> actualizarPedido(@RequestBody Pedidos pedidos, @PathVariable Long idPedido) {
        try {
            // Verifica si alguno de los campos obligatorios del pedido está vacío o si el pedido es nulo
            if (pedidos == null
                    || pedidos.getNombreCliente() == null || pedidos.getNombreCliente().isEmpty()
                    || pedidos.getTelefonoCliente() == null || pedidos.getTelefonoCliente().isEmpty()
                    || pedidos.getDireccionCliente() == null || pedidos.getDireccionCliente().isEmpty()
                    || pedidos.getLocalidadCliente() == null || pedidos.getLocalidadCliente().isEmpty()
                    || pedidos.getPedidoConfirmado() == null) {
                // Registra la excepción en el looger
                logger.error(HttpStatus.BAD_REQUEST.toString());
                // Lanza una excepción con un mensaje descriptivo y un estado HTTP BAD REQUEST
                throw new MensajeResponseStatusException("El nombre, teléfono, dirección, confirmación del pedido o localidad del cliente están vacíos. ", HttpStatus.BAD_REQUEST);
            }

            // Verifica si el pedido con el ID proporcionado existe en la base de datos
            if (!pedidosServ.existsById(idPedido)) {
                // Registra la excepción en el looger
                logger.error(HttpStatus.NOT_FOUND.toString());
                // Lanza una excepción con un mensaje descriptivo y un estado HTTP NOT FOUND
                throw new MensajeResponseStatusException(new Mensaje("El idPedido N°: " + idPedido + " no existe en la base de datos.").getMensaje(), HttpStatus.NOT_FOUND);
            };

            // Obtiene el pedido existente en la base de datos con el ID proporcionado
            Pedidos pedid = pedidosServ.getOne(idPedido).get();

            // Actualiza los datos del pedido con los valores proporcionados en el objeto pedidos
            pedid.setListaPlatosDelPedido(pedidos.getListaPlatosDelPedido());
            pedid.setNombreCliente(pedidos.getNombreCliente());
            pedid.setTelefonoCliente(pedidos.getTelefonoCliente());
            pedid.setDireccionCliente(pedidos.getDireccionCliente());
            pedid.setLocalidadCliente(pedidos.getLocalidadCliente());
            pedid.setFecha(pedidos.getFecha());
            pedid.setHora(pedidos.getHora());
            pedid.setImporteTotalPedido(pedidos.getImporteTotalPedido());
            pedid.setPedidoConfirmado(pedidos.getPedidoConfirmado());

            // Guarda el pedido actualizado en la base de datos
            pedidosServ.guardarPedido(pedid);

            // Devuelve un mensaje indicando que el pedido ha sido actualizado y un estado HTTP OK
            return new ResponseEntity(new Mensaje("Pedido actualizado"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para actualizar un pedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);

        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para actualizar un pedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//============================================================================================================
    /**
     *
     * Método HTTP GET para verificar si existe un pedido en el sistema con el
     * ID proporcionado.
     *
     * @param idPedido El ID del pedido que se desea verificar.
     * @return ResponseEntity<Boolean> ResponseEntity con un booleano que indica
     * si el pedido existe y un estado HTTP OK si la operación se realiza con
     * éxito.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos durante la verificación de existencia del pedido. Devuelve
     * un estado HTTP INTERNAL SERVER ERROR con un mensaje descriptivo.
     * @throws MensajeRunTimeException Si se produce un error inesperado durante
     * la ejecución del método. Devuelve un estado HTTP INTERNAL SERVER ERROR
     * con un mensaje descriptivo.
     */
    @GetMapping("/existexidpedido/{idPedido}")
    public ResponseEntity<Boolean> existeXIdPedido(@PathVariable Long idPedido) {
      
            // Verifica si existe un pedido con el ID proporcionado en la base de datos
            boolean existePedido = pedidosServ.existsById(idPedido);
            // Devuelve la respuesta con un booleano que indica si el pedido existe y el estado HTTP OK
            return new ResponseEntity(existePedido, HttpStatus.OK);
       
    }

//============================================================================================================    
}
