
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Postres;
import com.delivery.delivery.Entity.Salsas;
import com.delivery.delivery.Repository.ISalsasRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SalsasService {
    
@Autowired
      ISalsasRepository iSalsasRepo;
      
 
    public List <Salsas> listaSalsas(){
        return iSalsasRepo.findAll();
    }
    
   
    public Optional<Salsas> getOne(Long idSalsa){
        return iSalsasRepo.findById(idSalsa);
    }
    
   
    public Optional <Salsas> getBynombreSalsa(String nombreSalsa){
        return iSalsasRepo.findByNombreSalsa(nombreSalsa);
    }
    
  
    public void guardar(Salsas salsas){
        iSalsasRepo.save(salsas);
    }
    

    public void borrar(Long idSalsa){
        iSalsasRepo.deleteById(idSalsa);
    }
    
    
    public boolean existsById(Long idSalsa){
         return iSalsasRepo.existsById(idSalsa);
    }
     
    public boolean existsByNombreSalsa(String nombreSalsa){
         return iSalsasRepo.existsByNombreSalsa(nombreSalsa);
    }
    
}



