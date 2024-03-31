package com.delivery.delivery.Controller.PlatosController;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.Platos.PlatosService;
import java.util.Comparator;
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
public class PlatosController {

    @Autowired
    PlatosService plaServ;

    /**
     * Logger para realizar registros de eventos
     */
    private static final Logger logger = LoggerFactory.getLogger(PlatosController.class);

// =======================================================================================================
    
    /**
     * Retorna una lista de todos los platos disponibles.
     *
     * @return Lista de platos disponibles.
     * @throws MensajeResponseStatusException si no se encuentran platos en la
     * base de datos.
     * @throws MensajeRunTimeException si ocurre un error inesperado.
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
        } catch (MensajeResponseStatusException e) {
            // Si se produce una excepción específica de MensajeResponseStatusException, se relanza para ser manejada globalmente
            throw e;
        } catch (Exception e) {
            // Si se produce un error inesperado, se lanza una excepción MensajeRunTimeException con un mensaje descriptivo y el error original
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de lista de platos"), e);
        }
    }

// =======================================================================================================
    
    /**
     * Retorna una lista de platos de un tipo específico.
     *
     * @param idTipoPlato El ID del tipo de plato del cual se desea obtener la
     * lista de platos.
     * @return Lista de platos del tipo especificado.
     * @throws MensajeResponseStatusException si no se encuentran platos del
     * tipo especificado.
     * @throws MensajeRunTimeException si ocurre un error inesperado.
     */
    @GetMapping("/listatipoplatos/{idTipoPlato}")
    public ResponseEntity<List<Platos>> listaTipoPlato(@PathVariable Long idTipoPlato) {
        try {
            // Recupera la lista de platos del tipo especificado del servicio de Platos (plaServ)
            List<Platos> listaTipoPlato = plaServ.listaTipoPlato(idTipoPlato);

            // Devuelve una respuesta con la lista de platos del tipo especificado y el código de estado OK
            return new ResponseEntity<>(listaTipoPlato, HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            // Si se produce una excepción específica de MensajeResponseStatusException, se relanza
            throw e;
        } catch (Exception e) {
            // Si se produce un error inesperado, se registra y lanza una excepción MensajeRunTimeException
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud de lista de tipos de platos"), e);
        }
    }

// ======================================================================================================= 
    
    /**
     * Guarda un plato en la base de datos.
     *
     * @param platos El objeto Platos que contiene la información del plato que
     * se desea guardar.
     * @return ResponseEntity que contiene un mensaje indicando el resultado de
     * la operación y el código de estado correspondiente.
     */
    @PostMapping("/guardarplato")
    public ResponseEntity<?> guardarPlato(@RequestBody Platos platos) {
        try {
            // Verifica si el plato ya existe
            if (plaServ.existeNombrePlato(platos.getNombrePlato())) {
                // Retorna una respuesta de error si el plato ya existe
                return new ResponseEntity(new Mensaje("No se pueden guardar platos duplicados"), HttpStatus.BAD_REQUEST);
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
        } catch (MensajeResponseStatusException e) {
            // Lanza la excepción si se encuentra un error específico de MensajeResponseStatusException
            throw e;
        } catch (Exception e) {
            // Registra un error y lanza una excepción si se produce un error inesperado
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para guardar un plato"), e);
        }
    }

// =======================================================================================================
    
    /**
     * Actualiza la información de un plato existente en la base de datos.
     *
     * @param platos Objeto Platos con la información actualizada del plato.
     * @param idPlato El ID del plato que se desea actualizar.
     * @return ResponseEntity con un mensaje indicando el resultado de la
     * operación.
     * @throws MensajeResponseStatusException si se produce un error específico
     * durante la actualización del plato. Esta excepción se lanza si ocurre un
     * error al procesar la solicitud.
     * @throws MensajeRunTimeException si se produce un error inesperado al
     * procesar la solicitud. Esta excepción se lanza si ocurre un error no
     * esperado durante el procesamiento de la solicitud.
     */
    @PutMapping("/actualizarplato/{idPlato}")
    public ResponseEntity<?> actualizarPlato(@RequestBody Platos platos, @PathVariable Long idPlato) {
        try {
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
        } catch (MensajeResponseStatusException e) {
            // Lanza la excepción específica si ocurre un error durante la actualización
            throw e;
        } catch (Exception e) {
            // Registra un error y lanza una excepción si se produce un error inesperado
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para actualizar un plato"), e);
        }
    }

// =======================================================================================================
    
    /**
     * Elimina un plato de la base de datos dado su ID.
     *
     * @param idPlato El ID del plato que se desea eliminar.
     * @return ResponseEntity que contiene un mensaje indicando el resultado de
     * la operación y el código de estado correspondiente.
     */
    @DeleteMapping("/borrarplato/{idPlato}")
    public ResponseEntity<?> borrarPlato(@PathVariable("idPlato") Long idPlato) {
        try {
            // Llama al método para eliminar el plato
            plaServ.borrarPlato(idPlato);
            // Retorna una respuesta exitosa si el plato se elimina correctamente
            return new ResponseEntity(new Mensaje("Plato eliminado"), HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            // Lanza la excepción si se encuentra un error específico de MensajeResponseStatusException
            throw e;
        } catch (Exception e) {
            // Registra un error y lanza una excepción si se produce un error inesperado
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para eliminar el plato"), e);
        }
    }

// =======================================================================================================
    
    /**
     * Obtiene un plato por su ID.
     *
     * @param idPlato El ID del plato que se desea obtener.
     * @return ResponseEntity que contiene el plato si se encuentra en la base
     * de datos, junto con el código de estado OK si la solicitud se procesa con
     * éxito.
     * @throws MensajeResponseStatusException si el plato con el ID especificado
     * no se encuentra.
     * @throws MensajeRunTimeException si ocurre un error inesperado durante el
     * procesamiento de la solicitud.
     */
    @GetMapping("/obtenerplatoxid/{idPlato}")
    public ResponseEntity<Platos> obtPlatoXId(@PathVariable("idPlato") Long idPlato) {
        try {
            // Obtiene el plato del servicio de Platos (plaServ) utilizando su ID
            Platos plato = plaServ.getOne(idPlato).get();

            // Retorna una respuesta con el plato obtenido y el código de estado OK
            return new ResponseEntity<>(plato, HttpStatus.OK);
        } catch (MensajeResponseStatusException e) {
            // Lanza una excepción si el plato con el ID especificado no se encuentra
            throw e;
        } catch (Exception e) {
            // Lanza una excepción si ocurre un error inesperado durante el procesamiento de la solicitud
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para obtener un plato por ID"), e);
        }
    }

// =======================================================================================================
    
    /**
     * Endpoint para verificar si existe al menos un plato con el nombre
     * especificado en la base de datos.
     *
     * @param nombrePlato El nombre del plato que se desea verificar.
     * @return true si existe al menos un plato con el nombre especificado,
     * false en caso contrario.
     * @throws MensajeResponseStatusException si no se encuentra ningún plato
     * con el nombre especificado en la base de datos. Esta excepción se lanza
     * si no se encuentra ningún plato con el nombre especificado en la base de
     * datos, proporcionando un mensaje descriptivo.
     * @throws MensajeRunTimeException si se produce un error inesperado al
     * procesar la solicitud. Esta excepción se lanza si ocurre un error no
     * esperado durante el procesamiento de la solicitud.
     */
    @GetMapping("/platoexistenombre/{nombrePlato}")
    public Boolean existePorNombre(@PathVariable String nombrePlato) {
        try{
        return plaServ.existeNombrePlato(nombrePlato);
        }catch (MensajeResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al procesar la solicitud para saber si un plato existe por nombre"), e);
        }
        }

// =======================================================================================================
    
    
}
