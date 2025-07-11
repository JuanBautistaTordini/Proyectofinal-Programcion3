"use client"

import { useEffect, useState } from "react"
import AdminLayout from "../../components/layout/AdminLayout"
import { getAllReservations, deleteReservationById } from "../../services/reservationService"
import "../../styles/AdminReservacion.css"

function AdminReservacion() {
  const [reservaciones, setReservaciones] = useState([])

  // Estado para controlar modal
  const [modalAbierto, setModalAbierto] = useState(false)
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)

  // Obtener reservas al cargar
  useEffect(() => {
    cargarReservas()
  }, [])

  const cargarReservas = async () => {
    try {
      const data = await getAllReservations()
      setReservaciones(data.allReservations)
    } catch (error) {
      console.error("Error al cargar reservas:", error)
    }
  }

  // Abrir modal con reserva a eliminar
  const abrirModalEliminar = (reserva) => {
    setReservaSeleccionada(reserva)
    setModalAbierto(true)
  }

  // Cancelar eliminación
  const cancelarEliminar = () => {
    setReservaSeleccionada(null)
    setModalAbierto(false)
  }

  // Confirmar eliminación
  const confirmarEliminar = async () => {
    if (!reservaSeleccionada) return
    try {
      await deleteReservationById(reservaSeleccionada.id)
      setReservaciones(reservaciones.filter(r => r.id !== reservaSeleccionada.id))
      cancelarEliminar()
    } catch (error) {
      console.error("Error al eliminar reserva:", error)
    }
  }

  return (
    <AdminLayout>
      <div className="admin-reservaciones">
        <h1>Gestión de Reservaciones</h1>
        <div className="tabla-container">
          <table className="tabla-reservaciones">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Paquete</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservaciones.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.name}</td>
                  <td>{reserva.email}</td>
                  <td>{reserva.Package?.title || "Sin título"}</td>
                  <td>{reserva.reservation_date}</td>
                  <td>
                    <button 
                      className="boton-eliminar" 
                      onClick={() => abrirModalEliminar(reserva)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de confirmación */}
        {modalAbierto && (
          <div className="modal-fondo">
            <div className="modal-contenido">
              <h3>Confirmar eliminación</h3>
              <p>¿Estás seguro de eliminar la reserva de <b>{reservaSeleccionada.name}</b>?</p>
              <div className="modal-botones">
                <button className="boton-cancelar" onClick={cancelarEliminar}>Cancelar</button>
                <button className="boton-confirmar-eliminar" onClick={confirmarEliminar}>Eliminar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  )
}

export default AdminReservacion
