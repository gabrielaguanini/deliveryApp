package com.delivery.delivery.Controller.PlatosController;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Platos.PlatosService;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Getter
@Setter
@RestController
public class PlatosController {

    @Autowired
    PlatosService plaServ;

    @GetMapping("/listaplatos")
    public ResponseEntity<List<Platos>> listaPlatos() {
        List<Platos> listaPlatos = plaServ.listaPlatos();
        return new ResponseEntity(listaPlatos, HttpStatus.OK);
    }

    //GUARDAR PLATO
    @PostMapping("/guardarplato")
    public ResponseEntity<?> guardarPlato(@RequestBody Platos platos) {

        Platos plat = new Platos(
                platos.getIdPlato(),
                platos.getIdSecundario(),
                platos.getTipoPlato(),
                platos.getNombrePlato(),
                platos.getPrecioPlato()              
        );
           
        
        plaServ.guardarPlato(plat);
        return new ResponseEntity(new Mensaje("Plato guardado"), HttpStatus.OK);
    };
    
    //BORRAR PLATOS    
    @DeleteMapping("/borrarplato/{idPlato}")
    public ResponseEntity<?> borrarPlato(@PathVariable("idPlato") Long idPlato){
        plaServ.borrarPlato(idPlato);
        return new ResponseEntity(new Mensaje("Plato eliminado"), HttpStatus.OK);
    }
}
