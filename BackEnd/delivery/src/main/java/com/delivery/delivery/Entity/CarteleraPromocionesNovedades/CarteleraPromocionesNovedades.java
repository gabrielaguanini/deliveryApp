
package com.delivery.delivery.Entity.CarteleraPromocionesNovedades;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CarteleraPromocionesNovedades {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long idPromo;
    private String imgParaCelOPc;
    private String tituloPromo;
    private String textoPromo;
    private String urlImagenPromo;
    private LocalDateTime fechaPromo;

    public CarteleraPromocionesNovedades() {
    };

    public CarteleraPromocionesNovedades(Long idPromo, String imgParaCelOPc, String tituloPromo, String textoPromo, String urlImagenPromo, LocalDateTime fechaPromo) {
        this.idPromo = idPromo;
        this.imgParaCelOPc = imgParaCelOPc;
        this.tituloPromo = tituloPromo;
        this.textoPromo = textoPromo;
        this.urlImagenPromo = urlImagenPromo;
        this.fechaPromo = fechaPromo;
    };   

  
    @PrePersist
    public void agregarFecha() {
        LocalDateTime now = LocalDateTime.now();
        fechaPromo = now;
    }
    
    @PreUpdate
    public void preUpdate() {
        fechaPromo = LocalDateTime.now();
    }
    
    
}
