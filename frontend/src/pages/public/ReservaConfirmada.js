"use client"
import { useNavigate } from "react-router-dom"
import Footer from "../../components/layout/Footer"
import "../../styles/ReservaConfirmada.css"

function ReservaConfirmada() {
  const navigate = useNavigate()

  return (
    <>
      <div className="reserva-confirmada">
        <div className="container">
          <div className="confirmacion-card">
            <div className="icono-exito">✅</div>
            <h1>¡Reserva Confirmada!</h1>
            <p className="mensaje-principal">
              Tu reserva ha sido enviada exitosamente. Nos pondremos en contacto contigo en las próximas 24 horas para
              confirmar todos los detalles.
            </p>

            <div className="proximos-pasos">
              <h3>Próximos Pasos:</h3>
              <ul>
                <li>Recibirás un email de confirmación</li>
                <li>Te contactaremos para coordinar el pago</li>
                <li>Te enviaremos la información detallada del viaje</li>
              </ul>
            </div>

            <div className="botones-accion">
              <button className="boton-inicio" onClick={() => navigate("/")}>
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ReservaConfirmada
