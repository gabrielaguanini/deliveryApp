package com.delivery.delivery.Entity.PlatosAMostrar;


import com.delivery.delivery.Entity.Platos.Platos;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class PlatosAMostrar {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlatosAMostrar;

    @ManyToOne
    @JoinColumn(name = "idPlato")
    //@ElementCollection  
    @JsonIgnore
    private Platos platos;
    private String nombrePlato;
    private double PrecioPlato;

    public PlatosAMostrar() {
    }

    public PlatosAMostrar(Long idPlatosAMostrar, Platos platos, String nombrePlato, double PrecioPlato) {
        this.idPlatosAMostrar = idPlatosAMostrar;
        this.platos = platos;
        this.nombrePlato = nombrePlato;
        this.PrecioPlato = PrecioPlato;
    }

   
}