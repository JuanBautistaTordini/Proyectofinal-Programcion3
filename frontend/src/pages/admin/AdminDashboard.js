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
              <span className="icon-paquetes">
                <svg
                  id="Layer_1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                >
                  <path d="m20 11.5v8c0 2.481-2.019 4.5-4.5 4.5h-11c-2.481 0-4.5-2.019-4.5-4.5v-15c0-2.481 2.019-4.5 4.5-4.5h11c.38 0 .759.048 1.124.142.268.069.429.341.36.609-.068.267-.345.428-.608.36-.285-.073-.58-.11-.876-.11h-11c-1.93 0-3.5 1.57-3.5 3.5v15c0 1.93 1.57 3.5 3.5 3.5h11c1.93 0 3.5-1.57 3.5-3.5v-8.001c0-.276.224-.5.5-.5s.5.224.5.5zm-8.5 6.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5h-4c-.276 0-.5.224-.5.5s.224.5.5.5zm12.5-15.5c0 .668-.26 1.296-.732 1.768l-6.707 6.707c-.66.661-1.539 1.025-2.475 1.025h-1.586c-.276 0-.5-.224-.5-.5v-1.586c0-.921.374-1.823 1.025-2.475l6.707-6.707c.975-.975 2.561-.975 3.535 0 .473.472.732 1.1.732 1.768zm-1 0c0-.401-.156-.777-.439-1.061-.584-.585-1.537-.585-2.121 0l-6.707 6.707c-.466.465-.732 1.11-.732 1.768v1.086h1.086c.668 0 1.296-.26 1.768-.732l6.707-6.707c.283-.283.439-.66.439-1.061zm-13.854 12.646-2.589 2.589c-.344.343-.89.354-1.242.034l-1.471-1.403c-.199-.19-.517-.184-.706.017-.191.199-.184.516.017.706l1.478 1.41c.365.336.826.502 1.286.502.487 0 .974-.187 1.346-.559l2.589-2.589c.195-.195.195-.512 0-.707s-.512-.195-.707 0zm.707-5c-.195-.195-.512-.195-.707 0l-2.589 2.589c-.344.342-.89.355-1.242.034l-1.471-1.403c-.199-.189-.517-.183-.706.017-.191.2-.184.516.017.707l1.478 1.41c.365.336.826.502 1.286.502.487 0 .974-.187 1.346-.559l2.589-2.589c.195-.195.195-.512 0-.707zm0-5c-.195-.195-.512-.195-.707 0l-2.589 2.589c-.344.343-.893.355-1.241.034l-1.471-1.404c-.201-.19-.518-.183-.707.017-.191.2-.184.516.016.707l1.479 1.411c.366.335.826.501 1.286.501.487 0 .974-.187 1.346-.559l2.589-2.589c.195-.195.195-.512 0-.707z" />
                </svg>
              </span>
              <div className="stat-texto">
                <span className="stat-titulo">Total Paquetes</span>
                <span className="stat-valor">{stats.totalPaquetes}</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="icon-reservas">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                >
                  <path d="M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm0-11c2.757,0,5,2.243,5,5s-2.243,5-5,5-5-2.243-5-5S6.243,1,9,1Zm12.5,10h-6c-1.379,0-2.5,1.122-2.5,2.5v8c0,1.378,1.121,2.5,2.5,2.5h6c1.379,0,2.5-1.122,2.5-2.5V13.5c0-1.378-1.121-2.5-2.5-2.5Zm1.5,10.5c0,.827-.673,1.5-1.5,1.5h-6c-.827,0-1.5-.673-1.5-1.5V13.5c0-.827,.673-1.5,1.5-1.5h6c.827,0,1.5,.673,1.5,1.5v8Zm-2-7.003c0,.276-.224,.5-.5,.5h-4c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h4c.276,0,.5,.224,.5,.5Zm0,3.003c0,.276-.224,.5-.5,.5h-4c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h4c.276,0,.5,.224,.5,.5Zm0,2.997c0,.276-.224,.5-.5,.5h-4c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h4c.276,0,.5,.224,.5,.5Zm-10.008-5.778c-.049,.272-.311,.453-.579,.405-.465-.082-.94-.124-1.413-.124-4.411,0-8,3.589-8,8v.5c0,.276-.224,.5-.5,.5s-.5-.224-.5-.5v-.5c0-4.962,4.037-9,9-9,.531,0,1.065,.047,1.587,.14,.272,.048,.454,.308,.405,.58Z" />
                </svg>
              </span>
              <div className="stat-texto">
                <span className="stat-titulo">Total Reservas</span>
                <span className="stat-valor">{stats.totalReservas}</span>
              </div>
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
