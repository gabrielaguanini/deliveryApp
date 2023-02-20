
package com.delivery.delivery.Service;

import com.delivery.delivery.Entity.Pizzas;
import com.delivery.delivery.Repository.IPizzasRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PizzasService {
    
@Autowired
      IPizzasRepository iPizzasRepo;
      
 
    public List <Pizzas> listaPizza(){
        return iPizzasRepo.findAll();
    }
    
   
    public Optional<Pizzas> getOne(Long idPizza){
        return iPizzasRepo.findById(idPizza);
    }
    
   
    public Optional <Pizzas> getBynombrePizza(String nombrePizza){
        return iPizzasRepo.findByNombrePizza(nombrePizza);
    }
    
  
    public void guardar(Pizzas pizzas){
        iPizzasRepo.save(pizzas);
    }
    

    public void borrar(Long idPizza){
        iPizzasRepo.deleteById(idPizza);
    }
    
    
    public boolean existsById(Long idPizza){
         return iPizzasRepo.existsById(idPizza);
    }
     
    public boolean existsByNombrePizza(String nombrePizza){
         return iPizzasRepo.existsByNombrePizza(nombrePizza);
    }
    
}

