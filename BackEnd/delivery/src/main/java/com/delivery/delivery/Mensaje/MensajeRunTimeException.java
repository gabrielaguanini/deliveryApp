package com.delivery.delivery.Mensaje;


public class MensajeRunTimeException extends RuntimeException {

    private Mensaje mensaje;

    public MensajeRunTimeException(Mensaje mensaje) {
        super(mensaje.getMensaje());
        this.mensaje = mensaje;
    }

    public MensajeRunTimeException(Mensaje mensaje, Throwable cause) {
        super(mensaje.getMensaje(), cause);
        this.mensaje = mensaje;
    }

    public Mensaje getMensaje() {
        return mensaje;
    }
}
