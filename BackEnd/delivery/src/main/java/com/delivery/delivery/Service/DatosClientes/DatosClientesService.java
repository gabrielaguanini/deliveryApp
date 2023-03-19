
package com.delivery.delivery.Service.DatosClientes;

import com.delivery.delivery.Entity.DatosClientes.DatosClientes;
import com.delivery.delivery.Repository.DatosClientes.IDatosClienteRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class DatosClientesService {
    
@Autowired
IDatosClienteRepository iDatosCliRepository;


 public List <DatosClientes> listaClientes(){
        return iDatosCliRepository.findAll();
    }
    
   
    public Optional<DatosClientes> getOne(Long idCliente){
        return iDatosCliRepository.findById(idCliente);
    }
    
   
    public Optional <DatosClientes> getBynombreCliente(String nombreCliente){
        return iDatosCliRepository.findByNombreCliente(nombreCliente);
    }
    
  
    public void guardarCliente(DatosClientes datosCliente){
        iDatosCliRepository.save(datosCliente);
    }
    

    public void borrarCliente(Long idCliente){
        iDatosCliRepository.deleteById(idCliente);
    }
    

    
    public boolean existsById(Long idCliente){
         return iDatosCliRepository.existsById(idCliente);
    }
     
    public boolean existsByNombreCliente(String nombreCliente){
         return iDatosCliRepository.existsByNombreCliente(nombreCliente);
    }
    
}

    

