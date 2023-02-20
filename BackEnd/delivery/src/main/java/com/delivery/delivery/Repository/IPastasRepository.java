
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Pastas;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPastasRepository extends JpaRepository <Pastas, Long>{
    
    public Optional<Pastas> findByNombrePasta(String nombrePasta);
    public Boolean existsByNombrePasta(String nombrePasta);
}
