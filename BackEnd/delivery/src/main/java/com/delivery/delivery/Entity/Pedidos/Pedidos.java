
package com.delivery.delivery.Entity.Pedidos;

import com.delivery.delivery.Entity.DatosClientes.DatosClientes;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import java.sql.Date;
import java.sql.Time;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Pedidos {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idPedido;
    
    @OneToOne
    @JoinColumn(name = "idCliente")
    @ElementCollection
    private DatosClientes datosClientes;
    
    @ManyToOne
    @JoinColumn(name = "idBPlatosAMostrar")
    @ElementCollection
    private PlatosAMostrar platosAMostrar;
    
    private Integer porcionPlato;
    
    private Date fecha;
    
    private Time hora;

    public Pedidos() {
    }

    public Pedidos(DatosClientes datosClientes, PlatosAMostrar platosAMostrar, Integer porcionPlato, Date fecha, Time hora) {
        this.datosClientes = datosClientes;
        this.platosAMostrar = platosAMostrar;
        this.porcionPlato = porcionPlato;
        this.fecha = fecha;
        this.hora = hora;
    }

    

}
