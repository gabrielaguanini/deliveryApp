
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
    
    private Integer porcionPlato;
    
    private Date fecha;
    
    private Time hora;

    public Pedidos() {
    }

    public Pedidos(PlatosAMostrar platosAMostrar, Integer porcionPlato, Date fecha, Time hora) {
        this.platosAMostrar = platosAMostrar;
        this.porcionPlato = porcionPlato;
        this.fecha = fecha;
        this.hora = hora;
    }

}

