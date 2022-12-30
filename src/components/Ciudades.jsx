import { useState } from "react"
import Modal from 'react-bootstrap/Modal'

export const Ciudades = () => {

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <>
      <li className="dropdown-item" onClick={handleShow}>Agregar ciudad</li>

      <Modal show={show} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar ciudad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de la ciudad"
              />
              <button className="btn btn-outline-success" type="button">Agregar</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-sm btn-outline-danger' onClick={handleClose}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
