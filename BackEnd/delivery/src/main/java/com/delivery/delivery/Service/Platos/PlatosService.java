package com.delivery.delivery.Service.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Repository.Platos.IPlatosRepository;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

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
     * Obtiene un plato según su ID.
     *
     * @param idPlato El ID del plato que se desea obtener.
     * @return Un objeto Optional que puede contener el plato encontrado, o un
     * Optional vacío si no se encuentra ningún plato con el ID especificado.
     */
    public Optional<Platos> getOne(Long idPlato) {

        // Retorna el plato encontrado utilizando su ID
        return iPlatosRepo.findById(idPlato);

    }

// =======================================================================================================
    /**
     * Guarda un plato en la base de datos.
     *
     * @param plato El plato que se va a guardar.
     */
    public void guardarPlato(Platos plato) {

        // Guarda el plato en la base de datos
        iPlatosRepo.save(plato);
    }

// =======================================================================================================
    /**
     * Elimina un plato de la base de datos según su ID.
     *
     * @param idPlato El ID del plato que se desea eliminar.
     */
    public void borrarPlato(Long idPlato) {
        // Elimina el plato de la base de datos
        iPlatosRepo.deleteById(idPlato);
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
