
package com.delivery.delivery.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class PlatoDelDia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlatoDelDia;
    private String nombrePlatoDelDia;
    private Integer porciones;
    private float precioPlatoDelDia;

    public PlatoDelDia() {
    }

    public PlatoDelDia(Long idPlatoDelDia, String nombrePlatoDelDia, Integer porciones, float precioPlatoDelDia) {
        this.idPlatoDelDia = idPlatoDelDia;
        this.nombrePlatoDelDia = nombrePlatoDelDia;
        this.porciones = porciones;
        this.precioPlatoDelDia = precioPlatoDelDia;
    }
    
    
    
}
