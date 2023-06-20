
package com.delivery.delivery.Entity.Platos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TipoPlato {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long idTipoPlato;
    private String nombreTipoPlato;
    private String imgTipoPlato; // LOS ICONOS SON DE https://fontawesome.com/v5/search
    
    
    public TipoPlato() {
    }

    public TipoPlato(Long idTipoPlato, String nombreTipoPlato, String imgTipoPlato) {
        this.idTipoPlato = idTipoPlato;
        this.nombreTipoPlato = nombreTipoPlato;
        this.imgTipoPlato = imgTipoPlato;
    }

  
    public TipoPlato(String nombreTipoPlato) {
        this.nombreTipoPlato = nombreTipoPlato;
    }
   
        
}
