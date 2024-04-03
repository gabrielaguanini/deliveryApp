package com.delivery.delivery.Mensaje;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 * Excepción personalizada para representar errores con estados HTTP específicos
 * y mensajes asociados. Extiende de ResponseStatusException de Spring.
 */
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

    public MensajeResponseStatusException(String reason) {
        super(null, reason);
        this.mensaje = new Mensaje(reason);
    }

  

    public Mensaje getMensaje() {
        return mensaje;
    }
    
    


}
