import  React from "react"
import "../../styles/Header.css"

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="container_header">
          <a href="#" className="logo">
            Patagonia Trip
          </a>
          <nav>
            <ul className="nav-menu">
              <li>
                <a href="#" className="nav-link">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Viajes
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Contactos
                </a>
              </li>
            </ul>
          </nav>
          <button className="boton_cta">Ver Paquetes</button>
        </div>
      </div>
    </header>
  )
}

export default Header
