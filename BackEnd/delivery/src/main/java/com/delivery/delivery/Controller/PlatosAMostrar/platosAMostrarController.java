package com.delivery.delivery.Controller.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class platosAMostrarController {

    @Autowired
    PlatosAMostrarService plaMosServ;

    @GetMapping("/listaplatosamostrar")
    public ResponseEntity<List<PlatosAMostrar>> listaPlatosAMostrar() {

        List<PlatosAMostrar> listaPlatos = plaMosServ.listaPlatosAMostrar();
        return new ResponseEntity(listaPlatos, HttpStatus.OK);

    }

    @GetMapping("/platosamostrarxid/{idPlatosAMostrar}")
    public Optional getOne(@PathVariable Long idPlatosAMostrar) {

        return plaMosServ.getOne(idPlatosAMostrar);
               
    }

    @PostMapping("/guardarplato/{idPlato}")
    public ResponseEntity<?> guardarPlato(@PathVariable @Param("idPlato") Long idPlato) {

        plaMosServ.findByIdAndSave(idPlato);
        return new ResponseEntity(new Mensaje("Plato añadido"), HttpStatus.OK);
    }

    @DeleteMapping("/borrarplato/{idPlatoAMostrar}")
    public ResponseEntity borrarPlato(@PathVariable Long idPlatoAMostrar) {
        if (!plaMosServ.existsById(idPlatoAMostrar)) {
            return new ResponseEntity(new Mensaje("el id no existe"), HttpStatus.BAD_REQUEST);
        }

        plaMosServ.borrar(idPlatoAMostrar);
        return new ResponseEntity(new Mensaje("Plato eliminado"), HttpStatus.OK);
    }
    
    
 
}
