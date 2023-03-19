package com.delivery.delivery.Controller.DatosClienteController;

import com.delivery.delivery.Entity.DatosClientes.DatosClientes;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Service.DatosClientes.DatosClientesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DatosClientesController {

    @Autowired
    DatosClientesService datosCliServ;

    //OBTENER LISTA DE CLIENTES
    @GetMapping("/listaclientes")
    public ResponseEntity<List<DatosClientes>> listaClientes() {
        List<DatosClientes> listaDatosClientes = datosCliServ.listaClientes();
        return new ResponseEntity(listaDatosClientes, HttpStatus.OK);
    }

    //GUARDAR UN CLIENTE (TENER EN CUENTA QUE ESTA TABLA NO SE CREO PARA ACTUALIZAR 
    //LOS DATOS DEL CLIENTE, ESTOS SOLAMENTE SE USARAN PARA EL PEDIDO)
    //GUARDAR UN CLIENTE
     @PostMapping("/guardarcliente")
    public ResponseEntity<?> GuardarCliente(@RequestBody DatosClientes datosCliente) {
        DatosClientes datosCli = new DatosClientes(
                datosCliente.getNombreCliente(),
                datosCliente.getDireccionCliente(),
                datosCliente.getLocalidadCliente(),
                datosCliente.getTelefonoCliente());
        datosCliServ.guardarCliente(datosCli);
        return new ResponseEntity(new Mensaje("Cliente agregado"), HttpStatus.OK);
    }
    
    
    //ELIMINAR UN CLIENTE
    @DeleteMapping("/borrarcliente/{idCliente}")
    public ResponseEntity <?> borrarCliente(@PathVariable("idCliente") Long idCliente){
        datosCliServ.borrarCliente(idCliente);
        return new ResponseEntity (new Mensaje("Cliente eliminado"), HttpStatus.OK);
    }
    
    //ACTUALIZAR LOS DATOS DE UN CLIENTE    
    @PutMapping("/actualizarcliente/{idCliente}")
    public ResponseEntity <?> actualizarCliente( @PathVariable("idCliente") Long idCliente, @RequestBody DatosClientes datosCliente){
       DatosClientes datosCli = datosCliServ.getOne(idCliente).get();
       
       datosCli.setNombreCliente(datosCliente.getNombreCliente());
       datosCli.setDireccionCliente(datosCliente.getDireccionCliente());
       datosCli.setLocalidadCliente(datosCliente.getLocalidadCliente());
       datosCli.setTelefonoCliente(datosCliente.getTelefonoCliente());
       
       datosCliServ.guardarCliente(datosCli);
       
       return new ResponseEntity(new Mensaje("Datos del cliente actualizados"), HttpStatus.OK);
        
    }

}
