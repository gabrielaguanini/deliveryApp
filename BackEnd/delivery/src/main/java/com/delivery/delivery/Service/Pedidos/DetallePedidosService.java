package com.delivery.delivery.Service.Pedidos;

import com.delivery.delivery.Entity.Pedidos.DetallePedidos;
import com.delivery.delivery.Entity.Pedidos.Pedidos;
import com.delivery.delivery.Entity.Platos.Platos;
import com.delivery.delivery.Entity.PlatosAMostrar.PlatosAMostrar;
import com.delivery.delivery.Mensaje.Mensaje;
import com.delivery.delivery.Mensaje.MensajeException;
import com.delivery.delivery.Repository.Pedidos.IDetallePedidosRepository;
import com.delivery.delivery.Repository.Pedidos.IPedidosRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;





@Service
@Transactional
public class DetallePedidosService {

    @Autowired
    IDetallePedidosRepository detPeRepo;

    @Autowired
    IPedidosRepository iPedidosRepo;

    @Autowired
    PedidosService iPediServ;

    @Autowired
    private EntityManager entityManager; //LIBRERIA QUE SOLO SE UTILIZA PARA EL METODO public void guardarIdPlatoTotalPrecio(DetallePedidos detallePedido)

    //para crear logs con errores y excepciones
   
    
   //LISTA DE TIPO "DETALLE PEDIDOS" COMPLETA 
    public List<DetallePedidos> listaDetallePedidos() {
        try {
            return detPeRepo.findAll();
        } catch (Exception e) {
            // Aquí puedes manejar la excepción o relanzarla como una nueva excepción personalizada
            throw new MensajeException(new Mensaje("Error al generar la lista de detalles del pedido: " + e.getMessage()), e);
        }
    }

    public void guardarDetallePedido(DetallePedidos detallePedidos) {
        try {
            detPeRepo.save(detallePedidos);
        } catch (Exception e) {
            throw new MensajeException(new Mensaje("Error al guardar detalles del pedido: " + e.getMessage()), e);
        }

    }

  
    public String guardarVariosDetallesPedido(List<DetallePedidos> detallesPedidos) {
        try {
            for (DetallePedidos detallitos : detallesPedidos) {
                guardarIdPlatoTotalPrecio(detallitos);
                actualizarImporteTotalPedido(detallitos.getPedidos().getIdPedido());
                generarListaCadenasDesdeDetallesPorIdPedido(detallitos.getPedidos().getIdPedido());
            }

            detPeRepo.saveAll(detallesPedidos);

            return "Guardado IdPlato y Total Precio. Guardado Importe TotalPedido";
        } catch (MensajeException e) {
            // Captura la excepción personalizada MensajeException
            return "Error al procesar detalles del pedido: " + e.getMessage();
        } catch (Exception e) {
            // Captura otras excepciones no manejadas
            return "Error inesperado al procesar detalles del pedido.";
        }
    }

   
    public String generarListaCadenasDesdeDetallesPorIdPedido(Long idPedido) {
        try {
            List<DetallePedidos> listaObjetosDetallesPedidos = listaXIdPedido(idPedido);

            // Transforma la lista de DetallePedidos a una cadena
            String listaCadenasTransformada = listaObjetosDetallesPedidos.stream()
                    .map(detalle -> "Plato: " + detalle.getPlatos().getNombrePlato()
                    + ", Porcion: " + detalle.getPorcionPlato()
                    + ", $ unitario: " + detalle.getPlatos().getPrecioPlato())
                    .collect(Collectors.joining(", "));

            // Actualiza la columna listaPlatosDelPedido en la entidad Pedido
            Pedidos pedido = iPedidosRepo.findById(idPedido).orElse(null);
            if (pedido != null) {
                pedido.setListaPlatosDelPedido(listaCadenasTransformada);
                iPedidosRepo.save(pedido);
            }

            return listaCadenasTransformada;
        } catch (Exception e) {
            // No se imprime la traza de la pila en la consola
            throw new MensajeException(new Mensaje("Error al generar la lista de cadenas desde detalles del pedido: " + e.getMessage()), e);
        }
    }

    //GENERA UNA LISTA DE TIPO DETALLE PEDIDOS FILTRADA POR IDPEDIDO, 
    // LA LISTA SE TRANSFORMA A CADENA STRING CON generarListaCadenasDesdeDetallesPorIdPedido(Long idPedido)
    public List<DetallePedidos> listaXIdPedido(Long idPedido) {

        try {

            List<DetallePedidos> detallesPedidos = detPeRepo.findByPedidos_IdPedido(idPedido);
            return detallesPedidos;
        } catch (Exception e) {
            throw new MensajeException(new Mensaje("Error al generar la lista por idPedido: " + e.getMessage()), e);
        }
    }

    public Optional<DetallePedidos> getOne(Long idDetallePedido) {
        try {
            return detPeRepo.findById(idDetallePedido);
        } catch (Exception e) {
           throw new MensajeException(new Mensaje("Error al obtener 1 detalle del pedido buscandolo con el idDetallePedido: " + e.getMessage()), e);
        }
    }

    public void borrarDetallePedido(Long idDetallePedido) {
        try {
            detPeRepo.deleteById(idDetallePedido);
        } catch (Exception e) {
            throw new MensajeException(new Mensaje("Error al borrar el detalle del pedido: " + e.getMessage()), e);
        }
    }

    public boolean existsById(Long idDetallePedido) {
        try {
            return detPeRepo.existsById(idDetallePedido);
        } catch (Exception e) {
            throw new MensajeException(new Mensaje("Error al comprobar si el detalle pedido existe por idDetallePedido: " + e.getMessage()), e);
        }
    }

    //ACTUALIZA EL IMPORTE TOTAL PEDIDO
    public Pedidos actualizarImporteTotalPedido(Long idPedido) {
        try {
            Pedidos pedido = iPedidosRepo.findById(idPedido).orElse(null);

            if (pedido != null) {
                Double totalImportePedido = detPeRepo.findTotalPlatoAndAdd(idPedido);

                pedido.setImporteTotalPedido(totalImportePedido != null ? totalImportePedido : 0.0);
                return iPedidosRepo.saveAndFlush(pedido);
            } else {
                // Puedes lanzar una excepción específica en lugar de devolver null
                throw new MensajeException(new Mensaje("Pedido no encontrado con ID: " + idPedido));
            }
        } catch (Exception e) {
           
            throw new MensajeException(new Mensaje("Error al actualizar el importe total del pedido"), e);
        }
    }

    //INGRESA EL ID_PLATO, TOTAL_PLATO Y PRECIO_PLATOSAMOSTRAR EN DETALLE PEDIDOS
    public void guardarIdPlatoTotalPrecio(DetallePedidos detallePedido) {
        try {
            if (detallePedido.getPlatosAMostrar() != null) {
                PlatosAMostrar platosAMostrarPersistido = entityManager.find(PlatosAMostrar.class, detallePedido.getPlatosAMostrar().getIdPlatosAMostrar());

                if (platosAMostrarPersistido != null && platosAMostrarPersistido.getPlatos() != null) {
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

            entityManager.persist(detallePedido);
        } catch (Exception e) {
            throw new MensajeException(new Mensaje("Error al procesar el detalle del pedido. Detalles: " + e.getMessage()), e);
        }
    }


}
