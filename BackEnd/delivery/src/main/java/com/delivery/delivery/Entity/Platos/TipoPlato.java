
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
    private String iconoTipoPlato; // LOS ICONOS SON DE https://fontawesome.com/v5/search
    private String colorCardTipoPlato;
    
    
    public TipoPlato() {
    };

    public TipoPlato(Long idTipoPlato, String nombreTipoPlato, String iconoTipoPlato, String colorCardTipoPlato) {
        this.idTipoPlato = idTipoPlato;
        this.nombreTipoPlato = nombreTipoPlato;
        this.iconoTipoPlato = iconoTipoPlato;
        this.colorCardTipoPlato = colorCardTipoPlato;
    }; 
     
}
