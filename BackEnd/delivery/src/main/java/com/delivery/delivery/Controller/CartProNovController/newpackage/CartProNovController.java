
package com.delivery.delivery.Controller.CartProNovController.newpackage;

import com.delivery.delivery.Entity.CarteleraPromocionesNovedades.CarteleraPromocionesNovedades;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.CarteleraPromocionesNovedades.CarteleraPromNovService;
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
public class CartProNovController {
    
    @Autowired
    CarteleraPromNovService carProNovServ;
    
    
//LISTA DE PROMOS Y NOVEDADES
    @GetMapping("/listacartelera")
    public ResponseEntity <List<CarteleraPromocionesNovedades>> listaPromo(){
     List<CarteleraPromocionesNovedades> listaPromo = carProNovServ.listaCartelera();
     return new ResponseEntity (listaPromo, HttpStatus.OK);
    };
    
//CREAR PROMOS Y NOVEDADES    
    @PostMapping("/guardarpromonovedades")
    public ResponseEntity agregarPromoNov(@RequestBody CarteleraPromocionesNovedades carProNov){
        CarteleraPromocionesNovedades carProNovedades = new CarteleraPromocionesNovedades(
        carProNov.getIdPromo(),
        carProNov.getImgParaCelOPc(),
        carProNov.getTituloPromo(),
        carProNov.getTextoPromo(),
        carProNov.getUrlImagenPromo(),
         carProNov.getFechaPromo()
        );
        carProNovServ.guardarPromo(carProNovedades);
        return new ResponseEntity(new Mensaje("Promo/Novedad creada"), HttpStatus.OK);         
    };

//BORRAR PROMOS Y NOVEDADES    
    @DeleteMapping("/eliminarpromonovedades/{idPromo}")
    public ResponseEntity borrarPromoNov(@PathVariable Long idPromo){
        carProNovServ.borrarPromo(idPromo);
        return new ResponseEntity(new Mensaje("Promo/Novedad eliminada"), HttpStatus.OK);
    };
    
//ACTUALIZAR PROMOS Y NOVEDADES  
     @PutMapping("/actualizarpromonov/{idPromo}")
    public ResponseEntity <?> actualizarPromoNov(@RequestBody CarteleraPromocionesNovedades carProNov, @PathVariable Long idPromo){
        CarteleraPromocionesNovedades carProNovedades = carProNovServ.getOne(idPromo).get();
        carProNovedades.setIdPromo(carProNov.getIdPromo());
        carProNovedades.setImgParaCelOPc(carProNov.getImgParaCelOPc());
        carProNovedades.setTituloPromo(carProNov.getTituloPromo());
        carProNovedades.setTextoPromo(carProNov.getTextoPromo());
        carProNovedades.setUrlImagenPromo(carProNov.getUrlImagenPromo());
        carProNovedades.setFechaPromo(carProNov.getFechaPromo());
        carProNovServ.guardarPromo(carProNovedades);
         return new ResponseEntity(new Mensaje("Promo/Novedad actualizada"), HttpStatus.OK);
        
    }
    
//OBTENER PROMO O NOVEDAD X ID
    
    @GetMapping("/obtenerpromoxid/{idPromo}")
    public ResponseEntity <CarteleraPromocionesNovedades> obtenerXId(@PathVariable Long idPromo){
    CarteleraPromocionesNovedades cartProNov = carProNovServ.getOne(idPromo).get();
    return new ResponseEntity(cartProNov, HttpStatus.OK);
    }
    
}
