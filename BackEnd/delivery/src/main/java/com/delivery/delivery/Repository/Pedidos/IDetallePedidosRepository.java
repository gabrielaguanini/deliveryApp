package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDetallePedidosRepository extends JpaRepository <DetallePedidos, Long> {

List<DetallePedidos> findByPedidosIdPedido(Long idPedido);

}
