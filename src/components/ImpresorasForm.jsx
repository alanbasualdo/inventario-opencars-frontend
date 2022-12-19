import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export const ImpresorasForm = () => {

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    return (
        <>
            <nav className="navbar mb-4">
                <form className="container-fluid justify-content-center">
                    <button className="btn btn-outline-success" type="button" title='Agregar impresora' onClick={handleShow}><i className="bi bi-plus-lg"></i></button>
                </form>
            </nav>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar impresora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="input-group input-group-sm mb-2">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Ciudad</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Sucursal</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Marca</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>
                            <input type="text" className="form-control" placeholder="Modelo"></input>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Tóner</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Propia</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Estado</option>
                                <option value="1">Activa</option>
                                <option value="2">Desactivada</option>
                            </select>
                            <input type="text" className="form-control" placeholder="Sector" />
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <input type="text" className="form-control" placeholder="Código" />
                            <input type="text" className="form-control" placeholder="IP"></input>

                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <input type="text" className="form-control" placeholder="Proveedor"></input>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <textarea className="form-control" aria-label="With textarea" placeholder='Comentarios'></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-sm btn-outline-danger' onClick={handleClose}>
                        Cancelar
                    </button>
                    <button className='btn btn-sm btn-outline-success' onClick={handleClose}>
                        Guardar
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
