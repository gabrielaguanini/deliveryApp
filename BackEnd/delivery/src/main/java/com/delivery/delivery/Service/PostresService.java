
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Postres;
import com.delivery.delivery.Repository.IPostresRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PostresService {
    
@Autowired
      IPostresRepository iPostresRepo;
      
 
    public List <Postres> listaPostre(){
        return iPostresRepo.findAll();
    }
    
   
    public Optional<Postres> getOne(Long idPostre){
        return iPostresRepo.findById(idPostre);
    }
    
   
    public Optional <Postres> getBynombrePostre(String nombrePostre){
        return iPostresRepo.findByNombrePostre(nombrePostre);
    }
    
  
    public void guardar(Postres postres){
        iPostresRepo.save(postres);
    }
    

    public void borrar(Long idPostre){
        iPostresRepo.deleteById(idPostre);
    }
    
    
    public boolean existsById(Long idPostre){
         return iPostresRepo.existsById(idPostre);
    }
     
    public boolean existsByNombrePostre(String nombrePostre){
         return iPostresRepo.existsByNombrePostre(nombrePostre);
    }
    
}


