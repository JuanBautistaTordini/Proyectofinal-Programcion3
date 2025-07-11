"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/layout/Header"
import Banner from "../../components/layout/Banner"
import ProductCard from "../../components/layout/ProductCard"
import Data from "../../components/layout/Data"
import Footer from "../../components/layout/Footer"
import { getAllPackages } from "../../services/packageService"

function Home() {
  const navigate = useNavigate()
  const [paquetes, setPaquetes] = useState([])

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackages()
        setPaquetes(data)
        console.log("✅ Paquetes obtenidos:", data)
      } catch (error) {
        console.error("❌ Error al obtener paquetes:", error.message)
      }
    }

    fetchPackages()
  }, [])

  const handleCardClick = (id) => {
    navigate(`/packages/${id}`)
  }

  return (
    <>
      <Header />
      <Banner />
      <section className="productos-section">
        <div className="container">
          <h2 id="tu-aventura">Tu proxima aventura</h2>
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
