import { useState } from "react"
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useForm } from "../../hooks/useForm"

let formFields = {
    uid: '',
    usuario: '',
    estado: '',
    comentarios: ''
}

export const CelularesList = ({ results, startDeleteCel, startPutCel, submit }) => {

    const [edit, setEdit] = useState("")
    const [editId, setEditId] = useState("")

    let { uid, usuario, estado, comentarios, onInputChange } = useForm(formFields)

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

    const deleteCel = (id) => {
        Swal.fire({
            title: 'Desea borrar celular?',
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
                startDeleteCel(id)
            }
        })
    }

    submit = (e) => {
        e.preventDefault()
        if (usuario === '' || estado === '') {
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos deben completarse',
                text: '"Comentarios" es opcional',
            })
            return
        }
        startPutCel({
            uid, usuario, estado, comentarios
        })
        setEdit(false)
    }

    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 text-center m-2 animate__animated animate__fadeIn">
            {Array.from(results).map(celular => (
                <Col key={celular.uid}>
                    <Card key={uid = celular.uid}>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <div>
                                    {
                                        (celular.estado === 'Activo')
                                            ? <Badge bg="success mb-2 p-2 me-2 pe-4 ps-4" pill>Activo</Badge>
                                            : <Badge bg="secondary mb-2 p-2 me-2 pe-4 ps-4" pill>Inactivo</Badge>
                                    }
                                    {
                                        (editId === celular.uid && edit)
                                            ? <>
                                                <Badge type='button' bg="dark mb-2 p-2 me-2" pill onClick={() => closeEdit()} title='Cancelar'><i className="bi bi-x"></i></Badge>
                                            </>
                                            : <>
                                                <Badge type='button' bg="dark mb-2 p-2 me-2" pill onClick={() => editBtn(celular.uid)}><i className="bi bi-pencil-fill"></i></Badge>
                                                <Badge type='button' bg="danger mb-2 p-2" pill onClick={() => deleteCel(celular.uid)}><i className="bi bi-trash-fill"></i></Badge>
                                            </>
                                    }
                                </div>
                                {
                                    (editId === celular.uid && edit)
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
                                                            <option value="Activo">Activo</option>
                                                            <option value="Inactivo">Inactivo</option>
                                                        </select>
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item variant="light">Usuario:
                                                    <div className='input-group input-group-sm'>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder={celular.usuario}
                                                            value={usuario}
                                                            onChange={onInputChange}
                                                            name='usuario'
                                                            required
                                                        />
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item variant="light">Comentarios:
                                                    <div className='input-group input-group-sm'>
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={celular.comentarios}
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
                                            <ListGroup.Item variant="light">Ciudad: <b>{celular.ciudad}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Sucursal: <b>{celular.sucursal}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Facturación: <b>{celular.facturacion}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Marca: <b>{celular.marca}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Modelo: <b>{celular.modelo}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Usuario: <b>{celular.usuario}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Corporativo: <b>{celular.corporativo}</b></ListGroup.Item>
                                            <ListGroup.Item variant="light">Número: <b>{celular.numero}</b></ListGroup.Item>
                                            {
                                                (celular.comentarios !== '') && <ListGroup.Item variant="light">Comentarios: <b>{celular.comentarios}</b></ListGroup.Item>
                                            }
                                        </>
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            ))
            }
        </Row >
    )
}
