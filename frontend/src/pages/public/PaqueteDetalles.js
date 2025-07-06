"use client"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import "../../styles/PaqueteDetalles.css"

function PaqueteDetalles() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Simulamos datos del paquete (en una app real vendría de una API)
  const paquetes = {
    1: {
      titulo: "Aventura en la Montaña",
      descripcion: "Explorá impresionantes cordilleras con nuestros tours guiados",
      descripcionCompleta:
        "Una experiencia única en las montañas más espectaculares de la Patagonia. Incluye trekking, campamento y vistas panorámicas inolvidables.",
      precio: "$299",
      duracion: "3 días / 2 noches",
      incluye: ["Guía profesional", "Equipo de camping", "Comidas", "Transporte"],
      imagen:
        "https://blog.chapkadirect.es/wp-content/uploads/2019/03/Hombre-con-los-brazos-abiertos-delante-de-la-laguna-esmeralda-en-la-Patagonia-argentina.jpg",
    },
    2: {
      titulo: "Expedición al Lago",
      descripcion: "Descubrí lagos prístinos y aguas cristalinas",
      descripcionCompleta: "Navegá por lagos cristalinos y descubrí la fauna local en esta expedición acuática única.",
      precio: "$199",
      duracion: "2 días / 1 noche",
      incluye: ["Kayak", "Guía especializado", "Almuerzo", "Equipo de seguridad"],
      imagen: "https://www.cronista.com/files/image/303/303713/5ffe1fa025c8d.jpg",
    },
    3: {
      titulo: "Tour Fotográfico",
      descripcion: "Capturá paisajes asombrosos con orientación profesional",
      descripcionCompleta:
        "Perfeccioná tu técnica fotográfica mientras capturás los paisajes más impresionantes de la región.",
      precio: "$399",
      duracion: "4 días / 3 noches",
      incluye: ["Instructor de fotografía", "Equipo profesional", "Todas las comidas", "Alojamiento"],
      imagen: "https://www.rionegro.com.ar/wp-content/uploads/2023/10/patagonia-perito-moreno.jpg",
    },
  }

  const paquete = paquetes[id]

  if (!paquete) {
    return <div>Paquete no encontrado</div>
  }

  const handleReservar = () => {
    navigate(`/reservar/${id}`)
  }

  return (
    <>
      <Header />
      <div className="paquete-detalles">
        <div className="container">
          <div className="detalles-grid">
            <div className="imagen-container">
              <img src={paquete.imagen || "/placeholder.svg"} alt={paquete.titulo} className="imagen-principal" />
            </div>
            <div className="info-container">
              <h1 className="titulo-paquete">{paquete.titulo}</h1>
              <p className="descripcion-corta">{paquete.descripcion}</p>
              <p className="descripcion-completa">{paquete.descripcionCompleta}</p>

              <div className="detalles-info">
                <div className="info-item">
                  <strong>Duración:</strong> {paquete.duracion}
                </div>
                <div className="info-item">
                  <strong>Precio:</strong> <span className="precio">{paquete.precio}</span>
                </div>
              </div>

              <div className="incluye-section">
                <h3>Incluye:</h3>
                <ul className="incluye-lista">
                  {paquete.incluye.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

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
