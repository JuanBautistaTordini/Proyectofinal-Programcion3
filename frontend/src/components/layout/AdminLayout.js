"use client"
import { useNavigate, useLocation } from "react-router-dom"
import "../../styles/AdminLayout.css"

function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/paquetes", label: "Paquetes" },
    { path: "/admin/reservaciones", label: "Reservaciones" },
  ]

  return (
    <div className="admin-layout">
     
      <aside className="admin-sidebar">
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
             Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="sidebar-header">
            <h2 className="logo-admin">Patagonia Trip Administracion</h2>
          </div>
          <button className="home-btn" onClick={() => navigate("/")}>
             Ver Sitio Público
          </button>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
