
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Empanadas;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmpanadasRepository extends JpaRepository <Empanadas, Long>{
    
          
    public Optional<Empanadas> findByNombreEmpanada(String nombreEmpanada);
    public Boolean existsByNombreEmpanada(String nombreEmpanada);
}
    

