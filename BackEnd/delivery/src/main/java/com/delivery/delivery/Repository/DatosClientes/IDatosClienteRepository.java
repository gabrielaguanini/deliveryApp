
package com.delivery.delivery.Repository.DatosClientes;

import com.delivery.delivery.Entity.DatosClientes.DatosClientes;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDatosClienteRepository extends JpaRepository <DatosClientes, Long>{
    
   public Optional <DatosClientes> findByNombreCliente(String nombreCliente);
   public Boolean existsByNombreCliente(String nombreCliente);
    
}
