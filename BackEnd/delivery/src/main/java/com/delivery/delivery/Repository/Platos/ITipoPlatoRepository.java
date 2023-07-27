
package com.delivery.delivery.Repository.Platos;

import com.delivery.delivery.Entity.Platos.TipoPlato;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ITipoPlatoRepository extends JpaRepository <TipoPlato, Long>{ 
    
    //METODO ABSTRACTO PARA GENERAR UNA LISTA FILTRADA CON LOS REGISTROS DE LA ENTIDAD PLATOS PRESENTES EN LA ENTIDAD TIPOPLATO
    @Modifying 
    @Query(value = "SELECT DISTINCT tipo_plato.* FROM tipo_plato INNER JOIN platos ON tipo_plato.id_tipo_plato = platos.id_tipo_plato;", nativeQuery = true)
    List<TipoPlato> findAllWithPlatos();
    
    
    @Modifying 
    @Query(value = "SELECT color_card_tipo_plato FROM tipo_plato", nativeQuery = true)
    List<String> filterColorCardTipoPlato();
    
    @Modifying 
    @Query(value = "SELECT icono_tipo_plato FROM tipo_plato", nativeQuery = true)
    List<String> filterIconoTipoPlato();
    
  }
