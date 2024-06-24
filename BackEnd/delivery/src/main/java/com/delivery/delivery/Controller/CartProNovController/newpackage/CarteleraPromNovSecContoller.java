package com.delivery.delivery.Controller.CartProNovController.newpackage;

import com.delivery.delivery.Entity.CarteleraPromocionesNovedades.CarteleraPromoNovSecundaria;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeDataAccessException;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.CarteleraPromocionesNovedades.CarteleraPromoNovSecService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CarteleraPromNovSecContoller {

    @Autowired
    CarteleraPromoNovSecService cartProNovSecServ;

    private static final Logger logger = LoggerFactory.getLogger(CarteleraPromNovSecContoller.class);

    /**
     * Controlador para obtener la lista de CarteleraPromoNovSecundaria.
     *
     * @return ResponseEntity con la lista de CarteleraPromoNovSecundaria y el
     * estado HTTP OK, o con un mensaje de error y el estado HTTP INTERNAL
     * SERVER ERROR si hay una excepción.
     */
    @GetMapping("/listacartelerasec")
    public ResponseEntity<List<CarteleraPromoNovSecundaria>> listaPromoSec() {
        try {
            // Llama al servicio para obtener la lista de promociones y novedades
            List<CarteleraPromoNovSecundaria> listaPromoSec = cartProNovSecServ.listaCarteleraSec();
            // Devuelve la lista y el estado HTTP OK
            return new ResponseEntity<>(listaPromoSec, HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud de una lista de la tabla cartelera promos/novedades secundaria.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de una lista de la tabla cartelera promos/novedades secundaria."), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=====================================================================================================================================    

    /**
     * Controlador para crear una nueva promoción o novedad sec en la cartelera.
     *
     * @param carProNovSec Objeto CarteleraPromoNovSecundaria que contiene los
     * datos de la promoción o novedad secundaria a crear.
     * @return ResponseEntity con un mensaje indicando si la promoción o novedad
     * fue creada exitosamente y el estado HTTP OK, o con un mensaje de error y
     * el estado HTTP BAD REQUEST si faltan datos o están malformados, o con un
     * mensaje de error y el estado HTTP INTERNAL SERVER ERROR si hay una
     * excepción.
     */
    @PostMapping("/guardarpromonovedadessec")
    public ResponseEntity agregarPromoNov(@RequestBody CarteleraPromoNovSecundaria carProNovSec) {
        try {
            // Verifica que los campos obligatorios no estén vacíos
            if (carProNovSec.getImgParaCelOPc() == null || carProNovSec.getImgParaCelOPc().isEmpty()
                    || carProNovSec.getTituloPromo() == null || carProNovSec.getTituloPromo().isEmpty()
                    || carProNovSec.getTextoPromo() == null || carProNovSec.getTextoPromo().isEmpty()
                    || carProNovSec.getColorTexto() == null || carProNovSec.getColorTexto().isEmpty()
                    || carProNovSec.getUrlImagenPromo() == null || carProNovSec.getUrlImagenPromo().isEmpty()) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("No se han ingresado la URL a una imagen, titulo, color, descripcion o si la imagen a guardar es para renderizar en CELULARES O PC. Por favor ingrese el/los dato/s faltante/s para continuar.", HttpStatus.BAD_REQUEST);
            }

            // Verifica la longitud de los campos
            if (carProNovSec.getTituloPromo().length() > 22) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("El título de la promoción o novedad de la cartelera secundaria no puede contener más de 22 caracteres.", HttpStatus.BAD_REQUEST);
            }

            if (carProNovSec.getTextoPromo().length() > 96) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("La descripción de la promoción o novedad de la cartelera secundaria no puede contener más de 96 caracteres.", HttpStatus.BAD_REQUEST);
            }

            // Crea una nueva instancia de CarteleraPromocionesNovedades sec y la guarda
            CarteleraPromoNovSecundaria nuevaPromoNovSec = new CarteleraPromoNovSecundaria(
                  
                    carProNovSec.getImgParaCelOPc(),
                    carProNovSec.getTituloPromo(),
                    carProNovSec.getTextoPromo(),
                    carProNovSec.getColorTexto(),
                    carProNovSec.getUrlImagenPromo(),
                    carProNovSec.getFechaPromo()
            );
            cartProNovSecServ.guardarPromoSec(nuevaPromoNovSec);

            return new ResponseEntity<>(new Mensaje("Promo/Novedad secundaria creada"), HttpStatus.OK);
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para guardar un registro en la tabla cartelera promos/novedades secundaria. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar un registro en la tabla cartelera promos/novedades secundaria. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=====================================================================================================================================    
    /**
     * Controlador para eliminar una promoción o novedad secundaria de la
     * cartelera por su ID.
     *
     * @param idPromoSec ID de la promoción o novedad a eliminar.
     * @return ResponseEntity con un mensaje indicando si la promoción o novedad
     * fue eliminada exitosamente y el estado HTTP OK, o con un mensaje de error
     * y el estado HTTP NOT FOUND si la promoción o novedad no existe, o con un
     * mensaje de error y el estado HTTP INTERNAL SERVER ERROR si hay una
     * excepción.
     */
    @DeleteMapping("/eliminarpromonovedadessec/{idPromoSec}")
    public ResponseEntity borrarPromoNov(@PathVariable Long idPromoSec) {
        try {
            // Verifica si la promoción o novedad con la ID proporcionada existe
            if (cartProNovSecServ.existsById(idPromoSec)) {
                // Si existe, la elimina
                cartProNovSecServ.borrarPromoSec(idPromoSec);
                return new ResponseEntity<>(new Mensaje("Promo/Novedad secundaria eliminada"), HttpStatus.OK);

            } else {
                // Si la ID no existe, lanza una excepción con un mensaje descriptivo y un estado HTTP NOT FOUND
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("La idPromoSec N°: " + idPromoSec + " no existe en la base de datos", HttpStatus.NOT_FOUND);
            }

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para eliminar un registro en la tabla cartelera promos/novedades secundaria.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para eliminar un registro en la tabla cartelera promos/novedades secundaria."), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=====================================================================================================================================
    /**
     * Actualiza una promoción o novedad en la cartelera.
     *
     * @param carProNovSec Objeto CarteleraPromoNovSecundaria con los nuevos
     * datos de la promoción o novedad.
     * @param idPromoSec ID de la promoción o novedad a actualizar.
     * @return ResponseEntity con un mensaje indicando si la promoción o novedad
     * fue actualizada exitosamente y el estado HTTP OK, o con un mensaje de
     * error y el estado HTTP BAD REQUEST si faltan datos o están malformados, o
     * con un mensaje de error y el estado HTTP INTERNAL SERVER ERROR si hay una
     * excepción.
     */
    @PutMapping("/actualizarpromonovsec/{idPromoSec}")
    public ResponseEntity<?> actualizarPromoNov(@RequestBody CarteleraPromoNovSecundaria carProNovSec, @PathVariable Long idPromoSec) {

        try {

            if (carProNovSec.getImgParaCelOPc() == "" || carProNovSec.getImgParaCelOPc() == null || carProNovSec.getImgParaCelOPc().isEmpty()
                    || carProNovSec.getTituloPromo() == "" || carProNovSec.getTituloPromo() == null || carProNovSec.getTituloPromo().isEmpty()
                    || carProNovSec.getTextoPromo() == "" || carProNovSec.getTextoPromo() == null || carProNovSec.getTextoPromo().isEmpty()
                    || carProNovSec.getColorTexto() == "" || carProNovSec.getColorTexto() == null || carProNovSec.getColorTexto().isEmpty()
                    || carProNovSec.getUrlImagenPromo() == "" || carProNovSec.getUrlImagenPromo() == null || carProNovSec.getUrlImagenPromo().isEmpty()) {

                // Registra la excepcion en el looger
                logger.error(HttpStatus.BAD_REQUEST.toString());
                // Lanza una excepción con un mensaje descriptivo y un estado HTTP BAD REQUEST
                throw new MensajeResponseStatusException("No se han ingresado la URL a una imagen, titulo, color, descripcion o si la imagen a editar es para renderizar en CELULARES O PC. Por favor ingrese el/los dato/s faltante/s para continuar la edicion. ", HttpStatus.BAD_REQUEST);
            }

           // Verifica la longitud de los campos
            if (carProNovSec.getTituloPromo().length() > 22) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("El título de la promoción o novedad de la cartelera secundaria no puede contener más de 22 caracteres.", HttpStatus.BAD_REQUEST);
            }

            if (carProNovSec.getTextoPromo().length() > 96) {
                logger.error(HttpStatus.BAD_REQUEST.toString());
                throw new MensajeResponseStatusException("La descripción de la promoción o novedad de la cartelera secundaria no puede contener más de 96 caracteres.", HttpStatus.BAD_REQUEST);
            }

            CarteleraPromoNovSecundaria carProNovedadesSec = cartProNovSecServ.getOne(idPromoSec).get();
        
            carProNovedadesSec.setImgParaCelOPc(carProNovSec.getImgParaCelOPc());
            carProNovedadesSec.setTituloPromo(carProNovSec.getTituloPromo());
            carProNovedadesSec.setTextoPromo(carProNovSec.getTextoPromo());
             carProNovedadesSec.setColorTexto(carProNovSec.getColorTexto());
            carProNovedadesSec.setUrlImagenPromo(carProNovSec.getUrlImagenPromo());
            carProNovedadesSec.setFechaPromo(carProNovSec.getFechaPromo());

            cartProNovSecServ.guardarPromoSec(carProNovedadesSec);
            return new ResponseEntity(new Mensaje("Promo/Novedad cartelera secundaria actualizada"), HttpStatus.OK);

        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para editar una promo/novedad en la cartelera secundaria. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud editar una promo/novedad en la cartelera secundaria. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }

    }

//=====================================================================================================================================    
    /**
     * Obtiene una promoción o novedad por su ID.
     *
     * @param idPromoSec ID de la promoción o novedad secundaria a obtener.
     * @return ResponseEntity con la promoción o novedad encontrada y el estado
     * HTTP OK si existe, o con un mensaje de error y el estado HTTP NOT FOUND
     * si la promoción o novedad no existe, o con un mensaje de error y el
     * estado HTTP INTERNAL SERVER ERROR si hay una excepción.
     */
    @GetMapping("/obtenerpromosecxid/{idPromoSec}")
    public ResponseEntity<CarteleraPromoNovSecundaria> obtenerXId(@PathVariable Long idPromoSec) {

        try {
            // Verifica si la promoción o novedad existe por su ID
            if (cartProNovSecServ.existsById(idPromoSec)) {
                CarteleraPromoNovSecundaria cartProNovSec = cartProNovSecServ.getOne(idPromoSec).get();
                return new ResponseEntity(cartProNovSec, HttpStatus.OK);
            } else {
                // Si el idPromoSec no existe, lanza una excepción con un mensaje descriptivo y un estado HTTP NOT FOUND
                logger.error(HttpStatus.NOT_FOUND.toString());
                throw new MensajeResponseStatusException("la idPromoSec N°: " + idPromoSec + " no existe en la base de datos", HttpStatus.NOT_FOUND);
            }
        } catch (MensajeDataAccessException e) {
            // Captura y maneja la excepción de acceso a datos, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeDataAccessException("Error al acceder a la base de datos para procesar la solicitud para conocer si existe una promo/novedad secundaria por idPromoSec. ", HttpStatus.INTERNAL_SERVER_ERROR, null);
        } catch (MensajeRunTimeException e) {
            // Captura y maneja la excepción de tiempo de ejecución, lanzando una nueva excepción con un mensaje adecuado y un estado HTTP INTERNAL SERVER ERROR
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e);
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para para conocer si existe una promo/novedad secundaria por idPromoSec. "), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

//=====================================================================================================================================    
}
