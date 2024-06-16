package com.delivery.delivery.Service.CarteleraPromocionesNovedades;

import com.delivery.delivery.Entity.CarteleraPromocionesNovedades.CarteleraPromocionesNovedades;
import com.delivery.delivery.Repository.CarteleraPromocionesNovedades.ICarteleraPromocionesNovedades;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CarteleraPromNovService {

    @Autowired
    ICarteleraPromocionesNovedades iCartRepo;
    
    

    /**
     * Obtiene la lista completa de CarteleraPromocionesNovedades.
     *
     * @return lista de CarteleraPromocionesNovedades.
     */
    public List<CarteleraPromocionesNovedades> listaCartelera() {
        return iCartRepo.findAll();
    }

//=====================================================================================================================================
    /**
     * Obtiene una instancia de CarteleraPromocionesNovedades por su ID.
     *
     * @param idPromo ID de la promoción.
     * @return una instancia de CarteleraPromocionesNovedades envuelta en un
     * Optional.
     */
    public Optional<CarteleraPromocionesNovedades> getOne(Long idPromo) {
        return iCartRepo.findById(idPromo);
    }

//=====================================================================================================================================
    /**
     * Guarda una instancia de CarteleraPromocionesNovedades.
     *
     * @param carProNov la instancia de CarteleraPromocionesNovedades a guardar.
     */
    public void guardarPromo(CarteleraPromocionesNovedades carProNov) {
        iCartRepo.save(carProNov);
    }

//=====================================================================================================================================
    /**
     * Elimina una instancia de CarteleraPromocionesNovedades por su ID.
     *
     * @param idPromo ID de la promoción a eliminar.
     */
    public void borrarPromo(Long idPromo) {
        iCartRepo.deleteById(idPromo);
    }

//=====================================================================================================================================
    /**
     * Verifica si una instancia de CarteleraPromocionesNovedades existe por su
     * ID.
     *
     * @param idPromo ID de la promoción.
     * @return true si la instancia existe, false en caso contrario.
     */
    public boolean existsById(Long idPromo) {
        return iCartRepo.existsById(idPromo);
    }

//=====================================================================================================================================
}
