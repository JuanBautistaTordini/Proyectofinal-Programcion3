import React from "react"
import "../../styles/ProductCard.css"

function ProductCard({ paquetes }) {
  return (
    <div className="product-card">
      <img src={paquetes.imagen} alt={paquetes.titulo} className="card-imagen" />
      <div className="card-container">
        <h3 className="card-titulo">{paquetes.titulo}</h3>
        <p className="card-descripcion">{paquetes.descripcion}</p>
        <div className="card-pie">
          <span className="card-precio">{paquetes.precio}</span>
          <button className="card-boton">Reservar Ahora</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
