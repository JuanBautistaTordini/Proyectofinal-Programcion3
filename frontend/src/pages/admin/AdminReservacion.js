"use client"

import { useState } from "react"
import AdminLayout from "../../components/layout/AdminLayout"
import "../../styles/AdminReservacion.css"

function AdminReservacion() {
  const [reservaciones] = useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      email: "juan@email.com",
      paquete: "Aventura en la Montaña",
      fecha: "2024-02-15",
      personas: 2
    },
    {
      id: 2,
      cliente: "María García",
      email: "maria@email.com",
      paquete: "Expedición al Lago",
      fecha: "2024-02-20",
      personas: 4
    },
    {
      id: 3,
      cliente: "Carlos López",
      email: "carlos@email.com",
      paquete: "Tour Fotográfico",
      fecha: "2024-02-25",
      personas: 1
    },
  ]);

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
                <th>Personas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservaciones.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.cliente}</td>
                  <td>{reserva.email}</td>
                  <td>{reserva.paquete}</td>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.personas}</td>
                  <td>
                    <button className="boton-ver">Ver</button>
                    <button className="boton-eliminar">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminReservacion
