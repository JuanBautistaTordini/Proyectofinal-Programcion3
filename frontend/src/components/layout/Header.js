'use client'
import  React from "react"
import "../../styles/Header.css"

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="container_header">
          <span className="logo">
            Patagonia Trip
          </span>
          <nav>
            <h3 className="nav-menu">
              50% OFF EN TU PRIMERA RESERVA
            </h3>
          </nav>
          <button className="boton_cta">Ver Paquetes</button>
        </div>
      </div>
    </header>
  )
}

export default Header
