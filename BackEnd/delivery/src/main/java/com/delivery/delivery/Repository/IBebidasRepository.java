
package com.delivery.delivery.Repository;

import com.delivery.delivery.Entity.Bebidas;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBebidasRepository extends JpaRepository <Bebidas, Long>{
    
    public Optional<Bebidas> findByNombreBebida(String nombreBebida);
    public Boolean existsByNombreBebida(String nombreBebida);
    
}
