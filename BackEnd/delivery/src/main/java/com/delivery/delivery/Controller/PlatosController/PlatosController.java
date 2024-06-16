package com.delivery.delivery.Controller.PlatosController;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeDataAccessException;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.Platos.PlatosService;
import com.delivery.delivery.Service.Platos.TipoPlatoService;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.util.Comparator;
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
@CrossOrigin(origins = "http://localhost:4200")
public class PlatosController {

    @Autowired
    PlatosService plaServ;

    @Autowired
    TipoPlatoService tiPlaSe;

    @Autowired
    PlatosAMostrarService plaMoSe;

    /**
     * Logger para realizar registros de eventos
     */
    private static final Logger logger = LoggerFactory.getLogger(PlatosController.class);

// =======================================================================================================
    /**
     * Retorna una lista de todos los platos en la base de datos.
     *
     * @return ResponseEntity<List<Platos>> - ResponseEntity que contiene la
     * lista de todos los platos en la base de datos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @GetMapping("/listadeplatos")
    public ResponseEntity<List<Platos>> listaDePlatos() {
        try {
            // Recupera la lista de platos del servicio de Platos (plaServ)
            List<Platos> listaDePlatos = plaServ.listaDePlatos();

            // Ordena la lista de platos por ID del plato
            listaDePlatos.sort(Comparator.comparing(Platos::getIdPlato));

            // Devuelve una respuesta ResponseEntity con la lista de platos y el código de estado OK
            return new ResponseEntity<>(listaDePlatos, HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista completa platos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista completa de platos. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// =======================================================================================================
    /**
     * Método para obtener la lista de platos de un tipo específico.
     *
     * @param idTipoPlato El ID del tipo de plato del que se desea obtener la
     * lista.
     * @return ResponseEntity con la lista de platos del tipo especificado y el
     * código de estado OK si la solicitud se procesa correctamente.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución del método.
     */
    @GetMapping("/listatipoplatos/{idTipoPlato}")
    public ResponseEntity<List<Platos>> listaTipoPlato(@PathVariable Long idTipoPlato) {
        try {
            // Recupera la lista de platos del tipo especificado del servicio de Platos (plaServ)
            List<Platos> listaTipoPlato = plaServ.listaTipoPlato(idTipoPlato);

            // Devuelve una respuesta con la lista de platos del tipo especificado y el código de estado OK
            return new ResponseEntity<>(listaTipoPlato, HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de tipos de platos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de tipos de platos. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// ======================================================================================================= 
    /**
     * Método para guardar un nuevo plato en la base de datos.
     *
     * @param platos El objeto Platos que se desea guardar.
     * @return ResponseEntity con un mensaje indicando el éxito del guardado si
     * el plato se guarda correctamente.
     * @throws MensajeResponseStatusException Si alguna propiedad del plato es
     * inválida o si el plato ya existe en la base de datos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución del método.
     */
    @PostMapping("/guardarplato")
    public ResponseEntity<?> guardarPlato(@RequestBody Platos platos) {
        try {
            // Verifica si el tipo de plato existe
            if (!tiPlaSe.existsById(platos.getTipoPlato().getIdTipoPlato())) {
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idTipoPlato N°: " + platos.getTipoPlato().getIdTipoPlato() + " - " + platos.getTipoPlato().getNombreTipoPlato() + " no existe en la base de datos. ", HttpStatus.NOT_FOUND, null);
            }

            // Verifica si alguna de las propiedades del plato es nula, vacía o igual a cero
            if (platos == null
                    || platos.getTipoPlato().getIdTipoPlato() == null || platos.getTipoPlato().getIdTipoPlato() < 1
                    || platos.getNombrePlato() == null || platos.getNombrePlato().isEmpty() || platos.getNombrePlato().equals("")
                    || platos.getPrecioPlato() <= 0
                    || platos.getImgPlato() == null || platos.getImgPlato().isEmpty() || platos.getImgPlato().equals("")) {
                // Si alguna propiedad es inválida, se lanza una excepción
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("Una o varias propiedades a guardar está/n vacía/s y/o es/son igual/es a 0.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }
            
                // Verifica que los caracteres ingresados no sean mayores a 40
            if (platos.getNombrePlato().length() >40) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El maximo de caracteres permitidos para el nombre del plato son 40.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            };

            // Verifica si el plato ya existe
            if (plaServ.existeNombrePlato(platos.getNombrePlato())) {
                // Retorna una respuesta de error si el plato ya existe
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("El plato: " + platos.getNombrePlato() + " ya existe en la base de datos. No se pueden guardar platos duplicados.", HttpStatus.BAD_REQUEST);
            } else {
                // Crea un nuevo objeto Platos con la información proporcionada
                Platos plat = new Platos(
                        platos.getTipoPlato(),
                        platos.getNombrePlato(),
                        platos.getPrecioPlato(),
                        platos.getImgPlato()
                );

                // Guarda el plato en la base de datos
                plaServ.guardarPlato(plat);

                // Retorna una respuesta exitosa si el plato se guarda correctamente
                return new ResponseEntity(new Mensaje("Plato guardado"), HttpStatus.OK);
            }
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para guardar un plato. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar un plato. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// =======================================================================================================
    /**
     * Método para actualizar la información de un plato existente en la base de
     * datos.
     *
     * @param platos El objeto Platos con la información actualizada del plato.
     * @param idPlato El ID del plato que se desea actualizar.
     * @return ResponseEntity con un mensaje indicando el éxito de la
     * actualización si el plato se actualiza correctamente.
     * @throws MensajeResponseStatusException Si alguna propiedad del plato es
     * inválida o si el tipo de plato no existe en la base de datos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución del método.
     */
    @PutMapping("/actualizarplato/{idPlato}")
    public ResponseEntity<?> actualizarPlato(@RequestBody Platos platos, @PathVariable Long idPlato) {
        try {
            // Verifica si el tipo de plato existe
            if (!tiPlaSe.existsById(platos.getTipoPlato().getIdTipoPlato())) {
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idTipoPlato N°: " + platos.getTipoPlato().getIdTipoPlato() + " - " + platos.getTipoPlato().getNombreTipoPlato() + " no existe en la base de datos. ", HttpStatus.NOT_FOUND, null);
            }

            // Verifica si alguna de las propiedades del plato es nula, vacía o igual a cero
            if (platos == null
                    || platos.getTipoPlato().getIdTipoPlato() == null || platos.getTipoPlato().getIdTipoPlato() < 1
                    || platos.getNombrePlato() == null || platos.getNombrePlato().isEmpty() || platos.getNombrePlato().equals("")
                    || platos.getPrecioPlato() <= 0
                    || platos.getImgPlato() == null || platos.getImgPlato().isEmpty() || platos.getImgPlato().equals("")) {
                // Si alguna propiedad es inválida, se lanza una excepción
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("Una o varias propiedades a guardar está/n vacía/s y/o es/son igual/es a 0.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }
            
                // Verifica que los caracteres ingresados no sean mayores a 40
            if (platos.getNombrePlato().length() >40) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El maximo de caracteres permitidos para el nombre del plato son 40.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            };


            // Obtiene el plato existente por su ID
            Platos pla = plaServ.getOne(idPlato).get();

            // Actualiza la información del plato con los datos proporcionados
            pla.setTipoPlato(platos.getTipoPlato());
            pla.setNombrePlato(platos.getNombrePlato());
            pla.setPrecioPlato(platos.getPrecioPlato());
            pla.setImgPlato(platos.getImgPlato());

            // Guarda los cambios en el plato actualizado
            plaServ.guardarPlato(pla);

            // Retorna una respuesta con un mensaje indicando que el plato ha sido actualizado correctamente
            return new ResponseEntity(new Mensaje("Plato actualizado"), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para actualizar un plato. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para actualizar un plato. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// =======================================================================================================


        /**
         * Método para eliminar un plato existente de la base de datos.
         *
         * @param idPlato El ID del plato que se desea eliminar.
         * @return ResponseEntity con un mensaje indicando el éxito de la
         * eliminación si el plato se elimina correctamente.
         * @throws MensajeResponseStatusException Si el plato no existe en la
         * base de datos o si está siendo utilizado en otro registro.
         * @throws MensajeDataAccessException Si ocurre un error al acceder a la
         * base de datos.
         * @throws MensajeRunTimeException Si ocurre un error inesperado durante
         * la ejecución del método.
         */
        @DeleteMapping("/borrarplato/{idPlato}")
        public ResponseEntity<?> borrarPlato(@PathVariable("idPlato") Long idPlato) {
            try {
                // Verifica si el plato con el ID especificado existe en la base de datos
                if (!plaServ.existsById(idPlato)) {
                    // Lanza una excepción si el plato no existe
                    logger.error(HttpStatus.NOT_FOUND.toString());
                    throw new MensajeResponseStatusException("El idPlato N°: " + idPlato + " solicitado para eliminar no existe", HttpStatus.NOT_FOUND, null);
                };

                // Verifica si el plato está siendo utilizado en otro registro
                if (plaMoSe.existsByIdPlato(idPlato)) {
                    // Obtiene información adicional sobre el registro que utiliza el plato
                    Optional<PlatosAMostrar> platMost = plaMoSe.getOneByIdPlato(idPlato);

                    // Construye un mensaje descriptivo con la información obtenida
                    String mensaje = platMost.map(plato -> {
                        // Extraer los atributos relevantes del objeto PlatosAMostrar
                        String id = "**" + String.valueOf(plato.getIdPlatosAMostrar());
                        String nombrePlaMost = plato.getPlatos().getNombrePlato() + "**";
                        // Concatenar los atributos en una cadena legible
                        return "ID: " + id + ", NOM. PLA A MOS.: " + nombrePlaMost;
                    }).orElse("No se encontraron registros en PLATOS A MOSTRAR.");

                    // Lanza una excepción indicando que el plato está siendo utilizado en otro registro
                    logger.error(HttpStatus.BAD_REQUEST.toString());
                    throw new MensajeResponseStatusException("El plato que desea eliminar: idPlato N°: " + idPlato
                            + " se utiliza en el registro de la tabla PLATOS A MOSTRAR: "
                            + mensaje + " . Elimine el registro y prosiga con la eliminacion del plato.",
                            HttpStatus.BAD_REQUEST, null);
                }
                // Llama al método para eliminar el plato
                plaServ.borrarPlato(idPlato);
                // Retorna una respuesta exitosa si el plato se elimina correctamente
                return new ResponseEntity(new Mensaje("Plato eliminado"), HttpStatus.OK);
            } catch (MensajeDataAccessException e) {
                // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
                logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
                throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para eliminar un plato. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
            } catch (MensajeRunTimeException e) {
                // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
                logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
                throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para eliminar un plato. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
            }
        }
    

// =======================================================================================================
    /**
     * Método para obtener un plato por su ID.
     *
     * @param idPlato El ID del plato que se desea obtener.
     * @return ResponseEntity con el plato obtenido y el código de estado OK si
     * el plato se encuentra en la base de datos.
     * @throws MensajeResponseStatusException Si el plato no existe en la base
     * de datos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución del método.
     */
    @GetMapping("/obtenerplatoxid/{idPlato}")
    public ResponseEntity<Platos> obtPlatoXId(@PathVariable("idPlato") Long idPlato) {
        try {
            // Verifica si el plato existe utilizando el servicio plaServ
            if (!plaServ.existsById(idPlato)) {
                // Lanza una excepción si el plato no existe
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException(new Mensaje("El idPlato N°°: " + idPlato + " no existe.").getMensaje(),
                        HttpStatus.NOT_FOUND,
                        null
                );
            }
            // Obtiene el plato del servicio de Platos (plaServ) utilizando su ID
            Platos plato = plaServ.getOne(idPlato).get();

            // Retorna una respuesta con el plato obtenido y el código de estado OK
            return new ResponseEntity<>(plato, HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para obtener un plato por idPlato. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud dpara obtener un plato por idPlato. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

// =======================================================================================================
    /**
     * Método para verificar si un plato existe por su nombre.
     *
     * @param nombrePlato El nombre del plato que se desea verificar.
     * @return Booleano indicando si el plato existe por nombre o no.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución del método.
     */
    @GetMapping("/platoexistenombre/{nombrePlato}")
    public Boolean existePorNombre(@PathVariable String nombrePlato) {
        try {
            return plaServ.existeNombrePlato(nombrePlato);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para conocer si un plato existe por nombre. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para conocer si un plato existe por nombre. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
// =======================================================================================================
    
    
}
