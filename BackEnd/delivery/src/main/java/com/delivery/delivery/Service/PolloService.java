
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Pollo;
import com.delivery.delivery.Repository.IPolloRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PolloService {
    
@Autowired
      IPolloRepository iPolloRepo;
      
 
    public List <Pollo> listaPollo(){
        return iPolloRepo.findAll();
    }
    
   
    public Optional<Pollo> getOne(Long idPollo){
        return iPolloRepo.findById(idPollo);
    }
    
   
    public Optional <Pollo> getBynombrePollo(String nombrePollo){
        return iPolloRepo.findByNombrePollo(nombrePollo);
    }
    
  
    public void guardar(Pollo pollo){
        iPolloRepo.save(pollo);
    }
    

    public void borrar(Long idPollo){
        iPolloRepo.deleteById(idPollo);
    }
    
    
    public boolean existsById(Long idPollo){
         return iPolloRepo.existsById(idPollo);
    }
     
    public boolean existsByNombrePollo(String nombrePollo){
         return iPolloRepo.existsByNombrePollo(nombrePollo);
    }
    
}

