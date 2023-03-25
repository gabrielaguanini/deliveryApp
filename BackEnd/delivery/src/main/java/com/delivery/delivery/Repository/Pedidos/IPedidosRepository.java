
package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface IPedidosRepository extends JpaRepository <Pedidos, Long>{
   
@Modifying    
@Query(value = "INSERT INTO pedidos(id_pedido, fecha, hora,  porcion_plato, id_platosamostrar) SELECT 0, now(), curtime(), 1, id_platosamostrar FROM platosamostrar WHERE id_platosamostrar= :idPlatosAMostrar", nativeQuery = true)
   public void findByIdPlatosAMosAndSave(@Param("idPlatosAMostrar") Long idPlatosAMostrar);
}
