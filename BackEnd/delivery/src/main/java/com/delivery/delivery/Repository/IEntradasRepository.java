
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Entradas;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEntradasRepository extends JpaRepository <Entradas, Long>{
    
    public Optional<Entradas> findByNombreEntrada(String nombreEntrada);
    public Boolean existsByNombreEntrada(String nombreEntrada);
}
