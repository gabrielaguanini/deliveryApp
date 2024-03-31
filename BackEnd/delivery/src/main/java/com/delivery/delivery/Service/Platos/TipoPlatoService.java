package com.delivery.delivery.Service.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.Platos.TipoPlato;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Repository.Platos.ITipoPlatoRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;



@Service
@Transactional
public class TipoPlatoService {

    @Autowired
    ITipoPlatoRepository iTipoPlaRepo;

    @Autowired
    PlatosService plaServ;
    
    
    /**
     * Logger para realizar registros de eventos
     */    
    private static final Logger logger = LoggerFactory.getLogger(TipoPlatoService.class);

    
/**
* =======================================================================================================
*/
    
    /**
     * Obtiene una lista de todos los tipos de platos disponibles.
     *
     * @return Una lista de objetos TipoPlato que representan los tipos de
     * platos.
     * @throws MensajeResponseStatusException si no se encuentran registros de
     * tipos de platos.
     */
    public List<TipoPlato> listaTipoPlato() {
        try {
            // Buscar todos los tipos de platos en el repositorio.
            List<TipoPlato> lisTiPl = iTipoPlaRepo.findAll();

            // Verificar si la lista está vacía.
            if (lisTiPl.isEmpty()) {
                // Si no hay registros, lanza una excepción con un mensaje descriptivo.
                throw new MensajeResponseStatusException(new Mensaje("No existen registros para generar una lista").getMensaje(), HttpStatus.OK, null);
            }
            // Devuelve la lista de tipos de platos.
            return lisTiPl;
        } catch (MensajeResponseStatusException e) {
            // Captura y registra cualquier excepción relacionada con MensajeResponseStatusException.
            logger.error("", e);
            // Relanza la excepción capturada.
            throw e;
        }
    }

/**
* =======================================================================================================
*/
    
    
    /**
     * Obtiene un tipo de plato por su ID.
     *
     * @param idTipoPlato El ID del tipo de plato a buscar.
     * @return Un objeto Optional que puede contener el tipo de plato si se
     * encuentra, o está vacío si no existe.
     * @throws MensajeResponseStatusException si el tipo de plato no existe.
     */
    public Optional<TipoPlato> getOne(Long idTipoPlato) {
        try {
            // Verifica si el tipo de plato existe en el repositorio.
            if (!iTipoPlaRepo.existsById(idTipoPlato)) {
                // Si no existe, lanza una excepción con un mensaje descriptivo y estado NOT_FOUND.
                throw new MensajeResponseStatusException("El idTipoPlato N°: " + idTipoPlato + " no existe", HttpStatus.NOT_FOUND, null);
            }
            // Devuelve el tipo de plato encontrado por su ID.
            return iTipoPlaRepo.findById(idTipoPlato);
        } catch (MensajeResponseStatusException e) {
            // Captura y registra cualquier excepción relacionada con MensajeResponseStatusException.
            logger.error("", e);
            // Relanza la excepción capturada.
            throw e;
        }
    }

/**
* =======================================================================================================
*/
    
    
    
    /**
     * Guarda un objeto TipoPlato en el repositorio si cumple con ciertos
     * criterios de validez.
     *
     * @param tipoPlato El objeto TipoPlato a guardar.
     * @throws MensajeResponseStatusException si una o varias propiedades a
     * guardar están vacías o son igual a 0.
     * @throws MensajeResponseStatusException si ocurre un error al guardar el
     * tipo de plato.
     */
    public void guardarTipoPlato(TipoPlato tipoPlato) {
        try {
            // Verifica si tipoPlato es nulo o si alguna de sus propiedades importantes está vacía o es igual a 0.
            if (tipoPlato == null
                    || tipoPlato.getNombreTipoPlato() == null || tipoPlato.getNombreTipoPlato().isEmpty() || tipoPlato.getNombreTipoPlato().equals("")
                    || tipoPlato.getIconoTipoPlato() == null || tipoPlato.getIconoTipoPlato().isEmpty() || tipoPlato.getIconoTipoPlato().equals("")
                    || tipoPlato.getColorCardTipoPlato() == null || tipoPlato.getColorCardTipoPlato().isEmpty() || tipoPlato.getColorCardTipoPlato().equals("")) {
                // Si tipoPlato es nulo o alguna propiedad importante está vacía o igual a 0, lanzar una excepción con un mensaje descriptivo.
                throw new MensajeResponseStatusException(new Mensaje("Una o varias propiedades a guardar está/n vacía/s y/o es/son igual/es a 0.").getMensaje(), HttpStatus.NOT_FOUND, null);
            }
            // Guarda el tipoPlato en el repositorio.
            iTipoPlaRepo.save(tipoPlato);
        } catch (MensajeResponseStatusException e) {
            // Captura y registra cualquier excepción relacionada con MensajeResponseStatusException.
            logger.error("", e);
            // Relanza la excepción capturada con un mensaje de error personalizado y estado BAD_REQUEST.
            throw new MensajeResponseStatusException("Error al guardar el tipo plato", HttpStatus.BAD_REQUEST, e);
        }
    }

/**
 * =======================================================================================================
 */
    
    
    /**
     * Elimina un tipo de plato si no está siendo utilizado por ningún plato.
     *
     * @param idTipoPlato El ID del tipo de plato que se va a eliminar.
     * @throws MensajeResponseStatusException Si el ID de tipo de plato no
     * existe en la base de datos o si el tipo de plato está siendo utilizado
     * por uno o varios platos.
     */
    public void borrarTipoPlato(Long idTipoPlato) {
        try {
            // Verifica si el tipo de plato existe en la base de datos
            if (!iTipoPlaRepo.existsById(idTipoPlato)) {
                logger.error("El idTipoPlato N°: " + idTipoPlato + " solicitado para eliminar no existe");
                throw new MensajeResponseStatusException("El idTipoPlato N°: " + idTipoPlato + " solicitado para eliminar no existe",
                        HttpStatus.NOT_FOUND, null);
            }

            // Verifica si el tipo de plato está siendo utilizado por algún plato
            if (plaServ.existsByIdTipoPlato(idTipoPlato)) {
                // Obtiene la lista de platos que utilizan el tipo de plato
                List<Platos> platosExisEnTiPla = plaServ.listaTipoPlato(idTipoPlato);
                // Itera sobre la lista
                StringBuilder platosStringBuilder = new StringBuilder();
                for (Platos plato : platosExisEnTiPla) {
                    // Construye una cadena con la información de los platos prveniente de la lista platosExisEnTiPla
                    platosStringBuilder.append(" ** ID PLATO: ").append(plato.getIdPlato()).append(" ")
                            .append(plato.getNombrePlato()).append(";\n");
                }
                logger.error("El tipo plato que desea eliminar: IdTipoPlato N°: " + idTipoPlato
                        + " se utiliza en uno/varios registros de la tabla PLATOS. Elimine esos registros y prosiga con la eliminacion del tipo de plato");
                // Lanza una excepción indicando que el tipo de plato está siendo utilizado
                throw new MensajeResponseStatusException("El tipo plato que desea eliminar: IdTipoPlato N°: " + idTipoPlato
                        + " se utiliza en uno/varios registros de la tabla PLATOS. Elimine el/los registro/s: "
                        + platosStringBuilder.toString() + "y prosiga con la eliminacion del tipo de plato.",
                        HttpStatus.BAD_REQUEST, null);
            }

            // Si el tipo de plato no está siendo utilizado, se elimina de la base de datos
            iTipoPlaRepo.deleteById(idTipoPlato);

        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error, se registra en el logger y se relanza la excepción
            logger.error("", e);
            throw e;
        }
    }

 /**
  * =======================================================================================================
  */
    
    
    /**
     * Verifica si existe un tipo de plato en la base de datos con el ID
     * especificado. Este método se utiliza internamente en el servicio
     * TipoPlatoService y en otros endpoints.
     *
     * @param idTipoPlato El ID del tipo de plato que se va a verificar.
     * @return true si existe un tipo de plato con el ID especificado, false de
     * lo contrario.
     */
    public boolean existsById(Long idTipoPlato) {
        boolean tiPlExists = iTipoPlaRepo.existsById(idTipoPlato);
    if (!tiPlExists) {
        throw new MensajeResponseStatusException("El plato con el idTipoPlato N°: " + idTipoPlato + " no existe", HttpStatus.NOT_FOUND, null);
    }
    return tiPlExists;
    }

 /**
  * =======================================================================================================
  */
    
    
    /**
     * Obtiene una lista de tipos de plato que tienen al menos un plato
     * asociado.
     *
     * @return Lista de tipos de plato filtrada que tienen al menos un plato
     * asociado.
     * @throws MensajeResponseStatusException Si no se encuentran tipos de plato
     * con platos asociados.
     */
    public List<TipoPlato> listaFiltradaTipoPlato() {
        try {
            // Obtiene una lista de tipos de plato que tienen al menos un plato asociado
            List<TipoPlato> lisTipPlat = iTipoPlaRepo.findAllWithPlatos();

            // Verifica si la lista está vacía
            if (lisTipPlat.isEmpty()) {
                // Si la lista está vacía, lanza una excepción indicando que no hay registros disponibles
                throw new MensajeResponseStatusException(new Mensaje("No existen registros para generar una lista").getMensaje(), HttpStatus.OK, null);
            }

            // Devuelve la lista de tipos de plato filtrada
            return lisTipPlat;

        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error, registra el error en el logger y relanza la excepción
            logger.error("", e);
            throw e;
        }
    }

 /**
  * =======================================================================================================
  */
    
    
    /**
     * Obtiene una lista de colores asociados a los tipos de plato.
     *
     * @return Lista de colores asociados a los tipos de plato.
     * @throws MensajeResponseStatusException Si no se encuentran colores
     * asociados a los tipos de plato.
     */
    public List<String> listaColoresTipoPlato() {
        try {
            // Obtiene una lista de colores asociados a los tipos de plato
            List<String> liColTiPl = iTipoPlaRepo.filterColorCardTipoPlato();

            // Verifica si la lista está vacía
            if (liColTiPl.isEmpty()) {
                // Si la lista está vacía, lanza una excepción indicando que no hay registros disponibles
                throw new MensajeResponseStatusException(new Mensaje("No existen registros para generar una lista de colores para el tipo de plato").getMensaje(), HttpStatus.OK, null);
            }

            // Devuelve la lista de colores asociados a los tipos de plato
            return liColTiPl;

        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error, registra el error en el logger y relanza la excepción
            logger.error("", e);
            throw e;
        }
    }

 /**
 * =======================================================================================================
 */
    
    /**
     * Obtiene una lista de iconos asociados a los tipos de plato.
     *
     * @return Lista de iconos asociados a los tipos de plato.
     * @throws MensajeResponseStatusException Si no se encuentran iconos
     * asociados a los tipos de plato.
     */
    public List<String> listaIconosTipoPlato() {
        try {
            // Obtiene una lista de iconos asociados a los tipos de plato
            List<String> liIcTiPl = iTipoPlaRepo.filterIconoTipoPlato();

            // Verifica si la lista está vacía
            if (liIcTiPl.isEmpty()) {
                // Si la lista está vacía, lanza una excepción indicando que no hay registros disponibles
                throw new MensajeResponseStatusException(new Mensaje("No existen registros para generar una lista de iconos para el tipo de plato").getMensaje(), HttpStatus.OK, null);
            }

            // Devuelve la lista de iconos asociados a los tipos de plato
            return liIcTiPl;

        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error, registra el error en el logger y relanza la excepción
            logger.error("", e);
            throw e;
        }
    }

/**
* =======================================================================================================
*/
    
    
    /**
     * Verifica si el nombre del tipo de plato está presente en la tabla.
     *
     * @param nombreTipoPlato El nombre del tipo de plato a verificar.
     * @return True si el nombre del tipo de plato está presente en la tabla, de
     * lo contrario False.
     * @throws MensajeResponseStatusException Si el nombre del tipo de plato es
     * nulo, está vacío o es una cadena vacía.
     */
    public boolean existeNombreTipoPlato(String nombreTipoPlato) {
        try {
            // Verifica si el nombreTipoPlato es nulo, está vacío o es una cadena vacía
            if (nombreTipoPlato == null || nombreTipoPlato.isEmpty() || nombreTipoPlato.isBlank()) {
                // Si el nombreTipoPlato no es válido, lanza una excepción con un mensaje descriptivo
                throw new MensajeResponseStatusException("El nombre del tipo de plato no puede estar vacío", HttpStatus.BAD_REQUEST, null);
            }

            // Retorna el resultado de la verificación de existencia del nombreTipoPlato en la tabla
            return iTipoPlaRepo.existsByNombreTipoPlato(nombreTipoPlato);

        } catch (MensajeResponseStatusException e) {
            // Si ocurre un error, registra la excepción en el logger y relanza la excepción
            logger.error("", e);
            throw e;
        }
    }

/**
* =======================================================================================================
*/
}
