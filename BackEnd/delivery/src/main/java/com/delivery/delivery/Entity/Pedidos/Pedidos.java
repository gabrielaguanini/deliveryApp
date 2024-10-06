package com.delivery.delivery.Entity.Pedidos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
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
    
    @Lob //especifica que la columna debe ser tratada como un objeto BLOB (Binary Large Object), lo que permite manejar grandes cantidades de datos
    @Column(columnDefinition = "LONGTEXT") // DECLARA EL TIPO DE DATO COMO LONGTEXT EL CUAL TRABAJA JUNTO CON EL OBJETO BLOB DECLARADO ARRIBA
    private String listaPlatosDelPedido;
    private String nombreCliente;
    private String telefonoCliente;
    private String direccionCliente;
    private String localidadCliente;
    private LocalDate fecha;
    private LocalTime hora;
    private Double importeTotalPedido;
    @Lob //especifica que la columna debe ser tratada como un objeto BLOB (Binary Large Object), lo que permite manejar grandes cantidades de datos
    @Column(columnDefinition = "LONGTEXT") // DECLARA EL TIPO DE DATO COMO LONGTEXT EL CUAL TRABAJA JUNTO CON EL OBJETO BLOB DECLARADO ARRIBA
    private String listaPlatosDelPedidoCli;
    private Boolean pedidoConfirmado ;
   

    public Pedidos() {};

    public Pedidos(String listaPlatosDelPedido, String nombreCliente, String telefonoCliente, String direccionCliente, String localidadCliente, LocalDate fecha, LocalTime hora, Double importeTotalPedido, String listaPlatosDelPedidoCli, Boolean pedidoConfirmado) {
        this.listaPlatosDelPedido = listaPlatosDelPedido;
        this.nombreCliente = nombreCliente;
        this.telefonoCliente = telefonoCliente;
        this.direccionCliente = direccionCliente;
        this.localidadCliente = localidadCliente;
        this.fecha = fecha;
        this.hora = hora;
        this.importeTotalPedido = importeTotalPedido;
        this.listaPlatosDelPedidoCli = listaPlatosDelPedidoCli;
        this.pedidoConfirmado = pedidoConfirmado;
    }


    

    

}
