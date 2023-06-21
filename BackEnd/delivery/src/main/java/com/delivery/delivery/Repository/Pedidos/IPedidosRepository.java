
package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface IPedidosRepository extends JpaRepository <Pedidos, Long>{
 
//METODO ABSTRACTO PARA INSERTAR REGISTROS CON PARAMETROS IDPLATOSAMOSTRAR Y PORCIONPLATO  
@Modifying    
@Query(value = "INSERT INTO pedidos(id_pedido, fecha, hora,  porcion_plato, id_platosamostrar) SELECT 0, now(), curtime(), :porcionPlato, id_platosamostrar FROM platosamostrar WHERE id_platosamostrar = :idPlatosAMostrar", nativeQuery = true)
   public void findByIdPlatosAMosAndSave(@Param("idPlatosAMostrar") Long idPlatosAMostrar, 
                                         @Param("porcionPlato") Integer porcionPlato);

//METODO ABSTRACTO PARA ACRUALIZAR LA TABLA PEDIDO CON EL PRECIO DEL PLATO Y EL TOTAL DEL PEDIDO   
@Modifying    
@Query(value = "UPDATE pedidos , platosamostrar\n" +
"SET pedidos.precio_plato = platosamostrar.precio_plato, pedidos.total_pedido = pedidos.porcion_plato * pedidos.precio_plato\n" +
"WHERE id_pedido > 0", nativeQuery = true)
   public void updatePedidos(); 
}
