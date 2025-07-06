import React from "react"
import Header from "./components/layout/Header"
import Banner from "./components/layout/Banner"
import ProductCard from "./components/layout/ProductCard"
import Features from "./components/layout/Data"
import Footer from "./components/layout/Footer"
import "./App.css"

function App() {
  const paquetes = [
    {
      titulo: "Aventura en la Montaña",
      descripcion: "Explorá impresionantes cordilleras con nuestros tours guiados",
      precio: "$299",
      imagen: "https://blog.chapkadirect.es/wp-content/uploads/2019/03/Hombre-con-los-brazos-abiertos-delante-de-la-laguna-esmeralda-en-la-Patagonia-argentina.jpg",
    },
    {
      titulo: "Expedición al Lago",
      descripcion: "Descubrí lagos prístinos y aguas cristalinas",
      precio: "$199",
      imagen: "https://www.cronista.com/files/image/303/303713/5ffe1fa025c8d.jpg",
    },
    {
      titulo: "Tour Fotográfico",
      descripcion: "Capturá paisajes asombrosos con orientación profesional",
      precio: "$399",
      imagen: "https://www.rionegro.com.ar/wp-content/uploads/2023/10/patagonia-perito-moreno.jpg",
    },
  ]

  return (
    <div className="App">
      <Header />
      <Banner />
      <section className="productos-section">
        <div className="container">
          <h2>Tu Proxima Aventura</h2>
          <div className="products-grid">
            {paquetes.map((paquetes) => (
              <ProductCard paquetes={paquetes} />
            ))}
          </div>
        </div>
      </section>
      <Features />
      <Footer />
    </div>
  )
}

export default App
