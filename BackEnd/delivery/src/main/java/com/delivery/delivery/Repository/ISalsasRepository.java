
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Salsas;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISalsasRepository extends JpaRepository <Salsas, Long>{
    
    public Optional<Salsas> findByNombreSalsa(String nombreSalsa);
    public Boolean existsByNombreSalsa(String nombreSalsa);
    
}
