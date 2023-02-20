
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Bebidas;
import com.delivery.delivery.Repository.IBebidasRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
@Transactional
public class BebidasService {
    
      @Autowired
      IBebidasRepository iBebidasRepo;
      
 
    public List <Bebidas> listaBebidas(){
        return iBebidasRepo.findAll();
    }
    
   
    public Optional<Bebidas> getOne(Long idBebida){
        return iBebidasRepo.findById(idBebida);
    }
    
   
    public Optional <Bebidas> getBynombreBebida(String nombreBebida){
        return iBebidasRepo.findByNombreBebida(nombreBebida);
    }
    
  
    public void guardar(Bebidas bebida){
        iBebidasRepo.save(bebida);
    }
    

    public void borrar(Long idBebida){
        iBebidasRepo.deleteById(idBebida);
    }
    

    
    public boolean existsById(Long idBebida){
         return iBebidasRepo.existsById(idBebida);
    }
     
    public boolean existsByNombreBebida(String nombreBebida){
         return iBebidasRepo.existsByNombreBebida(nombreBebida);
    }
    
}
