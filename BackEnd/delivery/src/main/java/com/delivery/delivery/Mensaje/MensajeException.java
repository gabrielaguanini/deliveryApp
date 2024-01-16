package com.delivery.delivery.Mensaje;

//ESTA CLASE SE UTILIZA PARA SER USADA POR  throw new. THROW NEW SE UTILIZA PARA MANEJO DE ERRORES
public class MensajeException extends RuntimeException {

  private final Mensaje mensaje;

    public MensajeException(Mensaje mensaje) {
        super(mensaje.getMensaje());
        this.mensaje = mensaje;
    }

    public MensajeException(Mensaje mensaje, Throwable causa) {
        super(mensaje.getMensaje(), causa);
        this.mensaje = mensaje;
    }

    public Mensaje getMensajeObjeto() {
        return mensaje;
    }

}
