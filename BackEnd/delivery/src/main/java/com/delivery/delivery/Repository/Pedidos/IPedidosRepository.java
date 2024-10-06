package com.delivery.delivery.Repository.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPedidosRepository extends JpaRepository<Pedidos, Long> {

//METODO ABSTRACTO PARA INSERTAR LA FECHA DEL PEDIDO  
    /**
     * Actualiza la fecha y hora de un pedido en la base de datos.
     *
     * Este método realiza una actualización en la tabla "Pedidos" estableciendo
     * la fecha y la hora para el pedido especificado por su ID. Se utiliza la
     * anotación @Modifying para indicar que se trata de una operación de
     * modificación y la anotación @Query para especificar la consulta SQL.
     *
     * @param idPedido El ID del pedido que se va a actualizar.
     * @param fecha La fecha a establecer para el pedido.
     * @param hora La hora a establecer para el pedido.
     */
    @Modifying
    @Query("UPDATE Pedidos SET fecha = :fecha, hora = :hora WHERE id = :idPedido")
    void actualizarFechaYHoraDelPedido(@Param("idPedido") Long idPedido,
            @Param("fecha") LocalDate fecha,
            @Param("hora") LocalTime hora);

//METODO ABSTRACTO PARA OBTENER LOS PEDIDOS DE LA FECHA ACTUAL  
    @Query("SELECT p FROM Pedidos p WHERE p.fecha = :fechaActual")
    public List<Pedidos> obtenerPedidosDelDia(@Param("fechaActual") LocalDate fechaActual);

//METODO ABSTRACTO PARA OBTENER LISTA DE PEDIDOS ENVIANDO UNA FECHA 
    @Query
    public List<Pedidos> findByFecha(@Param("fecha") LocalDate fecha);

//METODO ABSTRACTO PARA CONOCER SI UN PEDIDO EXISTE POR FECHA 
    public boolean existsByFecha(LocalDate fecha);

};
