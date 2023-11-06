package com.delivery.delivery.Entity.Pedidos;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
public class Pedidos {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idPedido;
    private String listaPlatosDelPedido;
    private  LocalDate fecha;
    private  LocalTime hora;
   

    public Pedidos() {};

    public Pedidos(String listaPlatosDelPedido, LocalDate fecha, LocalTime hora) {
        this.listaPlatosDelPedido = listaPlatosDelPedido;
        this.fecha = fecha;
        this.hora = hora;
    }
    
    //METODO PARA QUE LA FECHA Y HORA SEA SIEMPRE LA DE ARGENTINA
    @PrePersist
    public void antesDePersistir() {
        ZoneId zonaHorariaArgentina = ZoneId.of("America/Argentina/Buenos_Aires");
        ZonedDateTime fechaYHoraArgentina = ZonedDateTime.now(zonaHorariaArgentina);

        fecha = fechaYHoraArgentina.toLocalDate();
        hora = fechaYHoraArgentina.toLocalTime();
    }

   
}
