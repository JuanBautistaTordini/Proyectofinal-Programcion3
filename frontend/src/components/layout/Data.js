import React from "react"
import "../../styles/Data.css"

function Data() {
  const data = [
    {
      icono: "🏔️",
      titulo: "Guias Profesionales",
      descripcion: "Expertos en aventura que te guiarán en cada paso del camino.",
    },
    {
      icono: "📸",
      titulo: "Fotografía Profesional",
      descripcion: "Captura momentos inolvidables.",
    },
    {
      icono: "🎒",
      titulo: "Equipo Completo",
      descripcion: "Todo el equipo necesario para una experiencia segura y cómoda.",
    },
    {
      icono: "🌟",
      titulo: "Experiencias Únicas",
      descripcion: "Ofrecemos aventuras personalizadas que se adaptan a tus intereses y habilidades.",
    },
  ]

  return (
    <section className="data">
      <div className="container">
        <h2>Somos los Mejores</h2>
        <div className="data_grid">
          {data.map((data, index) => (
            <div key={index} className="data_item">
              <div className="icono_data">{data.icono}</div>
              <h3 className="titulo_data">{data.titulo}</h3>
              <p>{data.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Data
