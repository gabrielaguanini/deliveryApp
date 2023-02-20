
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
public class Pizzas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPizza;
    private String nombrePizza;
    private Integer cantidad;
    private float precioPizza;

    public Pizzas() {
    }

    public Pizzas(Long idPizza, String nombrePizza, Integer cantidad, float precioPizza) {
        this.idPizza = idPizza;
        this.nombrePizza = nombrePizza;
        this.cantidad = cantidad;
        this.precioPizza = precioPizza;
    }

   
    
    
    
}
