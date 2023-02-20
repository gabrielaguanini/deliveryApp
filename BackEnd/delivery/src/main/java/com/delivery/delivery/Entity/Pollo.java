
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
public class Pollo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPollo;
    private String nombrePollo;
    private Integer porciones;
    private float precioPollo;

    public Pollo() {
    }

    public Pollo(Long idPollo, String nombrePollo, Integer porciones, float precioPollo) {
        this.idPollo = idPollo;
        this.nombrePollo = nombrePollo;
        this.porciones = porciones;
        this.precioPollo = precioPollo;
    }

  
    
        
}
