
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
public class Empanadas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmpana;
    private String nombreEmpanada;
    private Integer cantidad;
    private float precioEmpanada;

    public Empanadas() {
    }

    public Empanadas(Long idEmpana, String nombreEmpanada, Integer cantidad, float precioEmpanada) {
        this.idEmpana = idEmpana;
        this.nombreEmpanada = nombreEmpanada;
        this.cantidad = cantidad;
        this.precioEmpanada = precioEmpanada;
    }

 
    
}
