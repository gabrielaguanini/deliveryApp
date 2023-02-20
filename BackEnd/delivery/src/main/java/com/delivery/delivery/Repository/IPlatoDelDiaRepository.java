
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.PlatoDelDia;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlatoDelDiaRepository extends JpaRepository <PlatoDelDia, Long>{
    
    public Optional<PlatoDelDia> findByNombrePlatoDelDia(String PlatoDelDia);
    public Boolean existsByNombrePlatoDelDia(String PlatoDelDia);
}
