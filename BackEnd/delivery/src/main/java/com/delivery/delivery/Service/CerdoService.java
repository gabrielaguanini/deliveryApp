
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Cerdo;
import com.delivery.delivery.Repository.ICerdoRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CerdoService {

   @Autowired
      ICerdoRepository iCerdoRepo;
      
 
    public List <Cerdo> listaCerdo(){
        return iCerdoRepo.findAll();
    }
    
   
    public Optional<Cerdo> getOne(Long idCerdo){
        return iCerdoRepo.findById(idCerdo);
    }
    
   
    public Optional <Cerdo> getBynombreCerdo(String nombreCerdo){
        return iCerdoRepo.findByNombreCerdo(nombreCerdo);
    }
    
  
    public void guardar(Cerdo cerdo){
        iCerdoRepo.save(cerdo);
    }
    

    public void borrar(Long idCerdo){
        iCerdoRepo.deleteById(idCerdo);
    }
    

    
    public boolean existsById(Long idCerdo){
         return iCerdoRepo.existsById(idCerdo);
    }
     
    public boolean existsByNombreCerdo(String nombreCerdo){
         return iCerdoRepo.existsByNombreCerdo(nombreCerdo);
    }
    
}
