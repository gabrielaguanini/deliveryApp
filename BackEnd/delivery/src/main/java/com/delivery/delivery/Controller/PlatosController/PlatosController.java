package com.delivery.delivery.Controller.PlatosController;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Platos.PlatosService;
import java.util.Comparator;
import java.util.List;
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
public class PlatosController {

    @Autowired
    PlatosService plaServ;
    
    
//LISTA TODOS LOS PLATOS COMPLETA
    @GetMapping("/listadeplatos") 
    public ResponseEntity<List<Platos>> listaDePlatos() {
        List<Platos> listaDePlatos = plaServ.listaDePlatos();
         listaDePlatos.sort(Comparator.comparing(Platos::getIdPlato));
        return new ResponseEntity(listaDePlatos, HttpStatus.OK);
    }
    
    
//LISTA PLATOS POR TIPO
    @GetMapping("/listatipoplatos/{idTipoPlato}")
    public ResponseEntity<List<Platos>> listaTipoPlato(@PathVariable Long idTipoPlato) {
        List<Platos> listaTipoPlato = plaServ.listaTipoPlato(idTipoPlato);
        return new ResponseEntity(listaTipoPlato, HttpStatus.OK);
    }    
    
    

//GUARDAR PLATO
    @PostMapping("/guardarplato")
    public ResponseEntity<?> guardarPlato(@RequestBody Platos platos) {
    
    if(plaServ.existeNombrePlato(platos.getNombrePlato())){
        return new ResponseEntity(new Mensaje("No se pueden guardar platos duplicados"), HttpStatus.BAD_REQUEST);
    } else {    

        Platos plat = new Platos(
              
                platos.getTipoPlato(),
                platos.getNombrePlato(),
                platos.getPrecioPlato(),
                platos.getImgPlato()
        );

        plaServ.guardarPlato(plat);

       // plaServ.executeQuery();

        return new ResponseEntity(new Mensaje("Plato guardado"), HttpStatus.OK);
     }};
    
//ACTUALIZAR PLATOS  

    @PutMapping("/actualizarplato/{idPlato}")
    public ResponseEntity <?> actualizarPlato(@RequestBody Platos platos, @PathVariable Long idPlato){
      Platos pla = plaServ.getOne(idPlato).get();
      
      pla.setTipoPlato(platos.getTipoPlato());
      pla.setNombrePlato(platos.getNombrePlato());
      pla.setPrecioPlato(platos.getPrecioPlato());
      pla.setImgPlato(platos.getImgPlato());
      
      plaServ.guardarPlato(pla);
      
      return new ResponseEntity(new Mensaje("Plato actualizado"), HttpStatus.OK);
    };
    
    
//BORRAR PLATOS    
    @DeleteMapping("/borrarplato/{idPlato}")
    public ResponseEntity<?> borrarPlato(@PathVariable("idPlato") Long idPlato) {
        plaServ.borrarPlato(idPlato);
        return new ResponseEntity(new Mensaje("Plato eliminado"), HttpStatus.OK);
    }
    
//OBTNER 1 PLATO POR ID    
    @GetMapping("/obtenerplatoxid/{idPlato}")
    public ResponseEntity<Platos> obtPlatoXId(@PathVariable("idPlato") Long idPlato) {
        Platos pla = plaServ.getOne(idPlato).get();
        return new ResponseEntity(pla, HttpStatus.OK);
    };

  //SABER SI UN PLATO EXISTE POR SU NOMBRE
    @GetMapping("/platoexistenombre/{nombrePlato}")
    public Boolean existePorNombre(@PathVariable String nombrePlato){
      return  plaServ.existeNombrePlato(nombrePlato);
    };
    
    
}




