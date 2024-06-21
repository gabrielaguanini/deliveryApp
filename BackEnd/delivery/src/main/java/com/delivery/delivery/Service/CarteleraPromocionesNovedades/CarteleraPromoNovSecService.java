
package com.delivery.delivery.Service.CarteleraPromocionesNovedades;

import com.delivery.delivery.Entity.CarteleraPromocionesNovedades.CarteleraPromoNovSecundaria;
import com.delivery.delivery.Repository.CarteleraPromocionesNovedades.ICarteleraPromoNovSecundaria;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CarteleraPromoNovSecService {
    
    @Autowired
    ICarteleraPromoNovSecundaria iCartProSec;
    
    /**
     * Obtiene la lista completa de CarteleraPromoNovSecundaria.
     *
     * @return lista de CarteleraPromoNovSecundaria.
     */
    public List<CarteleraPromoNovSecundaria> listaCarteleraSec() {
        return iCartProSec.findAll();
    }

//=====================================================================================================================================
    /**
     * Obtiene una instancia de CarteleraPromoNovSecundaria por su ID.
     *
     * @param idPromoSec ID de la promoción.
     * @return una instancia de CarteleraPromoNovSecundaria envuelta en un
     * Optional.
     */
    public Optional<CarteleraPromoNovSecundaria> getOne(Long idPromoSec) {
        return iCartProSec.findById(idPromoSec);
    }

//=====================================================================================================================================
    /**
     * Guarda una instancia de CarteleraPromoNovSecundaria.
     *
     * @param carProNovSec la instancia de CarteleraPromoNovSecundaria a guardar.
     */
    public void guardarPromoSec(CarteleraPromoNovSecundaria carProNovSec) {
        iCartProSec.save(carProNovSec);
    }

//=====================================================================================================================================
    /**
     * Elimina una instancia de CarteleraPromoNovSecundaria por su ID.
     *
     * @param idPromoSec ID de la promoción a eliminar.
     */
    public void borrarPromoSec(Long idPromoSec) {
        iCartProSec.deleteById(idPromoSec);
    }

//=====================================================================================================================================
    /**
     * Verifica si una instancia de CarteleraPromoNovSecundaria existe por su
     * ID.
     *
     * @param idPromoSec ID de la promoción.
     * @return true si la instancia existe, false en caso contrario.
     */
    public boolean existsById(Long idPromoSec) {
        return iCartProSec.existsById(idPromoSec);
    }

//=====================================================================================================================================
}

    

