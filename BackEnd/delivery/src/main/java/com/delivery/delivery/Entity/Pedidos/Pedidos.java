package com.delivery.delivery.Entity.Pedidos;

import java.sql.Timestamp;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
public class Pedidos {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idPedido; 
    private Timestamp fecha;    
   

    public Pedidos() {};

    public Pedidos(Timestamp fecha) {
        this.fecha = fecha;
    }

   
    
}
