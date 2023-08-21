package com.delivery.delivery.Service.Platos;

import com.delivery.delivery.Entity.Platos.TipoPlato;
import com.delivery.delivery.Repository.Platos.ITipoPlatoRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TipoPlatoService {

    @Autowired
    ITipoPlatoRepository iTipoPlaRepo;

    public List<TipoPlato> listaTipoPlato() {
        return iTipoPlaRepo.findAll();
    }


    public Optional<TipoPlato> getOne(Long idTipoPlato) {
        return iTipoPlaRepo.findById(idTipoPlato);
    }

    public void guardarTipoPlato(TipoPlato tipoPlato) {
        iTipoPlaRepo.save(tipoPlato);
    }

    public void borrarTipoPlato(Long idTipoPlato) {
        iTipoPlaRepo.deleteById(idTipoPlato);
    }

    public boolean existsById(Long idTipoPlato) {
        return iTipoPlaRepo.existsById(idTipoPlato);
    }
    
    //METODO PARA GENERAR UNA LISTA FILTRADA CON LOS REGISTROS DE LA ENTIDAD PLATOS PRESENTES EN LA ENTIDAD TIPOPLATO
    public List <TipoPlato> listaFiltradaTipoPlato(){
        return iTipoPlaRepo.findAllWithPlatos();
    };
    
    //METODO PARA GENERAR UNA LISTA CON LOS COLORES CARGADOS EN LA TABLA TIPOPLATO
    public List <String> listaColoresTipoPlato(){
        return iTipoPlaRepo.filterColorCardTipoPlato();
    };
    
    //METODO PARA GENERAR UNA LISTA CON LOS ICONOS CARGADOS EN LA TABLA TIPOPLATO
    public List <String> listaIconosTipoPlato(){
        return iTipoPlaRepo.filterIconoTipoPlato();
    };
    
    //METODO PARA SABER SI EL NOMBRE DEL TIPO DE PLATO ESTA PRESENTE EN LA TABLA 
    public boolean existeNombreTipoPlato(String nombreTipoPlato){
      return iTipoPlaRepo.existsByNombreTipoPlato(nombreTipoPlato);
    }; 
    

}
