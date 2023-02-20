
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Pastas;
import com.delivery.delivery.Repository.IPastasRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PastasService {
    
@Autowired
      IPastasRepository iPastasRepo;
      
 
    public List <Pastas> listaPasta(){
        return iPastasRepo.findAll();
    }
    
   
    public Optional<Pastas> getOne(Long idPasta){
        return iPastasRepo.findById(idPasta);
    }
    
   
    public Optional <Pastas> getBynombrePasta(String nombrePasta){
        return iPastasRepo.findByNombrePasta(nombrePasta);
    }
    
  
    public void guardar(Pastas pastas){
        iPastasRepo.save(pastas);
    }
    

    public void borrar(Long idPasta){
        iPastasRepo.deleteById(idPasta);
    }
    
    
    public boolean existsById(Long idPasta){
         return iPastasRepo.existsById(idPasta);
    }
     
    public boolean existsByNombrePasta(String nombrePasta){
         return iPastasRepo.existsByNombrePasta(nombrePasta);
    }
    
}

