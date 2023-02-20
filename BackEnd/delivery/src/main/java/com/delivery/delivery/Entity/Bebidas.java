
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
public class Bebidas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBebida;
    private String nombreBebida;
    private Integer porciones;
    private float precioBebida;

    public Bebidas() {
    }

    public Bebidas(Long idBebida, String nombreBebida, Integer porciones, float precioBebida) {
        this.idBebida = idBebida;
        this.nombreBebida = nombreBebida;
        this.porciones = porciones;
        this.precioBebida = precioBebida;
    }

        
    
}
