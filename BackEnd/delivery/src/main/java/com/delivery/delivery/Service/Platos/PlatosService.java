package com.delivery.delivery.Service.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Repository.Platos.IPlatosRepository;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
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
public class PlatosService {

    @Autowired
    IPlatosRepository iPlatosRepo;

    @Autowired
    PlatosAMostrarService plaMosServ;

    /**
     * Logger para realizar registros de eventos
     */
    private static final Logger logger = LoggerFactory.getLogger(PlatosService.class);

// =======================================================================================================
    /**
     * Retorna una lista de todos los platos disponibles.
     *
     * @return Lista de objetos Platos que representan los platos disponibles.
     * @throws MensajeResponseStatusException si no se encuentran platos en la
     * base de datos.
     */
    public List<Platos> listaDePlatos() throws MensajeResponseStatusException {
        try {
            // Recupera todos los platos de la base de datos utilizando el repositorio de Platos (iPlatosRepo).
            List<Platos> platoEncontrado = iPlatosRepo.findAll();

            // Verifica si la lista de platos está vacía.
            if (platoEncontrado.isEmpty()) {
                // Lanza una excepción si no se encuentra ningún plato en la base de datos.
                throw new MensajeResponseStatusException(
                        new Mensaje("No existe ningún registro para generar una lista de platos").getMensaje(),
                        HttpStatus.OK,
                        null
                );
            }

            // Devuelve la lista de platos recuperados de la base de datos.
            return platoEncontrado;
        } catch (MensajeResponseStatusException e) {
            // Captura y maneja la excepción específica de MensajeResponseStatusException.
            // Registra el error utilizando el logger.
            logger.error("", e);
            // Relanza la excepción para que pueda ser manejada por código externo.
            throw e;
        }
    }

// =======================================================================================================
    /**
     * Retorna una lista de platos de un tipo específico. Este método busca y
     * devuelve todos los platos que pertenecen al tipo de plato especificado
     * por su ID.
     *
     * @param idTipoPlato El ID del tipo de plato del cual se desea obtener la
     * lista de platos.
     * @return Lista de objetos Platos que pertenecen al tipo de plato
     * especificado.
     * @throws MensajeResponseStatusException si no se encuentran platos del
     * tipo especificado en la base de datos. Esta excepción se lanza si la
     * lista de platos devuelta por el repositorio está vacía, indicando que no
     * hay registros de platos para el tipo especificado.
     */
    public List<Platos> listaTipoPlato(Long idTipoPlato) {
        try {
            // Busca todos los platos del tipo especificado por su ID
            List<Platos> liDTiPl = iPlatosRepo.findAllBytipoPlato_IdTipoPlato(idTipoPlato);

            // Verifica si la lista de platos está vacía
            if (liDTiPl.isEmpty()) {
                // Lanzar una excepción si no se encuentran platos del tipo especificado
                throw new MensajeResponseStatusException(
                        new Mensaje("No existen registros para generar una lista de tipos de platos").getMensaje(),
                        HttpStatus.OK,
                        null
                );
            }

            // Devuelve la lista de platos del tipo especificado
            return liDTiPl;
        } catch (MensajeResponseStatusException e) {
            // Captura y maneja excepciones específicas de MensajeResponseStatusException
            // Registra el error utilizando el logger
            logger.error("", e);
            // Relanza la excepción para que pueda ser manejada por código externo
            throw e;
        }
    }

// =======================================================================================================
    /**
     * Retorna un plato específico dado su ID.
     *
     * @param idPlato El ID del plato que se desea obtener.
     * @return Un objeto Optional que contiene el plato si se encuentra en la
     * base de datos, de lo contrario, retorna vacío.
     * @throws MensajeResponseStatusException si no se encuentra el plato con el
     * ID especificado.
     */
    public Optional<Platos> getOne(Long idPlato) {
        try {
            // Verifica si el plato con el ID especificado existe en la base de datos
            if (!iPlatosRepo.existsById(idPlato)) {
                // Lanza una excepción si el plato no existe
                throw new MensajeResponseStatusException(
                        new Mensaje("El idPlato N°°: " + idPlato + " no existe.").getMensaje(),
                        HttpStatus.NOT_FOUND,
                        null
                );
            }
            // Retorna el plato encontrado utilizando su ID
            return iPlatosRepo.findById(idPlato);
        } catch (MensajeResponseStatusException e) {
            // Captura y maneja la excepción específica de MensajeResponseStatusException
            // Registra el error utilizando el logger
            logger.error("", e);
            // Relanza la excepción para que pueda ser manejada por código externo
            throw e;
        }
    }

// =======================================================================================================
    /**
     * Guarda un plato en la base de datos.
     *
     * @param plato El plato que se desea guardar.
     * @throws MensajeResponseStatusException si una o varias propiedades del
     * plato están vacías o son iguales a cero. Esta excepción se lanza si
     * alguna de las propiedades del plato es nula, vacía o igual a cero, lo que
     * indica que los datos del plato no son válidos para ser almacenados en la
     * base de datos. Se envía una respuesta de error con un mensaje
     * descriptivo.
     */
    public void guardarPlato(Platos plato) {
        try {
            // Verifica si alguna de las propiedades del plato es nula, vacía o igual a cero
            if (plato == null
                    || plato.getTipoPlato().getIdTipoPlato() == null || plato.getTipoPlato().getIdTipoPlato() < 1
                    || plato.getNombrePlato() == null || plato.getNombrePlato().isEmpty() || plato.getNombrePlato().equals("")
                    || plato.getPrecioPlato() <= 0
                    || plato.getImgPlato() == null || plato.getImgPlato().isEmpty() || plato.getImgPlato().equals("")) {
                // Si alguna propiedad es inválida, se lanza una excepción
                throw new MensajeResponseStatusException(new Mensaje("Una o varias propiedades a guardar está/n vacía/s y/o es/son igual/es a 0.").getMensaje(), HttpStatus.OK, null);
            }
            // Guarda el plato en la base de datos
            iPlatosRepo.save(plato);
        } catch (MensajeResponseStatusException e) {
            // Registra el error utilizando el logger
            logger.error("", e);
            // Relanza la excepción para que pueda ser manejada por código externo
            throw e;
        }
    }

// =======================================================================================================
    /**
     * Elimina un plato de la base de datos dado su ID.
     *
     * @param idPlato El ID del plato que se desea eliminar.
     * @throws MensajeResponseStatusException si el plato con el ID especificado
     * no existe o está siendo utilizado en otro registro. Esta excepción se
     * lanza si el plato no se encuentra en la base de datos o está siendo
     * referenciado por otro registro. Se envía una respuesta de error con un
     * mensaje descriptivo y un código de estado correspondiente.
     */
    public void borrarPlato(Long idPlato) {
        try {
            // Verifica si el plato con el ID especificado existe en la base de datos
            if (!iPlatosRepo.existsById(idPlato)) {
                // Lanza una excepción si el plato no existe
                throw new MensajeResponseStatusException("El idPlato N°: " + idPlato + " solicitado para eliminar no existe", HttpStatus.NOT_FOUND, null);
            };

            // Verifica si el plato está siendo utilizado en otro registro
            if (plaMosServ.existsByIdPlato(idPlato)) {
                // Obtiene información adicional sobre el registro que utiliza el plato
                Optional<PlatosAMostrar> platMost = plaMosServ.getOneByIdPlato(idPlato);

                // Construye un mensaje descriptivo con la información obtenida
                String mensaje = platMost.map(plato -> {
                    // Extraer los atributos relevantes del objeto PlatosAMostrar
                    String id = "**" + String.valueOf(plato.getIdPlatosAMostrar());
                    String nombrePlaMost = plato.getPlatos().getNombrePlato() + "**";
                    // Concatenar los atributos en una cadena legible
                    return "ID: " + id + ", NOM. PLA A MOS.: " + nombrePlaMost;
                }).orElse("No se encontraron registros en PLATOS A MOSTRAR.");

                // Lanza una excepción indicando que el plato está siendo utilizado en otro registro
                throw new MensajeResponseStatusException("El plato que desea eliminar: idPlato N°: " + idPlato
                        + " se utiliza en el registro de la tabla PLATOS A MOSTRAR: "
                        + mensaje + " . Elimine el registro y prosiga con la eliminacion del plato.",
                        HttpStatus.BAD_REQUEST, null);
            }

            // Elimina el plato de la base de datos
            iPlatosRepo.deleteById(idPlato);
        } catch (MensajeResponseStatusException e) {
            // Registra el error utilizando el logger
            logger.error("", e);
            // Relanza la excepción para que pueda ser manejada por código externo
            throw e;
        }
    }

// =======================================================================================================
    /**
     * Verifica si un plato con el ID especificado existe en la base de datos.
     * Este método no tiene un endpoint directo y se utiliza internamente en
     * otros métodos y endpoints.
     *
     * @param idPlato El ID del plato que se desea verificar.
     * @return true si el plato con el ID especificado existe, false en caso
     * contrario.
     * @throws MensajeResponseStatusException si el plato con el ID especificado
     * no existe en la base de datos. Esta excepción se lanza si el plato no se
     * encuentra en la base de datos, proporcionando un mensaje descriptivo.
     */
    public boolean existsById(Long idPlato) {
        boolean platoExists = iPlatosRepo.existsById(idPlato);
        if (!platoExists) {
            throw new MensajeResponseStatusException("El plato con el idPlato N°: " + idPlato + " no existe", HttpStatus.NOT_FOUND, null);
        }
        return platoExists;
    }

// =======================================================================================================
    /**
     * Verifica si existe al menos un plato asociado al tipo de plato con el ID
     * especificado en la base de datos. Este método no tiene un endpoint
     * directo y se utiliza internamente en otros métodos y endpoints.
     *
     * @param idTipoPlato El ID del tipo de plato que se desea verificar.
     * @return true si existe al menos un plato asociado al tipo de plato con el
     * ID especificado, false en caso contrario.
     * @throws MensajeResponseStatusException si no existe ningún plato asociado
     * al tipo de plato con el ID especificado en la base de datos. Esta
     * excepción se lanza si no se encuentra ningún plato asociado al tipo de
     * plato en la base de datos, proporcionando un mensaje descriptivo.
     */
    public boolean existsByIdTipoPlato(Long idTipoPlato) {
        boolean tiPlExists = iPlatosRepo.existsByTipoPlato_IdTipoPlato(idTipoPlato);
        if (!tiPlExists) {
            throw new MensajeResponseStatusException("El plato con el idTipoPlato N°: " + idTipoPlato + " no existe", HttpStatus.NOT_FOUND, null);
        }
        return tiPlExists;
    }

// =======================================================================================================
    
    /**
     * Verifica si ya existe un plato con el mismo nombre en la tabla de platos.
     *
     * @param nombrePlato El nombre del plato que se desea verificar.
     * @return true si ya existe un plato con el mismo nombre, false si no.
     * @throws MensajeResponseStatusException si ya existe un plato con el mismo
     * nombre en la tabla. Esta excepción se lanza para indicar que la operación
     * no puede ser completada debido a la duplicidad del nombre del plato.
     */
    public boolean existeNombrePlato(String nombrePlato) {
        try {
            // Verifica si ya existe un plato con el mismo nombre en la tabla
            boolean PlaExNom = iPlatosRepo.existsByNombrePlato(nombrePlato);

            // Si ya existe un plato con el mismo nombre, lanza una excepción
            if (PlaExNom) {
                throw new MensajeResponseStatusException("El plato con nombre: " + nombrePlato + " ya existe en la tabla", HttpStatus.FORBIDDEN, null);
            }

            // Retorna el resultado de la verificación
            return PlaExNom;
        } catch (MensajeResponseStatusException e) {
            // Registra cualquier excepción en el registro de errores
            logger.error("", e);

            // Relanza la excepción para que sea manejada en un nivel superior si es necesario
            throw e;
        }
    }

// =======================================================================================================
}
