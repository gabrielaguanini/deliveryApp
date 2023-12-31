
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
    
    @Autowired
    DetallePedidosService detallePedidosService;
    
    @Autowired
    IDetallePedidosRepository detallePedidosRepo;
    
    @Autowired
    private EntityManager entityManager; //LIBRERIA QUE SOLO SE UTILIZA PARA EL METODO public void calcularImporteTotalPedido(Long idPedido)
    
    
    
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
 
    
  public Pedidos actualizarImporteTotalPedido(Long idPedido) {
    Pedidos pedido = iPedidosRepo.findById(idPedido).orElse(null);

    if (pedido != null || !pedido.equals(0)) {
        Double totalImportePedido = detallePedidosRepo.findTotalPlatoAndAdd(idPedido);

        pedido.setImporteTotalPedido(totalImportePedido != null ? totalImportePedido : 0.0);
        return iPedidosRepo.saveAndFlush(pedido);
    } else {
        return null;
    }
    };


}



   
   

