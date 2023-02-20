
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Pollo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPolloRepository extends JpaRepository <Pollo, Long> {
    
    public Optional<Pollo> findByNombrePollo(String nombrePollo);
    public Boolean existsByNombrePollo(String nombrePollo);
}
