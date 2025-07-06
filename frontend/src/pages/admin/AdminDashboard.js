"use client"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../../components/layout/AdminLayout"
import "../../styles/AdminDashboard.css"

function AdminDashboard() {
  const navigate = useNavigate()

  const stats = [
    { titulo: "Total Paquetes", valor: "12", icono: "🎒" },
    { titulo: "Reservas Pendientes", valor: "8", icono: "⏳" },
    { titulo: "Reservas Confirmadas", valor: "24", icono: "✅" },
    { titulo: "Ingresos del Mes", valor: "$5,280", icono: "💰" },
  ]

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Dashboard Administrativo</h1>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icono">{stat.icono}</div>
              <div className="stat-info">
                <h3>{stat.valor}</h3>
                <p>{stat.titulo}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="acciones-rapidas">
          <h2>Acciones Rápidas</h2>
          <div className="botones-accion">
            <button className="boton-accion" onClick={() => navigate("/admin/paquetes")}>
              Gestionar Paquetes
            </button>
            <button className="boton-accion" onClick={() => navigate("/admin/reservaciones")}>
              Ver Reservaciones
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
