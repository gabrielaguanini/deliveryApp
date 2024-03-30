package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;

import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PedidosService {

    @Autowired
    IPedidosRepository iPedidosRepo;

    private static final Logger logger = LoggerFactory.getLogger(DetallePedidosService.class);
    
   

    public List<Pedidos> listapedidos() {
        List<Pedidos> pedidosList = iPedidosRepo.findAll();

        List<Pedidos> pedidosListOrdenada = pedidosList.stream()
                .sorted(Comparator.comparing(Pedidos::getIdPedido))
                .collect(Collectors.toList());

        return pedidosListOrdenada;
    }

    ;
    
    public List<Pedidos> obtenerPedidosDelDia() {
        LocalDate fechaActual = LocalDate.now();

        List<Pedidos> pedidosDiaList = iPedidosRepo.obtenerPedidosDelDia(fechaActual);

        List<Pedidos> pedidosDiaListOrdenada = pedidosDiaList.stream()
                .sorted(Comparator.comparing(Pedidos::getIdPedido).reversed())
                .collect(Collectors.toList());

        return pedidosDiaListOrdenada;
    }

    ;
    
    public List<Pedidos> listaPedidosXFecha(LocalDate fecha) {
      List<Pedidos> listaVacia = new ArrayList<>();
        try {
            List<Pedidos> listaPedXFecha = iPedidosRepo.findByFecha(fecha);        
            return listaPedXFecha;

        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw e;
        }
    }

    public Optional<Pedidos> getOne(Long idPedido) {
        try {
            if (!iPedidosRepo.existsById(idPedido)) {
                throw new MensajeResponseStatusException("El idPedido N°: " + idPedido + " no existe", HttpStatus.NOT_FOUND, null);
            }
            return iPedidosRepo.findById(idPedido);
        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw e;
        }
    }
    
    public Pedidos guardarPedido(Pedidos pedidos) {
        return iPedidosRepo.save(pedidos);

    }

    ;    
 
       
    public void borrarPedido(Long idPedido) {
        iPedidosRepo.deleteById(idPedido);
    }

    ;
    
    public boolean existsById(Long idPedido) {
        return iPedidosRepo.existsById(idPedido);
    }

    ;
    
    public void updateFechaHora(Long idPedido) {
        iPedidosRepo.actualizarFechaYHoraDelPedido(idPedido);
    }
;
    
    public boolean existsByFecha(LocalDate fecha){
        return iPedidosRepo.existsByFecha(fecha);
    }

}
