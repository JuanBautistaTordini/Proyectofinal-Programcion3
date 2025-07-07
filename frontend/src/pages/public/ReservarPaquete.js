"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Footer from "../../components/layout/Footer"
import "../../styles/ReservarPaquete.css"
import Header from "../../components/layout/Header"

function ReservarPaquete() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaViaje: "",
    numeroPersonas: 1,
    comentarios: "",
  })

  const paquetes = {
    1: { titulo: "Aventura en la Montaña", precio: "$299", imagen: "https://blog.chapkadirect.es/wp-content/uploads/2019/03/Hombre-con-los-brazos-abiertos-delante-de-la-laguna-esmeralda-en-la-Patagonia-argentina.jpg" },
    2: { titulo: "Expedición al Lago", precio: "$199", imagen: "https://www.cronista.com/files/image/303/303713/5ffe1fa025c8d.jpg" },
    3: { titulo: "Tour Fotográfico", precio: "$399", imagen: "https://www.rionegro.com.ar/wp-content/uploads/2023/10/patagonia-perito-moreno.jpg" },
  }

  const paquete = paquetes[id]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí enviarías los datos a tu backend
    console.log("Reserva enviada:", { ...formData, paqueteId: id })
    navigate("/reserva-confirmada")
  }

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
                    <img src={paquete.imagen || "/placeholder.svg"} alt={paquete.titulo} className="imagen-paquete" />
                    <div className="precio-badge">{paquete.precio}</div>
                  </div>
                  <div className="reserva-paquete-detalles">
                    <h3>{paquete.titulo}</h3>
                    <p className="descripcion">{paquete.descripcion}</p>
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

                <div className="campos-fila">
                  <div className="campo-grupo">
                    <label htmlFor="telefono">Teléfono *</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="campo-grupo">
                    <label htmlFor="numeroPersonas">Número de Personas</label>
                    <select
                      id="numeroPersonas"
                      name="numeroPersonas"
                      value={formData.numeroPersonas}
                      onChange={handleInputChange}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
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
                    required
                  />
                </div>

                <div className="campo-grupo">
                  <label htmlFor="comentarios">Comentarios Adicionales</label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Por ejemplo, alergias, preferencias de comida, etc."
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
