
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
public class Salsas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSalsa;
    private String nombreSalsa;
    private Integer porciones;
    private float precioSalsa;

    public Salsas() {
    }

    public Salsas(Long idSalsa, String nombreSalsa, Integer porciones, float precioSalsa) {
        this.idSalsa = idSalsa;
        this.nombreSalsa = nombreSalsa;
        this.porciones = porciones;
        this.precioSalsa = precioSalsa;
    }

   
    
    
    
}
