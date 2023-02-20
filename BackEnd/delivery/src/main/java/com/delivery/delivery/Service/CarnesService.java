
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Bebidas;
import com.delivery.delivery.Entity.Carnes;
import com.delivery.delivery.Repository.ICarnesRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CarnesService {

 @Autowired
      ICarnesRepository iCarnesRepo;
      
 
    public List <Carnes> listaCarne(){
        return iCarnesRepo.findAll();
    }
    
   
    public Optional<Carnes> getOne(Long idCarne){
        return iCarnesRepo.findById(idCarne);
    }
    
   
    public Optional <Carnes> getBynombreCarne(String nombreCarne){
        return iCarnesRepo.findByNombreCarne(nombreCarne);
    }
    
  
    public void guardar(Carnes carnes){
        iCarnesRepo.save(carnes);
    }
    

    public void borrar(Long idCarne){
        iCarnesRepo.deleteById(idCarne);
    }
    
    
    public boolean existsById(Long idCarne){
         return iCarnesRepo.existsById(idCarne);
    }
     
    public boolean existsByNombreCarne(String nombreCarne){
         return iCarnesRepo.existsByNombreCarne(nombreCarne);
    }
    
}
