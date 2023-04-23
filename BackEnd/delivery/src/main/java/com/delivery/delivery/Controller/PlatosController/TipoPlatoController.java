package com.delivery.delivery.Controller.PlatosController;

import com.delivery.delivery.Entity.Platos.TipoPlato;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Platos.TipoPlatoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TipoPlatoController {

    @Autowired
    TipoPlatoService tipoPlaServ;
    
    //LISTA DE TIPOS DE PLATOS
    @GetMapping("/listatipoplatos")
    public ResponseEntity<List<TipoPlato>> listaTipoPlato() {
        List<TipoPlato> listaTipoPlato = tipoPlaServ.listaTipoPlato();
        return new ResponseEntity(listaTipoPlato, HttpStatus.OK);
    }
    
   //AGREGAR TIPO PLATO     
    @PostMapping("/guardartipoplato")
    public ResponseEntity guardarTipoPlato(@RequestBody TipoPlato tipoPlato){
        TipoPlato tipoPla = new TipoPlato(
        tipoPlato.getIdTipoPlato(),
        tipoPlato.getNombreTipoPlato());
        
    tipoPlaServ.guardarTipoPlato(tipoPla);
        
     return new ResponseEntity(new Mensaje("Tipo de plato guardado"), HttpStatus.OK);  
    }
    
    //BORRAR TIPO DE PLATO
    @DeleteMapping("/eliminartipoplatos/{idTipoPlato}")
    public ResponseEntity borrarTipoPlato(@PathVariable Long idTipoPlato) {
        tipoPlaServ.borrarTipoPlato(idTipoPlato);
        return new ResponseEntity(new Mensaje("Tipo de plato eliminado"), HttpStatus.OK);
    }
    
    //ACTUALIZAR TIPO DE PLATO
    
    @PutMapping("/actualizartipoplato/{idTipoPlato}")
    public ResponseEntity <?> actualizarTipoPlato(@RequestBody TipoPlato tipoPlato, @PathVariable Long idTipoPlato) {
        TipoPlato tipPla = tipoPlaServ.getOne(idTipoPlato).get();       
        tipPla.setNombreTipoPlato(tipoPlato.getNombreTipoPlato());
        tipoPlaServ.guardarTipoPlato(tipPla);
        return new ResponseEntity(new Mensaje("Tipo de plato actualizado"), HttpStatus.OK);
    }
    
}
    
////////////AL CRUD DE ESTE CONTROLLER SOLO SE ACCEDE CON POSTMAN, EL CLIENTE NO PODRÁ//////////// 
////////////AGREGAR TIPOS DE PLATOS, ESO LO GENERO YO////////////
