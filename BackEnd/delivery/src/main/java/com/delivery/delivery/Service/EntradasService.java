
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Entradas;
import com.delivery.delivery.Repository.IEntradasRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EntradasService {
    
    
@Autowired
      IEntradasRepository iEntradasRepo;
      
 
    public List <Entradas> listaEntradas(){
        return iEntradasRepo.findAll();
    }
    
   
    public Optional<Entradas> getOne(Long idEntrada){
        return iEntradasRepo.findById(idEntrada);
    }
    
   
    public Optional <Entradas> getBynombreEntrada(String nombreEntrada){
        return iEntradasRepo.findByNombreEntrada(nombreEntrada);
    }
    
  
    public void guardar(Entradas entradas){
        iEntradasRepo.save(entradas);
    }
    

    public void borrar(Long idEntrada){
        iEntradasRepo.deleteById(idEntrada);
    }
    
    
    public boolean existsById(Long idEntrada){
         return iEntradasRepo.existsById(idEntrada);
    }
     
    public boolean existsByNombreEntrada(String nombreEntrada){
         return iEntradasRepo.existsByNombreEntrada(nombreEntrada);
    }
    
}

