
package com.delivery.delivery.Entity.Pedidos;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import java.sql.Timestamp;
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
public class Pedidos {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idPedido;
    
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "idPlatosAMostrar")
    //@ElementCollection
    //@JsonIgnore
    private PlatosAMostrar platosAMostrar; 
    private Integer porcionPlato;    
    private Double totalPedido;
    private Timestamp fecha;    
   

    public Pedidos() {
    };
    

    public Pedidos(PlatosAMostrar platosAMostrar, Integer porcionPlato, Double totalPedido, Timestamp fecha) {
        this.platosAMostrar = platosAMostrar;
        this.porcionPlato = porcionPlato;
        this.totalPedido = totalPedido;
        this.fecha = fecha;       
    };
 

    public Pedidos(Integer porcionPlato) {
        this.porcionPlato = porcionPlato;
    };
 
}

