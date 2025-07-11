"use client"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import AdminLayout from "../../components/layout/AdminLayout"
import { getAllPackages } from "../../services/packageService"
import { getAllReservations } from "../../services/reservationService"
import "../../styles/AdminDashboard.css"

function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalPaquetes: 0,
    totalReservas: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const paquetes = await getAllPackages()
        const response = await getAllReservations()
        const reservas = response.allReservations

  
        console.log("Reservas recibidas:", reservas) // <-- acá
  
        setStats({
          totalPaquetes: paquetes.length,
          totalReservas: reservas.length
        })
        
      } catch (error) {
        console.error("Error al cargar estadísticas:", error)
      }
    }
  
    fetchStats()
  }, [])
  

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Dashboard Administrativo</h1>

        {/* Bloque de estadísticas */}
        <div className="estadisticas">
          <h2>Estadísticas</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-titulo">Total Paquetes</span>
              <span className="stat-valor">{stats.totalPaquetes}</span>
            </div>
            <div className="stat-card">
              <span className="stat-titulo">Total Reservas</span>
              <span className="stat-valor">{stats.totalReservas}</span>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
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
