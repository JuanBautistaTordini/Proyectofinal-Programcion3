"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/AdminLogin.css"
import { login } from "../../services/auth"

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loging, setLoging] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoging(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error('[Login] Error:', err);
      const userFriendlyMessage = err.message || 'Error de conexión. Intentalo de nuevo.';
      setError(userFriendlyMessage);
    } finally {
      setLoging(false);
    }
  }

  return (
    <div className="admin-login">
      <h1>Patagonia Trip</h1>
      <div className="login-container">
        <div className="login-card">
          <h2>Acceso Administrativo</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="campo-grupo">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo-grupo">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="boton-login" disabled={loging}>
              {loging ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
