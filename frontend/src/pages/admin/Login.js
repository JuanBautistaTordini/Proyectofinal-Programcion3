"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/AdminLogin.css"

function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  // Maneja el cambio de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulación de login, esperar back
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("adminToken", "authenticated")
      navigate("/admin/dashboard")
    } else {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-card">
          <h2>Acceso Administrativo</h2>
          <form onSubmit={handleSubmit}>
            <div className="campo-grupo">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="campo-grupo">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="boton-login">
              Iniciar Sesión
            </button>
          </form>

          <div className="demo-credentials">
            <p>
              <small>Demo: usuario: admin, contraseña: admin123</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
