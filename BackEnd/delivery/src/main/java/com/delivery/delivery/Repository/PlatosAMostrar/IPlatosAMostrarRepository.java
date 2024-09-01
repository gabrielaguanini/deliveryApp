package com.delivery.delivery.Repository.PlatosAMostrar;

import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPlatosAMostrarRepository extends JpaRepository<PlatosAMostrar, Long> {

// Verifica si existe un registro en Platos por ID del plato
    public boolean existsByPlatos_IdPlato(Long idPlato);

// Busca un PlatosAMostrar por ID del plato, devuelve un Optional
    Optional<PlatosAMostrar> findByPlatos_IdPlato(Long idPlato);

}
