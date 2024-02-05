package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        try {
            List<Pedidos> listaPedXFecha = iPedidosRepo.findByFecha(fecha);
        
            if(!existsByFecha(fecha)){
                throw new MensajeResponseStatusException(new Mensaje("No existen pedidos con la fecha ingresada").getMensaje(), HttpStatus.NOT_FOUND, null);
            };

            return listaPedXFecha;

        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw e;
        }
    }

    public Optional<Pedidos> getOne(Long idPedido) {
        return iPedidosRepo.findById(idPedido);
    }

    ;    
    
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
