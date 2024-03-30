package com.delivery.delivery.Controller.PlatosController;

import com.delivery.delivery.Entity.Platos.TipoPlato;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
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

    /**
    * Logger para realizar registros de eventos
    */
    private static final Logger logger = LoggerFactory.getLogger(TipoPlatoController.class);
    
/**
* =======================================================================================================
*/

    /**
     * Obtiene una lista de tipos de platos ordenados alfabéticamente por
     * nombre.
     *
     * @return ResponseEntity con una lista de objetos TipoPlato en orden
     * alfabético por nombre.
     * @throws MensajeResponseStatusException si ocurre un error al buscar los
     * tipos de platos.
     * @throws MensajeRunTimeException si ocurre un error inesperado al procesar
     * la solicitud.
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
        } catch (MensajeResponseStatusException e) {
            // Relanza la excepción capturada.
            throw e;
        } catch (Exception e) {
            // Captura y registra cualquier excepción general del servidor.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            // Lanza una excepción con un mensaje descriptivo.
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de lista de detalle pedidos"), e);
        }
    }

/**
* =======================================================================================================
*/
    
    
    /**
     * Obtiene una lista de tipos de plato que tienen al menos un plato
     * asociado.
     *
     * @return ResponseEntity con la lista filtrada de tipos de plato y el
     * estado de la respuesta.
     * @throws MensajeResponseStatusException Si no se encuentran tipos de plato
     * con platos asociados.
     */
    @GetMapping("/listafiltradatipoplatos")
    public ResponseEntity<List<TipoPlato>> listaFiltradaTipoPlato() {
        try {
            // Obtiene una lista de tipos de plato que tienen al menos un plato asociado
            List<TipoPlato> listaFiltradaTipoPlato = tipoPlaServ.listaFiltradaTipoPlato();

            // Devuelve una respuesta con la lista filtrada de tipos de plato y el estado OK
            return new ResponseEntity<>(listaFiltradaTipoPlato, HttpStatus.OK);

        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error relacionado con MensajeResponseStatusException, se relanza la excepción.
            throw e;
        } catch (Exception e) {
            // Si ocurre un error inesperado, se registra en el logger y se lanza una nueva excepción.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de la lista filtrada de tipos de platos."), e);
        }
    }

/**
* =======================================================================================================
*/
    
    
    /**
     * Obtiene una lista de colores asociados a los tipos de plato.
     *
     * @return ResponseEntity con la lista de colores asociados a los tipos de
     * plato y el estado de la respuesta.
     * @throws MensajeResponseStatusException Si no se encuentran colores
     * asociados a los tipos de plato.
     */
    @GetMapping("/listacolorestipoplatos")
    public ResponseEntity<List<String>> listaColorTipoPlato() {
        try {
            // Obtiene una lista de colores asociados a los tipos de plato
            List<String> listaColorTipoPlato = tipoPlaServ.listaColoresTipoPlato();

            // Devuelve una respuesta con la lista de colores asociados a los tipos de plato y el estado OK
            return new ResponseEntity<>(listaColorTipoPlato, HttpStatus.OK);

        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error relacionado con MensajeResponseStatusException, se relanza la excepción.
            throw e;
        } catch (Exception e) {
            // Si ocurre un error inesperado, se registra en el logger y se lanza una nueva excepción.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de lista de colores para el tipo plato"), e);
        }
    }

/**
* =======================================================================================================
*/
    
    
    /**
     * Obtiene una lista de iconos asociados a los tipos de plato.
     *
     * @return ResponseEntity con la lista de iconos asociados a los tipos de
     * plato y el estado de la respuesta.
     * @throws MensajeResponseStatusException Si no se encuentran iconos
     * asociados a los tipos de plato.
     */
    @GetMapping("/listaiconostipoplatos")
    public ResponseEntity<List<String>> listaIconosTipoPlato() {
        try {
            // Obtiene una lista de iconos asociados a los tipos de plato
            List<String> listaIconosTipoPlato = tipoPlaServ.listaIconosTipoPlato();

            // Devuelve una respuesta con la lista de iconos asociados a los tipos de plato y el estado OK
            return new ResponseEntity<>(listaIconosTipoPlato, HttpStatus.OK);

        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error relacionado con MensajeResponseStatusException, se relanza la excepción.
            throw e;
        } catch (Exception e) {
            // Si ocurre un error inesperado, se registra en el logger y se lanza una nueva excepción.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de lista de iconos"), e);
        }
    }

/**
* =======================================================================================================
*/
    
    
    /**
     * Guarda un tipo de plato en el sistema.
     *
     * @param tipoPlato El objeto TipoPlato a guardar.
     * @return ResponseEntity con un mensaje indicando el resultado de la
     * operación.
     * @throws MensajeResponseStatusException si se intenta guardar un tipo de
     * plato duplicado.
     * @throws MensajeRunTimeException si ocurre un error inesperado al procesar
     * la solicitud.
     */
    @PostMapping("/guardartipoplato")
    public ResponseEntity<?> guardarTipoPlato(@Valid @RequestBody TipoPlato tipoPlato) {
        try {
            // Verifica si ya existe un tipo de plato con el mismo nombre.
            if (tipoPlaServ.existeNombreTipoPlato(tipoPlato.getNombreTipoPlato())) {
                // Si existe un tipo de plato con el mismo nombre, devuelve una respuesta de error.
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

                // Devuelbe una respuesta de éxito.
                return new ResponseEntity(new Mensaje("Tipo de plato guardado"), HttpStatus.OK);
            }
        } catch (MensajeResponseStatusException e) {
            // Manejar la excepción y devolver una respuesta de error apropiada.
            return new ResponseEntity<>(new Mensaje(e.getMessage()), e.getStatus());
        } catch (Exception e) {
            // Captura y registra cualquier excepción general.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            // Lanza una excepción con un mensaje descriptivo.
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar un tipo de plato"), e);
        }
    }

/**
* =======================================================================================================
*/
    
    
    /**
     * Elimina un tipo de plato si no está siendo utilizado por ningún plato.
     *
     * @param idTipoPlato El ID del tipo de plato que se va a eliminar.
     * @return ResponseEntity con un mensaje de éxito si el tipo de plato se
     * eliminó correctamente.
     * @throws MensajeResponseStatusException Si el ID de tipo de plato no
     * existe en la base de datos o si el tipo de plato está siendo utilizado
     * por uno o varios platos.
     */
    @DeleteMapping("/eliminartipoplatos/{idTipoPlato}")
    public ResponseEntity<?> borrarTipoPlato(@PathVariable Long idTipoPlato) {
        try {
            tipoPlaServ.borrarTipoPlato(idTipoPlato);
            return new ResponseEntity<>(new Mensaje("Tipo de plato eliminado"), HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error relacionado con MensajeResponseStatusException, se relanza la excepción.
            throw e;
        } catch (Exception e) {
            // Si ocurre un error inesperado, se registra en el logger y se lanza una nueva excepción.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para eliminar el tipo de plato"), e);
        }
    }

/**
* =======================================================================================================
*/
    
    
    //ACTUALIZAR TIPO DE PLATO
    @PutMapping("/actualizartipoplato/{idTipoPlato}")
    public ResponseEntity<?> actualizarTipoPlato(@RequestBody TipoPlato tipoPlato, @PathVariable Long idTipoPlato) {
        if (!tipoPlaServ.existsById(idTipoPlato)) {
            throw new MensajeResponseStatusException("El idTipoPlato N°: " + idTipoPlato + " solicitado para editar no existe",
                    HttpStatus.NOT_FOUND, null);
        };

        TipoPlato tipPla = tipoPlaServ.getOne(idTipoPlato).get();
        tipPla.setNombreTipoPlato(tipoPlato.getNombreTipoPlato());
        tipPla.setIconoTipoPlato(tipoPlato.getIconoTipoPlato());
        tipPla.setColorCardTipoPlato(tipoPlato.getColorCardTipoPlato());
        tipoPlaServ.guardarTipoPlato(tipPla);
        return new ResponseEntity(new Mensaje("Tipo de plato actualizado"), HttpStatus.OK);
    }

/**
* =======================================================================================================
*/
    
   /**
 * Obtiene un tipo de plato por su ID.
 *
 * @param idTipoPlato El ID del tipo de plato a buscar.
 * @return ResponseEntity con el tipo de plato encontrado, si existe, con estado OK.
 * @throws MensajeResponseStatusException si el tipo de plato no existe.
 * @throws MensajeRunTimeException si ocurre un error inesperado al procesar la solicitud.
 */
@GetMapping("/obtenertiplaxid/{idTipoPlato}")
    public ResponseEntity<TipoPlato> obtenerTipoPlatoXId(@PathVariable Long idTipoPlato) {
        try {
            // Obtiene el tipo de plato por su ID desde el servicio.
            TipoPlato tipoPl = tipoPlaServ.getOne(idTipoPlato).get();

            // Devuelve el tipo de plato encontrado en una ResponseEntity con estado OK.
            return new ResponseEntity(tipoPl, HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            // Relanza la excepción capturada.
            throw e;
        } catch (Exception e) {
            // Captura y registra cualquier excepción general.
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            // Lanza una excepción con un mensaje descriptivo.
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para obtener un tipo de plato por idTipoPlato"), e);
        }
    }

/**
* =======================================================================================================
*/
    
    
    /**
     * Obtiene un valor booleano que indica si un tipo de plato existe por su
     * nombre.
     *
     * @param nombreTipoPlato El nombre del tipo de plato a verificar.
     * @return ResponseEntity con un valor booleano que indica si el tipo de
     * plato existe. Si el nombre del tipo de plato existe, se devuelve true; de
     * lo contrario, false.
     */
    @GetMapping("/tipoplatoexistenombre/{nombreTipoPlato}")
    public ResponseEntity<Boolean> existePorNombre(@PathVariable String nombreTipoPlato) {
        try {
            // Verifica si el nombre del tipo de plato existe
            boolean exisPorNom = tipoPlaServ.existeNombreTipoPlato(nombreTipoPlato);

            // Retorna una respuesta exitosa junto con el resultado booleano
            return ResponseEntity.ok(exisPorNom);

        } catch (MensajeResponseStatusException e) {
            // Captura y maneja la excepción específica MensajeResponseStatusException
            return ResponseEntity.status(e.getStatus()).body(false);
        } catch (Exception e) {
            // Captura y maneja otras excepciones generales
            logger.error("Error al procesar la solicitud para saber si existe por nombre de tipo plato", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(false);
        }
    }

/**
* =======================================================================================================
*/
    
    
    
}
