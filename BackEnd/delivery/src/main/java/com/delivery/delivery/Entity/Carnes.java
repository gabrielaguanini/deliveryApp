
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
public class Carnes {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarne;
    private String nombreCarne;
    private Integer porcion;
    private float precioCarne;

    public Carnes() {
    }

    public Carnes(Long idCarne, String nombreCarne, Integer porcion, float precioCarne) {
        this.idCarne = idCarne;
        this.nombreCarne = nombreCarne;
        this.porcion = porcion;
        this.precioCarne = precioCarne;
    }

   
    
    
    
}
