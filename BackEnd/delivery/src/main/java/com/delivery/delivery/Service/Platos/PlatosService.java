
package com.delivery.delivery.Service.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Repository.Platos.IPlatosRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PlatosService {
     @Autowired
      IPlatosRepository iPlatosRepo;
      
 
    public List <Platos> listaPlatos(){
        return iPlatosRepo.findAll();
    }
    
   
    public Optional<Platos> getOne(Long idPlato){
        return iPlatosRepo.findById(idPlato);
    }
    
   
    public Optional <Platos> getBynombrePlato(String nombrePlato){
        return iPlatosRepo.findByNombrePlato(nombrePlato);
    }
    
  
    public void guardarPlato(Platos plato){
        iPlatosRepo.save(plato);
        plato.getIdPlato().toString();
        iPlatosRepo.executeUpdate();        
    }
    
   

    public void borrarPlato(Long idPlato){
        iPlatosRepo.deleteById(idPlato);
    }
    

    
    public boolean existsById(Long idPlato){
         return iPlatosRepo.existsById(idPlato);
    }
     
    public boolean existsByNombrePlato(String nombrePlato){
         return iPlatosRepo.existsByNombrePlato(nombrePlato);
    }
    
 
  
   
}
