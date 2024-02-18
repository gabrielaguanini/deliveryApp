
package com.delivery.delivery.Service.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Repository.Platos.IPlatosRepository;
import com.delivery.delivery.Repository.PlatosAMostrar.IPlatosAMostrarRepository;
import com.delivery.delivery.Service.Pedidos.DetallePedidosService;
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
public class PlatosAMostrarService {
    
@Autowired
IPlatosAMostrarRepository iPlatosAMostrarRepo;

@Autowired
IPlatosRepository iPlaRep;

      private static final Logger logger = LoggerFactory.getLogger(PlatosAMostrarService.class);


 public List <PlatosAMostrar> listaPlatosAMostrar(){
       List<PlatosAMostrar> platosAMostrarList = iPlatosAMostrarRepo.findAll();
        
        // Ordenar la lista por idPlatosAMostrar
        List<PlatosAMostrar> platosAMostrarOrdenados = platosAMostrarList.stream()
                .sorted(Comparator.comparing(PlatosAMostrar::getIdPlatosAMostrar))
                .collect(Collectors.toList());

        return platosAMostrarOrdenados;
    }; 
 
   
    public Optional<PlatosAMostrar> getOne(Long idPlatosAMostrar){
        return iPlatosAMostrarRepo.findById(idPlatosAMostrar);
    };
    
      
  public void guardar(PlatosAMostrar platosAMostrar) {    
    try {
        if (iPlatosAMostrarRepo.existsByPlatos_IdPlato(platosAMostrar.getPlatos().getIdPlato())) {
            throw new MensajeResponseStatusException(new Mensaje("El plato seleccionado ya se encuentra en Platos a Mostrar").getMensaje(), HttpStatus.BAD_REQUEST, null);
        };
        if (!iPlaRep.existsById(platosAMostrar.getPlatos().getIdPlato())) {
             throw new MensajeResponseStatusException(new Mensaje("El plato no existe").getMensaje(), HttpStatus.BAD_REQUEST, null);
        };
          if (platosAMostrar.getDescripcionPlatoAMostrar() == ""|| platosAMostrar.getDescripcionPlatoAMostrar() == null) {
             throw new MensajeResponseStatusException(new Mensaje("Ingrese descripcion del plato a mostrar").getMensaje(), HttpStatus.BAD_REQUEST, null);
        };
        iPlatosAMostrarRepo.save(platosAMostrar);
    } catch (MensajeResponseStatusException e) {
        logger.error("", e);
        throw e;
    }
}

   

    public void borrar(Long idPlatosAMostrar){
        iPlatosAMostrarRepo.deleteById(idPlatosAMostrar);
    };   

    
    public boolean existsById(Long idPlatosAMostrar){
         return iPlatosAMostrarRepo.existsById(idPlatosAMostrar);
    };
    
 
}
