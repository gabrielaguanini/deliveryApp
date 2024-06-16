package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IDetallePedidosRepository extends JpaRepository<DetallePedidos, Long> {

    //METODO ABSTRACTO PARA SELECIONAR EN DETALLE PEDIDOS LOS REGISTROS POR IDPEDIDO
    @Query(value = "SELECT * FROM detalle_pedidos WHERE id_pedido = :idPedido", nativeQuery = true)
    List<DetallePedidos> findByIdPedDetPed(Long idPedido);

//METODO ABSTRACTO PARA OBTENER EL IMPORTE TOTAL DEL PEDIDO
    @Query("SELECT COALESCE(SUM(totalPlato), 0) FROM DetallePedidos WHERE id_pedido = :idPedido")
    public Double findTotalPlatoAndAdd(@Param("idPedido") Long idPedido);

//METODO ABSTRACTO PARA ELIMINAR O MODIFICAR A ´´ LOS REGISTROS DE LA COLUMNA LISTA PLATOS DEL PEDIDO
    @Modifying
    @Query(value = "UPDATE pedidos SET lista_platos_del_pedido = '' WHERE id_pedido = :idPedido", nativeQuery = true)
    public void updateListaPlatosDelPedido(@Param("idPedido") Long idPedido);

    //METODO ABSTRACTO PARA VISUALIZACION DEL CLIENTE PARA ELIMINAR O MODIFICAR LOS REGISTROS DE LA COLUMNA LISTA PLATOS DEL PEDIDO
    @Modifying
    @Query(value = "UPDATE pedidos SET lista_platos_del_pedido_cli = '' WHERE id_pedido = :idPedido", nativeQuery = true)
    public void updateListaPlatosDelPedidoCli(@Param("idPedido") Long idPedido);

//METODO ABSTRACTO PARA FILTRAR LOS IDPLATOSAMOSTRAR CORRESPONDIENTES AL IDPEDIDO DEL PARAMETRO
    @Query(value = "SELECT id_platosamostrar FROM detalle_pedidos WHERE id_pedido = :idPedido", nativeQuery = true)
    List<Long> findIdPlaMosXIdPedido(@Param("idPedido") Long idPedido);

//METODO ABSTRACTO PARA ELIMINAR LOS DETALLES DEL PEDIDO POR ID PEDIDO    
    @Modifying
    @Query(value = "DELETE FROM detalle_pedidos WHERE id_pedido = :idPedido and id_detalle_pedido > 0", nativeQuery = true)
    public void elimVariosDetPedXIdPedido(@Param("idPedido") Long idPedido);

}
