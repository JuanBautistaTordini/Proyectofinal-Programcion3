"use client"

import { useState } from "react"
import AdminLayout from "../../components/layout/AdminLayout"
import "../../styles/AdminPaquete.css"

function AdminPaquete() {
  const [paquetes, setPaquetes] = useState([
    {
      id: 1,
      titulo: "Aventura en la Montaña",
      precio: "$299",
      duracion: "3 días",
      activo: true,
    },
    {
      id: 2,
      titulo: "Expedición al Lago",
      precio: "$199",
      duracion: "2 días",
      activo: true,
    },
    {
      id: 3,
      titulo: "Tour Fotográfico",
      precio: "$399",
      duracion: "4 días",
      activo: false,
    },
  ])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [paqueteEditando, setPaqueteEditando] = useState(null)

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este paquete?")) {
      setPaquetes(paquetes.filter((p) => p.id !== id))
    }
  }

  const handleEditar = (paquete) => {
    setPaqueteEditando(paquete)
    setMostrarFormulario(true)
  }

  return (
    <AdminLayout>
      <div className="admin-paquetes">
        <div className="header-paquetes">
          <h1>Gestión de Paquetes</h1>
          <button
            className="boton-nuevo"
            onClick={() => {
              setPaqueteEditando(null)
              setMostrarFormulario(true)
            }}
          >
            + Nuevo Paquete
          </button>
        </div>

        <div className="tabla-container">
          <table className="tabla-paquetes">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Precio</th>
                <th>Duración</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.map((paquete) => (
                <tr key={paquete.id}>
                  <td>{paquete.id}</td>
                  <td>{paquete.titulo}</td>
                  <td>{paquete.precio}</td>
                  <td>{paquete.duracion}</td>
                  <td>
                    <span className={`estado ${paquete.activo ? "activo" : "inactivo"}`}>
                      {paquete.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <button className="boton-editar" onClick={() => handleEditar(paquete)}>
                      Editar
                    </button>
                    <button className="boton-eliminar" onClick={() => handleEliminar(paquete.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mostrarFormulario && (
          <div className="modal-overlay">
            <div className="modal-formulario">
              <h3>{paqueteEditando ? "Editar Paquete" : "Nuevo Paquete"}</h3>
              <form>
                <div className="campo-grupo">
                  <label>Título</label>
                  <input type="text" defaultValue={paqueteEditando?.titulo || ""} />
                </div>
                <div className="campo-grupo">
                  <label>Precio</label>
                  <input type="text" defaultValue={paqueteEditando?.precio || ""} />
                </div>
                <div className="campo-grupo">
                  <label>Duración</label>
                  <input type="text" defaultValue={paqueteEditando?.duracion || ""} />
                </div>
                <div className="botones-modal">
                  <button type="button" onClick={() => setMostrarFormulario(false)}>
                    Cancelar
                  </button>
                  <button type="submit">{paqueteEditando ? "Actualizar" : "Crear"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminPaquete
