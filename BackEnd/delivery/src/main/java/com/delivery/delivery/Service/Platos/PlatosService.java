
package com.delivery.delivery.Service.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.Platos.TipoPlato;
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
      
 
    public List <Platos> listaDePlatos(){
        return iPlatosRepo.findAll();
    }
    
    public List <Platos> listaTipoPlato(Long idTipoPlato){
        return iPlatosRepo.findAllBytipoPlato_IdTipoPlato(idTipoPlato);
    }
    
  
  
    public Optional<Platos> getOne(Long idPlato){
        return iPlatosRepo.findById(idPlato);
    }
    
  
    public void guardarPlato(Platos plato){
        iPlatosRepo.save(plato);     
    }
    
   // public void executeQuery(){
   //    iPlatosRepo.executeQuery();
   // }
       


    public void borrarPlato(Long idPlato){
        iPlatosRepo.deleteById(idPlato);
    }
    

    
    public boolean existsById(Long idPlato){
         return iPlatosRepo.existsById(idPlato);
    }
    
    //METODO PARA SABER SI EL NOMBRE DEL PLATO ESTA PRESENTE EN LA TABLA 
    public boolean existeNombrePlato(String nombrePlato){
      return iPlatosRepo.existsByNombrePlato(nombrePlato);
    }; 

}
