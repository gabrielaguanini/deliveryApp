package com.delivery.delivery.Controller.PlatosController;

import com.delivery.delivery.Entity.Platos.TipoPlato;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.Platos.TipoPlatoService;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
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
public class TipoPlatoController {

    @Autowired
    TipoPlatoService tipoPlaServ;

    //LISTA DE TIPOS DE PLATOS
    @GetMapping("/listatipoplatos")
    public ResponseEntity<List<TipoPlato>> listaTipoPlato() {
        List<TipoPlato> listaTipoPlato = tipoPlaServ.listaTipoPlato();
        //ordena la listaTipoPlato en orden numerico segun el id  
        List<TipoPlato> tiposPlatosOrdenados = listaTipoPlato.stream()
                .sorted(Comparator.comparing(TipoPlato::getNombreTipoPlato))
                .collect(Collectors.toList());

        return new ResponseEntity(tiposPlatosOrdenados, HttpStatus.OK);
    };
    
    //LISTA FILTRADA DE TIPOS DE PLATOS(PARA GENERAR LAS CARDS PEQUEÑAS EN EL FRONT)
    @GetMapping("/listafiltradatipoplatos")
    public ResponseEntity<List<TipoPlato>> listaFiltradaTipoPlato() {
        List<TipoPlato> listaFiltradaTipoPlato = tipoPlaServ.listaFiltradaTipoPlato();
        return new ResponseEntity(listaFiltradaTipoPlato, HttpStatus.OK);
    };
    
        
    //LISTA DE COLORES YA CARGADOS EN LA TABLA TIPO PLATO
    @GetMapping("/listacolorestipoplatos")
    public ResponseEntity<List<String>> listaColorTipoPlato() {
        List<String> listaColorTipoPlato = tipoPlaServ.listaColoresTipoPlato();
        return new ResponseEntity(listaColorTipoPlato, HttpStatus.OK);
    };
    
    //LISTA DE ICONOS YA CARGADOS EN LA TABLA TIPO PLATO
    @GetMapping("/listaiconostipoplatos")
    public ResponseEntity<List<String>> listaIconosTipoPlato() {
        List<String> listaIconosTipoPlato = tipoPlaServ.listaIconosTipoPlato();
        return new ResponseEntity(listaIconosTipoPlato, HttpStatus.OK);
    };
 
 
    
   //AGREGAR TIPO PLATO     
    @PostMapping("/guardartipoplato")
    public ResponseEntity<?> guardarTipoPlato(@Valid @RequestBody TipoPlato tipoPlato) {
   
      if(tipoPlaServ.existeNombreTipoPlato(tipoPlato.getNombreTipoPlato())){
           return new ResponseEntity(new Mensaje("No se pueden guardar tipos de plato duplicados"), HttpStatus.BAD_REQUEST);
      } else {
        
        TipoPlato tipoPla = new TipoPlato(
                tipoPlato.getIdTipoPlato(),
                tipoPlato.getNombreTipoPlato(),
                tipoPlato.getIconoTipoPlato(),
                tipoPlato.getColorCardTipoPlato()
        );
        tipoPlaServ.guardarTipoPlato(tipoPla);

        return new ResponseEntity(new Mensaje("Tipo de plato guardado"), HttpStatus.OK);
    }};

    
    
    //BORRAR TIPO DE PLATO
    @DeleteMapping("/eliminartipoplatos/{idTipoPlato}")
    public ResponseEntity borrarTipoPlato(@PathVariable Long idTipoPlato) {
        tipoPlaServ.borrarTipoPlato(idTipoPlato);
        return new ResponseEntity(new Mensaje("Tipo de plato eliminado"), HttpStatus.OK);
    };
    
    //ACTUALIZAR TIPO DE PLATO
    
    @PutMapping("/actualizartipoplato/{idTipoPlato}")
    public ResponseEntity<?> actualizarTipoPlato(@RequestBody TipoPlato tipoPlato, @PathVariable Long idTipoPlato) {
        TipoPlato tipPla = tipoPlaServ.getOne(idTipoPlato).get();
        tipPla.setNombreTipoPlato(tipoPlato.getNombreTipoPlato());
        tipPla.setIconoTipoPlato(tipoPlato.getIconoTipoPlato());
        tipPla.setColorCardTipoPlato(tipoPlato.getColorCardTipoPlato());
        tipoPlaServ.guardarTipoPlato(tipPla);
        return new ResponseEntity(new Mensaje("Tipo de plato actualizado"), HttpStatus.OK);
    };
    
    //OBTENER PLATO POR ID
    
    @GetMapping("/obtenertiplaxid/{idTipoPlato}")
    public ResponseEntity<TipoPlato> obtenerTipoPlatoXId(@PathVariable Long idTipoPlato) {
        TipoPlato tipoPl = tipoPlaServ.getOne(idTipoPlato).get();
        return new ResponseEntity(tipoPl, HttpStatus.OK);
    };
    
    //SABER SI UN TIPO DE PLATO EXISTE POR SU NOMBRE
    @GetMapping("/tipoplatoexistenombre/{nombreTipoPlato}")
    public Boolean existePorNombre(@PathVariable String nombreTipoPlato){
      return  tipoPlaServ.existeNombreTipoPlato(nombreTipoPlato);
    };
    
  

}
    


