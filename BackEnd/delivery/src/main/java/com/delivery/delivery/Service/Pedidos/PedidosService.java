package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;

import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PedidosService {

    @Autowired
    IPedidosRepository iPedidosRepo;

//=======================================================================================================
    /**
     * Recupera la lista de pedidos de la base de datos y la devuelve en orden
     * ascendente según el ID del pedido. Si la lista de pedidos está vacía,
     * devuelve una lista vacía.
     *
     * @return Lista de pedidos ordenada por ID del pedido.
     */
    public List<Pedidos> listapedidos() {
        // Recupera la lista de pedidos de la base de datos
        List<Pedidos> pedidosList = iPedidosRepo.findAll();

        // Ordena la lista de pedidos en orden ascendente según el ID del pedido
        List<Pedidos> pedidosListOrdenada = pedidosList.stream()
                .sorted(Comparator.comparing(Pedidos::getIdPedido))
                .collect(Collectors.toList());

        return pedidosListOrdenada;
    }

//=======================================================================================================
    /**
     * Obtiene la lista de pedidos del día actual.
     *
     * @return La lista de pedidos del día actual, ordenada por ID de pedido en
     * orden descendente.
     */
    public List<Pedidos> obtenerPedidosDelDia() {
        // Obtiene la fecha actual
        LocalDate fechaActual = LocalDate.now();

        // Obtiene la lista de pedidos del día actual desde el repositorio
        List<Pedidos> pedidosDiaList = iPedidosRepo.obtenerPedidosDelDia(fechaActual);

        // Ordena la lista de pedidos del día actual por ID de pedido en orden descendente
        List<Pedidos> pedidosDiaListOrdenada = pedidosDiaList.stream()
                .sorted(Comparator.comparing(Pedidos::getIdPedido).reversed())
                .collect(Collectors.toList());

        // Retorna la lista de pedidos del día actual ordenada
        return pedidosDiaListOrdenada;
    }

//=======================================================================================================
    /**
     * Retorna una lista de pedidos para una fecha específica.
     *
     * @param fecha La fecha para la cual se desea obtener los pedidos.
     * @return Una lista de pedidos correspondientes a la fecha especificada.
     */
    public List<Pedidos> listaPedidosXFecha(LocalDate fecha) {
        // Inicializa una lista vacía para manejar el caso de que no se encuentren pedidos para la fecha dada
        List<Pedidos> listaVacia = new ArrayList<>();

        // Busca los pedidos correspondientes a la fecha especificada en el repositorio
        List<Pedidos> listaPedXFecha = iPedidosRepo.findByFecha(fecha);

        // Retorna la lista de pedidos encontrados
        return listaPedXFecha;
    }

//=======================================================================================================
    /**
     * Obtiene un pedido por su ID.
     *
     * @param idPedido El ID del pedido que se desea obtener.
     * @return Un Optional que contiene el pedido si se encuentra, o vacío si no
     * existe.
     */
    public Optional<Pedidos> getOne(Long idPedido) {
        // Utiliza el método findById del repositorio para obtener el pedido por su ID
        return iPedidosRepo.findById(idPedido);
    }

//=======================================================================================================
    /**
     * Guarda un pedido en la base de datos.
     *
     * @param pedidos El pedido que se desea guardar.
     * @return Pedidos El pedido guardado.
     */
    public Pedidos guardarPedido(Pedidos pedidos) {
        // Guarda el pedido en el repositorio y retorna el pedido guardado
        return iPedidosRepo.save(pedidos);
    }

//======================================================================================================= 
    /**
     * Borra un pedido de la base de datos.
     *
     * @param idPedido El ID del pedido que se desea borrar.
     */
    public void borrarPedido(Long idPedido) {
        // Borra el pedido del repositorio utilizando su ID
        iPedidosRepo.deleteById(idPedido);
    }

//======================================================================================================= 
    /**
     * Verifica si un pedido con el ID especificado existe en la base de datos.
     *
     * @param idPedido El ID del pedido que se desea verificar.
     * @return true si el pedido existe, false si no.
     */
    public boolean existsById(Long idPedido) {
        // Utiliza el método existsById del repositorio para verificar la existencia del pedido
        return iPedidosRepo.existsById(idPedido);
    }

//======================================================================================================= 
    /**
     * Actualiza la fecha y hora del pedido con el ID especificado.
     *
     * @param idPedido El ID del pedido cuya fecha y hora se desea actualizar.
     */
    public void updateFechaHora(Long idPedido) {
        // Utiliza el método actualizarFechaYHoraDelPedido del repositorio para actualizar la fecha y hora del pedido
        ZoneId zonaHorariaArgentina = ZoneId.of("America/Argentina/Buenos_Aires");
        LocalDate fecha = LocalDate.now(zonaHorariaArgentina);
        LocalTime hora = LocalTime.now(zonaHorariaArgentina);
        
        // Llamar al método del repositorio para actualizar la fecha y la hora
        iPedidosRepo.actualizarFechaYHoraDelPedido(idPedido, fecha, hora);
    }

//======================================================================================================= 
    /**
     * Verifica si existen pedidos para la fecha especificada.
     *
     * @param fecha La fecha para la cual se desea verificar la existencia de
     * pedidos.
     * @return true si existen pedidos para la fecha especificada, false de lo
     * contrario.
     */
    public boolean existsByFecha(LocalDate fecha) {
        // Utiliza el método existsByFecha del repositorio para verificar la existencia de pedidos para la fecha especificada
        return iPedidosRepo.existsByFecha(fecha);
    }

//======================================================================================================= 
}
