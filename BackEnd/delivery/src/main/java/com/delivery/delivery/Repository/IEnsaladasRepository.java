
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Ensaladas;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEnsaladasRepository extends JpaRepository <Ensaladas, Long>{
    
    public Optional<Ensaladas> findByNombreEnsalada(String nombreEnsalada);
    public Boolean existsByNombreEnsalada(String nombreEnsalada);
}
