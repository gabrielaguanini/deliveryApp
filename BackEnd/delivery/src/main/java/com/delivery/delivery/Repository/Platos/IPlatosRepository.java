
package com.delivery.delivery.Repository.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.Platos.TipoPlato;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlatosRepository extends JpaRepository <Platos, Long>{
    
   @Modifying 
   @Query(value="UPDATE platos SET id_secundario = concat(id_plato, '-', tipo_plato) WHERE id_plato > 1", nativeQuery = true)
   public void  executeQuery();

   public List<Platos> findAllBytipoPlato_IdTipoPlato(Long idTipoPlato);
   
  
    
}
