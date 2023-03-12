
package com.delivery.delivery.Repository.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPlatosAMostrarRepository extends JpaRepository <PlatosAMostrar, Long>{

@Modifying    
@Query(value = "INSERT INTO platosamostrar(id_platosamostrar, precio_plato, nombre_plato, id_plato) SELECT 0, precio_plato, nombre_plato, id_plato FROM platos WHERE id_plato= :idPlato", nativeQuery = true)
    public void findByIdAndSave(@Param("idPlato") Long idPlato);
    
}
