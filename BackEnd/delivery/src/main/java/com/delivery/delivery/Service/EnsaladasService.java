
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Ensaladas;
import com.delivery.delivery.Repository.IEnsaladasRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EnsaladasService {
    
@Autowired
      IEnsaladasRepository iEnsaladaRepo;
      
 
    public List <Ensaladas> listaEnsalada(){
        return iEnsaladaRepo.findAll();
    }
    
   
    public Optional<Ensaladas> getOne(Long idEnsalada){
        return iEnsaladaRepo.findById(idEnsalada);
    }
    
   
    public Optional <Ensaladas> getBynombreEnsalada(String nombreEnsalada){
        return iEnsaladaRepo.findByNombreEnsalada(nombreEnsalada);
    }
    
  
    public void guardar(Ensaladas ensaladas){
        iEnsaladaRepo.save(ensaladas);
    }
    

    public void borrar(Long idEnsalada){
        iEnsaladaRepo.deleteById(idEnsalada);
    }
    
    
    public boolean existsById(Long idEnsalada){
         return iEnsaladaRepo.existsById(idEnsalada);
    }
     
    public boolean existsByNombreEnsalada(String nombreEnsalada){
         return iEnsaladaRepo.existsByNombreEnsalada(nombreEnsalada);
    }
    
}

