package com.delivery.delivery.Service.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Repository.Platos.IPlatosRepository;
import com.delivery.delivery.Repository.PlatosAMostrar.IPlatosAMostrarRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PlatosAMostrarService {

    @Autowired
    IPlatosAMostrarRepository iPlatosAMostrarRepo;


    private static final Logger logger = LoggerFactory.getLogger(PlatosAMostrarService.class);

    /**
     * Recupera una lista de todos los platos a mostrar almacenados en la base
     * de datos, ordenados de la siguiente manera:
     *
     * 1. PROMOCIONES: Todos los platos cuyo nombreTipoPlato responda a PROMOCIONES
     * ordenados por ID de plato. 
     * 2. Resto de platos: Todos los platos de la base de datos que no son ni
     * POSTRES ni BEBIDAS ni PROMOCIONES, ordenados por ID de plato. 
     * 3. MERIENDAS: Todos los platos con nombreTipoPlato "MERIENDAS" ordenados por ID de plato.
     * 4. DESAYUNO: Todos los platos con nombreTipoPlato "DESAYUNO" ordenados por ID de plato.
     * 2. POSTRES: Todos los platos con nombreTipoPlato "POSTRES" ordenados por ID de plato. 
     * 3. BEBIDAS: Todos los platos con nombreTipoPlato "BEBIDAS" ordenados por ID de plato.
     *
     * @return Una lista ordenada de platos a mostrar.
     * @throws DataAccessException Si se produce algún error al acceder a la
     * base de datos.
     */
    public List<PlatosAMostrar> listaPlatosAMostrar() throws DataAccessException {

        //Filtra y ordena en la lista platosBebidas las BEBIDAS a los efectos de ubicar sus elementos al final de la lista platosAMostrarOrdenados
        List<PlatosAMostrar> platosBebidas = iPlatosAMostrarRepo.findAll().stream()
                .filter(platoAMostrar
                        -> platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("BEBIDAS")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("BEBIDA")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("bebida")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Bebidas"))
                .sorted(Comparator.comparing(platoAMostrar -> platoAMostrar.getPlatos().getIdPlato()))
                .collect(Collectors.toList());

        //Filtra y ordena en la lista platosPostres los POSTRES a los efectos de ubicar sus elementos al final de la lista platosAMostrarOrdenados
        List<PlatosAMostrar> platosPostres = iPlatosAMostrarRepo.findAll().stream()
                .filter(platoAMostrar
                        -> platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("POSTRES")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("POSTRE")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("postre")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Postres")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Postre"))
                .sorted(Comparator.comparing(platoAMostrar -> platoAMostrar.getPlatos().getIdPlato()))
                .collect(Collectors.toList());        
        
        
              //Filtra y ordena en la lista platosPostres las PROMOCIONES a los efectos de ubicar sus elementos al principio de la lista platosAMostrarOrdenados
        List<PlatosAMostrar> platosPromos = iPlatosAMostrarRepo.findAll().stream()
                .filter(platoAMostrar
                        -> platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("PROMOCION")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("PROMOCIÓN")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Promocion")
                 || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Promoción")
                 || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Promo")
                 || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("PROMO")
                 || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("promo")
                )
                .sorted(Comparator.comparing(platoAMostrar -> platoAMostrar.getPlatos().getIdPlato()))
                .collect(Collectors.toList());  
        
        
        //Filtra y ordena en la lista platosMeriendas las MERIENDAS a los efectos de ubicar sus elementos al final de la lista platosAMostrarOrdenados
        List<PlatosAMostrar> platosMerienda = iPlatosAMostrarRepo.findAll().stream()
                .filter(platoAMostrar
                        -> platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("MERIENDAS")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Meriendas")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Merienda")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("merienda")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("MERIENDA")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("meriendas"))
                .sorted(Comparator.comparing(platoAMostrar -> platoAMostrar.getPlatos().getIdPlato()))
                .collect(Collectors.toList());  
        
                //Filtra y ordena en la lista platosDesayuno los DESAYUNOS a los efectos de ubicar sus elementos al final de la lista platosAMostrarOrdenados
        List<PlatosAMostrar> platosDesayuno = iPlatosAMostrarRepo.findAll().stream()
                .filter(platoAMostrar
                        -> platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("DESAYUNO")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Desayuno")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("desayuno")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("DESAYUNOS")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("Desayunos")
                || platoAMostrar.getPlatos().getTipoPlato().getNombreTipoPlato().equals("desayunos"))
                .sorted(Comparator.comparing(platoAMostrar -> platoAMostrar.getPlatos().getIdPlato()))
                .collect(Collectors.toList());    
        
        
        //Filtra y ordena los elementos restantos de la lista de platos a mostrar
        List<PlatosAMostrar> platosResto = iPlatosAMostrarRepo.findAll().stream()
                .filter(platoAMostrar -> !platosBebidas.contains(platoAMostrar) 
                        && !platosPostres.contains(platoAMostrar)
                        && !platosPromos.contains(platoAMostrar)
                        && !platosMerienda.contains(platoAMostrar)
                        && !platosDesayuno.contains(platoAMostrar)
                )
                .sorted(Comparator.comparing(platoAMostrar -> platoAMostrar.getPlatos().getIdPlato()))
                .collect(Collectors.toList());

        // Combina las listas en el orden deseado, es decir BEBIDAS y POSTRES al final
        List<PlatosAMostrar> platosAMostrarOrdenados = new ArrayList<>();
        platosAMostrarOrdenados.addAll(platosPromos);
        platosAMostrarOrdenados.addAll(platosResto);
        platosAMostrarOrdenados.addAll(platosDesayuno);
        platosAMostrarOrdenados.addAll(platosMerienda);
        platosAMostrarOrdenados.addAll(platosPostres);
        platosAMostrarOrdenados.addAll(platosBebidas);

        return platosAMostrarOrdenados;
    }

//=======================================================================================================
    /**
     * Devuelve un plato a mostrar con el ID especificado.
     *
     * @param idPlatosAMostrar el ID del plato a buscar
     * @return un Optional que contiene el plato a mostrar si se encuentra, o
     * vacío si no se encuentra
     */
    public Optional<PlatosAMostrar> getOne(Long idPlatosAMostrar) {

        return iPlatosAMostrarRepo.findById(idPlatosAMostrar);
    }

//=======================================================================================================
    public Optional getOneByIdPlato(Long idPlato) {
        return iPlatosAMostrarRepo.findByPlatos_IdPlato(idPlato);
    }

//=======================================================================================================
    /**
     * Guarda un objeto PlatosAMostrar en la base de datos.
     *
     * @param platosAMostrar El objeto PlatosAMostrar a guardar.
     */
    public void guardar(PlatosAMostrar platosAMostrar) {
        iPlatosAMostrarRepo.save(platosAMostrar);
    }

//=======================================================================================================
    /**
     * Elimina un plato a mostrar de la base de datos mediante su ID.
     *
     * @param idPlatosAMostrar El ID del plato a mostrar que se desea eliminar.
     */
    public void borrar(Long idPlatosAMostrar) {
        iPlatosAMostrarRepo.deleteById(idPlatosAMostrar);
    }

//======================================================================================================= 
    /**
     * Verifica si existe un plato a mostrar en la base de datos según su ID.
     *
     * @param idPlatosAMostrar El ID del plato a mostrar que se desea verificar.
     * @return true si el plato a mostrar existe en la base de datos, false en
     * caso contrario.
     */
    public boolean existsById(Long idPlatosAMostrar) {

        return iPlatosAMostrarRepo.existsById(idPlatosAMostrar);
    }

//======================================================================================================= 
    /**
     * Verifica si existe un plato a mostrar en la base de datos según el ID de
     * su plato asociado.
     *
     * @param idPlato El ID del plato asociado al plato a mostrar que se desea
     * verificar.
     * @return true si el plato a mostrar asociado al ID del plato existe en la
     * base de datos, false en caso contrario.
     */
    public boolean existsByIdPlato(Long idPlato) {
        return iPlatosAMostrarRepo.existsByPlatos_IdPlato(idPlato);
    }

//======================================================================================================= 
}
