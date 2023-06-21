
package com.delivery.delivery.Repository.Platos;

import com.delivery.delivery.Entity.Platos.TipoPlato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITipoPlatoRepository extends JpaRepository <TipoPlato, Long>{ 

}
