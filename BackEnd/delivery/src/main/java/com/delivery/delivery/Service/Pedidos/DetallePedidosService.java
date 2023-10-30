package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Repository.Pedidos.IDetallePedidosRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class DetallePedidosService {
    
    @Autowired
    IDetallePedidosRepository detPeRepo;
    
    
    
     public List <DetallePedidos> listaDetallePedidos(){    
       return detPeRepo.findAll();
    };
     
     
     
      public List<DetallePedidos> listaXIdPedido(Long idPedido) {
        return detPeRepo.findByPedidosIdPedido(idPedido);
    };
     
     
     
    
    public Optional <DetallePedidos> getOne(Long idDetallePedido){
       return detPeRepo.findById(idDetallePedido);
    };
    
    public void guardarDetallePedido(DetallePedidos detallePedidos){
        detPeRepo.save(detallePedidos);
    };
    
       
    public void borrarDetallePedido(Long idDetallePedido){
        detPeRepo.deleteById(idDetallePedido);
    };
    
   
    public boolean existsById(Long idDetallePedido){
       return detPeRepo.existsById(idDetallePedido);
    };
    
        
  //  public void updateTotalPedidos(Long idDetallePedido){
  //      detPeRepo.updateDetallePedidosPorcion(idDetallePedido);
  //  };
    
    
}
