import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

export const CelularesPage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <nav className="navbar mb-4">
                <form className="container-fluid justify-content-center">
                    <button className="btn btn-outline-success" type="button" title='Agregar impresora' onClick={handleShow}><i className="bi bi-plus-lg"></i></button>
                </form>
            </nav>

            <div className='text-center'>
                <h3>Celulares</h3>
            </div>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar celular</Modal.Title>
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
                                <option selected>Es propia?</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <input type="text" className="form-control" placeholder="Sector" />
                            <input type="text" className="form-control" placeholder="IP"></input>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <input type="text" className="form-control" placeholder="Código" />
                            <input type="text" className="form-control" placeholder="Proveedor"></input>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <input type="text" className="form-control" placeholder="Facturado para..." />
                            <textarea class="form-control" aria-label="With textarea" placeholder='Comentarios'></textarea>
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

            <Row xs={1} md={2} lg={3} className="g-4 text-center m-2">
                {Array.from({ length: 12 }).map((_, idx) => (
                    <Col>
                        <Card key={idx}>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}
