package com.delivery.delivery.Service.FooterYLogo;

import com.delivery.delivery.Entity.FooterYLogo.FooterYLogo;
import com.delivery.delivery.Repository.FooterYLogo.IFooterYLogo;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.Comparator;

@Service
@Transactional
public class FooterYLogoService {

    @Autowired
    IFooterYLogo iFoYLoRepo;

//===================================================================================================
    /**
     * Método para obtener una lista de objetos FooterYLogo ordenada por su id.
     *
     * @return una lista de todos los objetos FooterYLogo en la base de datos,
     * ordenada por id.
     */
    public List<FooterYLogo> footerYLogoList() {
        // Llama al método findAll() de iFoYLo para obtener todos los objetos FooterYLogo
        List<FooterYLogo> list = iFoYLoRepo.findAll();

        // Ordena la lista por id de menor a mayor
        Collections.sort(list, new Comparator<FooterYLogo>() {
            @Override
            public int compare(FooterYLogo o1, FooterYLogo o2) {
                return o1.getIdOtrosDatos().compareTo(o2.getIdOtrosDatos());
            }
        });

        return list;
    }
//===================================================================================================

    /**
     * Obtiene una lista de objetos {@link FooterYLogo} basada en una lista de
     * IDs proporcionados.
     *
     * @param ids Una lista de IDs de tipo {@link Long} que se utilizarán para
     * buscar los objetos {@link FooterYLogo}.
     * @return Una lista de objetos {@link FooterYLogo} correspondientes a los
     * IDs proporcionados, ordenada por ID de menor a mayor.
     */
    public List<FooterYLogo> footerYLogoListXId(List<Long> ids) {
        // Llama al método findAllById() del repositorio para obtener todos los objetos FooterYLogo
        // que corresponden a los IDs proporcionados en la lista.
        List<FooterYLogo> list = iFoYLoRepo.findAllById(ids);

        // Ordena la lista obtenida por el campo ID en orden ascendente (de menor a mayor).
        // La comparación se realiza usando el método compareTo() del tipo Long.
        Collections.sort(list, new Comparator<FooterYLogo>() {
            @Override
            public int compare(FooterYLogo o1, FooterYLogo o2) {
                return o1.getIdOtrosDatos().compareTo(o2.getIdOtrosDatos());
            }
        });

        // Devuelve la lista ordenada de objetos FooterYLogo.
        return list;
    }

//===================================================================================================
    /**
     * Método para guardar un objeto FooterYLogo en la base de datos.
     *
     * @param footerYLogo el objeto FooterYLogo que se desea guardar.
     */
    public void guardarFooYLo(FooterYLogo footerYLogo) {
        // Llama al método save() de iFoYLo para guardar el objeto FooterYLogo
        iFoYLoRepo.save(footerYLogo);
    }

//===================================================================================================
    /**
     * Método para actualizar un objeto FooterYLogo en la base de datos.
     *
     * @param footerYLogo el objeto FooterYLogo que se desea actualizar.
     */
    public void actualizarFooYLo(FooterYLogo footerYLogo) {
        // Llama al método save() de iFoYLo para actualizar el objeto FooterYLogo
        iFoYLoRepo.save(footerYLogo);
    }
//===================================================================================================

    /**
     * Método para eliminar un objeto FooterYLogo de la base de datos.
     *
     * @param idOtrosDatos el ID del objeto FooterYLogo que se desea eliminar.
     */
    public void eliminarFooYLo(Long idOtrosDatos) {
        // Llama al método deleteById() de iFoYLo para eliminar el objeto FooterYLogo por su ID
        iFoYLoRepo.deleteById(idOtrosDatos);
    }

//===================================================================================================
    /**
     * Método para obtener un objeto FooterYLogo por su ID.
     *
     * @param idOtrosDatos el ID del objeto FooterYLogo que se desea obtener.
     * @return un Optional que contiene el objeto FooterYLogo si se encuentra, o
     * vacío si no.
     */
    public Optional<FooterYLogo> getOne(Long idOtrosDatos) {
        // Llama al método findById() de iFoYLoRepo para obtener el objeto FooterYLogo por su ID
        Optional<FooterYLogo> footerYLogo = iFoYLoRepo.findById(idOtrosDatos);
        return footerYLogo;
    }

//===================================================================================================
    /**
     * Método para verificar si un objeto FooterYLogo existe en la base de datos
     * por su ID.
     *
     * @param idOtrosDatos el ID del objeto FooterYLogo que se desea verificar.
     * @return true si el objeto FooterYLogo existe, false en caso contrario.
     */
    public boolean existsById(Long idOtrosDatos) {
        // Llama al método existsById() de iFoYLoRepo para verificar si el objeto FooterYLogo existe por su ID
        boolean fooYLoExists = iFoYLoRepo.existsById(idOtrosDatos);
        return fooYLoExists;
    }

//===================================================================================================
}
