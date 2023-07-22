
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
    private String textoPromo;
    private LocalDateTime fechaPromo;

    public CarteleraPromocionesNovedades() {
    }

    public CarteleraPromocionesNovedades(Long idPromo, String textoPromo, LocalDateTime fechaPromo) {
        this.idPromo = idPromo;
        this.textoPromo = textoPromo;
        this.fechaPromo = fechaPromo;
    }
    
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
