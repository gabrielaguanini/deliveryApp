
package com.delivery.delivery.Service.PlatosAMostrar;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Repository.PlatosAMostrar.IPlatosAMostrarRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class PlatosAMostrarService {
    

    
@Autowired
IPlatosAMostrarRepository iPlatosAMostrarRepo;


 public List <PlatosAMostrar> listaPlatosAMostrar(){
        return iPlatosAMostrarRepo.findAll();
    }
 
 
   
    public Optional<PlatosAMostrar> getOne(Long idPlatosAMostrar){
        return iPlatosAMostrarRepo.findById(idPlatosAMostrar);
    }
    
      
    public void guardar(PlatosAMostrar platosAMostrar){
        iPlatosAMostrarRepo.save(platosAMostrar);
    }
    
    
  
    public void findByIdAndSave(@Param("idPlato") Long idPlato){       
      iPlatosAMostrarRepo.findByIdAndSave(idPlato);
    }
    
    
    
    
    
    
    
    

    public void borrar(Long idPlatosAMostrar){
        iPlatosAMostrarRepo.deleteById(idPlatosAMostrar);
    }
    

    
    public boolean existsById(Long idPlatosAMostrar){
         return iPlatosAMostrarRepo.existsById(idPlatosAMostrar);
    }
     
   
}
