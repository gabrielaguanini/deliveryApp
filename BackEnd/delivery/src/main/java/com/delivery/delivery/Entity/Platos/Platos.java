
package com.delivery.delivery.Entity.Platos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Platos {
    
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
  
    private Long idPlato;
    private String idSecundario;
    private String tipoPlato;
    private String nombrePlato;
    private float precioPlato;

    public Platos() {
    }

    public Platos(Long idPlato, String idSecundario, String tipoPlato, String nombrePlato, float precioPlato) {
        this.idPlato = idPlato;
        this.idSecundario = idSecundario;
        this.tipoPlato = tipoPlato;
        this.nombrePlato = nombrePlato;
        this.precioPlato = precioPlato;
    }

   
  
}
