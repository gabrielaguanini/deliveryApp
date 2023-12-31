package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IDetallePedidosRepository extends JpaRepository <DetallePedidos, Long> {

List<DetallePedidos> findByPedidosIdPedido(Long idPedido);

//METODO ABSTRACTO PARA OBTENER EL IMPORTE TOTAL DEL PEDIDO 

@Query ("SELECT COALESCE(SUM(totalPlato), 0) FROM DetallePedidos WHERE id_pedido = :idPedido")
public Double findTotalPlatoAndAdd(@Param("idPedido") Long idPedido);



}

