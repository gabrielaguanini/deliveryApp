package com.delivery.delivery.Controller.CartProNovController.newpackage;

import com.delivery.delivery.Entity.CarteleraPromocionesNovedades.CarteleraPromocionesNovedades;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeDataAccessException;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.CarteleraPromocionesNovedades.CarteleraPromNovService;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "https://deliveryappfe.web.app")
public class CartProNovController {

    @Autowired
    CarteleraPromNovService carProNovServ;

    private static final Logger logger = LoggerFactory.getLogger(CartProNovController.class);

    /**
     * Controlador para obtener la lista de CarteleraPromocionesNovedades.
     *
     * @return ResponseEntity con la lista de CarteleraPromocionesNovedades y el
     * estado HTTP OK, o con un mensaje de error y el estado HTTP INTERNAL
     * SERVER ERROR si hay una excepción.
     */
    @GetMapping("/listacartelera")
    public ResponseEntity<List<CarteleraPromocionesNovedades>> listaPromo() {
        try {
            // Llama al servicio para obtener la lista de promociones y novedades
            List<CarteleraPromocionesNovedades> listaPromo = carProNovServ.listaCartelera();
            // Devuelve la lista y el estado HTTP OK
            return new ResponseEntity<>(listaPromo, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de la tabla cartelera promos/novedades.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de la tabla cartelera promos/novedades."), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=====================================================================================================================================    
    /**
     * Controlador para crear una nueva promoción o novedad en la cartelera.
     *
     * @param carProNov Objeto CarteleraPromocionesNovedades que contiene los
     * datos de la promoción o novedad a crear.
     * @return ResponseEntity con un mensaje indicando si la promoción o novedad
     * fue creada exitosamente y el estado HTTP OK, o con un mensaje de error y
     * el estado HTTP BAD REQUEST si faltan datos o están malformados, o con un
     * mensaje de error y el estado HTTP INTERNAL SERVER ERROR si hay una
     * excepción.
     */
    @PostMapping("/guardarpromonovedades")
    public ResponseEntity agregarPromoNov(@RequestBody CarteleraPromocionesNovedades carProNov) {
        try {
            // Verifica que los campos obligatorios no estén vacíos
            if (carProNov.getImgParaCelOPc() == null || carProNov.getImgParaCelOPc().isEmpty()
                    || carProNov.getTituloPromo() == null || carProNov.getTituloPromo().isEmpty()
                    || carProNov.getTextoPromo() == null || carProNov.getTextoPromo().isEmpty()
                    || carProNov.getColorTexto() == null || carProNov.getColorTexto().isEmpty()
                    || carProNov.getUrlImagenPromo() == null || carProNov.getUrlImagenPromo().isEmpty()) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("No se han ingresado la URL a una imagen, titulo, descripcion, color o si la imagen a guardar es para renderizar en CELULARES O PC. Por favor ingrese el/los dato/s faltante/s para continuar. ", HttpStatus.BAD_REQUEST);
            }

            // Verifica la longitud de los campos
            if (carProNov.getTituloPromo().length() > 21) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("El título de la promoción o novedad no puede tener más de 21 caracteres.", HttpStatus.BAD_REQUEST);
            }

            if (carProNov.getTextoPromo().length() > 70) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("La descripción de la promoción o novedad no puede tener más de 70 caracteres.", HttpStatus.BAD_REQUEST);
            }

            // Crea una nueva instancia de CarteleraPromocionesNovedades y la guarda
            CarteleraPromocionesNovedades nuevaPromoNov = new CarteleraPromocionesNovedades(
                    carProNov.getIdPromo(),
                    carProNov.getImgParaCelOPc(),
                    carProNov.getTituloPromo(),
                    carProNov.getTextoPromo(),
                    carProNov.getUrlImagenPromo(),
                    carProNov.getColorTexto(),
                    carProNov.getFechaPromo()
            );
            carProNovServ.guardarPromo(nuevaPromoNov);

            return new ResponseEntity<>(new Mensaje("Promo/Novedad creada"), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para guardar un registro en la tabla cartelera promos/novedades. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar un registro en la tabla cartelera promos/novedades. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=====================================================================================================================================    
    /**
     * Controlador para eliminar una promoción o novedad de la cartelera por su
     * ID.
     *
     * @param idPromo ID de la promoción o novedad a eliminar.
     * @return ResponseEntity con un mensaje indicando si la promoción o novedad
     * fue eliminada exitosamente y el estado HTTP OK, o con un mensaje de error
     * y el estado HTTP NOT FOUND si la promoción o novedad no existe, o con un
     * mensaje de error y el estado HTTP INTERNAL SERVER ERROR si hay una
     * excepción.
     */
    @DeleteMapping("/eliminarpromonovedades/{idPromo}")
    public ResponseEntity borrarPromoNov(@PathVariable Long idPromo) {
        try {
            // Verifica si la promoción o novedad con la ID proporcionada existe
            if (carProNovServ.existsById(idPromo)) {
                // Si existe, la elimina
                carProNovServ.borrarPromo(idPromo);
                return new ResponseEntity<>(new Mensaje("Promo/Novedad eliminada"), HttpStatus.OK);

            } else {
                // Si la ID no existe, lanza una excepción con un mensaje descriptivo y un estado HTTP NOT FOUND
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("La idPromo N°: " + idPromo + " no existe en la base de datos", HttpStatus.NOT_FOUND);
            }

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para eliminar un registro en la tabla cartelera promos/novedades.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para eliminar un registro en la tabla cartelera promos/novedades."), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=====================================================================================================================================
    /**
     * Actualiza una promoción o novedad en la cartelera.
     *
     * @param carProNov Objeto CarteleraPromocionesNovedades con los nuevos
     * datos de la promoción o novedad.
     * @param idPromo ID de la promoción o novedad a actualizar.
     * @return ResponseEntity con un mensaje indicando si la promoción o novedad
     * fue actualizada exitosamente y el estado HTTP OK, o con un mensaje de
     * error y el estado HTTP BAD REQUEST si faltan datos o están malformados, o
     * con un mensaje de error y el estado HTTP INTERNAL SERVER ERROR si hay una
     * excepción.
     */
    @PutMapping("/actualizarpromonov/{idPromo}")
    public ResponseEntity<?> actualizarPromoNov(@RequestBody CarteleraPromocionesNovedades carProNov, @PathVariable Long idPromo) {

        try {

            if (carProNov.getImgParaCelOPc() == "" || carProNov.getImgParaCelOPc() == null || carProNov.getImgParaCelOPc().isEmpty()
                    || carProNov.getTituloPromo() == "" || carProNov.getTituloPromo() == null || carProNov.getTituloPromo().isEmpty()
                    || carProNov.getTextoPromo() == "" || carProNov.getTextoPromo() == null || carProNov.getTextoPromo().isEmpty()
                    || carProNov.getColorTexto() == "" || carProNov.getColorTexto() == null || carProNov.getColorTexto().isEmpty()
                    || carProNov.getUrlImagenPromo() == "" || carProNov.getUrlImagenPromo() == null || carProNov.getUrlImagenPromo().isEmpty()) {

                // Registra la excepcion en el looger
                logger.error(HttpStatus.BAD_REQUEST.toString());
                // Lanza una excepción con un mensaje descriptivo y un estado HTTP BAD REQUEST
                throw new MensajeResponseStatusException("No se han ingresado la URL a una imagen, titulo, descripcion, color o si la imagen a editar es para renderizar en CELULARES O PC. Por favor ingrese el/los dato/s faltante/s para continuar la edicion. ", HttpStatus.BAD_REQUEST);
            }

            // Verifica que los caracteres ingresados para el titulo de la promo no sean mayores a 21
            if (carProNov.getTituloPromo().length() > 21) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El maximo de caracteres permitidos para el titulo de la cartelera promo/novedades es 21.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

            // Verifica que los caracteres ingresados para la descripcion de la promo no sean mayores a 70
            if (carProNov.getTextoPromo().length() > 70) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException(new Mensaje("El maximo de caracteres permitidos para la descripcion de la cartelera promo/novedades es 70.").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

            CarteleraPromocionesNovedades carProNovedades = carProNovServ.getOne(idPromo).get();
            carProNovedades.setIdPromo(carProNov.getIdPromo());
            carProNovedades.setImgParaCelOPc(carProNov.getImgParaCelOPc());
            carProNovedades.setTituloPromo(carProNov.getTituloPromo());
            carProNovedades.setTextoPromo(carProNov.getTextoPromo());
            carProNovedades.setColorTexto(carProNov.getColorTexto());
            carProNovedades.setUrlImagenPromo(carProNov.getUrlImagenPromo());
            carProNovedades.setFechaPromo(carProNov.getFechaPromo());
            carProNovServ.guardarPromo(carProNovedades);
            return new ResponseEntity(new Mensaje("Promo/Novedad actualizada"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para editar una promo/novedad en la cartelera. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud editar una promo/novedad en la cartelera. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }

    }

//=====================================================================================================================================    
    /**
     * Obtiene una promoción o novedad por su ID.
     *
     * @param idPromo ID de la promoción o novedad a obtener.
     * @return ResponseEntity con la promoción o novedad encontrada y el estado
     * HTTP OK si existe, o con un mensaje de error y el estado HTTP NOT FOUND
     * si la promoción o novedad no existe, o con un mensaje de error y el
     * estado HTTP INTERNAL SERVER ERROR si hay una excepción.
     */
    @GetMapping("/obtenerpromoxid/{idPromo}")
    public ResponseEntity<CarteleraPromocionesNovedades> obtenerXId(@PathVariable Long idPromo) {

        try {
            // Verifica si la promoción o novedad existe por su ID
            if (carProNovServ.existsById(idPromo)) {
                CarteleraPromocionesNovedades cartProNov = carProNovServ.getOne(idPromo).get();
                return new ResponseEntity(cartProNov, HttpStatus.OK);
            } else {
                // Si el idPromo no existe, lanza una excepción con un mensaje descriptivo y un estado HTTP NOT FOUND
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("la idPromo N°: " + idPromo + " no existe en la base de datos", HttpStatus.NOT_FOUND);
            }
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para conocer si existe una promo/novedad por idPromo. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para para conocer si existe una promo/novedad por idPromo. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=====================================================================================================================================    
}
