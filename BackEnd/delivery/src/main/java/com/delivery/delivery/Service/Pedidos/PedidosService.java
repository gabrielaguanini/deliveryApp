
package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PedidosService {
    
    @Autowired
    IPedidosRepository iPedidosRepo;
    
    
    public List <Pedidos> listapedidos(){    
       return iPedidosRepo.findAll();
    };
    
    public List<Pedidos> obtenerPedidosDelDia() {
        LocalDate fechaActual = LocalDate.now();
        return iPedidosRepo.obtenerPedidosDelDia(fechaActual);
    };

   
      
    
    public Optional <Pedidos> getOne(Long idPedido){
       return iPedidosRepo.findById(idPedido);
    };    
    
    public void guardarPedido(Pedidos pedidos){
        iPedidosRepo.save(pedidos);
    };    
 
       
    public void borrarPedido(Long idPedido){
        iPedidosRepo.deleteById(idPedido);
    };
    
    public boolean existsById(Long idPedido){
       return iPedidosRepo.existsById(idPedido);
    };
    
    public void updateFechaHora(Long idPedido){     
       iPedidosRepo.actualizarFechaYHoraDelPedido(idPedido);
    };
    
  
     
}
