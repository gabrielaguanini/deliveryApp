package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPedidosRepository extends JpaRepository <Pedidos, Long>{
    
//METODO ABSTRACTO PARA INSERTAR LA FECHA DEL PEDIDO  
@Modifying
@Query("UPDATE Pedidos SET fecha = current_date(), hora = current_time() WHERE id = :idPedido")
public void actualizarFechaYHoraDelPedido(@Param("idPedido") Long idPedido);

//METODO ABSTRACTO PARA OBTENER LOS PEDIDOS DE LA FECHA ACTUAL  
@Query("SELECT p FROM Pedidos p WHERE p.fecha = :fechaActual")
public List<Pedidos> obtenerPedidosDelDia(@Param("fechaActual") LocalDate fechaActual);

//METODO ABSTRACTO PARA OBTENER UNA LISTA DE CADENAS DE TEXTO DE LA ENTIDAD DETALLE_PEDIDOS  
@Query("SELECT p FROM Pedidos p WHERE p.idPedido = :idPedido")
public List<String> obtenerListaPedDeDetPed(@Param("idPedido") Long idPedido);
}
