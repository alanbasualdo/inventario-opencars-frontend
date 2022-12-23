import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/ImpresorasPage.css'
import { useEffect, useState } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useImpStore } from '../hooks/useImpStore'
import { ImpresorasForm } from '../components/ImpresorasForm'

export const ImpresorasPage = () => {

    const { impresoras, startGetImp, startDeleteImp } = useImpStore()
    const [busqueda, setBusqueda] = useState("")
    const [parametro, setParametro] = useState("")
    const [edit, setEdit] = useState("")

    const submit = (e) => {
    }

    const search = (e) => {
        setBusqueda(e.target.value)
    }

    const editBtn = (id) => {
        setEdit(true)
        setIdCard(id)
    }

    const closeEdit = () => {
        setEdit(false)
        setIdCard("")
    }

    const deleteImp = (id) => {
        Swal.fire({
            title: 'Desea borrar impresora?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                startDeleteImp(id)
            }
        })
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
            <ImpresorasForm onAction={submit} />

            <div className='text-center'>
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
            </div>

            <Row xs={1} sm={2} md={3} lg={4} className="g-4 text-center m-2">
                {Array.from(results).map(impresora => (
                    <Col key={impresora.uid}>
                        <Card>
                            <form>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <div>
                                            {
                                                (impresora.estado === 'Activa')
                                                    ? <Badge type='button' bg="success mb-2 p-2 me-2 pe-4 ps-4" pill>Activa</Badge>
                                                    : <Badge type='button' bg="secondary mb-2 p-2 me-2 pe-4 ps-4" pill>Inactiva</Badge>
                                            }
                                            {
                                                edit
                                                    ? <>
                                                        <Badge type='button' bg="dark mb-2 p-2 me-2" pill onClick={() => closeEdit()} title='Cancelar'><i className="bi bi-x"></i></Badge>
                                                        <Badge type='button' bg="primary mb-2 p-2" pill title='Guardar'><i className="bi bi-check-lg"></i></Badge>
                                                    </>
                                                    : <>
                                                        <Badge type='button' bg="dark mb-2 p-2 me-2" pill onClick={() => editBtn(impresora.uid)}><i className="bi bi-pencil-fill"></i></Badge>
                                                        <Badge type='button' bg="danger mb-2 p-2" pill onClick={() => deleteImp(impresora.uid)}><i className="bi bi-trash-fill"></i></Badge>
                                                    </>
                                            }
                                        </div>
                                        <ListGroup.Item variant="light">Ciudad: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.ciudad} value={impresora.ciudad} />
                                            : <b>{impresora.ciudad}</b>}
                                        </ListGroup.Item>
                                        <ListGroup.Item variant="light">Sucursal: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.sucursal} value={impresora.sucursal} />
                                            : <b>{impresora.sucursal}</b>}
                                        </ListGroup.Item>
                                        <ListGroup.Item variant="light">Marca: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.marca} value={impresora.marca} />
                                            : <b>{impresora.marca}</b>}</ListGroup.Item>
                                        <ListGroup.Item variant="light">Modelo: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.modelo} value={impresora.modelo} />
                                            : <b>{impresora.modelo}</b>}</ListGroup.Item>
                                        <ListGroup.Item variant="light">Tóner: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.toner} value={impresora.toner} />
                                            : <b>{impresora.toner}</b>}</ListGroup.Item>
                                        <ListGroup.Item variant="light">Propiedad: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.propia} value={impresora.propia} />
                                            : <b>{impresora.propia}</b>}</ListGroup.Item>
                                        <ListGroup.Item variant="light">Sector: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.sector} value={impresora.sector} />
                                            : <b>{impresora.sector}</b>}</ListGroup.Item>
                                        <ListGroup.Item variant="light">IP: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.ip} value={impresora.ip} />
                                            : <b>{impresora.ip}</b>}</ListGroup.Item>
                                        <ListGroup.Item variant="light">Código: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.codigo} value={impresora.codigo} />
                                            : <b>{impresora.codigo}</b>}</ListGroup.Item>
                                        <ListGroup.Item variant="light">Proveedor: {edit
                                            ? <input type="text" className="form-control" placeholder={impresora.proveedor} value={impresora.proveedor} />
                                            : <b>{impresora.proveedor}</b>}</ListGroup.Item>
                                        {
                                            (impresora.comentarios !== '') && <ListGroup.Item variant="light">Comentarios: {edit
                                                ? <input type="text" className="form-control" placeholder={impresora.comentarios} value={impresora.comentarios} />
                                                : <b>{impresora.comentarios}</b>}</ListGroup.Item>
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </form>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}
