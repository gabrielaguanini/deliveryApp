package com.delivery.delivery.Entity.Pedidos;


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
    @JoinColumn(name = "idPlato")
    //@ElementCollection  
    private Platos platos;  
    private Integer porcionPlato;
    private Float precioPlato;
    private Double totalPlato;


      

    public DetallePedidos() {
    };

    public DetallePedidos(Pedidos pedidos, Platos platos, Integer porcionPlato, Float precioPlato, Double totalPlato) {
        this.pedidos = pedidos;
        this.platos = platos;
        this.porcionPlato = porcionPlato;
        this.precioPlato = precioPlato;        
        this.totalPlato= totalPlato;
    };




  
    
}
