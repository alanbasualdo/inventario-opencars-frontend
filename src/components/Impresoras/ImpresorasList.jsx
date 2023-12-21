import { useState } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm'

let formFields = {
    uid: '',
    estado: '',
    sector: '',
    ip: '',
    comentarios: ''
}

export const ImpresorasList = ({ results, startDeleteImp, startPutImp, submit }) => {

    const [edit, setEdit] = useState("")
    const [editId, setEditId] = useState("")

    let { uid, estado, sector, ip, comentarios, onInputChange } = useForm(formFields)

    const editBtn = (id) => {
        Swal.fire({
            icon: 'info',
            title: 'Función deshabilitada',
            text: 'Estamos trabajando en esto.'
        })
        /* setEdit(true)
        setEditId(id) */
    }

    const closeEdit = () => {
        setEdit(false)
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
                    position: 'center',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                startDeleteImp(id)
            }
        })
    }

    submit = (e) => {
        e.preventDefault()
        if (estado === '' || sector === '' || ip === '') {
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos deben completarse',
                text: '"Comentarios" es opcional',
            })
            return
        }
        startPutImp({
            uid, estado, sector, ip, comentarios
        })
        setEdit(false)
    }

    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 text-center m-2 animate__animated animate__fadeIn">
            {Array.from(results).map(impresora => (
                <Col key={impresora.uid}>
                    <Card key={uid = impresora.uid}>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <div>
                                    {
                                        (impresora.estado === 'Activa')
                                            ? <Badge bg="success mb-2 p-2 me-2 pe-4 ps-4" pill>Activa</Badge>
                                            : <Badge bg="secondary mb-2 p-2 me-2 pe-4 ps-4" pill>Inactiva</Badge>
                                    }
                                    {
                                        (editId === impresora.uid && edit)
                                            ? <>
                                                <Badge type='button' bg="dark mb-2 p-2 me-2" pill onClick={() => closeEdit()} title='Cancelar'><i className="bi bi-x"></i></Badge>
                                            </>
                                            : <>
                                                <Badge type='button' bg="dark mb-2 p-2 me-2" pill onClick={() => editBtn(impresora.uid)}><i className="bi bi-pencil-fill"></i></Badge>
                                                <Badge type='button' bg="danger mb-2 p-2" pill onClick={() => deleteImp(impresora.uid)}><i className="bi bi-trash-fill"></i></Badge>
                                            </>
                                    }
                                </div>
                                {
                                    (editId === impresora.uid && edit)
                                        ? <>
                                            <form onSubmit={submit}>
                                                <ListGroup.Item variant="light">Estado:
                                                    <div className='input-group input-group-sm'>
                                                        <select
                                                            className="form-select"
                                                            onChange={onInputChange}
                                                            name='estado'
                                                            required
                                                        >
                                                            <option defaultValue="">Estado...</option>
                                                            <option value="Activa">Activa</option>
                                                            <option value="Inactiva">Inactiva</option>
                                                        </select>
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item variant="light">Sector:
                                                    <div className='input-group input-group-sm'>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={impresora.sector}
                                                            value={sector}
                                                            onChange={onInputChange}
                                                            name='sector'
                                                            required
                                                        />
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item variant="light">IP:
                                                    <div className='input-group input-group-sm'>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={impresora.ip}
                                                            value={ip}
                                                            onChange={onInputChange}
                                                            name='ip'
                                                            required
                                                        />
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item variant="light">Comentarios:
                                                    <div className='input-group input-group-sm'>
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={impresora.comentarios}
                                                            value={comentarios}
                                                            onChange={onInputChange}
                                                            name='comentarios'
                                                        />
                                                    </div>
                                                </ListGroup.Item>
                                                <div className='mt-2'>
                                                    <Badge type='button' bg="dark p-2 me-2" pill onClick={() => closeEdit()} title='Cancelar'><i className="bi bi-x"></i></Badge>
                                                    <button type='submit' className='btn btn-sm btn-success'><i className="bi bi-check-lg"></i></button>
                                                </div>
                                            </form>
                                        </>
                                        : <>
                                            <ListGroup.Item variant="light">Ciudad: <b>{impresora.ciudad}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Sucursal: <b>{impresora.sucursal}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Marca: <b>{impresora.marca}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Modelo: <b>{impresora.modelo}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Tóner: <b>{impresora.toner}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Propiedad: <b>{impresora.propia}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Sector: <b>{impresora.sector}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">IP: <b>{impresora.ip}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Código: <b>{impresora.codigo}</b></ListGroup.Item>
                                            {
                                                (impresora.proveedor !== '') && <ListGroup.Item variant="light">Proveedor: <b>{impresora.proveedor}</b></ListGroup.Item>
                                            }
                                            {
                                                (impresora.comentarios !== '') && <ListGroup.Item variant="light">Comentarios: <b>{impresora.comentarios}</b></ListGroup.Item>
                                            }
                                        </>
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}
