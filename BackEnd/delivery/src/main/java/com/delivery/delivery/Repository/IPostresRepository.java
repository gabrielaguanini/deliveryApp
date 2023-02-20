
package com.delivery.delivery.Repository;


import com.delivery.delivery.Entity.Postres;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPostresRepository extends JpaRepository <Postres, Long>{
    
    public Optional<Postres> findByNombrePostre(String nombrePostre);
    public Boolean existsByNombrePostre(String nombrePostre);
    
}
