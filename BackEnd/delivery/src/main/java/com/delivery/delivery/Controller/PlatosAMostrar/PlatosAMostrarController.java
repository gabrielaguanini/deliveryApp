package com.delivery.delivery.Controller.PlatosAMostrar;


import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeDataAccessException;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.Platos.PlatosService;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "https://deliveryappfe.web.app")
public class PlatosAMostrarController {

    @Autowired
    PlatosAMostrarService plaMosServ;

    @Autowired
    PlatosService platosServ;

    private static final Logger logger = LoggerFactory.getLogger(PlatosAMostrarController.class);

    /**
     * Retorna una lista de platos a mostrar.
     *
     * @return ResponseEntity<List<PlatosAMostrar>> - ResponseEntity que
     * contiene la lista de platos a mostrar.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @GetMapping("/listaplatosamostrar")
    public ResponseEntity<List<PlatosAMostrar>> listaPlatosAMostrar() {
        try {
            // Obtiene la lista de platos a mostrar desde el servicio
            List<PlatosAMostrar> listaPlatos = plaMosServ.listaPlatosAMostrar();

            // Retorna una respuesta HTTP con la lista de platos a mostrar
            return new ResponseEntity<>(listaPlatos, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Maneja el error al acceder a la base de datos
            logger.error("Error al acceder a la base de datos. " + HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Maneja el error inesperado al procesar la solicitud
            logger.error("Error inesperado al procesar la solicitud de una lista de platos a mostrar. " + HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de platos a mostrar. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=======================================================================================================================  
    /**
     * Retorna un plato a mostrar en la aplicación dado su ID.
     *
     * @param idPlatosAMostrar El ID del plato a mostrar.
     * @return Un objeto Optional que contiene el plato a mostrar si existe.
     */
    @GetMapping("/platosamostrarxid/{idPlatosAMostrar}")
    public Optional<PlatosAMostrar> getOne(@PathVariable Long idPlatosAMostrar) {
        try {
            // Verifica si el plato a mostrar existe
            if (!plaMosServ.existsById(idPlatosAMostrar)) {

                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idPlatosAMostrar N°: " + idPlatosAMostrar + " no existe. ", HttpStatus.NOT_FOUND);
            }
            // Retorna el plato a mostrar si existe
            return plaMosServ.getOne(idPlatosAMostrar);
        } catch (MensajeDataAccessException e) {
            // Maneja el error al acceder a la base de datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeDataAccessException("Error al acceder a la base de datos", HttpStatus.INTERNAL_SERVER_ERROR, e);
        } catch (MensajeRunTimeException e) {
            // Maneja el error inesperado al procesar la solicitud
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de platos a mostrar"), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

//=======================================================================================================================  
    /**
     * Guarda un nuevo plato a mostrar en la base de datos.
     *
     * @param platosAMostrar El plato a mostrar a guardar.
     * @return Un ResponseEntity con un mensaje indicando si el plato se guardó
     * correctamente.
     */
    @PostMapping("/guardarplatoamostrar")
    public ResponseEntity<?> guardarPlatoAMos(@RequestBody PlatosAMostrar platosAMostrar) {
        try {
             // Verifica si el plato a mostrar ya existe en la tabla de platos a mostrar
            if (plaMosServ.existsByIdPlato(platosAMostrar.getPlatos().getIdPlato())) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El plato seleccionado ya se encuentra en Platos a Mostrar").getMensaje(), HttpStatus.BAD_REQUEST, null);
            };
            // Verifica si el plato a mostrar existe en la tabla de platos
            if (!platosServ.existsById(platosAMostrar.getPlatos().getIdPlato())) {
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException(new Mensaje("El plato no existe en la base de datos").getMensaje(), HttpStatus.NOT_FOUND, null);
            };
            // Verifica si la descripción del plato a mostrar está vacía o es nula
            if (platosAMostrar.getDescripcionPlatoAMostrar() == "" || platosAMostrar.getDescripcionPlatoAMostrar() == null) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("Ingrese descripción del plato a mostrar").getMensaje(), HttpStatus.BAD_REQUEST, null);
            };
            // Verifica que los caracteres ingresados no sean mayores a 385
            if (platosAMostrar.getDescripcionPlatoAMostrar().length() > 385) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El maximo de caracteres permitidos para descripcion del plato son 385.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            };

            // Guarda el plato a mostrar
            plaMosServ.guardar(platosAMostrar);

            return new ResponseEntity<>(new Mensaje("Plato a mostrar guardado"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Maneja el error al acceder a la base de datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Maneja el error inesperado al procesar la solicitud
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado del servidor al procesar la solicitud para guardar un plato a mostrar"), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=======================================================================================================================  
    /**
     * Este endpoint se dejó aquí por si en el futuro se necesita actualizar la
     * información de un plato a mostrar en la base de datos. Los platos a
     * mostrar no pueden editarse desde el cliente, solo eliminarse y agregarse.
     *
     * @param platosAMostrar El objeto PlatosAMostrar con la información
     * actualizada del plato a mostrar.
     * @param idPlatoAMostrar El ID del plato a mostrar que se desea actualizar.
     * @return ResponseEntity con un mensaje indicando que el plato a mostrar ha
     * sido actualizado correctamente.
     * @throws MensajeResponseStatusException Si el plato a mostrar no existe en
     * la base de datos o si ocurre un error al procesar la solicitud.
     */
    @PutMapping("/editarplatoamostrar/{idPlatoAMostrar}")
    public ResponseEntity<?> editarPlato(@RequestBody PlatosAMostrar platosAMostrar, @PathVariable Long idPlatoAMostrar) {
        try {

            // Verifica si el plato ya existe en la tabla de platos a mostrar
            if (plaMosServ.existsByIdPlato(platosAMostrar.getPlatos().getIdPlato())) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("El plato seleccionado ya se encuentra en Platos a Mostrar", HttpStatus.BAD_REQUEST);
            }

            // Verifica si el plato a mostrar existe en la tabla de platos
            if (!platosServ.existsById(platosAMostrar.getPlatos().getIdPlato())) {
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El plato no existe en la base de datos", HttpStatus.NOT_FOUND);
            }

            // Verifica si la descripción del plato a mostrar está vacía o es nula
            if (platosAMostrar.getDescripcionPlatoAMostrar() == null || platosAMostrar.getDescripcionPlatoAMostrar().isEmpty()) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("Ingrese descripción del plato a mostrar", HttpStatus.BAD_REQUEST);
            }

            // Verifica que los caracteres ingresados no sean mayores a 385
            if (platosAMostrar.getDescripcionPlatoAMostrar().length() > 385) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El maximo de caracteres permitidos para descripcion del plato es 385.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            };

            // Obtiene el plato a mostrar que se desea editar
            PlatosAMostrar plaMostrar = plaMosServ.getOne(idPlatoAMostrar).orElseThrow(() -> new MensajeResponseStatusException("El plato a mostrar no existe", HttpStatus.NOT_FOUND));

            // Actualiza la información del plato a mostrar
            plaMostrar.setPlatos(platosAMostrar.getPlatos());
            plaMostrar.setDescripcionPlatoAMostrar(platosAMostrar.getDescripcionPlatoAMostrar());

            // Guarda la actualización en la base de datos
            plaMosServ.guardar(plaMostrar);

            // Retorna una respuesta indicando que el plato a mostrar ha sido actualizado correctamente
            return new ResponseEntity(new Mensaje("Plato a mostrar actualizado"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Maneja el error al acceder a la base de datos
            logger.error("Error al acceder a la base de datos", e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos", HttpStatus.INTERNAL_SERVER_ERROR, e);
        } catch (MensajeRunTimeException e) {
            // Maneja el error inesperado al procesar la solicitud
            logger.error("Error inesperado del servidor al procesar la solicitud de una lista de platos a mostrar", e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado del servidor al procesar la solicitud de edicion de un plato a mostrar"), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

//=======================================================================================================================  
    /**
     * Elimina un plato a mostrar de la base de datos según su ID.
     *
     * @param idPlatoAMostrar El ID del plato a mostrar que se desea eliminar.
     * @return ResponseEntity con un mensaje indicando que el plato ha sido
     * eliminado correctamente.
     * @throws MensajeResponseStatusException Si el plato a mostrar no existe en
     * la base de datos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si se produce un error inesperado al
     * procesar la solicitud.
     */
    @DeleteMapping("/borrarplatoamostrar/{idPlatoAMostrar}")
    public ResponseEntity borrarPlato(@PathVariable Long idPlatoAMostrar) {
        try {
            // Verifica si el plato a mostrar existe en la tabla de platos
            if (!plaMosServ.existsById(idPlatoAMostrar)) {
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idPlatoAMostrar N°: " + idPlatoAMostrar + " no existe en la base de datos", HttpStatus.NOT_FOUND);
            }

            // Elimina el plato a mostrar de la base de datos
            plaMosServ.borrar(idPlatoAMostrar);

            // Retorna una respuesta HTTP con un mensaje indicando que el plato ha sido eliminado correctamente
            return new ResponseEntity(new Mensaje("Plato eliminado"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Maneja el error al acceder a la base de datos
            logger.error("Error al acceder a la base de datos", e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos", HttpStatus.INTERNAL_SERVER_ERROR, e);
        } catch (MensajeRunTimeException e) {
            // Maneja el error inesperado al procesar la solicitud
            logger.error("Error inesperado del servidor al procesar la solicitud de una lista de platos a mostrar", e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado del servidor al procesar la solicitud para borrar un plato a mostrar"), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

//=======================================================================================================================  
    /**
     * Verifica la existencia de un plato a mostrar en la base de datos según su
     * ID.
     *
     * @param idPlatoAMostrar El ID del plato a mostrar que se desea verificar.
     * @return ResponseEntity con un mensaje indicando si el plato existe o no.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado al procesar
     * la solicitud.
     */
    @GetMapping("/existeporid/{idPlatoAMostrar}")
    public ResponseEntity existeXId(@PathVariable Long idPlatoAMostrar) {
        try {
            plaMosServ.existsById(idPlatoAMostrar);

            return new ResponseEntity(new Mensaje("El plato existe"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Maneja el error al acceder a la base de datos
            logger.error("Error al acceder a la base de datos", e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos", HttpStatus.INTERNAL_SERVER_ERROR, e);
        } catch (MensajeRunTimeException e) {
            // Maneja el error inesperado al procesar la solicitud
            logger.error("Error inesperado del servidor al procesar la solicitud de una lista de platos a mostrar", e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado del servidor al procesar la solicitud para concer si un plato existe por idPlatoAMostrar"), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

//=======================================================================================================================     
}
