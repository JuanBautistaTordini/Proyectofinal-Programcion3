import React from "react"
import "../../styles/ProductCard.css"

function ProductCard({ paquetes }) {
  return (
    <div className="product-card">
      <img src={paquetes.image_url} alt={paquetes.title} className="card-imagen" />
      <div className="card-container">
        <h3 className="card-titulo">{paquetes.title}</h3>
        <p className="card-descripcion">{paquetes.description}</p>
        <p className="card-descripcion">{paquetes.location}</p>
        
        <div className="card-pie">
          <span className="card-precio">{paquetes.price}</span>
          <button className="card-boton">Reservar Ahora</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
