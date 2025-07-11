"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../components/layout/AdminLayout"
import { getAllPackages, updatePackage, createPackage, deletePackage } from "../../services/packageService"
import "../../styles/AdminPaquete.css"

function AdminPaquete() {
  const [paquetes, setPaquetes] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [paqueteEditando, setPaqueteEditando] = useState(null)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [paqueteAEliminar, setPaqueteAEliminar] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [backupPaquete, setBackupPaquete] = useState(null)

  // Estado para vista previa en tiempo real
  const [vistaPrevia, setVistaPrevia] = useState(null)

  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        const response = await getAllPackages()
        const paquetesObtenidos = response.allPackages || response
        setPaquetes(paquetesObtenidos)
      } catch (error) {
        console.error("Error al cargar paquetes:", error)
      }
    }
    fetchPaquetes()
  }, [])

  // Actualizar vista previa en tiempo real
  useEffect(() => {
    if (mostrarFormulario) {
      const nuevaVistaPrevia = {
        id: paqueteEditando?.id || "nuevo",
        title: title || "Sin título",
        description: description || "Sin descripción",
        location: location || "Sin ubicación",
        price: Number.parseFloat(price) || 0,
        image_url: imageUrl || "",
      }
      setVistaPrevia(nuevaVistaPrevia)
    }
  }, [title, description, price, location, imageUrl, mostrarFormulario, paqueteEditando])

  const handleEditar = (paquete) => {
    setPaqueteEditando(paquete)
    setBackupPaquete({ ...paquete })
    setTitle(paquete.title || "")
    setDescription(paquete.description || "")
    setPrice(paquete.price?.toString() || "")
    setLocation(paquete.location || "")
    setImageUrl(paquete.image_url || "")
    setMostrarFormulario(true)
  }

  const handleNuevo = () => {
    setPaqueteEditando(null)
    setBackupPaquete(null)
    setTitle("")
    setDescription("")
    setPrice("")
    setLocation("")
    setImageUrl("")
    setMostrarFormulario(true)
  }

  const handleChangeTitle = (val) => {
    setTitle(val)
    // Actualización en tiempo real en la tabla para edición
    if (paqueteEditando) {
      setPaquetes(paquetes.map((p) => (p.id === paqueteEditando.id ? { ...p, title: val } : p)))
    }
  }

  const handleChangeDescription = (val) => {
    setDescription(val)
    // Actualización en tiempo real en la tabla para edición
    if (paqueteEditando) {
      setPaquetes(paquetes.map((p) => (p.id === paqueteEditando.id ? { ...p, description: val } : p)))
    }
  }

  const handleChangePrice = (val) => {
    setPrice(val)
    // Actualización en tiempo real en la tabla para edición
    if (paqueteEditando) {
      setPaquetes(paquetes.map((p) => (p.id === paqueteEditando.id ? { ...p, price: Number.parseFloat(val) || 0 } : p)))
    }
  }

  const handleChangeLocation = (val) => {
    setLocation(val)
    // Actualización en tiempo real en la tabla para edición
    if (paqueteEditando) {
      setPaquetes(paquetes.map((p) => (p.id === paqueteEditando.id ? { ...p, location: val } : p)))
    }
  }

  const handleChangeImageUrl = (val) => {
    setImageUrl(val)
    // Actualización en tiempo real en la tabla para edición
    if (paqueteEditando) {
      setPaquetes(paquetes.map((p) => (p.id === paqueteEditando.id ? { ...p, image_url: val } : p)))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    // Validaciones
    if (!title.trim() || !description.trim()) {
      alert("Título y descripción son obligatorios.")
      return
    }
  
    const precioNum = Number.parseFloat(price)
    if (isNaN(precioNum) || precioNum < 0) {
      alert("El precio debe ser un número válido y positivo.")
      return
    }
  
    const packageData = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      price: precioNum,
      image_url: imageUrl.trim(),
    }
  
    try {
      // Crear o actualizar
      if (paqueteEditando) {
        const actualizado = await updatePackage(paqueteEditando.id, packageData)
        setPaquetes(paquetes.map((p) => (p.id === actualizado.id ? actualizado : p)))
      } else {
        await createPackage(packageData)
  
        // 🔄 Refrescar paquetes desde el backend para evitar errores visuales como NaN
        const respuesta = await getAllPackages()
        const paquetesActualizados = respuesta.allPackages || respuesta
        setPaquetes(paquetesActualizados)
      }
  
      // Limpiar formulario
      setMostrarFormulario(false)
      setPaqueteEditando(null)
      setBackupPaquete(null)
      setVistaPrevia(null)
      setTitle("")
      setDescription("")
      setPrice("")
      setLocation("")
      setImageUrl("")
    } catch (error) {
      console.error("Error al guardar paquete:", error)
      alert(error.message || "Hubo un error al guardar el paquete")
    }
  }
  

  const handleCancelar = () => {
    if (paqueteEditando && backupPaquete) {
      // Restaurar valores originales en la tabla
      setPaquetes(paquetes.map((p) => (p.id === backupPaquete.id ? backupPaquete : p)))
    }
    setMostrarFormulario(false)
    setPaqueteEditando(null)
    setBackupPaquete(null)
    setVistaPrevia(null)
    setTitle("")
    setDescription("")
    setPrice("")
    setLocation("")
    setImageUrl("")
  }

  const pedirConfirmacionEliminar = (paquete) => {
    setPaqueteAEliminar(paquete)
    setMostrarConfirmacion(true)
  }

  const confirmarEliminar = async () => {
    try {
      await deletePackage(paqueteAEliminar.id)
      setPaquetes(paquetes.filter((p) => p.id !== paqueteAEliminar.id))
      setMostrarConfirmacion(false)
      setPaqueteAEliminar(null)
    } catch (error) {
      console.error("Error al eliminar paquete:", error)
      alert("Hubo un error al eliminar el paquete")
    }
  }

  const cancelarEliminar = () => {
    setMostrarConfirmacion(false)
    setPaqueteAEliminar(null)
  }

  return (
    <AdminLayout>
      <div className="admin-paquetes">
        <div className="header-paquetes">
          <h1>Gestión de Paquetes</h1>
          <button className="boton-nuevo" onClick={handleNuevo}>
            + Nuevo Paquete
          </button>
        </div>

        <div className="tabla-container">
          <table className="tabla-paquetes">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Ubicación</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.map((paquete) => (
                <tr key={paquete.id} className={paqueteEditando?.id === paquete.id ? "editando" : ""}>
                  <td>{paquete.id}</td>
                  <td>
                    {paquete.title}
                    {paqueteEditando?.id === paquete.id && <span className="indicador-editando"> ✏️</span>}
                  </td>
                  <td>{paquete.description}</td>
                  <td>{paquete.location}</td>
                  <td>${Number(paquete.price).toFixed(2)}</td>
                  <td>
                    <div className="acciones-paquete">
                      <button
                        className="boton_editar"
                        onClick={() => handleEditar(paquete)}
                        disabled={paqueteEditando?.id === paquete.id}
                      >
                        {paqueteEditando?.id === paquete.id ? "Editando..." : "Editar"}
                      </button>
                      <button
                        className="boton-eliminar"
                        onClick={() => pedirConfirmacionEliminar(paquete)}
                        disabled={paqueteEditando?.id === paquete.id}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Fila de vista previa para nuevo paquete */}
              {mostrarFormulario && !paqueteEditando && vistaPrevia && (
                <tr className="vista-previa-nueva">
                  <td>
                    <em>Nuevo</em>
                  </td>
                  <td>
                    {vistaPrevia.title}
                    <span className="indicador-nuevo"> ✨</span>
                  </td>
                  <td>{vistaPrevia.description}</td>
                  <td>{vistaPrevia.location}</td>
                  <td>${Number(vistaPrevia.price).toFixed(2)}</td>
                  <td>
                    <em>Vista previa</em>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {mostrarFormulario && (
          <div className="modal-overlay">
            <div className="modal-formulario">
              <div className="modal-header">
                <h3>{paqueteEditando ? "Editar Paquete" : "Nuevo Paquete"}</h3>
                {!paqueteEditando && (
                  <small className="vista-previa-texto">Los cambios se muestran en tiempo real en la tabla</small>
                )}
              </div>

              <div className="modal-content">
                <form onSubmit={handleSubmit} className="formulario-paquete">
                  {/* Título */}
                  <div className="campo-grupo">
                    <label>Título</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleChangeTitle(e.target.value)}
                      placeholder="Ingresa el título del paquete"
                      required
                    />
                  </div>

                  {/* Descripción */}
                  <div className="campo-grupo">
                    <label>Descripción</label>
                    <textarea
                      value={description}
                      onChange={(e) => handleChangeDescription(e.target.value)}
                      placeholder="Describe el paquete turístico"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  {/* Ubicación */}
                  <div className="campo-grupo">
                    <label>Ubicación</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => handleChangeLocation(e.target.value)}
                      placeholder="Ubicación del destino"
                      required
                    />
                  </div>

                  {/* URL de la imagen */}
                  <div className="campo-grupo">
                    <label>URL de la imagen</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => handleChangeImageUrl(e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      required
                    />
                    {imageUrl && (
                      <div className="vista-previa-imagen">
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt="Vista previa"
                          style={{
                            width: "100px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            marginTop: "8px",
                          }}
                          onError={(e) => {
                            e.target.style.display = "none"
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Precio */}
                  <div className="campo-grupo">
                    <label>Precio</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={price}
                      onChange={(e) => handleChangePrice(e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  {/* Vista previa del paquete */}
                  {vistaPrevia && (
                    <div className="vista-previa-card">
                      <h4>Vista Previa:</h4>
                      <div className="preview-card">
                        <strong>{vistaPrevia.title}</strong>
                        <p>{vistaPrevia.description}</p>
                        <p>
                          <em>📍 {vistaPrevia.location}</em>
                        </p>
                        <p>
                          <strong>💰 ${Number(vistaPrevia.price).toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Botones */}
                  <div className="botones-modal">
                    <button type="button" onClick={handleCancelar}>
                      Cancelar
                    </button>
                    <button type="submit">{paqueteEditando ? "Actualizar" : "Crear"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {mostrarConfirmacion && (
          <div className="modal-overlay">
            <div className="modal-formulario">
              <h3>Confirmar eliminación</h3>
              <p>¿Seguro que querés eliminar el paquete "{paqueteAEliminar.title}"?</p>
              <div className="botones-modal">
                <button onClick={cancelarEliminar}>Cancelar</button>
                <button onClick={confirmarEliminar} className="boton-eliminar">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminPaquete
