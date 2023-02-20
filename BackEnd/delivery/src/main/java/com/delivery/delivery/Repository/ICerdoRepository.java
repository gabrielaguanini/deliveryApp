
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Cerdo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICerdoRepository extends JpaRepository <Cerdo, Long>{
       
    public Optional<Cerdo> findByNombreCerdo(String nombreCerdo);
    public Boolean existsByNombreCerdo(String nombreCerdo);
}
