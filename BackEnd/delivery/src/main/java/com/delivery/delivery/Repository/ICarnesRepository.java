
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Carnes;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICarnesRepository extends JpaRepository <Carnes, Long>{
    
    public Optional<Carnes> findByNombreCarne(String nombreCarne);
    public Boolean existsByNombreCarne(String nombreCarne);
}
