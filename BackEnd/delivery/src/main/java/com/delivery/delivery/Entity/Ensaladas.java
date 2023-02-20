
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
public class Ensaladas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEnsalada;
    private String nombreEnsalada;
    private Integer porciones;
    private float precioEnalada;

    public Ensaladas() {
    }

    public Ensaladas(Long idEnsalada, String nombreEnsalada, Integer porciones, float precioEnalada) {
        this.idEnsalada = idEnsalada;
        this.nombreEnsalada = nombreEnsalada;
        this.porciones = porciones;
        this.precioEnalada = precioEnalada;
    }

 
    
}
