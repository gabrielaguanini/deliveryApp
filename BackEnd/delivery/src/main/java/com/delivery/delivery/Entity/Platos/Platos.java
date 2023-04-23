
package com.delivery.delivery.Entity.Platos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Platos {
    
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long idPlato;
    @ManyToOne
    @JoinColumn(name = "idTipoPlato")
    //@ElementCollection  
    private TipoPlato tipoPlato;
    private String idSecundario;
    private String nombrePlato;
    private float precioPlato;

    public Platos() {
    }

    public Platos(Long idPlato, TipoPlato tipoPlato, String idSecundario, String nombrePlato, float precioPlato) {
        this.idPlato = idPlato;
        this.tipoPlato = tipoPlato;
        this.idSecundario = idSecundario;
        this.nombrePlato = nombrePlato;
        this.precioPlato = precioPlato;
    }

  

}
