package com.delivery.delivery.Entity.Pedidos;


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
 
    
    private Integer porcionPlato;    
    private Double totalPedido;
      

    public DetallePedidos() {
    };

    public DetallePedidos(Pedidos pedidos, PlatosAMostrar platosAmostrar, Integer porcionPlato, Double totalPedido) {
        this.pedidos = pedidos;
        this.platosAMostrar = platosAMostrar;
        this.porcionPlato = porcionPlato;
        this.totalPedido = totalPedido;
    };
    
    
   
}
