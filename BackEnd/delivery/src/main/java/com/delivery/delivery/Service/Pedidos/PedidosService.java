
package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
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
    }
    
    public Optional <Pedidos> getOne(Long idPedido){
       return iPedidosRepo.findById(idPedido);
    }
    
    public void guardarPedido(Pedidos pedidos){
        iPedidosRepo.save(pedidos);
     }
    
       
    public void borrarPedido(Long idPedido){
        iPedidosRepo.deleteById(idPedido);
    }
    
    public void updateFecha(Long idPedido){     
        iPedidosRepo.updatePedidosFecha(idPedido);
    };
    
    public void updateTotalPedidos(Long idPedido){
        iPedidosRepo.updatePedidosPorcion(idPedido);
    };
    
    public boolean existById(Long idPlatosAMostrar){
       return iPedidosRepo.existsById(idPlatosAMostrar);};
      
}



    

