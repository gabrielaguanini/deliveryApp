
package com.delivery.delivery.Mensaje;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class Mensaje {
    
    private String Mensaje;

    public Mensaje() {
    }
   
    public Mensaje(String Mensaje) {
        this.Mensaje = Mensaje;
    }
 
}
