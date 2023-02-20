
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Pizzas;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPizzasRepository extends JpaRepository <Pizzas, Long>{
    
    public Optional<Pizzas> findByNombrePizza(String nombrePizza);
    public Boolean existsByNombrePizza(String nombrePizza);
}
