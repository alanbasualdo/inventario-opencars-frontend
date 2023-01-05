import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { CelularesList } from '../components/Celulares/CelularesList'
import { CelularlesForm } from '../components/Celulares/CelularlesForm'
import { useCelStore } from '../hooks/useCelStore'

export const CelularesPage = () => {

    const { celulares, marcas, modelos, startGetCel, startDeleteCel, startPutCel } = useCelStore()
    const [parametro, setParametro] = useState("")
    const [busqueda, setBusqueda] = useState("")

    const search = (e) => {
        setBusqueda(e.target.value)
    }

    let results = celulares

    if (parametro === 'ciudad') {
        results = celulares.filter((dato) => dato.ciudad.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'sucursal') {
        results = celulares.filter((dato) => dato.sucursal.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'marca') {
        results = celulares.filter((dato) => dato.marca.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'modelo') {
        results = celulares.filter((dato) => dato.modelo.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'toner') {
        results = celulares.filter((dato) => dato.numero.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'propiedad') {
        results = celulares.filter((dato) => dato.usuario.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'sector') {
        results = celulares.filter((dato) => dato.facturacion.toLowerCase().includes(busqueda.toLowerCase()))
    }

    const submit = () => { }

    useEffect(() => {
        startGetCel()
    }, [])

    let activos = 0
    let inactivos = 0

    celulares.map(i => {
        if (i.estado === 'Activo') {
            activos++
        } else if (i.estado === 'Inactivo') {
            inactivos++
        }
    })

    return (
        <>
            <CelularlesForm submit={submit} />

            <div className='text-center'>
                <h3>Celulares <b className='text-success' title='Celulares activos'>|{activos}|</b> <b className='text-secondary' title='Celulares inactivos'>|{inactivos}|</b></h3>
            </div>

            <div className="col-12 d-flex justify-content-center align-items-center">
                <div className="input-group search me-3 ms-3 mt-3">
                    <select
                        className="form-select"
                        name='param'
                        value={parametro}
                        onChange={(e) => setParametro(e.target.value)}
                    >
                        <option value="">Buscar por...</option>
                        <option value="ciudad">Ciudad</option>
                        <option value="sucursal">Sucursal</option>
                        <option value="marca">Marca</option>
                        <option value="modelo">Modelo</option>
                        <option value="toner">Número</option>
                        <option value="propiedad">Usuario</option>
                        <option value="sector">Facturación</option>
                    </select>
                    {
                        (parametro === "")
                            ? <input type="text" className="form-control" placeholder='Búsqueda' value={busqueda} onChange={search} disabled />
                            : <input type="text" className="form-control" placeholder='Búsqueda' value={busqueda} onChange={search} />
                    }
                </div>
                <div>
                    {(parametro !== "") && <Badge bg="success mt-3" pill>{results.length}</Badge>}
                </div>
            </div>

            <CelularesList
                results={results}
                startDeleteCel={startDeleteCel}
                startPutCel={startPutCel}
                submit={submit}
                marcas={marcas}
                modelos={modelos}
            />

        </>
    )
}
