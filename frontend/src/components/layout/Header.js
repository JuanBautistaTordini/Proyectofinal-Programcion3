'use client'
import  React from "react"
import "../../styles/Header.css"

function Header() {
  const handleScrollToAventura = (e) => {
    e.preventDefault()
    const target = document.getElementById('tu-aventura')
  
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  return (
    <header className="header">
      <div className="container">
        <div className="container_header">
          <h2 className="logo">
            Patagonia Trip
          </h2>
          <nav>
            <h2 className="nav-menu">
              50% OFF EN TU PRIMERA RESERVA
            </h2>
          </nav>
          <a href="#tu-aventura" className="boton_primario" onClick={handleScrollToAventura}>
            Ver Paquetes
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
