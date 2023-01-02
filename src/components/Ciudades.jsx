import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import { useCityStore } from "../hooks/useCityStore"

export const Ciudades = () => {

  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState(false)
  const [nombre, setNombre] = useState("")

  const { startGetCity, startPostCity, startDeleteCity, ciudades } = useCityStore()

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const toggleCheck = () => {
    setChecked(!checked)
  }

  const deleteCity = (id) => {
    Swal.fire({
      title: 'Desea borrar ciudad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        startDeleteCity(id)
      }
    })
  }

  const submit = (e) => {
    e.preventDefault()
    startPostCity({ nombre })
    setNombre('')
  }

  useEffect(() => {
    startGetCity()
  }, [ciudades])

  return (
    <>
      <li className="dropdown-item" onClick={handleShow}>Ciudades</li>

      <Modal show={show} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Ciudades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submit}>
            <div className="input-group input-group-sm">
              <span className="input-group-text">
                <div className="form-check form-switch mt-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    onChange={toggleCheck}
                  />
                </div>
              </span>
              {
                (checked)
                  ? <>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre de la ciudad"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      name="nombre"
                    />
                    <button className="btn btn-outline-success" type="submit">Agregar</button>
                  </>
                  : <>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre de la ciudad"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      name="nombre"
                      disabled
                    />
                    <button className="btn btn-outline-success" type="submit" disabled>Agregar</button>
                  </>
              }
            </div>
          </form>

          <ol className="list-group list-group m-4">
            {
              ciudades.map(ciudad => (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={ciudad.uid}>
                  <div className="ms-2 me-auto">
                    {ciudad.nombre}
                  </div>
                  <span
                    type='button'
                    className="badge bg-danger rounded-pill p-2"
                    title="Eliminar"
                    onClick={() => deleteCity(ciudad.uid)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </span>
                </li>
              ))
            }
          </ol>

        </Modal.Body>
      </Modal>
    </>
  )
}
