package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Repository.Pedidos.IDetallePedidosRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class DetallePedidosService {

    @Autowired
    IDetallePedidosRepository detPeRepo;

    @Autowired
    private EntityManager entityManager; //LIBRERIA QUE SOLO SE UTILIZA PARA EL METODO public void guardarIdPlatoTotalPrecio(DetallePedidos detallePedido)

    //LISTA DE TIPO "DETALLE PEDIDOS" COMPLETA 
    public List<DetallePedidos> listaDetallePedidos() {
        return detPeRepo.findAll();
    }

    ;    
    

   //LISTA DE STRINGS GENERADA DE "DETALLE PEDIDOS" COMPLETA, PARA GUARDAR EN ENTIDAD PEDIDOS, COLUMNA LISTA_PLATOS_DEL_PEDIDO 
    public List<String> generarListaCadenasDesdeDetallesPorIdPedido(Long idPedido) {
        List<DetallePedidos> detallesFiltrados = listaXIdPedido(idPedido);

        return detallesFiltrados.stream()
                .map(detalle -> " Plato: " + detalle.getPlatosAMostrar().getPlatos().getNombrePlato()
                + " - Porciones: " + detalle.getPorcionPlato()
                + " - $ unitario: " + detalle.getPlatosAMostrar().getPlatos().getPrecioPlato() + " / ")
                .collect(Collectors.toList());
    }

    ; 
  
     
    public List<DetallePedidos> listaXIdPedido(Long idPedido) {
        return detPeRepo.findByPedidosIdPedido(idPedido);
    }

    ;    
     
    
    public Optional<DetallePedidos> getOne(Long idDetallePedido) {
        return detPeRepo.findById(idDetallePedido);
    }

    ;
    
    public void guardarDetallePedido(DetallePedidos detallePedidos) {
        detPeRepo.save(detallePedidos);
      
    }

    ;
    
       
    public void borrarDetallePedido(Long idDetallePedido) {
        detPeRepo.deleteById(idDetallePedido);
    }

    ;
    
   
    public boolean existsById(Long idDetallePedido) {
        return detPeRepo.existsById(idDetallePedido);
    }

    ; 
    
    
    
 //INGRESA EL ID_PLATO, TOTAL_PLATO Y PRECIO_PLATOSAMOSTRAR EN LA COLUMNA CORRESPONDIENTE 
 @Transactional
    public void guardarIdPlatoTotalPrecio(DetallePedidos detallePedido) {
        if (detallePedido.getPlatosAMostrar() != null) {
            PlatosAMostrar platosAMostrarPersistido = entityManager.find(PlatosAMostrar.class, detallePedido.getPlatosAMostrar().getIdPlatosAMostrar());

            if (platosAMostrarPersistido != null && platosAMostrarPersistido.getPlatos() != null) {
                Platos platosAsociado = platosAMostrarPersistido.getPlatos();
                detallePedido.setPlatos(platosAsociado);

                // Obtener el precio_plato desde la entidad Platos
                Float precioPlato = platosAsociado.getPrecioPlato();
                detallePedido.setPrecioPlatoAMostrar(precioPlato);

                // Multiplicar porcionPlato por precioPlatoAMostrar y establecer el resultado
                if (detallePedido.getPorcionPlato() != null) {
                    detallePedido.setTotalPlato(detallePedido.getPorcionPlato() * precioPlato.doubleValue());
                }
            }
        }

        entityManager.persist(detallePedido);
    };
    
    public void guardarVariosDetallesPedido(List<DetallePedidos> detallesPedidos) {
    for (DetallePedidos detallePedido : detallesPedidos) {
        detPeRepo.save(detallePedido);
        // Realiza las operaciones adicionales si es necesario
    }
}



//  public void updateTotalPedidos(Long idDetallePedido){
//      detPeRepo.updateDetallePedidosPorcion(idDetallePedido);
//  };
};
