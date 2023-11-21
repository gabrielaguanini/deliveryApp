package com.delivery.delivery.Entity.Pedidos;


import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
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
public class DetallePedidos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetallePedido;

    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "id_pedido")
    private Pedidos pedidos;

    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "idPlatosAMostrar")
    //@ElementCollection  
    private PlatosAMostrar platosAMostrar;
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "idPlato")
    //@ElementCollection  
    private Platos platos;       
    private Integer porcionPlato;
    private Float precioPlatoAMostrar;
    private Double totalPlato;


      

    public DetallePedidos() {
    };

    public DetallePedidos(Pedidos pedidos, PlatosAMostrar platosAmostrar, Platos platos, Integer porcionPlato, Float precioPlatoAMostrar, Double totalPlato) {
        this.pedidos = pedidos;
        this.platosAMostrar = platosAMostrar;
        this.platos = platos;
        this.porcionPlato = porcionPlato;
        this.precioPlatoAMostrar = precioPlatoAMostrar;        
        this.totalPlato= totalPlato;
    };
    
  
}
