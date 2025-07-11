"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Footer from "../../components/layout/Footer"
import "../../styles/ReservarPaquete.css"
import Header from "../../components/layout/Header"
import { getPackageById } from "../../services/packageService"
import { createReservation } from "../../services/reservationService"


function ReservarPaquete() {
  const today = new Date().toISOString().split("T")[0];
  const { id } = useParams()
  const navigate = useNavigate()

  const [paquete, setPaquete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    fechaViaje: ""
  })
  

  useEffect(() => {
    const fetchPaquete = async () => {
      try {
        const data = await getPackageById(id)
        setPaquete(data)
      } catch (err) {
        console.error("❌ Error al cargar paquete:", err)
        setError("Error al cargar el paquete.")
      } finally {
        setLoading(false)
      }
    }

    fetchPaquete()
  }, [id])

  //pendiente
  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      await createReservation({
        name: formData.nombre,
        email: formData.email,
        reservation_date: formData.fechaViaje,
        package_id: id
      })
  
      navigate("/reserva-confirmada")
    } catch (error) {
      console.error("Error al enviar reserva:", error)
      alert("Hubo un error al enviar tu reserva.")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  if (loading) return <p className="loading">Cargando paquete...</p>
  if (error) return <p className="error">{error}</p>
  if (!paquete) return <p className="error">Paquete no encontrado</p>


  return (
    <>
      <Header />
      <div className="reservar-paquete">
        <div className="container">
          <div className="page-header">
            <h1>Reservar Paquete</h1>
            <p>Completa tus datos para confirmar tu aventura</p>
          </div>

          <div className="reserva-grid">
            <div className="formulario-container">
              <div className="reserva-paquete-info">
                <h2>Resumen del Paquete</h2>
                <div className="reserva-paquete-card">
                  <div className="reserva-paquete-imagen">
                    <img src={paquete.image_url || "/placeholder.svg"} alt={paquete.title} className="imagen-paquete" />
                    <div className="precio-badge">{paquete.price}</div>
                  </div>
                  <div className="reserva-paquete-detalles">
                    <h3>{paquete.title}</h3>
                    <p className="descripcion">{paquete.descrition}</p>
                    <div className="caracteristicas">
                      <div className="caracteristica">
                        <span className="icono">📍</span>
                        <span>Ubicación premium</span>
                      </div>
                      <div className="caracteristica">
                        <span className="icono">⭐</span>
                        <span>Guía profesional</span>
                      </div>
                      <div className="caracteristica">
                        <span className="icono">🍽️</span>
                        <span>Comidas incluidas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="formulario-reserva">
                <h2>Datos de Reserva</h2>

                <div className="campos-fila">
                  <div className="campo-grupo">
                    <label htmlFor="nombre">Nombre Completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="campo-grupo">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="campo-grupo">
                  <label htmlFor="fechaViaje">Fecha de Viaje *</label>
                  <input
                    type="date"
                    id="fechaViaje"
                    name="fechaViaje"
                    value={formData.fechaViaje}
                    onChange={handleInputChange}
                    min={today}
                    required
                  />
                </div>

                <button type="submit" className="boton-confirmar">
                  <span className="boton-texto">Confirmar Reserva</span>
                  <span className="boton-icono">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ReservarPaquete
