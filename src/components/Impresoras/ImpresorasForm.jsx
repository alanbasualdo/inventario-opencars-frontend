import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useCityStore } from '../../hooks/useCityStore'
import { useForm } from '../../hooks/useForm'
import { useImpStore } from '../../hooks/useImpStore'
import { useSucStore } from '../../hooks/useSucStore'
import { ImpresorasMarcas } from './ImpresorasMarcas'
import { ImpresorasModelos } from './ImpresorasModelos'
import { ImpresorasProveedores } from './ImpresorasProveedores'
import { ImpresorasToners } from './ImpresorasToners'

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

    const { startPostImp, marcas, modelos, toners, proveedores } = useImpStore()
    const { sucursales } = useSucStore()
    const { ciudades } = useCityStore()

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
                    <ImpresorasMarcas />
                    <ImpresorasModelos />
                    <button className="btn btn-outline-success me-2" type="button" title='Agregar impresora' onClick={handleShow}><i className="bi bi-plus-lg"></i></button>
                    <ImpresorasToners />
                    <ImpresorasProveedores />
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
                                {
                                    ciudades.map(ciudad => (
                                        <option value={ciudad.nombre}>{ciudad.nombre}</option>
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
                                        <option value={sucursal.nombre}>{sucursal.nombre}</option>
                                    ))
                                }
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
                                {
                                    marcas.map(marca => (
                                        <option value={marca.nombre}>{marca.nombre}</option>
                                    ))
                                }
                            </select>

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
                                        <option value={modelo.nombre}>{modelo.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <select
                                className="form-select"
                                name='toner'
                                value={toner}
                                onChange={onInputChange}
                            >
                                <option defaultValue="">Tóner...</option>
                                {
                                    toners.map(toner => (
                                        <option value={toner.nombre}>{toner.nombre}</option>
                                    ))
                                }
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
                                <select
                                    className="form-select"
                                    name='proveedor'
                                    value={proveedor}
                                    onChange={onInputChange}
                                >
                                    <option defaultValue="">Proveedor...</option>
                                    {
                                        proveedores.map(proveedor => (
                                            <option value={proveedor.nombre}>{proveedor.nombre}</option>
                                        ))
                                    }
                                </select>
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
