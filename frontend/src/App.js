import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Public Pages
import Home from "./pages/public/Home"
import PaqueteDetalles from "./pages/public/PaqueteDetalles"
import ReservarPaquete from "./pages/public/ReservarPaquete"
import ReservaConfirmada from "./pages/public/ReservaConfirmada"

// Admin Pages
import Login from "./pages/admin/Login"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminPaquete from "./pages/admin/AdminPaquete"
import AdminReservacion from "./pages/admin/AdminReservacion"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* rutas publcias */}
          <Route path="/" element={<Home />} />
          <Route path="/packages/:id" element={<PaqueteDetalles />} />
          <Route path="/reservations/:id" element={<ReservarPaquete />} />
          <Route path="/reserva-confirmada" element={<ReservaConfirmada />} />

          {/* rutas admin privadas */}
          {/* si es /admin : */}
          <Route path="/admin" element={<Login />} /> 
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/paquetes" element={<AdminPaquete />} />
          <Route path="/admin/reservaciones" element={<AdminReservacion />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
