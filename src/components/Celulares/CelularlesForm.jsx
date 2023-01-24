import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useCelStore } from "../../hooks/useCelStore"
import { useCityStore } from '../../hooks/useCityStore'
import { useForm } from "../../hooks/useForm"
import { useSucStore } from '../../hooks/useSucStore'
import { CelularesMarcas } from './CelularesMarcas'
import { CelularesModelos } from './CelularesModelos'

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

    const { startPostCel, marcas, modelos } = useCelStore()
    const { sucursales } = useSucStore()
    const { ciudades } = useCityStore()

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
                    <CelularesMarcas />
                    <button className="btn btn-outline-success me-2" type="button" title='Agregar celular' onClick={handleShow}><i className="bi bi-plus-lg"></i></button>
                    <CelularesModelos />
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
                                {
                                    ciudades.map(ciudad => (
                                        <option key={ciudad.nombre} value={ciudad.nombre}>{ciudad.nombre}</option>
                                    ))
                                }
                            </select>

                            <select
                                name='sucursal'
                                value={sucursal}
                                onChange={onInputChange}
                                className="form-select"
                                required
                            >
                                <option defaultValue="">Sucursal...</option>
                                {
                                    sucursales.map(sucursal => (
                                        <option key={sucursal.nombre} value={sucursal.nombre}>{sucursal.nombre}</option>
                                    ))
                                }
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
                                {
                                    marcas.map(marca => (
                                        <option key={marca.nombre} value={marca.nombre}>{marca.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <select
                                name='modelo'
                                className="form-select"
                                value={modelo}
                                onChange={onInputChange}
                                required
                            >
                                <option defaultValue="">Modelo...</option>
                                {
                                    modelos.map(modelo => (
                                        <option key={modelo.nombre} value={modelo.nombre}>{modelo.nombre}</option>
                                    ))
                                }
                            </select>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Usuario"
                                name='usuario'
                                value={usuario}
                                onChange={onInputChange}
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
            </Modal>
        </>
    )
}
