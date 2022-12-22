import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/ImpresorasPage.css'
import { useEffect, useState } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useImpStore } from '../hooks/useImpStore'
import { ImpresorasForm } from '../components/ImpresorasForm'

export const ImpresorasPage = () => {

    const { impresoras, startGetImp } = useImpStore()
    const [busqueda, setBusqueda] = useState("")
    const [parametro, setParametro] = useState("")

    const submit = (e) => {
    }

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

    useEffect(() => {
        startGetImp()
    }, [submit])

    let activas = 0
    let desactivadas = 0

    impresoras.map(i => {
        if (i.estado === 'Activa') {
            activas++
        } else if (i.estado === 'Desactivada') {
            desactivadas++
        }
    })

    return (
        <>
            <ImpresorasForm onAction={submit} />

            <div className='text-center'>
                <h3>Impresoras <b className='text-success' title='Impresoras activas'>|{activas}|</b> <b className='text-secondary' title='Impresoras desactivadas'>|{desactivadas}|</b></h3>
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
            </div>

            <Row xs={1} sm={2} md={3} lg={4} className="g-4 text-center m-2">
                {Array.from(results).map(impresora => (
                    <Col key={impresora.uid}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <div>
                                        {
                                            (impresora.estado === 'Activa')
                                                ? <Badge type='button' bg="success mb-2 p-2 me-2 pe-5 ps-5" pill>Activa</Badge>
                                                : <Badge type='button' bg="secondary mb-2 p-2 me-2 pe-5 ps-5" pill>Desactivada</Badge>
                                        }
                                        <Badge type='button' bg="dark mb-2 p-2 me-2" pill><i className="bi bi-pencil-fill"></i></Badge>
                                        <Badge type='button' bg="danger mb-2 p-2" pill><i className="bi bi-trash-fill"></i></Badge>
                                    </div>
                                    <ListGroup.Item action variant="light">Ciudad: <b>{impresora.ciudad}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">Sucursal: <b>{impresora.sucursal}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">Marca: <b>{impresora.marca}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">Modelo: <b>{impresora.modelo}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">Tóner: <b>{impresora.toner}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">Propiedad: <b>{impresora.propia}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">Sector: <b>{impresora.sector}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">IP: <b>{impresora.ip}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">Código: <b>{impresora.codigo}</b></ListGroup.Item>
                                    <ListGroup.Item action variant="light">Proveedor: <b>{impresora.proveedor}</b></ListGroup.Item>
                                    {
                                        (impresora.comentarios !== '') && <ListGroup.Item action variant="light">Comentarios: <b>{impresora.comentarios}</b></ListGroup.Item>
                                    }
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}
