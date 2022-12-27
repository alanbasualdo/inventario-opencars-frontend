import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/ImpresorasPage.css'
import { useEffect, useState } from 'react'
import { useImpStore } from '../hooks/useImpStore'
import { ImpresorasForm } from '../components/ImpresorasForm'
import { ImpresorasList } from '../components/ImpresorasList'
import { Badge } from 'react-bootstrap'

export const ImpresorasPage = () => {

    const { impresoras, startGetImp, startDeleteImp, startPutImp } = useImpStore()
    const [parametro, setParametro] = useState("")
    const [busqueda, setBusqueda] = useState("")

    const search = (e) => {
        setBusqueda(e.target.value)
    }

    let results = impresoras

    if (parametro === 'ciudad') {
        results = impresoras.filter((dato) => dato.ciudad.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'sucursal') {
        results = impresoras.filter((dato) => dato.sucursal.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'marca') {
        results = impresoras.filter((dato) => dato.marca.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'modelo') {
        results = impresoras.filter((dato) => dato.modelo.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'toner') {
        results = impresoras.filter((dato) => dato.toner.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'propiedad') {
        results = impresoras.filter((dato) => dato.propia.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'sector') {
        results = impresoras.filter((dato) => dato.sector.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'ip') {
        results = impresoras.filter((dato) => dato.ip.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'codigo') {
        results = impresoras.filter((dato) => dato.codigo.toLowerCase().includes(busqueda.toLowerCase()))
    } else if (parametro === 'proveedor') {
        results = impresoras.filter((dato) => dato.proveedor.toLowerCase().includes(busqueda.toLowerCase()))
    }

    const submit = () => { }

    useEffect(() => {
        startGetImp()
    }, [submit])

    let activas = 0
    let inactivas = 0

    impresoras.map(i => {
        if (i.estado === 'Activa') {
            activas++
        } else if (i.estado === 'Inactiva') {
            inactivas++
        }
    })

    return (
        <>
            <ImpresorasForm submit={submit} />

            < div className='text-center'>
                <h3>Impresoras <b className='text-success' title='Impresoras activas'>|{activas}|</b> <b className='text-secondary' title='Impresoras inactivas'>|{inactivas}|</b></h3>
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
                        <option value="toner">Tóner</option>
                        <option value="propiedad">Propiedad</option>
                        <option value="sector">Sector</option>
                        <option value="ip">IP</option>
                        <option value="codigo">Código</option>
                        <option value="proveedor">Proveedor</option>
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

            <ImpresorasList
                results={results}
                startDeleteImp={startDeleteImp}
                startPutImp={startPutImp}
                submit={submit}
            />
        </>
    )
}
