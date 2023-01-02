import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useForm } from '../../hooks/useForm'
import { useImpStore } from '../../hooks/useImpStore'

let formFields = {
    ciudad: '',
    sucursal: '',
    marca: '',
    modelo: '',
    toner: '',
    propia: '',
    estado: '',
    sector: '',
    codigo: '',
    ip: '',
    proveedor: '',
    comentarios: ''
}

export const ImpresorasForm = ({ submit }) => {

    const { startPostImp } = useImpStore()
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const { ciudad, sucursal, marca, modelo, toner,
        propia, estado, sector,
        codigo, ip, proveedor, comentarios, onInputChange, onResetForm } = useForm(formFields)

    submit = (e) => {
        e.preventDefault()

        startPostImp({
            ciudad, sucursal, marca, modelo, toner,
            propia, estado, sector, codigo, ip, proveedor, comentarios
        })

        onResetForm()
    }

    return (
        <>
            <nav className="navbar mb-2 mt-2">
                <div className="container-fluid justify-content-center">
                    <button className="btn btn-sm btn-outline-primary me-2 animate__animated animate__fadeIn" type="button" title='Agregar marca' onClick={handleShow}>Marcas</button>
                    <button className="btn btn-sm btn-outline-primary me-2 animate__animated animate__fadeIn" type="button" title='Agregar modelo' onClick={handleShow}>Modelos</button>
                    <button className="btn btn-outline-success me-2" type="button" title='Agregar impresora' onClick={handleShow}><i className="bi bi-plus-lg"></i></button>
                    <button className="btn btn-sm btn-outline-primary me-2 animate__animated animate__fadeIn" type="button" title='Agregar tóner' onClick={handleShow}>Tóners</button>
                    <button className="btn btn-sm btn-outline-primary animate__animated animate__fadeIn" type="button" title='Agregar proveedor' onClick={handleShow}>Proveedores</button>
                </div>
            </nav>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar impresora</Modal.Title>
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
                                name='marca'
                                className="form-select"
                                value={marca}
                                onChange={onInputChange}
                                required
                            >
                                <option defaultValue="">Marca...</option>
                                <option value="Samsung">Samsung</option>
                                <option value="Lexmark">Lexmark</option>
                                <option value="HP">HP</option>
                                <option value="Ricoh">Ricoh</option>
                                <option value="Brother">Brother</option>
                                <option value="Canon">Canon</option>
                            </select>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Modelo"
                                name='modelo'
                                value={modelo}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <select
                                className="form-select"
                                name='toner'
                                value={toner}
                                onChange={onInputChange}
                            >
                                <option defaultValue="">Tóner...</option>
                                <option value="MGN-CF-217A">MGN-CF-217A</option>
                            </select>
                            <select
                                className="form-select"
                                name='propia'
                                value={propia}
                                onChange={onInputChange}
                                required
                            >
                                <option defaultValue="">Propiedad...</option>
                                <option value="Alquilada">Alquilada</option>
                                <option value="Propia">Propia</option>
                            </select>
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
                                <option value="Activa">Activa</option>
                                <option value="Inactiva">Inactiva</option>
                            </select>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Sector"
                                name='sector'
                                value={sector}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Código"
                                name='codigo'
                                value={codigo}
                                onChange={onInputChange}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="IP"
                                name='ip'
                                value={ip}
                                onChange={onInputChange}
                            />

                        </div>

                        {
                            (propia === 'Alquilada') &&
                            <div className="input-group input-group-sm mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Proveedor"
                                    name='proveedor'
                                    value={proveedor}
                                    onChange={onInputChange}
                                />
                            </div>
                        }

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
                            <button className='btn btn-sm btn-outline-success' type='submit' onClick={handleClose}>
                                Guardar
                            </button>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
