package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IDetallePedidosRepository extends JpaRepository <DetallePedidos, Long> {

List<DetallePedidos> findByPedidosIdPedido(Long idPedido);

//METODO ABSTRACTO PARA INSERTAR EL PRECIO TOTAL DEL PEDIDO    
//@Modifying    
//@Query(value = "UPDATE detalle_pedidos JOIN platosamostrar ON detalle_pedidos.id_platosamostrar = platosamostrar.id_platosamostrar JOIN platos ON platosamostrar.id_plato = platos.id_plato SET detalle_pedidos.total_pedido = detalle_pedidos.porcion_plato * platos.precio_plato WHERE id_detalle_pedido = :idDetallePedido > 0", nativeQuery = true)
//public void updateDetallePedidosPorcion(@Param("idDetallePedido") Long idPedido); 

}
