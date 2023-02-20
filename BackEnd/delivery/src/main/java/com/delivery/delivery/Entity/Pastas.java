
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
public class Pastas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPasta;
    private String nombrePasta;
    private Integer porciones;
    private float precioPasta;

    public Pastas() {
    }

    public Pastas(Long idPasta, String nombrePasta, Integer porciones, float precioPasta) {
        this.idPasta = idPasta;
        this.nombrePasta = nombrePasta;
        this.porciones = porciones;
        this.precioPasta = precioPasta;
    }

   
  
}
