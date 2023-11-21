
package com.delivery.delivery.Entity.PlatosAMostrar;


import com.delivery.delivery.Entity.Platos.Platos;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Getter
@Setter
@Entity
public class PlatosAMostrar {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlatosAMostrar;
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "idPlato")
    //@ElementCollection  
    private Platos platos;   
    private String descripcionPlatoAMostrar; 
  


    public PlatosAMostrar() {
    };

    public PlatosAMostrar(Platos platos, Double precioPlatoAMostrar, String descripcionPlatoAMostrar) {
        this.platos = platos;        
        this.descripcionPlatoAMostrar = descripcionPlatoAMostrar;
    };   
    
}
