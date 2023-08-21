
package com.delivery.delivery.Mensaje;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class Mensaje {
    
    private String mensaje;
  

    public Mensaje() {
    };

    public Mensaje(String mensaje) {
        this.mensaje = mensaje;
    };  
    
}
