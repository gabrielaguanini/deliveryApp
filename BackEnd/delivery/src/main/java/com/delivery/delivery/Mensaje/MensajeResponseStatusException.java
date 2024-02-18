package com.delivery.delivery.Mensaje;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class MensajeResponseStatusException extends ResponseStatusException {

 private final Mensaje mensaje;

    public MensajeResponseStatusException(String reason, HttpStatus status) {
        super(status, reason);
        this.mensaje = new Mensaje(reason);
    }

    public MensajeResponseStatusException(String reason, HttpStatus status, Throwable cause) {
        super(status, reason, cause);
        this.mensaje = new Mensaje(reason);
    }
    

    public Mensaje getMensaje() {
        return mensaje;
    }
}
