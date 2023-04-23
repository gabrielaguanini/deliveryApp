
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

    public TipoPlato() {
    }

    public TipoPlato(Long idTipoPlato, String nombreTipoPlato) {
        this.idTipoPlato = idTipoPlato;
        this.nombreTipoPlato = nombreTipoPlato;
    }

    public TipoPlato(String nombreTipoPlato) {
        this.nombreTipoPlato = nombreTipoPlato;
    }
   
        
}
