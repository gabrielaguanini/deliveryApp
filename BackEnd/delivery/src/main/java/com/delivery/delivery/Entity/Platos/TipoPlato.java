
package com.delivery.delivery.Entity.Platos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TipoPlato {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTipoPlato;
    @Column(name="nombre_tipo_plato", unique = true) // Restricción única a nivel de base de datos
    @NotBlank(message = "El nombre del tipo de plato no puede estar vacío")
    @Valid    
    private String nombreTipoPlato;
    private String iconoTipoPlato; // LOS ICONOS SON DE https://fontawesome.com/v5/search?o=r&m=free
    private String colorCardTipoPlato;
    
    
    public TipoPlato() {
    };

    public TipoPlato(Long idTipoPlato, String nombreTipoPlato, String iconoTipoPlato, String colorCardTipoPlato) {
        this.idTipoPlato = idTipoPlato;
        this.nombreTipoPlato = nombreTipoPlato;
        this.iconoTipoPlato = iconoTipoPlato;
        this.colorCardTipoPlato = colorCardTipoPlato;
    }; 
     
}
