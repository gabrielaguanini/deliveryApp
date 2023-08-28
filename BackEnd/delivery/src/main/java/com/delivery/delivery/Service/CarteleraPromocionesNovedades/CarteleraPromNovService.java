
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
    
    public List <CarteleraPromocionesNovedades> listaCartelera(){
        return iCartRepo.findAll();
    };


    public Optional <CarteleraPromocionesNovedades> getOne(Long idPromo){
        return iCartRepo.findById(idPromo);
    };
    
    public void guardarPromo(CarteleraPromocionesNovedades carProNov){
        iCartRepo.save(carProNov);
    };
    
    public void borrarPromo(Long idPromo){
        iCartRepo.deleteById(idPromo);
    };
    
}