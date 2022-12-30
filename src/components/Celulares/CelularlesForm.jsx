import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useCelStore } from "../../hooks/useCelStore"
import { useForm } from "../../hooks/useForm"

let formFields = {
    ciudad: '',
    sucursal: '',
    marca: '',
    modelo: '',
    numero: '',
    usuario: '',
    estado: '',
    corporativo: '',
    facturacion: '',
    comentarios: ''
}

export const CelularlesForm = ({ submit }) => {

    const { startPostCel } = useCelStore()
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const { ciudad, sucursal, marca, modelo, numero,
        usuario, estado, corporativo,
        facturacion, comentarios, onInputChange, onResetForm } = useForm(formFields)

    submit = (e) => {
        e.preventDefault()

        startPostCel({
            ciudad, sucursal, facturacion, marca, modelo,
            usuario, estado, corporativo, numero, comentarios
        })

        onResetForm()
    }

    return (
        <>
            <nav className="navbar mb-2 mt-2">
                <div className="container-fluid justify-content-center">
                    <button className="btn btn-sm btn-outline-primary me-2 animate__animated animate__fadeIn" type="button" title='Agregar marca' onClick={handleShow}>Marca</button>
                    <button className="btn btn-outline-success me-2" type="button" title='Agregar celular' onClick={handleShow}><i className="bi bi-plus-lg"></i></button>
                    <button className="btn btn-sm btn-outline-primary animate__animated animate__fadeIn" type="button" title='Agregar modelo' onClick={handleShow}>Modelo</button>
                </div>
            </nav>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar celular</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit}>

                        <div className="input-group input-group-sm mb-2">
                            <select
                                name='ciudad'
                                value={ciudad}
                                onChange={onInputChange}
                                className="form-select"
                                required
                            >
                                <option defaultValue="">Ciudad...</option>
                                <option value="Junín">Junín</option>
                                <option value="Pergamino">Pergamino</option>
                                <option value="San Nicolás">San Nicolás</option>
                                <option value="Chivilcoy">Chivilcoy</option>
                                <option value="Bragado">Bragado</option>
                                <option value="9 de Julio">9 de Julio</option>
                                <option value="Santa Rosa">Santa Rosa</option>
                                <option value="General Pico">General Pico</option>
                            </select>

                            <select
                                name='sucursal'
                                value={sucursal}
                                onChange={onInputChange}
                                className="form-select"
                                required
                            >
                                <option defaultValue="">Sucursal...</option>
                                <option value="Fortecar">Fortecar</option>
                                <option value="Granville">Granville</option>
                                <option value="Opencars">Opencars</option>
                                <option value="Pampa Wagen">Pampa Wagen</option>
                                <option value="Granville Citroen">Granville Citroen</option>
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <select
                                className="form-select"
                                name='facturacion'
                                value={facturacion}
                                onChange={onInputChange}
                                required
                            >
                                <option defaultValue="">Facturación...</option>
                                <option value="Personal">Personal</option>
                                <option value="Movistar">Movistar</option>
                                <option value="Claro">Claro</option>
                            </select>
                            <select
                                name='marca'
                                className="form-select"
                                value={marca}
                                onChange={onInputChange}
                                required
                            >
                                <option defaultValue="">Marca...</option>
                                <option value="Samsung">Samsung</option>
                                <option value="TCL">TCL</option>
                                <option value="Apple">Apple</option>
                                <option value="Nokia">Nokia</option>
                                <option value="Motorola">Motorola</option>
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Modelo"
                                name='modelo'
                                value={modelo}
                                onChange={onInputChange}
                                required
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Usuario"
                                name='usuario'
                                value={usuario}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <select
                                className="form-select"
                                name='estado'
                                value={estado}
                                onChange={onInputChange}
                                required
                            >
                                <option defaultValue="">Estado...</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                            <select
                                className="form-select"
                                name='corporativo'
                                value={corporativo}
                                onChange={onInputChange}
                                required
                            >
                                <option defaultValue="">Corporativo...</option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número"
                                name='numero'
                                value={numero}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <textarea
                                className="form-control"
                                placeholder='Comentarios'
                                name='comentarios'
                                value={comentarios}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='text-center'>
                            {
                                (ciudad === '')
                                    ? <button className='btn btn-sm btn-outline-success' type='submit' onClick={handleClose} disabled>
                                        Guardar
                                    </button>
                                    : <button className='btn btn-sm btn-outline-success' type='submit' onClick={handleClose}>
                                        Guardar
                                    </button>
                            }
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
