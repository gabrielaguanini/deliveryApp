
package com.delivery.delivery.Entity.Platos;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Getter
@Setter
@Entity
public class Platos {
    
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long idPlato;
    
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "idTipoPlato")
    //@ElementCollection  
    private TipoPlato tipoPlato;
    //private String idSecundario;
    private String nombrePlato;
    private float precioPlato;
    private String imgPlato;

    public Platos() {
    }

    public Platos(TipoPlato tipoPlato, String nombrePlato, float precioPlato, String imgPlato) {
        this.tipoPlato = tipoPlato;
        this.nombrePlato = nombrePlato;
        this.precioPlato = precioPlato;
        this.imgPlato = imgPlato;
    }

}
