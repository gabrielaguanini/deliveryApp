
package com.delivery.delivery.Service.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Repository.PlatosAMostrar.IPlatosAMostrarRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PlatosAMostrarService {
    
@Autowired
IPlatosAMostrarRepository iPlatosAMostrarRepo;


 public List <PlatosAMostrar> listaPlatosAMostrar(){
       List<PlatosAMostrar> platosAMostrarList = iPlatosAMostrarRepo.findAll();
        
        // Ordenar la lista por idPlatosAMostrar
        List<PlatosAMostrar> platosAMostrarOrdenados = platosAMostrarList.stream()
                .sorted(Comparator.comparing(PlatosAMostrar::getIdPlatosAMostrar))
                .collect(Collectors.toList());

        return platosAMostrarOrdenados;
    }; 
 
   
    public Optional<PlatosAMostrar> getOne(Long idPlatosAMostrar){
        return iPlatosAMostrarRepo.findById(idPlatosAMostrar);
    };
    
      
    public void guardar(PlatosAMostrar platosAMostrar){
        iPlatosAMostrarRepo.save(platosAMostrar);
    };   
   

    public void borrar(Long idPlatosAMostrar){
        iPlatosAMostrarRepo.deleteById(idPlatosAMostrar);
    };   

    
    public boolean existsById(Long idPlatosAMostrar){
         return iPlatosAMostrarRepo.existsById(idPlatosAMostrar);
    };
    
 
}
