package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPedidosRepository extends JpaRepository <Pedidos, Long>{
    
//METODO ABSTRACTO PARA INSERTAR LA FECHA DEL PEDIDO  
@Modifying    
@Query(value = "UPDATE pedidos SET fecha = NOW() WHERE id_pedido = :idPedido", nativeQuery = true)
public void updatePedidosFecha(@Param("idPedido") Long idPedido);

    
}
