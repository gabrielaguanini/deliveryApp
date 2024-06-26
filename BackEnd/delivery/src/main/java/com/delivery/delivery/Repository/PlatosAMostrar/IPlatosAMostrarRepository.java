
package com.delivery.delivery.Repository.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;



public interface IPlatosAMostrarRepository extends JpaRepository <PlatosAMostrar, Long>{
    
   public boolean existsByPlatos_IdPlato(Long idPlato);
   
   Optional<PlatosAMostrar> findByPlatos_IdPlato(Long idPlato);

}
