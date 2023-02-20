
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.PlatoDelDia;
import com.delivery.delivery.Repository.IPlatoDelDiaRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PlatoDelDiaService {
    
@Autowired
      IPlatoDelDiaRepository iPlatoDiaRepo;
      
 
    public List <PlatoDelDia> listaPlatoDelDia(){
        return iPlatoDiaRepo.findAll();
    }
    
   
    public Optional<PlatoDelDia> getOne(Long idPlatoDelDia){
        return iPlatoDiaRepo.findById(idPlatoDelDia);
    }
    
   
    public Optional <PlatoDelDia> getBynombrePlatoDelDia(String nombrePlatoDelDia){
        return iPlatoDiaRepo.findByNombrePlatoDelDia(nombrePlatoDelDia);
    }
    
  
    public void guardar(PlatoDelDia platoDelDia){
        iPlatoDiaRepo.save(platoDelDia);
    }
    

    public void borrar(Long idPlatoDelDia){
        iPlatoDiaRepo.deleteById(idPlatoDelDia);
    }
    
    
    public boolean existsById(Long idPlatoDelDia){
         return iPlatoDiaRepo.existsById(idPlatoDelDia);
    }
     
    public boolean existsByNombrePlatoDelDia(String nombrePlatoDelDia){
         return iPlatoDiaRepo.existsByNombrePlatoDelDia(nombrePlatoDelDia);
    }
    
}

