package com.delivery.delivery.Mensaje;

import org.springframework.http.HttpStatus;


public class MensajeRunTimeException extends RuntimeException {

    private Mensaje mensaje;
    private HttpStatus status;

    public MensajeRunTimeException(Mensaje mensaje) {
        super(mensaje.getMensaje());
        this.mensaje = mensaje;
    }

    public MensajeRunTimeException(Mensaje mensaje, Throwable cause) {
        super(mensaje.getMensaje(), cause);
        this.mensaje = mensaje;
    }

    public MensajeRunTimeException(Mensaje mensaje, HttpStatus status, Throwable cause) {
        super(mensaje.getMensaje(), cause);
        this.mensaje = mensaje;
        this.status = status;
    }
       
    public Mensaje getMensaje() {
        return mensaje;
    }
}
