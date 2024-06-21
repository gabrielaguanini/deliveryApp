
package com.delivery.delivery.Entity.CarteleraPromocionesNovedades;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
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
public class CarteleraPromoNovSecundaria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long idPromoSec;
    private String imgParaCelOPc;
    private String tituloPromo;
    private String textoPromo;
    private String urlImagenPromo;
    private LocalDate fechaPromo;

    public CarteleraPromoNovSecundaria() {
    }

    public CarteleraPromoNovSecundaria(String imgParaCelOPc, String tituloPromo, String textoPromo, String urlImagenPromo, LocalDate fechaPromo) {
        this.imgParaCelOPc = imgParaCelOPc;
        this.tituloPromo = tituloPromo;
        this.textoPromo = textoPromo;
        this.urlImagenPromo = urlImagenPromo;
        this.fechaPromo = fechaPromo;
    }



 @PrePersist
  public void setFechaPromo() {
    if (fechaPromo == null) {
      // Obtiene la fecha actual con zona horaria de Argentina (sin hora)
      fechaPromo = LocalDate.now(ZoneId.of("America/Argentina/Buenos_Aires"));
    }
  }

    
}
