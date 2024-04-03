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

//=============================================================================================================
    /**
     * Obtiene una lista de todos los tipos de platos disponibles.
     *
     * @return Una lista de objetos TipoPlato que representan los tipos de
     * platos.
     */
    public List<TipoPlato> listaTipoPlato() {

        // Buscar todos los tipos de platos en el repositorio.
        List<TipoPlato> lisTiPl = iTipoPlaRepo.findAll();
        // Devuelve la lista de tipos de platos.
        return lisTiPl;

    }

//=============================================================================================================
    /**
     * Retorna un objeto Optional que puede contener o no un TipoPlato
     * encontrado por su ID.
     *
     * @param idTipoPlato El ID del TipoPlato que se desea encontrar.
     * @return Un objeto Optional que puede contener el TipoPlato encontrado, si
     * existe.
     */
    public Optional<TipoPlato> getOne(Long idTipoPlato) {
        // Busca en el repositorio el TipoPlato por su ID y retorna un Optional que puede contener el resultado.
        Optional tipoPlaSoli = iTipoPlaRepo.findById(idTipoPlato);

        // Devuelve el Optional que puede contener o no un TipoPlato encontrado por su ID.
        return tipoPlaSoli;
    }

//=============================================================================================================
    /**
     * Guarda un nuevo TipoPlato en el repositorio.
     *
     * @param tipoPlato El TipoPlato que se desea guardar.
     */
    public void guardarTipoPlato(TipoPlato tipoPlato) {
        // Guarda el TipoPlato en el repositorio.
        iTipoPlaRepo.save(tipoPlato);
    }

//=============================================================================================================*/
    /**
     * Borra un TipoPlato de la base de datos según su ID.
     *
     * @param idTipoPlato El ID del TipoPlato que se desea borrar.
     */
    public void borrarTipoPlato(Long idTipoPlato) {
        // Elimina el TipoPlato de la base de datos usando su ID.
        iTipoPlaRepo.deleteById(idTipoPlato);
    }

//=============================================================================================================
    /**
     * Verifica si existe un TipoPlato en el repositorio con el ID especificado.
     *
     * @param idTipoPlato El ID del TipoPlato que se desea verificar.
     * @return boolean true si existe un TipoPlato con el ID especificado, false
     * de lo contrario.
     */
    public boolean existsById(Long idTipoPlato) {
        // Verifica si existe un TipoPlato con el ID especificado en el repositorio
        boolean tiPlExists = iTipoPlaRepo.existsById(idTipoPlato);

        return tiPlExists;
    }

//=============================================================================================================
    /**
     * Retorna una lista de tipos de platos filtrada, que incluye solo aquellos
     * tipos de platos que tienen al menos un plato asociado.
     *
     * @return List<TipoPlato> - Lista de tipos de platos filtrada.
     */
    public List<TipoPlato> listaFiltradaTipoPlato() {
        // Obtiene una lista de tipos de plato que tienen al menos un plato asociado
        List<TipoPlato> lisTipPlat = iTipoPlaRepo.findAllWithPlatos();

        // Devuelve la lista de tipos de plato filtrada
        return lisTipPlat;
    }

//=============================================================================================================
    /**
     * Retorna una lista de colores asociados a los tipos de platos.
     *
     * @return List<String> - Lista de colores asociados a los tipos de platos.
     */
    public List<String> listaColoresTipoPlato() {
        // Obtiene una lista de colores asociados a los tipos de plato
        List<String> liColTiPl = iTipoPlaRepo.filterColorCardTipoPlato();

        // Devuelve la lista de colores asociados a los tipos de plato
        return liColTiPl;
    }

//=============================================================================================================
    /**
     * Retorna una lista de iconos asociados a los tipos de platos.
     *
     * @return List<String> - Lista de iconos asociados a los tipos de platos.
     */
    public List<String> listaIconosTipoPlato() {
        // Obtiene una lista de iconos asociados a los tipos de plato
        List<String> liIcTiPl = iTipoPlaRepo.filterIconoTipoPlato();
        // Devuelve la lista de iconos asociados a los tipos de plato
        return liIcTiPl;
    }

//=============================================================================================================
    /**
     * Verifica si existe un TipoPlato en la base de datos con el nombre
     * especificado.
     *
     * @param nombreTipoPlato El nombre del TipoPlato que se desea verificar.
     * @return true si existe un TipoPlato con el nombre especificado, false de
     * lo contrario.
     */
    public boolean existeNombreTipoPlato(String nombreTipoPlato) {
        // Verifica si existe un TipoPlato con el nombre especificado en el repositorio
        boolean ExXNomtiPl = iTipoPlaRepo.existsByNombreTipoPlato(nombreTipoPlato);
        // Retorna el resultado de la verificación de existencia del nombreTipoPlato en la tabla
        return ExXNomtiPl;
    }

//=============================================================================================================
}
