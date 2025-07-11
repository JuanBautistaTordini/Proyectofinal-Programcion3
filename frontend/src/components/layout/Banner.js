import React from 'react'
import "../../styles/Banner.css"

function Banner() {

  const handleSmoothScroll = (e) => {
    e.preventDefault()
    const section = document.querySelector('#tu-aventura')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="banner">
      <div className="container_banner">
        <h1 className="titulo_banner">Viví la Patagonia Argentina</h1>
        <p className="parrafo_banner">
          Todo lo que necesitas para tu proxima escapada. Vivi las mejores experiencias
          y obtené los mejores recuerdos .
        </p><br></br>
        <div className="botones_banner">
          <a href="#tu-aventura" className="boton_primario" onClick={handleSmoothScroll}>
            Elegi tu Aventura
          </a>
          <a href="#" className="boton_secundario">
            Mas Info
          </a>
        </div>
      </div>
    </section>
  )
}

export default Banner
