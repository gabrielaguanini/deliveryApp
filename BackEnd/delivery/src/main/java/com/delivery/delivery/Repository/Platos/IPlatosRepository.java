package com.delivery.delivery.Repository.Platos;

import com.delivery.delivery.Entity.Platos.Platos;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlatosRepository extends JpaRepository<Platos, Long> {

    public List<Platos> findAllBytipoPlato_IdTipoPlato(Long idTipoPlato);

    public Boolean existsByNombrePlato(String nombrePlato);

}
