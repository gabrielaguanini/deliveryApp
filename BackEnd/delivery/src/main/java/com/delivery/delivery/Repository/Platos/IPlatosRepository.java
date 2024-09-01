package com.delivery.delivery.Repository.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlatosRepository extends JpaRepository<Platos, Long> {

// Encuentra todos los platos por ID del tipo de plato
public List<Platos> findAllBytipoPlato_IdTipoPlato(Long idTipoPlato);

// Verifica si existe un plato por su nombre
public Boolean existsByNombrePlato(String nombrePlato);

// Verifica si existen platos por ID del tipo de plato
public Boolean existsByTipoPlato_IdTipoPlato(Long idTipoPlato);


}
