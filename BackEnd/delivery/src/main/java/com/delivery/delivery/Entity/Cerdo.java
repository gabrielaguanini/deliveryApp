
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
public class Cerdo {
    
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCerdo;
    private String nombreCerdo;
    private Integer porcion;
    private float precioCerdo;

    public Cerdo() {
    }

    public Cerdo(Long idCerdo, String nombreCerdo, Integer porcion, float precioCerdo) {
        this.idCerdo = idCerdo;
        this.nombreCerdo = nombreCerdo;
        this.porcion = porcion;
        this.precioCerdo = precioCerdo;
    }

  
    
    
    
}
