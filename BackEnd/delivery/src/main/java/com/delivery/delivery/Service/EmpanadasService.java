
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Cerdo;
import com.delivery.delivery.Entity.Empanadas;
import com.delivery.delivery.Repository.ICerdoRepository;
import com.delivery.delivery.Repository.IEmpanadasRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EmpanadasService {
    

   @Autowired
      IEmpanadasRepository iEmpaRepo;
      
 
    public List <Empanadas> listaEmpanada(){
        return iEmpaRepo.findAll();
    }
    
   
    public Optional<Empanadas> getOne(Long idEmpanada){
        return iEmpaRepo.findById(idEmpanada);
    }
    
   
    public Optional <Empanadas> getBynombreEmpanada(String nombreEmpanada){
        return iEmpaRepo.findByNombreEmpanada(nombreEmpanada);
    }
    
  
    public void guardar(Empanadas empanadas){
        iEmpaRepo.save(empanadas);
    }
    

    public void borrar(Long idEmpanada){
        iEmpaRepo.deleteById(idEmpanada);
    }
    
    
    public boolean existsById(Long idEmpanada){
         return iEmpaRepo.existsById(idEmpanada);
    }
     
    public boolean existsByNombreEmpanada(String nombreEmpanada){
         return iEmpaRepo.existsByNombreEmpanada(nombreEmpanada);
    }
    
}
