package com.delivery.delivery.Controller.PlatosController;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.Platos.TipoPlato;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeDataAccessException;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.Platos.PlatosService;
import com.delivery.delivery.Service.Platos.TipoPlatoService;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
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
public class TipoPlatoController {

    @Autowired
    TipoPlatoService tipoPlaServ;

    @Autowired
    PlatosService plSer;

    /**
     * Logger para realizar registros de eventos
     */
    private static final Logger logger = LoggerFactory.getLogger(TipoPlatoController.class);

//=============================================================================================================
    /**
     * Retorna una lista de tipos de platos ordenada alfabéticamente por el
     * nombre.
     *
     * @return ResponseEntity<List<TipoPlato>> - ResponseEntity que contiene la
     * lista de tipos de platos ordenada.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @GetMapping("/listatipoplatos")
    public ResponseEntity<List<TipoPlato>> listaTipoPlato() {
        try {
            // Obtiene la lista de tipos de platos desde el servicio.
            List<TipoPlato> listaTipoPlato = tipoPlaServ.listaTipoPlato();

            // Ordena la listaTipoPlato en orden alfabético según el nombre.
            List<TipoPlato> tiposPlatosOrdenados = listaTipoPlato.stream()
                    .sorted(Comparator.comparing(TipoPlato::getNombreTipoPlato))
                    .collect(Collectors.toList());

            // Devuelve la lista ordenada en una ResponseEntity con estado OK.
            return new ResponseEntity(tiposPlatosOrdenados, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista completa de tipos de platos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista completa de tipos de platos. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Retorna una lista filtrada de tipos de platos que tienen al menos un
     * plato asociado.
     *
     * @return ResponseEntity<List<TipoPlato>> - ResponseEntity que contiene la
     * lista filtrada de tipos de platos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @GetMapping("/listafiltradatipoplatos")
    public ResponseEntity<List<TipoPlato>> listaFiltradaTipoPlato() {
        try {
            // Obtiene una lista de tipos de plato que tienen al menos un plato asociado
            List<TipoPlato> listaFiltradaTipoPlato = tipoPlaServ.listaFiltradaTipoPlato();

            // Devuelve una respuesta con la lista filtrada de tipos de plato y el estado OK
            return new ResponseEntity<>(listaFiltradaTipoPlato, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista filtrada de tipos de platos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista filtrada de tipos de platos. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Retorna una lista de colores asociados a los tipos de platos.
     *
     * @return ResponseEntity<List<String>> - ResponseEntity que contiene la
     * lista de colores asociados a los tipos de platos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @GetMapping("/listacolorestipoplatos")
    public ResponseEntity<List<String>> listaColorTipoPlato() {
        try {
            // Obtiene una lista de colores asociados a los tipos de plato
            List<String> listaColorTipoPlato = tipoPlaServ.listaColoresTipoPlato();

            // Devuelve una respuesta con la lista de colores asociados a los tipos de plato y el estado OK
            return new ResponseEntity<>(listaColorTipoPlato, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de colores. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de colores "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Retorna una lista de iconos asociados a los tipos de platos.
     *
     * @return ResponseEntity<List<String>> - ResponseEntity que contiene la
     * lista de iconos asociados a los tipos de platos.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @GetMapping("/listaiconostipoplatos")
    public ResponseEntity<List<String>> listaIconosTipoPlato() {
        try {
            // Obtiene una lista de iconos asociados a los tipos de plato
            List<String> listaIconosTipoPlato = tipoPlaServ.listaIconosTipoPlato();

            // Devuelve una respuesta con la lista de iconos asociados a los tipos de plato y el estado OK
            return new ResponseEntity<>(listaIconosTipoPlato, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de iconos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de iconos. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Maneja una solicitud POST para guardar un nuevo TipoPlato.
     *
     * @param tipoPlato El TipoPlato que se desea guardar.
     * @return ResponseEntity Una respuesta que indica el resultado de la
     * operación.
     */
    @PostMapping("/guardartipoplato")
    public ResponseEntity<?> guardarTipoPlato(@Valid @RequestBody TipoPlato tipoPlato) {
        try {
            // Verifica si tipoPlato es nulo o si alguna de sus propiedades importantes está vacía o es igual a 0.
            if (tipoPlato == null
                    || tipoPlato.getNombreTipoPlato() == null || tipoPlato.getNombreTipoPlato().isEmpty() || tipoPlato.getNombreTipoPlato().equals("")
                    || tipoPlato.getIconoTipoPlato() == null || tipoPlato.getIconoTipoPlato().isEmpty() || tipoPlato.getIconoTipoPlato().equals("")
                    || tipoPlato.getColorCardTipoPlato() == null || tipoPlato.getColorCardTipoPlato().isEmpty() || tipoPlato.getColorCardTipoPlato().equals("")) {
                // Si tipoPlato es nulo o alguna propiedad importante está vacía o igual a 0, lanzar una excepción con un mensaje descriptivo.
                logger.info(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("Una o varias propiedades a guardar está/n vacía/s y/o es/son igual/es a 0.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }
            // Verifica si ya existe un tipo de plato con el mismo nombre.
            if (tipoPlaServ.existeNombreTipoPlato(tipoPlato.getNombreTipoPlato())) {
                // Si existe un tipo de plato con el mismo nombre, devuelve una respuesta de error.
                logger.info(HttpStatus.BAD_REQUEST.toString());
                return new ResponseEntity(new Mensaje("No se pueden guardar tipos de plato duplicados"), HttpStatus.BAD_REQUEST);
            } else {
                // Si el tipo de plato no está duplicado, procede con el guardado.
                TipoPlato tipoPla = new TipoPlato(
                        tipoPlato.getIdTipoPlato(),
                        tipoPlato.getNombreTipoPlato(),
                        tipoPlato.getIconoTipoPlato(),
                        tipoPlato.getColorCardTipoPlato()
                );
                tipoPlaServ.guardarTipoPlato(tipoPla);

                // Devuelve una respuesta de éxito.
                return new ResponseEntity(new Mensaje("Tipo de plato guardado"), HttpStatus.OK);
            }
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para guardar un tipo de plato. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud  para guardar un tipo de plato. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Elimina un TipoPlato de la base de datos según su ID, siempre que no esté
     * siendo utilizado por ningún plato.
     *
     * @param idTipoPlato El ID del TipoPlato que se desea eliminar.
     * @return ResponseEntity con un mensaje indicando el resultado de la
     * operación.
     * @throws MensajeResponseStatusException Si el tipo de plato no existe o
     * está siendo utilizado por algún plato.
     * @throws MensajeDataAccessException Si ocurre un error al acceder a la
     * base de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución del método.
     */
    @DeleteMapping("/eliminartipoplatos/{idTipoPlato}")
    public ResponseEntity<?> borrarTipoPlato(@PathVariable Long idTipoPlato) {
        try {
            // Verifica si el tipo de plato existe en la base de datos
            if (!tipoPlaServ.existsById(idTipoPlato)) {
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idTipoPlato N°: " + idTipoPlato + " solicitado para eliminar no existe",
                        HttpStatus.NOT_FOUND, null);
            }

            // Verifica si el tipo de plato está siendo utilizado por algún plato
            if (plSer.existsByIdTipoPlato(idTipoPlato)) {
                // Obtiene la lista de platos que utilizan el tipo de plato
                List<Platos> platosExisEnTiPla = plSer.listaTipoPlato(idTipoPlato);
                // Itera sobre la lista
                StringBuilder platosStringBuilder = new StringBuilder();
                for (Platos plato : platosExisEnTiPla) {
                    // Construye una cadena con la información de los platos proveniente de la lista platosExisEnTiPla
                    platosStringBuilder.append(" ** ID PLATO: ").append(plato.getIdPlato()).append(" ")
                            .append(plato.getNombrePlato()).append(";\n");
                }
                logger.error(HttpStatus.BAD_REQUEST.toString());
                // Lanza una excepción indicando que el tipo de plato está siendo utilizado
                throw new MensajeResponseStatusException("El tipo plato que desea eliminar: IdTipoPlato N°: " + idTipoPlato
                        + " se utiliza en uno/varios registros de la tabla PLATOS. Elimine el/los registro/s: "
                        + platosStringBuilder.toString() + "y prosiga con la eliminacion del tipo de plato.",
                        HttpStatus.BAD_REQUEST, null);
            }

            // Si el tipo de plato no está siendo utilizado por ningún plato, se procede con la eliminación
            tipoPlaServ.borrarTipoPlato(idTipoPlato);
            return new ResponseEntity<>(new Mensaje("Tipo de plato eliminado"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para eliminar un tipo de plato. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud  para eliminar un tipo de plato. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Actualiza la información de un tipo de plato existente en la base de
     * datos.
     *
     * @param tipoPlato El objeto TipoPlato con la información actualizada.
     * @param idTipoPlato El ID del tipo de plato que se desea actualizar.
     * @return ResponseEntity<?> Una respuesta HTTP que indica si la
     * actualización fue exitosa o no.
     * @throws MensajeDataAccessException Si hay un error al acceder a la base
     * de datos.
     * @throws MensajeRunTimeException Si ocurre un error inesperado durante la
     * ejecución.
     */
    @PutMapping("/actualizartipoplato/{idTipoPlato}")
    public ResponseEntity<?> actualizarTipoPlato(@RequestBody TipoPlato tipoPlato, @PathVariable Long idTipoPlato) {
        try {
            // Verifica si tipoPlato es nulo o si alguna de sus propiedades importantes está vacía o es igual a 0.
            if (tipoPlato == null
                    || tipoPlato.getNombreTipoPlato() == null || tipoPlato.getNombreTipoPlato().isEmpty() || tipoPlato.getNombreTipoPlato().equals("")
                    || tipoPlato.getIconoTipoPlato() == null || tipoPlato.getIconoTipoPlato().isEmpty() || tipoPlato.getIconoTipoPlato().equals("")
                    || tipoPlato.getColorCardTipoPlato() == null || tipoPlato.getColorCardTipoPlato().isEmpty() || tipoPlato.getColorCardTipoPlato().equals("")) {
                // Si tipoPlato es nulo o alguna propiedad importante está vacía o igual a 0, lanzar una excepción con un mensaje descriptivo.
                logger.info(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("Una o varias propiedades a editar está/n vacía/s y/o es/son igual/es a 0.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }


            // Verifica si el tipo de plato con el ID especificado existe en la base de datos
            if (!tipoPlaServ.existsById(idTipoPlato)) {
                throw new MensajeResponseStatusException("El idTipoPlato N°: " + idTipoPlato + " solicitado para editar no existe", HttpStatus.NOT_FOUND, null);
            }

            // Obtiene el tipo de plato a actualizar desde la base de datos
            TipoPlato tipPla = tipoPlaServ.getOne(idTipoPlato).get();
            // Actualiza la información del tipo de plato con la información proporcionada en el parámetro tipoPlato
            tipPla.setNombreTipoPlato(tipoPlato.getNombreTipoPlato());
            tipPla.setIconoTipoPlato(tipoPlato.getIconoTipoPlato());
            tipPla.setColorCardTipoPlato(tipoPlato.getColorCardTipoPlato());
            // Guarda el tipo de plato actualizado en la base de datos
            tipoPlaServ.guardarTipoPlato(tipPla);

            // Retorna una respuesta indicando que la actualización fue exitosa
            return new ResponseEntity(new Mensaje("Tipo de plato actualizado"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para editar un detalle del pedido. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud  para editar un detalle del pedido. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Obtiene un TipoPlato por su ID y lo devuelve en una ResponseEntity.
     *
     * @param idTipoPlato El ID del TipoPlato que se desea obtener.
     * @return Una ResponseEntity que contiene el TipoPlato encontrado, con
     * estado OK si existe. Si no se encuentra el TipoPlato, se lanza una
     * excepción con estado NOT_FOUND.
     */
    @GetMapping("/obtenertiplaxid/{idTipoPlato}")
    public ResponseEntity<TipoPlato> obtenerTipoPlatoXId(@PathVariable Long idTipoPlato) {
        try {
            // Verifica si el tipo de plato existe en el servicio.
            if (!tipoPlaServ.existsById(idTipoPlato)) {
                // Si no existe, lanza una excepción con un mensaje descriptivo y estado NOT_FOUND y lo registra en el log
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idTipoPlato N°: " + idTipoPlato + " no existe", HttpStatus.NOT_FOUND, null);
            }

            // Obtiene el tipo de plato por su ID desde el servicio.
            TipoPlato tipoPl = tipoPlaServ.getOne(idTipoPlato).get();

            // Devuelve el tipo de plato encontrado en una ResponseEntity con estado OK.
            return new ResponseEntity(tipoPl, HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para obtener un tipo de plato por idTipoPlato. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para obtener un tipo de plato por idTipoPlato. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Verifica si existe un TipoPlato en la base de datos con el nombre
     * especificado.
     *
     * @param nombreTipoPlato El nombre del TipoPlato que se desea verificar.
     * @return ResponseEntity<Boolean> Una respuesta que indica si existe o no
     * un TipoPlato con el nombre especificado. Si el nombreTipoPlato es válido,
     * el cuerpo de la respuesta contendrá un booleano que indica si existe o no
     * un TipoPlato con el nombre especificado. Si el nombreTipoPlato no es
     * válido, se lanzará una excepción con un mensaje descriptivo y un estado
     * HTTP correspondiente.
     */
    @GetMapping("/tipoplatoexistenombre/{nombreTipoPlato}")
    public ResponseEntity<Boolean> existePorNombre(@PathVariable String nombreTipoPlato) {
        try {
            // Verifica si el nombreTipoPlato es nulo, está vacío o es una cadena vacía
            if (nombreTipoPlato == null || nombreTipoPlato.isEmpty() || nombreTipoPlato.isBlank()) {
                // Si el nombreTipoPlato no es válido, lanza una excepción con un mensaje descriptivo
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("El nombre del tipo de plato no puede estar vacío", HttpStatus.BAD_REQUEST, null);
            }

            // Verifica si el nombre del tipo de plato existe
            boolean exisPorNom = tipoPlaServ.existeNombreTipoPlato(nombreTipoPlato);

            // Retorna una respuesta exitosa junto con el resultado booleano
            return ResponseEntity.ok(exisPorNom);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para conocer si un tipo de plato existe por nombreTipoPlato. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud  un tipo de plato existe por nombreTipoPlato. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
}
