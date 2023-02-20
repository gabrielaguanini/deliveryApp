
package com.delivery.delivery.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Postres {

   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPostre;
    private String nombrePostre;
    private Integer porciones;
    private float precioPostre;

    public Postres() {
    }

    public Postres(Long idPostre, String nombrePostre, Integer porciones, float precioPostre) {
        this.idPostre = idPostre;
        this.nombrePostre = nombrePostre;
        this.porciones = porciones;
        this.precioPostre = precioPostre;
    }

  

   
}
