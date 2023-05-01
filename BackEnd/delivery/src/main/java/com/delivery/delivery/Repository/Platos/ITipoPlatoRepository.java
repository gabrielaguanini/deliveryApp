
package com.delivery.delivery.Repository.Platos;

import com.delivery.delivery.Entity.Platos.TipoPlato;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ITipoPlatoRepository extends JpaRepository <TipoPlato, Long>{
 

}
