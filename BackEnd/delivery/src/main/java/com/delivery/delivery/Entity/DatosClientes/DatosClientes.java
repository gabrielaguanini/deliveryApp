package com.delivery.delivery.Entity.DatosClientes;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class DatosClientes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCliente;
    private String nombreCliente;
    private String direccionCliente;
    private String localidadCliente;
    private String telefonoCliente;

    public DatosClientes() {
    }

    public DatosClientes(String nombreCliente, String direccionCliente, String localidadCliente, String telefonoCliente) {
        this.nombreCliente = nombreCliente;
        this.direccionCliente = direccionCliente;
        this.localidadCliente = localidadCliente;
        this.telefonoCliente = telefonoCliente;
    }

}
