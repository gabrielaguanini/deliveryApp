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
import com.delivery.delivery.Service.PlatosAMostrar.PlatosAMostrarService;
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
    PlatosAMostrarService plaMosServ;

    @Autowired
    private EntityManager entityManager; //LIBRERIA QUE SOLO SE UTILIZA PARA EL METODO public void guardarIdPlatoTotalPrecio(DetallePedidos detallePedido)

    private static final Logger logger = LoggerFactory.getLogger(DetallePedidosService.class);

    /**
     * Obtiene la lista completa de DetallePedidos.
     *
     * @return Lista de DetallePedidos.
     * @throws MensajeResponseStatusException Si hay un error al obtener la
     * lista.
     */
    public List<DetallePedidos> listaDetallePedidos() {
        try {
            List<DetallePedidos> listaDetPedCom = iDetPeRepo.findAll();
            if (listaDetPedCom.isEmpty()) {
                throw new MensajeResponseStatusException(new Mensaje("No existen registros para generar una lista").getMensaje(), HttpStatus.OK, null);
            };
            return listaDetPedCom;
        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw e;
        }
    }

    /**
     * =======================================================================================================
     */
    /**
     * Guarda un nuevo DetallePedido.
     *
     * @param detallePedidos DetallePedido a guardar.
     * @throws MensajeResponseStatusException Si hay un error al guardar el
     * DetallePedido. Para actualizar en la tabla detallePedidos datos
     * necesarios sin intervencion del front
     * guardarIdPlatoTotalPrecio(detallePedidos); Para actualizar en la tabla
     * pedidos datos necesarios sin intervencion del front
     * actualizarImporteTotalPedido(detallePedidos.getPedidos().getIdPedido());
     * generarListaCadenasDesdeDetallesPorIdPedido(detallePedidos.getPedidos().getIdPedido());
     */
    public void guardarDetallePedido(DetallePedidos detallePedidos) {
        try {
            if (!iPlaMosRepo.existsById(detallePedidos.getPlatosAMostrar().getIdPlatosAMostrar())) {
                throw new MensajeResponseStatusException(new Mensaje("El idPlatosAMostrar n°: " + detallePedidos.getPlatosAMostrar().getIdPlatosAMostrar() + " no existe.").getMensaje(), HttpStatus.NOT_FOUND, null);
            }
            if (!iPedidosRepo.existsById(detallePedidos.getPedidos().getIdPedido())) {
                throw new MensajeResponseStatusException(new Mensaje("El idPedido n°: " + detallePedidos.getPedidos().getIdPedido() + " no existe.").getMensaje(), HttpStatus.NOT_FOUND, null);
            }

            DetallePedidos detPedAGuardar = iDetPeRepo.save(detallePedidos);
            guardarIdPlatoTotalPrecio(detallePedidos);
            actualizarImporteTotalPedido(detallePedidos.getPedidos().getIdPedido());
            generarListaCadenasDesdeDetallesPorIdPedido(detallePedidos.getPedidos().getIdPedido());

            if (detPedAGuardar == null && detallePedidos.getPorcionPlato() == null) {
                throw new MensajeResponseStatusException(new Mensaje("Detalle del pedido nulo o ausente").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw new MensajeResponseStatusException("Error al guardar detalles del pedido", HttpStatus.BAD_REQUEST, e);
        }
    }

    /**
     * =======================================================================================================
     */
    /**
     * Guarda varios DetallePedidos y realiza otras operaciones relacionadas.
     *
     * @param detallesPedidos Lista de DetallePedidos a guardar.
     * @return Mensaje indicando que se ha guardado IdPlato y Total Precio, y se
     * ha guardado el Importe Total del Pedido. Para actualizar en la tabla
     * detallePedidos datos necesarios sin intervencion del front
     * guardarIdPlatoTotalPrecio(detallePedidos); Para actualizar en la tabla
     * pedidos datos necesarios sin intervencion del front
     * actualizarImporteTotalPedido(detallePedidos.getPedidos().getIdPedido());
     * generarListaCadenasDesdeDetallesPorIdPedido(detallePedidos.getPedidos().getIdPedido());
     * @throws MensajeResponseStatusException Si hay un error al procesar los
     * detalles del pedido, si algún IdPlatosAMostrar o IdPedido no existen, o
     * si hay problemas al actualizar el importe total del pedido.
     */
    public String guardarVariosDetallesPedido(List<DetallePedidos> detallesPedidos) {

        try {

            for (DetallePedidos detallitos : detallesPedidos) {
                Long idPedido = detallitos.getPedidos().getIdPedido();
                Long idPlatosAMostrar = detallitos.getPlatosAMostrar().getIdPlatosAMostrar();

                if (!iPlaMosRepo.existsById(idPlatosAMostrar)) {
                    throw new MensajeResponseStatusException(new Mensaje("No se encontró el IdPlatosAMostrar n°: " + detallitos.getPlatosAMostrar().getIdPlatosAMostrar()).getMensaje(), HttpStatus.NOT_FOUND, null);
                }
                if (!iPedidosRepo.existsById(idPedido)) {
                    throw new MensajeResponseStatusException(new Mensaje("No se encontró el IdPedido n°: " + detallitos.getPedidos().getIdPedido()).getMensaje(), HttpStatus.NOT_FOUND, null);
                }

                guardarIdPlatoTotalPrecio(detallitos);
                actualizarImporteTotalPedido(idPedido);
                generarListaCadenasDesdeDetallesPorIdPedido(idPedido);
            }

            iDetPeRepo.saveAll(detallesPedidos);

            if (detallesPedidos.isEmpty()) {
                throw new MensajeResponseStatusException(new Mensaje("Detalles del pedido nulos o ausentes").getMensaje(), HttpStatus.BAD_REQUEST, null);
            }

            return "Guardados los detalles del pedido, idPlato, ImporteTotalPedido y TotalPedido";

        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw new MensajeResponseStatusException(new Mensaje("Error al procesar detalles del pedido").getMensaje(), HttpStatus.BAD_REQUEST, e);
        }
    }

    /**
     * =======================================================================================================
     */
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

    /**
     * =======================================================================================================
     */
    /**
     * Genera una lista de detalles de pedidos filtrados por un ID de pedido
     * específico.
     *
     * @param idPedido El ID del pedido utilizado para filtrar los detalles de
     * pedidos.
     * @return Una lista de detalles de pedidos que corresponden al ID de pedido
     * proporcionado.
     * @throws MensajeResponseStatusException Si ocurre un error durante la
     * generación de la lista o si el ID de pedido no existe en la base de
     * datos.
     */
    public List<DetallePedidos> listaXIdPedido(Long idPedido) {
        try {
            // Verifica si el IdPedido existe en la base de datos
            if (!iPedidosRepo.existsById(idPedido)) {
                // Si el IdPedido no existe, lanzar una excepción con un mensaje personalizado
                throw new MensajeResponseStatusException("El idPedido n°: " + idPedido + " solicitado para generar una lista no existe", HttpStatus.NOT_FOUND, null);
            }

            // Obtiene una lista de IDs de platos relacionados con el IdPedido dado
            List<Long> idPlaAMosFromList = iDetPeRepo.findIdPlaMosXIdPedido(idPedido);

            // Supone que todos los platos existen inicialmente
            boolean todosPlatosExisten = true;

            // Verifica la existencia de cada plato en la base de datos
            for (Long idPlaAMos : idPlaAMosFromList) {
                Boolean plaMosExiste = iPlaMosRepo.existsById(idPlaAMos);
                // Si algún plato no existe, cambia la variable todosPlatosExisten a false
                if (!plaMosExiste) {
                    todosPlatosExisten = false;
                    // Sale del bucle tan pronto como se encuentre un plato que no existe
                    break;
                }
            }

            // Si algunos platos no existen, lanza una excepción
            if (!todosPlatosExisten) {
                throw new MensajeResponseStatusException("Uno o más platos ya no existen en Platos a mostrar, no se puede editar", HttpStatus.BAD_REQUEST, null);
            }

            // Si todos los platos existen, obtiene y devuelve la lista de detalles de los pedidos
            List<DetallePedidos> detallesPedidos = iDetPeRepo.findByIdPedDetPed(idPedido);
            return detallesPedidos;
        } catch (MensajeResponseStatusException e) {
            // Captura y registra cualquier excepción con el logger
            logger.error("", e);
            throw e;
        }
    }

    /**
     * =======================================================================================================
     */
    /**
     * Obtiene un DetallePedido por su Id.
     *
     * @param idDetallePedido Id del DetallePedido a obtener.
     * @return DetallePedido obtenido.
     * @throws MensajeResponseStatusException Si no se encuentra el
     * DetallePedido con el Id proporcionado.
     */
    public Optional<DetallePedidos> getOne(Long idDetallePedido) {
        try {
            if (!iDetPeRepo.existsById(idDetallePedido)) {
                throw new MensajeResponseStatusException("El idDetallePedido N°: " + idDetallePedido + " no existe", HttpStatus.NOT_FOUND, null);
            }
            return iDetPeRepo.findById(idDetallePedido);
        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw e;
        }
    }

    /**
     * =======================================================================================================
     */
    /**
     * Borra un DetallePedido por su Id.
     *
     * @param idDetallePedido Id del DetallePedido a borrar.
     * @param idPedido El identificador del pedido para actualizar la lista de
     * platos del pedido. Para actualizar en la tabla pedidos datos necesarios
     * sin intervencion del front
     * actualizarImporteTotalPedido(detallePedidos.getPedidos().getIdPedido());
     * generarListaCadenasDesdeDetallesPorIdPedido(detallePedidos.getPedidos().getIdPedido());
     * @throws MensajeResponseStatusException Si no se encuentra el
     * DetallePedido con el Id proporcionado o si no se encuentra el Pedido
     * asociado.
     */
    public void borrarDetallePedido(Long idDetallePedido, Long idPedido) {
        try {
            if (!iDetPeRepo.existsById(idDetallePedido)) {
                throw new MensajeResponseStatusException("El idDetallePedido N°: " + idDetallePedido + " solicitado para eliminar no existe", HttpStatus.NOT_FOUND, null);
            }
            if (!iPedidosRepo.existsById(idPedido)) {
                throw new MensajeResponseStatusException("El idPedido N°: " + idPedido + " no existe. Es necesario para eliminar el detalle del pedido", HttpStatus.NOT_FOUND, null);
            }

            iDetPeRepo.deleteById(idDetallePedido);
            generarListaCadenasDesdeDetallesPorIdPedido(idPedido);
            actualizarImporteTotalPedido(idPedido);
        } catch (MensajeResponseStatusException e) {
            logger.error("", e);
            throw e;
        }
    }

    /**
     * =======================================================================================================
     */
    /**
     * Verifica si existe un DetallePedido por su Id.
     *
     * @param idDetallePedido Id del DetallePedido a verificar.
     * @return `true` si existe, `false` si no.
     * @throws MensajeResponseStatusException Si hay un error al comprobar la
     * existencia del DetallePedido. Método de uso interno, SIN ENDPOINT
     */
    public boolean existsById(Long idDetallePedido) {
        try {

            if (!iDetPeRepo.existsById(idDetallePedido)) {
                throw new MensajeResponseStatusException("No se encontraron registros con idDetallePedido: " + idDetallePedido, HttpStatus.NOT_FOUND, null);
            }
            return true;

        } catch (MensajeResponseStatusException e) {

            throw new MensajeRunTimeException(new Mensaje("Error al comprobar si el detallePedido existe por idDetallePedido"), e);
        } catch (Exception e) {
            logger.error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            throw new MensajeRunTimeException(new Mensaje("Error inesperado al comprobar si el detallePedido existe por idDetallePedido"), e);
        }
    }

    /**
     * =======================================================================================================
     */
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

    /**
     * =======================================================================================================
     */
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

    /**
     * =======================================================================================================
     */
}
