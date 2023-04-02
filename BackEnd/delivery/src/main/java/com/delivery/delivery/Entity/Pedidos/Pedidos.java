
package com.delivery.delivery.Entity.Pedidos;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.sql.Date;
import java.sql.Time;

import javax.persistence.ElementCollection;
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
public class Pedidos {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idPedido;
    
    @ManyToOne
    @JoinColumn(name = "idPlatosAMostrar")
    @ElementCollection
    //@JsonIgnore
    private PlatosAMostrar platosAMostrar; 
    private Double precioPlato;
    private Integer porcionPlato;    
    private Double totalPedido;
    private Date fecha;    
    private Time hora;

    public Pedidos() {
    }

    public Pedidos(PlatosAMostrar platosAMostrar, Double precioPlato, Integer porcionPlato, Double totalPedido, Date fecha, Time hora) {
        this.platosAMostrar = platosAMostrar;
        this.precioPlato = precioPlato;
        this.porcionPlato = porcionPlato;
        this.totalPedido = totalPedido;
        this.fecha = fecha;
        this.hora = hora;
    }

   

    public Pedidos(Integer porcionPlato) {
        this.porcionPlato = porcionPlato;
    }

 
}

