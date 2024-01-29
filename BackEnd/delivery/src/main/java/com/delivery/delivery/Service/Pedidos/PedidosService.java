
package com.delivery.delivery.Service.Pedidos;


import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Repository.Pedidos.IDetallePedidosRepository;
import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PedidosService {
    
    @Autowired
    IPedidosRepository iPedidosRepo;
   
 
    public List <Pedidos> listapedidos(){  
        List<Pedidos> pedidosList = iPedidosRepo.findAll();
        
        List<Pedidos> pedidosListOrdenada = pedidosList.stream()
                .sorted(Comparator.comparing(Pedidos::getIdPedido))
                .collect(Collectors.toList());       
        
       return pedidosListOrdenada;
    };
    
    public List<Pedidos> obtenerPedidosDelDia() {
        LocalDate fechaActual = LocalDate.now();
        
        List<Pedidos> pedidosDiaList = iPedidosRepo.obtenerPedidosDelDia(fechaActual);
        
        List<Pedidos> pedidosDiaListOrdenada = pedidosDiaList.stream()
                .sorted(Comparator.comparing(Pedidos::getIdPedido).reversed())
                .collect(Collectors.toList());     
        
        return pedidosDiaListOrdenada;
    };
    
    public List<Pedidos> listaPedidosXFecha(LocalDate fecha){
        return iPedidosRepo.findByFecha(fecha);
    };
    
    //LISTA QUE ENVIA LAS FECHAS DE LOS PEDIDOS PARA SELECCIONAR EN EL FRONT
    //CUANDO SE QUIERE BUSCAR LOS PEDIDOS DE UNA FECHA ESPECIFICA
    public List<LocalDate> listaFechasPedidos(){
        return iPedidosRepo.findFechaPedidos();
    }

    
    
    public Optional <Pedidos> getOne(Long idPedido){
       return iPedidosRepo.findById(idPedido);
    };    
    
    public Pedidos guardarPedido(Pedidos pedidos){
       return iPedidosRepo.save(pedidos);   
            
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







   
   

