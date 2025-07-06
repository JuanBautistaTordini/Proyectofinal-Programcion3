"use client"
import { useNavigate } from "react-router-dom"
import Header from "../../components/layout/Header"
import Banner from "../../components/layout/Banner"
import ProductCard from "../../components/layout/ProductCard"
import Data from "../../components/layout/Data"
import Footer from "../../components/layout/Footer"

function Home() {
  const navigate = useNavigate()

  const paquetes = [
    {
      id: 1,
      titulo: "Aventura en la Montaña",
      descripcion: "Explorá impresionantes cordilleras con nuestros tours guiados",
      precio: "$299",
      imagen:
        "https://blog.chapkadirect.es/wp-content/uploads/2019/03/Hombre-con-los-brazos-abiertos-delante-de-la-laguna-esmeralda-en-la-Patagonia-argentina.jpg",
    },
    {
      id: 2,
      titulo: "Expedición al Lago",
      descripcion: "Descubrí lagos prístinos y aguas cristalinas",
      precio: "$199",
      imagen: "https://www.cronista.com/files/image/303/303713/5ffe1fa025c8d.jpg",
    },
    {
      id: 3,
      titulo: "Tour Fotográfico",
      descripcion: "Capturá paisajes asombrosos con orientación profesional",
      precio: "$399",
      imagen: "https://www.rionegro.com.ar/wp-content/uploads/2023/10/patagonia-perito-moreno.jpg",
    }
  ]

  const handleCardClick = (id) => {
    navigate(`/paquete/${id}`)
  }

  return (
    <>
      <Header />
      <Banner />
      <section className="productos-section">
        <div className="container">
          <h2>Tu Próxima Aventura</h2>
          <div className="products-grid">
            {paquetes.map((paquete) => (
              <div key={paquete.id} onClick={() => handleCardClick(paquete.id)}>
                <ProductCard paquetes={paquete} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Data />
      <Footer />
    </>
  )
}

export default Home
