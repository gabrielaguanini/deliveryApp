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
    private Platos platos;
    private String nombrePlato;
    private double PrecioPlato;
       
}