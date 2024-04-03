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
     * Retorna una lista de todos los platos en la base de datos.
     *
     * @return List<Platos> - Lista de todos los platos en la base de datos.
     */
    public List<Platos> listaDePlatos() {
        // Recupera todos los platos de la base de datos utilizando el repositorio de Platos (iPlatosRepo).
        List<Platos> platosEncontrados = iPlatosRepo.findAll();
        // Devuelve la lista de platos recuperados de la base de datos.
        return platosEncontrados;
    }

// =======================================================================================================
    /**
     * Retorna una lista de platos del tipo especificado por su ID.
     *
     * @param idTipoPlato Long - El ID del tipo de plato.
     * @return List<Platos> - Lista de platos del tipo especificado.
     */
    public List<Platos> listaTipoPlato(Long idTipoPlato) {
        // Busca todos los platos del tipo especificado por su ID
        List<Platos> platosTipoPlato = iPlatosRepo.findAllBytipoPlato_IdTipoPlato(idTipoPlato);
        // Devuelve la lista de platos del tipo especificado
        return platosTipoPlato;
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
     * @param plato El plato que se va a guardar.
     * @throws MensajeResponseStatusException Si alguna de las propiedades del
     * plato es nula, vacía o igual a cero.
     */
    public void guardarPlato(Platos plato) {
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
     * Verifica si existe un plato en la base de datos con el ID especificado.
     *
     * @param idPlato El ID del plato que se desea verificar.
     * @return boolean true si el plato existe, false en caso contrario.
     */
    public boolean existsById(Long idPlato) {
        // Verifica si existe un plato con el ID especificado en el repositorio
        boolean platoExists = iPlatosRepo.existsById(idPlato);
        return platoExists;
    }

// =======================================================================================================
    /**
     * Verifica si existen platos asociados a un tipo de plato específico en la
     * base de datos.
     *
     * @param idTipoPlato El ID del tipo de plato para el cual se desea
     * verificar la existencia de platos asociados.
     * @return boolean true si existen platos asociados al tipo de plato, false
     * en caso contrario.
     */
    public boolean existsByIdTipoPlato(Long idTipoPlato) {
        // Verifica si existen platos asociados al tipo de plato especificado en el repositorio
        boolean tiPlExists = iPlatosRepo.existsByTipoPlato_IdTipoPlato(idTipoPlato);
        return tiPlExists;
    }

// =======================================================================================================
    /**
     * Verifica si existe un plato con el nombre especificado en la base de
     * datos.
     *
     * @param nombrePlato El nombre del plato que se desea verificar.
     * @return boolean true si existe un plato con el nombre especificado, false
     * en caso contrario.
     */
    public boolean existeNombrePlato(String nombrePlato) {
        // Verifica si existe un plato con el nombre especificado en el repositorio
        boolean PlaExNom = iPlatosRepo.existsByNombrePlato(nombrePlato);
        return PlaExNom;
    }

// =======================================================================================================
}
