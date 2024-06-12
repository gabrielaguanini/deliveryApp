package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeResponseStatusException;
import com.delivery.delivery.Mensaje.MensajeRunTimeException;
import com.delivery.delivery.Repository.Pedidos.IDetallePedidosRepository;
import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
import com.delivery.delivery.Repository.PlatosAMostrar.IPlatosAMostrarRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class DetallePedidosService {

    @Autowired
    IDetallePedidosRepository iDetPeRepo;

    @Autowired
    IPedidosRepository iPedidosRepo;

    @Autowired
    IPlatosAMostrarRepository iPlaMosRepo;

    @Autowired
    private EntityManager entityManager; //LIBRERIA QUE SOLO SE UTILIZA PARA EL METODO public void guardarIdPlatoTotalPrecio(DetallePedidos detallePedido)

    private static final Logger logger = LoggerFactory.getLogger(DetallePedidosService.class);

    /**
     * Retorna una lista de todos los detalles de pedidos.
     *
     * @return List<DetallePedidos> - Lista de todos los detalles de pedidos.
     */
    public List<DetallePedidos> listaDetallePedidos() {
        List<DetallePedidos> listaDetallePedidos = iDetPeRepo.findAll();
        return listaDetallePedidos;
    }

//======================================================================================================================
    /**
     * Guarda un detalle de pedido en la base de datos y realiza operaciones
     * adicionales.
     *
     * @param detallePedidos El detalle de pedido que se va a guardar.
     */
    public void guardarDetallePedido(DetallePedidos detallePedidos) {

        // Guarda el detalle de pedido en la base de datos
        iDetPeRepo.save(detallePedidos);

        // Realiza operaciones adicionales después de guardar el detalle de pedido
        // Guarda el ID del plato y calcula el total del precio del plato
        guardarIdPlatoTotalPrecio(detallePedidos);

        // Actualiza el importe total del pedido al que pertenece este detalle de pedido
        actualizarImporteTotalPedido(detallePedidos.getPedidos().getIdPedido());

        // Genera una lista de cadenas a partir de los detalles de pedido para el pedido al que pertenece este detalle
        generarListaCadenasDesdeDetallesPorIdPedido(detallePedidos.getPedidos().getIdPedido());
    }

//======================================================================================================================
    /**
     * Guarda varios detalles de pedido en la base de datos.
     *
     * @param detallesPedidos La lista de detalles de pedido a guardar.
     */
    public void guardarVariosDetallesPedido(List<DetallePedidos> detallesPedidos) {
        // Guarda todos los detalles de pedido en la base de datos
        iDetPeRepo.saveAll(detallesPedidos);

    }

//======================================================================================================================
    /**
     * Genera una lista de cadenas a partir de DetallesPedidos filtrados por
     * IdPedido.
     *
     * @param idPedido Id del pedido para filtrar los DetallesPedidos.
     * iDetPeRepo.updateListaPlatosDelPedido(idPedido) para eliminar la lista
     * anterior si la hubiese (podria no haberla) y proceder a ingresar la nueva
     * lista actualizada o la lista nueva
     * @return Lista de cadenas generadas.
     * @throws MensajeResponseStatusException Si hay un error al generar la
     * lista de cadenas o si el IdPedido no existe. Método de uso interno, SIN
     * ENDPOINT
     */
    public String generarListaCadenasDesdeDetallesPorIdPedido(Long idPedido) {
        try {

            List<DetallePedidos> listaObjetosDetallesPedidos = listaXIdPedido(idPedido);

            // Transforma la lista de DetallePedidos a una cadena
            String listaCadenasTransformada = listaObjetosDetallesPedidos.stream()
                    .map(detalle -> " --||| Id Plato a mostrar: " + detalle.getPlatosAMostrar().getIdPlatosAMostrar()
                    + ", Id Plato: " + detalle.getPlatos().getIdPlato() + " |||-- "
                    + "Plato: " + detalle.getPlatos().getNombrePlato()
                    + ", Porcion: " + detalle.getPorcionPlato()
                    + ", $ unitario: " + detalle.getPlatos().getPrecioPlato())
                    .collect(Collectors.joining(", "));

            // Actualiza la columna listaPlatosDelPedido en la entidad Pedido
            Pedidos pedido = iPedidosRepo.findById(idPedido).orElse(null);
            if (pedido != null) {
                iDetPeRepo.updateListaPlatosDelPedido(idPedido);
                pedido.setListaPlatosDelPedido(listaCadenasTransformada);
                iPedidosRepo.save(pedido);
            }

            return listaCadenasTransformada;
        } catch (MensajeResponseStatusException e) {
            logger.error("Error al generar la lista de cadenas desde detalles del pedido" + e);
            throw new MensajeResponseStatusException(new Mensaje("Error al generar la lista de cadenas desde detalles del pedido").getMensaje(), HttpStatus.BAD_REQUEST, e);
        }
    }
    
    //======================================================================================================================
    /**
  
     */
    public String generarListaCadenasDesdeDetallesPorIdPedidoCli(Long idPedido) {
        try {

            List<DetallePedidos> listaObjetosDetallesPedidos = listaXIdPedido(idPedido);

            // Transforma la lista de DetallePedidos a una cadena
            String listaCadenasTransformada = listaObjetosDetallesPedidos.stream()
                    .map(detalle -> " --||| "
                    + "Plato: " + detalle.getPlatos().getNombrePlato()
                    + ", Porcion: " + detalle.getPorcionPlato()
                    + ", $ unitario: " + detalle.getPlatos().getPrecioPlato()) 
                    .collect(Collectors.joining(", ") ) +  " |||-- ";

            // Actualiza la columna listaPlatosDelPedido en la entidad Pedido
            Pedidos pedido = iPedidosRepo.findById(idPedido).orElse(null);
            if (pedido != null) {
                iDetPeRepo.updateListaPlatosDelPedidoCli(idPedido);
                pedido.setListaPlatosDelPedidoCli(listaCadenasTransformada);
                iPedidosRepo.save(pedido);
            }

            return listaCadenasTransformada;
        } catch (MensajeResponseStatusException e) {
            logger.error("Error al generar la lista de cadenas desde detalles del pedido" + e);
            throw new MensajeResponseStatusException(new Mensaje("Error al generar la lista de cadenas desde detalles del pedido").getMensaje(), HttpStatus.BAD_REQUEST, e);
        }
    }


//======================================================================================================================
    /**
     * Obtiene una lista de detalles de pedidos asociados a un pedido específico
     * en la base de datos.
     *
     * @param idPedido El ID del pedido para el que se van a buscar los detalles
     * de pedidos.
     * @return Una lista de detalles de pedidos asociados al pedido
     * especificado.
     */
    public List<DetallePedidos> listaXIdPedido(Long idPedido) {
        // Busca los detalles de pedidos asociados al pedido especificado en la base de datos
        List<DetallePedidos> detallesPedidos = iDetPeRepo.findByIdPedDetPed(idPedido);

        // Retorna la lista de detalles de pedidos
        return detallesPedidos;
    }

//======================================================================================================================
    /**
     * Obtiene un detalle de pedido por su ID.
     *
     * @param idDetallePedido El ID del detalle de pedido que se desea obtener.
     * @return Un objeto Optional que contiene el detalle de pedido
     * correspondiente al ID especificado, o un Optional vacío si no se
     * encuentra ningún detalle de pedido con ese ID.
     */
    public Optional<DetallePedidos> getOne(Long idDetallePedido) {
        // Busca un detalle de pedido por su ID en el repositorio
        return iDetPeRepo.findById(idDetallePedido);
    }

//======================================================================================================================
    /**
     * Borra un detalle de pedido por su ID.
     *
     * @param idDetallePedido El ID del detalle de pedido que se desea borrar.
     * @param idPedido El ID del pedido al que pertenece el detalle de pedido
     * que se va a borrar.
     */
    public void borrarDetallePedido(Long idDetallePedido, Long idPedido) {
        // Borra el detalle de pedido por su ID
        iDetPeRepo.deleteById(idDetallePedido);

        // Genera la lista de cadenas actualizada a partir de los detalles de pedido del pedido modificado
        generarListaCadenasDesdeDetallesPorIdPedido(idPedido);
        
        // Genera la lista de cadenas para el cliente actualizada a partir de los detalles de pedido del pedido modificado
        generarListaCadenasDesdeDetallesPorIdPedidoCli(idPedido);

        // Actualiza el importe total del pedido después de borrar el detalle de pedido
        actualizarImporteTotalPedido(idPedido);
    }

//======================================================================================================================
    /**
     * Verifica si existe un detalle de pedido con el ID especificado.
     *
     * @param idDetallePedido El ID del detalle de pedido a verificar.
     * @return {@code true} si existe un detalle de pedido con el ID
     * especificado, {@code false} en caso contrario.
     */
    public boolean existsById(Long idDetallePedido) {
        // Verifica si existe un detalle de pedido en el repositorio con el ID especificado
        boolean dePeExists = iDetPeRepo.existsById(idDetallePedido);
        // Devuelve el resultado de la verificación
        return dePeExists;
    }

//======================================================================================================================
    /**
     * Actualiza el importe total de un pedido dado su ID.
     *
     * @param idPedido ID del pedido para el cual se actualizará el importe
     * total.
     * @return Pedido actualizado con el nuevo importe total.
     * @throws MensajeResponseStatusException Si hay un error al actualizar el
     * importe total del pedido o si el pedido no se encuentra. Método de uso
     * interno, SIN ENDPOINT. Nota: Esta operación está gestionada por
     * transacción para garantizar la integridad de los datos.
     */
    public Pedidos actualizarImporteTotalPedido(Long idPedido) {
        try {

            Pedidos pedido = iPedidosRepo.findById(idPedido)
                    .orElseThrow(() -> new MensajeResponseStatusException(new Mensaje("Pedido no encontrado con ID:" + idPedido).getMensaje(), HttpStatus.NOT_FOUND, null));

            Double totalImportePedido = iDetPeRepo.findTotalPlatoAndAdd(idPedido);

            pedido.setImporteTotalPedido(totalImportePedido != null ? totalImportePedido : 0.0);

            return iPedidosRepo.saveAndFlush(pedido);
        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw e;
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al actualizar el importe total del pedido"), e);
        }
    }

//======================================================================================================================
    /**
     * Guarda el ID del plato, el total del plato y el precio del plato a
     * mostrar en un DetallePedido.
     *
     * @param detallePedido DetallePedido a procesar.
     * @throws MensajeResponseStatusException Si hay un error al procesar el
     * detalle del pedido. Método de uso interno, SIN ENDPOINT
     */
    public void guardarIdPlatoTotalPrecio(DetallePedidos detallePedido) {
        try {
            if (detallePedido.getPlatosAMostrar() != null) {
                PlatosAMostrar platosAMostrarPersistido = entityManager.find(PlatosAMostrar.class,
                        detallePedido.getPlatosAMostrar().getIdPlatosAMostrar());

                if (platosAMostrarPersistido != null && platosAMostrarPersistido.getPlatos() != null && !iPlaMosRepo.existsById(platosAMostrarPersistido.getPlatos().getIdPlato())) {
                    Platos platosAsociado = platosAMostrarPersistido.getPlatos();
                    detallePedido.setPlatos(platosAsociado);

                    // Obtiene el precio_plato desde la entidad Platos
                    Float precioPlato = platosAsociado.getPrecioPlato();
                    detallePedido.setPrecioPlatoAMostrar(precioPlato);

                    // Multiplica porcionPlato por precioPlatoAMostrar y establece el resultado
                    if (detallePedido.getPorcionPlato() != null) {
                        detallePedido.setTotalPlato(detallePedido.getPorcionPlato() * precioPlato.doubleValue());
                    }

                }
            }
            logger.info("IdPlato: " + detallePedido.getPlatos().getIdPlato() + ", TotalPlatos: " + detallePedido.getTotalPlato() + " guardados correctamente ");
            entityManager.persist(detallePedido);
        } catch (MensajeResponseStatusException e) {
            logger.error("Error al actualizar idPlato o totalPrecio. ", e);
            throw new MensajeResponseStatusException(new Mensaje("Error al procesar el/los detalle/s del pedido. Detalles: ").getMensaje(), HttpStatus.BAD_REQUEST, e);
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado"), e);
        }

    }

//======================================================================================================================
    /**
     * Busca los IDs de los platos mostrados asociados a un pedido específico en
     * la base de datos.
     *
     * @param idPedido El ID del pedido para el que se van a buscar los IDs de
     * los platos mostrados.
     * @return Una lista de IDs de los platos mostrados asociados al pedido
     * especificado.
     */
    public List<Long> findIdPlaMosXIdPedido(Long idPedido) {
        // Llama al repositorio para buscar los IDs de los platos mostrados asociados al pedido
        List<Long> lisPlaMosXIdPed = iDetPeRepo.findIdPlaMosXIdPedido(idPedido);

        // Retorna la lista de IDs de los platos mostrados
        return lisPlaMosXIdPed;
    }

//======================================================================================================================.
    /**
     * Elimina varios detalles de pedido asociados a un idPedido específico.
     *
     * @param idPedidos El identificador del pedido del cual se eliminarán los
     * detalles.
     */
    public void eliminarVariosDetallesPorIdPedido(Long idPedidos) {
        iDetPeRepo.elimVariosDetPedXIdPedido(idPedidos);
    }
    
//======================================================================================================================.

}
