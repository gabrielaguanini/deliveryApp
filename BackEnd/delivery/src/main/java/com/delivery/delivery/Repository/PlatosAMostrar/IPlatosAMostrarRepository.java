
package com.delivery.delivery.Repository.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPlatosAMostrarRepository extends JpaRepository <PlatosAMostrar, Long>{

 //METODO ABSTRACTO PARA INSERTAR REGISTROS CON PARAMETRO IDPLATO
@Modifying    
@Query(value = "INSERT INTO platosamostrar(id_platosamostrar, precio_plato, nombre_plato, id_plato, tipo_plato) SELECT 0, precio_plato, nombre_plato, id_plato, tipo_plato FROM platos WHERE id_plato= :idPlato", nativeQuery = true)
    public void findByIdAndSave(@Param("idPlato") Long idPlato);
 
// ABSTRACT METHOD PARA CREAR ID_SECUNDARIO CON REGISTRO DE COLUMNAS ID_PLATO Y TIPO_PLATO
@Modifying 
@Query(value="UPDATE platosamostrar SET id_secundario = concat(id_platosamostrar, '-', id_plato, '-', tipo_plato) WHERE id_plato > 1", nativeQuery = true)
   public void  executeQuery();
}
