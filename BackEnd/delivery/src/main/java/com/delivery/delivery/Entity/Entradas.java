
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
public class Entradas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEntrada;
    private String nombreEntrada;
    private Integer porciones;
    private float precioEntrada;

    public Entradas() {
    }

    public Entradas(Long idEntrada, String nombreEntrada, Integer porciones, float precioEntrada) {
        this.idEntrada = idEntrada;
        this.nombreEntrada = nombreEntrada;
        this.porciones = porciones;
        this.precioEntrada = precioEntrada;
    }

  
    
    

    
}
