
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
private String textoAMostrar;
private String urlAMostrar;
private String iconoOImgAMostrar;

    public FooterYLogo() {
    }

    public FooterYLogo(String nombreDatoAMostrar, String textoAMostrar, String urlAMostrar, String iconoOImgAMostrar) {
        this.nombreDatoAMostrar = nombreDatoAMostrar;
        this.textoAMostrar = textoAMostrar;
        this.urlAMostrar = urlAMostrar;
        this.iconoOImgAMostrar = iconoOImgAMostrar;
    }

 

 




}
