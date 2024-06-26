package com.delivery.delivery.Service.FooterYLogo;

import com.delivery.delivery.Entity.FooterYLogo.FooterYLogo;
import com.delivery.delivery.Repository.FooterYLogo.IFooterYLogo;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class FooterYLogoService {

    @Autowired
    IFooterYLogo iFoYLoRepo;


//===================================================================================================
    /**
     * Método para obtener una lista de objetos FooterYLogo.
     *
     * @return una lista de todos los objetos FooterYLogo en la base de datos.
     */
    public List<FooterYLogo> footerYLogoList() {
        // Llama al método findAll() de iFoYLo para obtener todos los objetos FooterYLogo
        return iFoYLoRepo.findAll();
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
