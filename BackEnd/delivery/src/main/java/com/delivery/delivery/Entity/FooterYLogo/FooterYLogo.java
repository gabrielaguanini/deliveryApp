
package com.delivery.delivery.Entity.FooterYLogo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FooterYLogo {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)     
private Long idOtrosDatos;
private String nombreDatoAMostrar;
private String datoAMostrar;

    public FooterYLogo() {
    }



    public FooterYLogo(String nombreDatoAMostrar, String datoAMostrar) {
        this.nombreDatoAMostrar = nombreDatoAMostrar;
        this.datoAMostrar = datoAMostrar;
    }



}
