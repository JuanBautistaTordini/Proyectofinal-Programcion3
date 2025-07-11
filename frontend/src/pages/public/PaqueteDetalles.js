"use client"
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { getPackageById } from '../../services/packageService'
import '../../styles/PaqueteDetalles.css'

function PaqueteDetalles() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [paquete, setPaquete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPaquete = async () => {
      try {
        const data = await getPackageById(id)
        console.log("✅ Paquete obtenido:", data)
        setPaquete(data)
      } catch (err) {
        console.error("❌ Error al obtener el paquete:", err)
        setError("No se pudo cargar el paquete.")
      } finally {
        setLoading(false)
      }
    }

    fetchPaquete()
  }, [id])

  const handleReservar = () => {
    navigate(`/reservations/${id}`)
  }

  if (loading) return <p className="loading">Cargando paquete...</p>
  if (error) return <p className="error">{error}</p>
  if (!paquete) return <p className="error">Paquete no encontrado</p>

  return (
    <>
      <Header />
      <div className="paquete-detalles">
        <div className="container">
          <div className="detalles-grid">
            <div className="imagen-container">
              <img
                src={paquete.image_url || "/placeholder.svg"}
                alt={paquete.title}
                className="imagen-principal"
              />
            </div>
            <div className="info-container">
              <h1 className="titulo-paquete">{paquete.title}</h1>
              <p className="descripcion-corta">{paquete.description}</p>

              <div className="detalles-info">
                <div className="info-item">
                  <strong>Ubicación:</strong> {paquete.location}
                </div>
                <div className="info-item">
                  <strong>Precio:</strong>{" "}
                  <span className="precio">${paquete.price}</span>
                </div>
              </div>

              {Array.isArray(paquete.includes) && (
                <div className="incluye-section">
                  <h3>Incluye:</h3>
                  <ul className="incluye-lista">
                    {paquete.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="boton-reservar" onClick={handleReservar}>
                Reservar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PaqueteDetalles
