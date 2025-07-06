"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Footer from "../../components/layout/Footer"
import "../../styles/ReservarPaquete.css"

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
    1: { titulo: "Aventura en la Montaña", precio: "$299" },
    2: { titulo: "Expedición al Lago", precio: "$199" },
    3: { titulo: "Tour Fotográfico", precio: "$399" },
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
      <div className="reservar-paquete">
        <div className="container">
          <div className="reserva-grid">
            <div className="paquete-info">
              <h2>Resumen del Paquete</h2>
              <div className="paquete-card">
                <h3>{paquete?.titulo}</h3>
                <p className="precio-reserva">{paquete?.precio}</p>
              </div>
            </div>

            <div className="formulario-container">
              <h2>Datos de Reserva</h2>
              <form onSubmit={handleSubmit} className="formulario-reserva">
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
                  <label htmlFor="numeroPersonas">Número de Personas</label>
                  <select
                    id="numeroPersonas"
                    name="numeroPersonas"
                    value={formData.numeroPersonas}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="campo-grupo">
                  <label htmlFor="comentarios">Comentarios Adicionales</label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>

                <button type="submit" className="boton-confirmar">
                  Confirmar Reserva
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
