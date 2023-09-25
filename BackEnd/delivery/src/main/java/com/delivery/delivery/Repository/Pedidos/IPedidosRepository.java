
package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface IPedidosRepository extends JpaRepository <Pedidos, Long>{
 
//METODO ABSTRACTO PARA INSERTAR REGISTROS CON PARAMETROS IDPLATOSAMOSTRAR Y PORCIONPLATO  
@Modifying    
@Query(value = "UPDATE pedidos SET fecha = NOW() WHERE id_pedido = :idPedido", nativeQuery = true)
   public void updatePedidosFecha(@Param("idPedido") Long idPedido);

//METODO ABSTRACTO PARA INSERTAR EL PRECIO TOTAL DEL PEDIDO    
@Modifying    
@Query(value = "UPDATE pedidos SET total_pedido = porcion_plato * (SELECT precio_plato FROM platos WHERE id_plato = ( SELECT id_plato FROM platosamostrar WHERE id_platosamostrar = pedidos.id_platosamostrar))WHERE id_pedido = :idPedido", nativeQuery = true)
   public void updatePedidosPorcion(@Param("idPedido") Long idPedido);   

}
