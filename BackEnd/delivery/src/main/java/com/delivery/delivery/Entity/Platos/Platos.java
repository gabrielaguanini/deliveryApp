
package com.delivery.delivery.Entity.Platos;

import java.util.logging.Logger;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Entity

public class Platos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   
    private Long idPlato;
    private String nombrePlato;
    private float precioPlato;

    public Platos() {
    }

    public Platos(String nombrePlato, float precioPlato) {
        this.nombrePlato = nombrePlato;
        this.precioPlato = precioPlato;
    }
    private static final Logger LOG = Logger.getLogger(Platos.class.getName());

    public Long getIdPlato() {
        return idPlato;
    }

    public void setIdPlato(Long idPlato) {
        this.idPlato = idPlato;
    }

    public String getNombrePlato() {
        return nombrePlato;
    }

    public void setNombrePlato(String nombrePlato) {
        this.nombrePlato = nombrePlato;
    }

    public float getPrecioPlato() {
        return precioPlato;
    }

    public void setPrecioPlato(float precioPlato) {
        this.precioPlato = precioPlato;
    }

    
    
     
}
