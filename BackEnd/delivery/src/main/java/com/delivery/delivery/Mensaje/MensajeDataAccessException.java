package com.delivery.delivery.Mensaje;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;

/**
 * Crea una nueva instancia de MensajeDataAccessException con el mensaje
 * especificado.
 *
 * @param msg El mensaje descriptivo de la excepción.
 */
public class MensajeDataAccessException extends DataAccessException {

    private HttpStatus status;

    public MensajeDataAccessException(String msg) {
        super(msg);
    }

    public MensajeDataAccessException(String msg, HttpStatus status, Throwable cause) {
        super(msg, cause);
        this.status = status;
    }

    public MensajeDataAccessException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
