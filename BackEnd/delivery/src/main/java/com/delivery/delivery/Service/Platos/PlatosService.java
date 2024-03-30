package com.delivery.delivery.Service.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Repository.Platos.IPlatosRepository;
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PlatosService {

    @Autowired
    IPlatosRepository iPlatosRepo;

    @Autowired
    PlatosAMostrarService plaMosServ;

    private static final Logger logger = LoggerFactory.getLogger(PlatosService.class);

    public List<Platos> listaDePlatos() {
        return iPlatosRepo.findAll();
    }

    public List<Platos> listaTipoPlato(Long idTipoPlato) {
        return iPlatosRepo.findAllBytipoPlato_IdTipoPlato(idTipoPlato);
    }

    public Optional<Platos> getOne(Long idPlato) {
        return iPlatosRepo.findById(idPlato);
    }

    public void guardarPlato(Platos plato) {
        iPlatosRepo.save(plato);
    }

    public void borrarPlato(Long idPlato) {
        try {
            if (!iPlatosRepo.existsById(idPlato)) {
                throw new MensajeResponseStatusException("El idPlato N°: " + idPlato + " solicitado para eliminar no existe", HttpStatus.NOT_FOUND, null);
            };

            if (plaMosServ.existsByIdPlato(idPlato)) {
                Optional<PlatosAMostrar> platMost = plaMosServ.getOneByIdPlato(idPlato);

                String mensaje = platMost.map(plato -> {
                    // Extraer los atributos relevantes del objeto PlatosAMostrar
                    String id = "**" + String.valueOf(plato.getIdPlatosAMostrar());
                    String nombrePlaMost = plato.getPlatos().getNombrePlato() + "**"; 
                    // Concatenar los atributos en una cadena legible
                    return "ID: " + id + ", NOM. PLA A MOS.: " + nombrePlaMost;
                }).orElse("No se encontraron registros en PLATOS A MOSTRAR.");

                throw new MensajeResponseStatusException("El plato que desea eliminar: idPlato N°: " + idPlato
                        + " se utiliza en el registro de la tabla PLATOS A MOSTRAR: "
                        + mensaje + " . Elimine el registro y prosiga con la eliminacion del plato.",
                        HttpStatus.BAD_REQUEST, null);
            }
            iPlatosRepo.deleteById(idPlato);
        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw e;
        }
    }

    public boolean existsById(Long idPlato) {
        return iPlatosRepo.existsById(idPlato);
    }

    public boolean existsByIdTipoPlato(Long idTipoPlato) {
        return iPlatosRepo.existsByTipoPlato_IdTipoPlato(idTipoPlato);
    }

    ;
    
    //METODO PARA SABER SI EL NOMBRE DEL PLATO ESTA PRESENTE EN LA TABLA 
    public boolean existeNombrePlato(String nombrePlato) {
        return iPlatosRepo.existsByNombrePlato(nombrePlato);
    }
;

}
