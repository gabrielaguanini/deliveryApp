package com.delivery.delivery.Controller.FooterYLogoController;

import com.delivery.delivery.Entity.FooterYLogo.FooterYLogo;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeDataAccessException;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.FooterYLogo.FooterYLogoService;
import java.util.List;
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
public class FooterYLogoController {

    @Autowired
    FooterYLogoService fooYLoServ;

    /**
     * Logger para realizar registros de eventos
     */
    private static final Logger logger = LoggerFactory.getLogger(FooterYLogoController.class);

//=============================================================================================================
    /**
     * Endpoint para obtener una lista de objetos FooterYLogo.
     *
     * @return ResponseEntity con una lista de objetos FooterYLogo y el estado
     * HTTP OK (200).
     * @throws MensajeDataAccessException si ocurre un error de acceso a datos.
     * @throws MensajeRunTimeException si ocurre un error de tiempo de
     * ejecución.
     */
    @GetMapping("/listafooterylogo")
    public ResponseEntity<List<FooterYLogo>> listaFooterYLogo() {
        try {
            // Llama al servicio para obtener la lista de objetos FooterYLogo
            List<FooterYLogo> fooYLoLi = fooYLoServ.footerYLogoList();
            // Retorna la lista de objetos FooterYLogo con el estado HTTP OK
            return new ResponseEntity<>(fooYLoLi, HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException(
                    "Error al acceder a la base de datos para procesar la solicitud de una lista completa de la tabla FooterYLogo.",
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    null
            );
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(
                    new Mensaje("Error inesperado al procesar la solicitud de una lista completa de la tabla FooterYLogo."),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    null
            );
        }
    }

    //=============================================================================================================
    /**
     * Obtiene una lista de objetos {@link FooterYLogo} basada en una lista de
     * IDs proporcionados.
     *
     * @param ids Una lista de IDs de tipo {@link Long} que se utilizarán para
     * buscar los objetos {@link FooterYLogo}.
     * @return Una respuesta HTTP con la lista de objetos {@link FooterYLogo}
     * correspondientes a los IDs proporcionados, ordenada por ID de menor a
     * mayor, o un error en caso de fallo.
     */
    @GetMapping("/listafooterylogoxid/{ids}")
    public ResponseEntity<List<FooterYLogo>> listaFooterYLogoXId(@PathVariable("ids") List<Long> ids) {
        try {
            // Obtiene la lista de objetos FooterYLogo a partir de los IDs proporcionados y los ordena
            List<FooterYLogo> fooYLoLiXid = fooYLoServ.footerYLogoListXId(ids);

            // Devuelve la lista en una respuesta HTTP con estado OK (200)
            return new ResponseEntity<>(fooYLoLiXid, HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException(
                    "Error al acceder a la base de datos para procesar la solicitud de una lista completa de la tabla FooterYLogo.",
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    null
            );
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(
                    new Mensaje("Error inesperado al procesar la solicitud de una lista completa de la tabla FooterYLogo."),
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    null
            );
        }
    }

//=============================================================================================================   
    /**
     * Endpoint para guardar un objeto FooterYLogo en la base de datos.
     *
     * @param footerYLogo el objeto FooterYLogo que se desea guardar.
     * @return ResponseEntity con un mensaje de éxito y el estado HTTP OK (200)
     * si se guarda correctamente.
     * @throws MensajeResponseStatusException si alguna propiedad del objeto es
     * inválida.
     * @throws MensajeDataAccessException si ocurre un error de acceso a datos.
     * @throws MensajeRunTimeException si ocurre un error de tiempo de
     * ejecución.
     */
    @PostMapping("/guardarfooylogo")
    public ResponseEntity<?> guardarFooYLo(@RequestBody FooterYLogo footerYLogo) {
        try {
            // Verifica si footerYLogo es nulo o si alguna de sus propiedades importantes está vacía.
            if (footerYLogo == null
                    || footerYLogo.getNombreDatoAMostrar() == null || footerYLogo.getNombreDatoAMostrar().isEmpty()
                    || footerYLogo.getTextoAMostrar() == null || footerYLogo.getTextoAMostrar().isEmpty()
                    || footerYLogo.getUrlAMostrar() == null || footerYLogo.getUrlAMostrar().isEmpty()
                    || footerYLogo.getIconoOImgAMostrar() == null || footerYLogo.getIconoOImgAMostrar().isEmpty()) {
                // Si footerYLogo es nulo o alguna propiedad importante está vacía, lanza una excepción con un mensaje descriptivo.
                logger.info(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("Una o varias propiedades a guardar está/n vacía/s.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

            // Verifica que los caracteres ingresados para el datoAMostrar no sean mayores a 60
            if (footerYLogo.getTextoAMostrar().length() > 60) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El máximo de caracteres permitidos para el texto del dato a mostrar de la tabla FooterYLogo es 60.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

            // Guarda el objeto FooterYLogo en la base de datos
            fooYLoServ.guardarFooYLo(footerYLogo);
            return new ResponseEntity<>(new Mensaje("Registro para tabla FooterYLogo guardado correctamente."), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para guardar un registro en la tabla FooterYLogo.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar un registro en la tabla FooterYLogo."), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================    
    /**
     * Endpoint para actualizar un objeto FooterYLogo en la base de datos.
     *
     * @param footerYLogo el objeto FooterYLogo que se desea actualizar.
     * @param idOtrosDatos el ID del objeto FooterYLogo que se desea actualizar.
     * @return ResponseEntity con un mensaje de éxito y el estado HTTP OK (200)
     * si se actualiza correctamente.
     * @throws MensajeResponseStatusException si alguna propiedad del objeto es
     * inválida.
     * @throws MensajeDataAccessException si ocurre un error de acceso a datos.
     * @throws MensajeRunTimeException si ocurre un error de tiempo de
     * ejecución.
     */
    @PutMapping("/actualizarfooylogo/{idOtrosDatos}")
    public ResponseEntity<?> actualizarFooYLo(@RequestBody FooterYLogo footerYLogo, @PathVariable Long idOtrosDatos) {
        try {
            // Verifica si footerYLogo existe por id en la base de datos.
            if (!fooYLoServ.existsById(idOtrosDatos)) {
                logger.info(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException(new Mensaje("El idOtrosDatos N°: " + idOtrosDatos + " no existe en la tabla FooterYLogo.").getMensaje(), HttpStatus.NOT_FOUND, null);
            }

            // Verifica si footerYLogo es nulo o si alguna de sus propiedades importantes está vacía.
            if (footerYLogo == null
                    || footerYLogo.getNombreDatoAMostrar() == null || footerYLogo.getNombreDatoAMostrar().isEmpty()) {
                // Si footerYLogo es nulo o alguna propiedad importante está vacía, lanza una excepción con un mensaje descriptivo.
                logger.info(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("Una o varias propiedades a guardar está/n vacía/s.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

            // Verifica que los caracteres ingresados para el datoAMostrar no sean mayores a 60.
            if (footerYLogo.getTextoAMostrar().length() > 60) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El máximo de caracteres permitidos para el texto del dato a mostrar de la tabla FooterYLogo es 60.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

            // Obtiene el objeto FooterYLogo existente por su ID y actualiza sus propiedades.
            FooterYLogo ActualizadoFooterYLogo = fooYLoServ.getOne(idOtrosDatos).get();
            ActualizadoFooterYLogo.setNombreDatoAMostrar(footerYLogo.getNombreDatoAMostrar());
            ActualizadoFooterYLogo.setTextoAMostrar(footerYLogo.getTextoAMostrar());
            ActualizadoFooterYLogo.setUrlAMostrar(footerYLogo.getUrlAMostrar());
            ActualizadoFooterYLogo.setIconoOImgAMostrar(footerYLogo.getIconoOImgAMostrar());

            // Guarda el objeto actualizado.
            fooYLoServ.guardarFooYLo(ActualizadoFooterYLogo);

            return new ResponseEntity<>(new Mensaje("Registro para tabla FooterYLogo editado correctamente."), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para editar un registro de la tabla FooterYLogo.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para editar un registro de la tabla FooterYLogo."), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
//=============================================================================================================

    /**
     * Endpoint para eliminar un objeto FooterYLogo de la base de datos por su
     * ID.
     *
     * @param idOtrosDatos el ID del objeto FooterYLogo que se desea eliminar.
     * @return ResponseEntity con un mensaje de éxito y el estado HTTP OK (200)
     * si se elimina correctamente.
     * @throws MensajeResponseStatusException si el objeto no existe en la base
     * de datos.
     * @throws MensajeDataAccessException si ocurre un error de acceso a datos.
     * @throws MensajeRunTimeException si ocurre un error de tiempo de
     * ejecución.
     */
    @DeleteMapping("/borrarfootylo/{idOtrosDatos}")
    public ResponseEntity<?> borrarFooYLo(@PathVariable("idOtrosDatos") Long idOtrosDatos) {
        try {
            // Verifica si el objeto FooterYLogo existe en la base de datos por su ID
            if (!fooYLoServ.existsById(idOtrosDatos)) {
                // Si no existe, lanza una excepción con un mensaje personalizado y registra el error en el log
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("El idOtrosDatos N°: " + idOtrosDatos + " solicitado para eliminar no existe", HttpStatus.NOT_FOUND, null);
            }

            // Llama al servicio para eliminar el objeto FooterYLogo por su ID
            fooYLoServ.eliminarFooYLo(idOtrosDatos);

            // Retorna una respuesta de éxito con un mensaje indicando que el registro fue eliminado
            return new ResponseEntity<>(new Mensaje("Registro de la tabla FooterYLogo eliminado"), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para eliminar un registro de la tabla FooterYLogo. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para eliminar un registro de la tabla FooterYLogo. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
    /**
     * Endpoint para obtener un objeto FooterYLogo por su ID desde la base de
     * datos.
     *
     * @param idOtrosDatos el ID del objeto FooterYLogo que se desea obtener.
     * @return ResponseEntity con el objeto FooterYLogo encontrado y el estado
     * HTTP OK (200) si se encuentra correctamente.
     * @throws MensajeResponseStatusException si el objeto no existe en la base
     * de datos.
     * @throws MensajeDataAccessException si ocurre un error de acceso a datos.
     * @throws MensajeRunTimeException si ocurre un error de tiempo de
     * ejecución.
     */
    @GetMapping("/obtenerfooyloxid/{idOtrosDatos}")
    public ResponseEntity<FooterYLogo> obtenerFooterYLogoXId(@PathVariable Long idOtrosDatos) {
        try {
            // Verifica si footerYLogo existe por id en la base de datos.
            if (!fooYLoServ.existsById(idOtrosDatos)) {
                logger.info(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException(new Mensaje("El idOtrosDatos N°: " + idOtrosDatos + " no existe en la tabla FooterYLogo.").getMensaje(), HttpStatus.NOT_FOUND, null);
            }

            // Obtiene footerYLogo por su ID desde el servicio.
            FooterYLogo ObtenidoFooterYLogo = fooYLoServ.getOne(idOtrosDatos).get();

            // Devuelve el footerYLogo encontrado en una ResponseEntity con estado OK.
            return new ResponseEntity<>(ObtenidoFooterYLogo, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para obtener un registro de la tabla FooterYLogo por idOtrosDatos. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para obtener un registro de la tabla FooterYLogo por idOtrosDatos. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=============================================================================================================
}
