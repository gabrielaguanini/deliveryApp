
package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
import java.time.LocalDate;
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
    
    @Autowired
    DetallePedidosService detallePedidosService;
    
    
    
    public List <Pedidos> listapedidos(){    
       return iPedidosRepo.findAll();
    };
    
    public List<Pedidos> obtenerPedidosDelDia() {
        LocalDate fechaActual = LocalDate.now();
        return iPedidosRepo.obtenerPedidosDelDia(fechaActual);
    };
    
 
    // GUARDA LA LISTA DE STRINGS GENERADA A PARTIR DE PASAR UN ID A DETALLE PEDIDOS EN LA COLUMNA lista_platos_del_pedido DE LA TABLA PEDIDOS
    public void guardarListaPlatosEnPedido(Long idPedido, List<String> listaPlatos) {
        Optional<Pedidos> pedidoOptional = iPedidosRepo.findById(idPedido);       

        if (pedidoOptional.isPresent()) {
            Pedidos pedido = pedidoOptional.get();
            
        // Limitar la longitud de la cadena
        int maxLength = 10000; // Longitud que soportara cada registro en la columna lista_platos_del_pedido
        String listaPlatosString = String.join(",", listaPlatos);
        if (listaPlatosString.length() > maxLength) {
            listaPlatosString = listaPlatosString.substring(0, maxLength);
        };
            
            pedido.setListaPlatosDelPedido(String.join("", listaPlatos)); // Puedes ajustar el delimitador según tus necesidades
       
            iPedidosRepo.save(pedido);
        } else {
          
        };
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
