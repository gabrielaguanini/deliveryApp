
package com.delivery.delivery.Repository.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlatosRepository extends JpaRepository <Platos, Long>{
    
    public Optional<Platos> findByNombrePlato(String nombrePlato);
    public Boolean existsByNombrePlato(String nombrePlato);
    
}
