package com.delivery.delivery.Controller.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Service.Platos.PlatosService;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlatosAMostrarController {

    @Autowired
    PlatosAMostrarService plaMosServ;

    @Autowired
    PlatosService platosServ;
    
     private static final Logger logger = LoggerFactory.getLogger(PlatosAMostrarController.class);

//LISTA DE PLATOS A MOSTRAR 
    @GetMapping("/listaplatosamostrar")
    public ResponseEntity<List<PlatosAMostrar>> listaPlatosAMostrar() {

        List<PlatosAMostrar> listaPlatos = plaMosServ.listaPlatosAMostrar();
        return new ResponseEntity(listaPlatos, HttpStatus.OK);
    };
    
    
//OBTENER UN PLATO A MOSTRAR POR ID 
    @GetMapping("/platosamostrarxid/{idPlatosAMostrar}")
    public Optional getOne(@PathVariable Long idPlatosAMostrar) {

        return plaMosServ.getOne(idPlatosAMostrar);

    };
    
//GUARDAR PLATO A MOSTRAR    
    
    @PostMapping("/guardarplatoamostrar")
    public ResponseEntity<?> guardarPlatoAMos(@RequestBody PlatosAMostrar platosAMostrar) {
        
       try {       
            plaMosServ.guardar(platosAMostrar);           
             return new ResponseEntity<>(new Mensaje("Plato a mostrar guardado"), HttpStatus.OK);
       } catch (MensajeResponseStatusException e) {
         logger.error(" El plato seleccionado ya existe en Platos a mostrar o el plato seleccionado no esta registrado en la tabla platos " + e.getMessage());
         throw e;
       } catch (Exception e){
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al guardar el plato a mostrar"), e);
       }
    };   
    
    
//EDITAR PLATO A MOSTRAR    
    
    @PutMapping("/editarplatoamostrar/{idPlatoAMostrar}")
    public ResponseEntity<?> editarPlato(@RequestBody PlatosAMostrar platosAMostrar, @PathVariable Long idPlatoAMostrar) {
        PlatosAMostrar plaMostrar = plaMosServ.getOne(idPlatoAMostrar).get();

        plaMostrar.setPlatos(platosAMostrar.getPlatos());
        plaMostrar.setDescripcionPlatoAMostrar(platosAMostrar.getDescripcionPlatoAMostrar());

        plaMosServ.guardar(plaMostrar);
        return new ResponseEntity(new Mensaje("Plato a mostrar actualizado"), HttpStatus.OK);

    };
        
    
//BORRAR PLATO A MOSTRAR  
    
    @DeleteMapping("/borrarplatoamostrar/{idPlatoAMostrar}")
    public ResponseEntity borrarPlato(@PathVariable Long idPlatoAMostrar) {
        if (!plaMosServ.existsById(idPlatoAMostrar)) {
            return new ResponseEntity(new Mensaje("el id no existe"), HttpStatus.BAD_REQUEST);
        }

        plaMosServ.borrar(idPlatoAMostrar);
        return new ResponseEntity(new Mensaje("Plato eliminado"), HttpStatus.OK);
    };  
    
    
        
//EXISTE PLATO A MOSTRAR POR ID
    
    @GetMapping("/existeporid/{idPlatoAMostrar}")
    public ResponseEntity existeXId(@PathVariable Long idPlatoAMostrar) {
        if (plaMosServ.existsById(idPlatoAMostrar) == true) {
            return new ResponseEntity(new Mensaje("El plato existe"), HttpStatus.OK);
        } else {
            return new ResponseEntity(new Mensaje("El plato no existe"), HttpStatus.BAD_REQUEST);
        }
    };
    


}
