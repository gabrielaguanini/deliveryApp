package com.delivery.delivery.Repository.Platos;

import com.delivery.delivery.Entity.Platos.TipoPlato;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ITipoPlatoRepository extends JpaRepository<TipoPlato, Long> {

// Genera una lista de TipoPlato que tienen registros en Platos
    @Modifying
    @Query(value = "SELECT DISTINCT tipo_plato.* FROM tipo_plato INNER JOIN platos ON tipo_plato.id_tipo_plato = platos.id_tipo_plato;", nativeQuery = true)
    List<TipoPlato> findAllWithPlatos();

// Filtra colores de tarjeta únicos de TipoPlato
    @Modifying
    @Query(value = "SELECT DISTINCT color_card_tipo_plato FROM tipo_plato;", nativeQuery = true)
    List<String> filterColorCardTipoPlato();

// Filtra íconos únicos de TipoPlato
    @Modifying
    @Query(value = "SELECT DISTINCT icono_tipo_plato FROM tipo_plato", nativeQuery = true)
    List<String> filterIconoTipoPlato();

// Verifica si existe un TipoPlato por nombre
    public Boolean existsByNombreTipoPlato(String nombreTipoPlato);

};
