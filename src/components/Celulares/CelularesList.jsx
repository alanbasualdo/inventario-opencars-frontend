import { useState } from "react"
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useCityStore } from "../../hooks/useCityStore"
import { useForm } from "../../hooks/useForm"
import { useSucStore } from "../../hooks/useSucStore"

let formFields = {
    uid: '',
    ciudad: '',
    sucursal: '',
    facturacion: '',
    marca: '',
    modelo: '',
    usuario: '',
    estado: '',
    corporativo: '',
    numero: '',
    comentarios: ''
}

export const CelularesList = ({ results, startDeleteCel, startPutCel, submit, marcas, modelos }) => {

    const { ciudades } = useCityStore()
    const { sucursales } = useSucStore()

    const [edit, setEdit] = useState("")
    const [editId, setEditId] = useState("")

    let { uid, ciudad, sucursal, facturacion, marca, modelo,
        usuario, estado, corporativo,
        numero, comentarios, onInputChange } = useForm(formFields)

    const editBtn = (id) => {
        setEdit(true)
        setEditId(id)
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
        if (ciudad === '' || sucursal === '' || facturacion === '' || marca === '' ||
            modelo === '' || usuario === '' || estado === '' || corporativo === '' ||
            numero === '') {
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos deben completarse',
                text: '"Comentarios" es opcional',
            })
            return
        }
        startPutCel({
            uid, ciudad, sucursal, facturacion, marca, modelo,
            usuario, estado, corporativo, numero, comentarios
        })

        setEdit(false)
    }

    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 text-center m-2 animate__animated animate__fadeIn">
            {Array.from(results).map(celular => (
                <Col key={celular.uid}>
                    {uid = celular.uid}
                    <Card>
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
                                                <ListGroup.Item variant="light">Ciudad: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <select
                                                            name='ciudad'
                                                            onChange={onInputChange}
                                                            className="form-select"
                                                            required
                                                        >
                                                            <option defaultValue={celular.ciudad}>{celular.ciudad}</option>
                                                            {
                                                                ciudades.map(ciudad => (
                                                                    (ciudad.nombre !== celular.ciudad) &&
                                                                    <option value={ciudad.nombre}>{ciudad.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    : <b>{celular.ciudad}</b>}
                                                </ListGroup.Item>
                                                <ListGroup.Item variant="light">Sucursal: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <select
                                                            name='sucursal'
                                                            onChange={onInputChange}
                                                            className="form-select"
                                                            required
                                                        >
                                                            <option defaultValue={celular.sucursal}>{celular.sucursal}</option>
                                                            {
                                                                sucursales.map(sucursal => (
                                                                    (sucursal.nombre !== celular.sucursal) &&
                                                                    <option value={sucursal.nombre}>{sucursal.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    : <b>{celular.sucursal}</b>}
                                                </ListGroup.Item>
                                                <ListGroup.Item variant="light">Facturación: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <select
                                                            className="form-select"
                                                            name='facturacion'
                                                            onChange={onInputChange}
                                                            required
                                                        >
                                                            <option defaultValue={celular.facturacion}>{celular.facturacion}</option>
                                                            {
                                                                (celular.facturacion == 'Personal') && <>
                                                                    <option value="Movistar">Movistar</option>
                                                                    <option value="Claro">Claro</option>
                                                                </>
                                                            }
                                                            {
                                                                (celular.facturacion == 'Movistar') && <>
                                                                    <option value="Personal">Personal</option>
                                                                    <option value="Claro">Claro</option>
                                                                </>
                                                            }
                                                            {
                                                                (celular.facturacion == 'Claro') && <>
                                                                    <option value="Personal">Personal</option>
                                                                    <option value="Movistar">Movistar</option>
                                                                </>
                                                            }
                                                        </select>
                                                    </div>
                                                    : <b>{celular.marca}</b>}</ListGroup.Item>
                                                <ListGroup.Item variant="light">Marca: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <select
                                                            name='marca'
                                                            className="form-select"
                                                            onChange={onInputChange}
                                                            required
                                                        >
                                                            <option defaultValue={celular.marca}>{celular.marca}</option>
                                                            {
                                                                marcas.map(marca => (
                                                                    (marca.nombre !== celular.marca) &&
                                                                    <option value={marca.nombre}>{marca.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    : <b>{celular.marca}</b>}</ListGroup.Item>
                                                <ListGroup.Item variant="light">Modelo: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <select
                                                            name='modelo'
                                                            className="form-select"
                                                            onChange={onInputChange}
                                                            required
                                                        >
                                                            <option defaultValue={celular.modelo}>{celular.modelo}</option>
                                                            {
                                                                modelos.map(modelo => (
                                                                    (modelo.nombre !== celular.modelo) &&
                                                                    <option value={modelo.nombre}>{modelo.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    : <b>{celular.modelo}</b>}</ListGroup.Item>
                                                <ListGroup.Item variant="light">Usuario: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder={celular.usuario}
                                                            value={usuario}
                                                            onChange={onInputChange}
                                                            name='usuario'
                                                        />
                                                    </div>
                                                    : <b>{celular.usuario}</b>}</ListGroup.Item>
                                                <ListGroup.Item variant="light">Estado: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <select
                                                            className="form-select"
                                                            onChange={onInputChange}
                                                            name='estado'
                                                            required
                                                        >
                                                            <option defaultValue={celular.estado}>{celular.estado}</option>
                                                            {
                                                                (celular.estado === 'Activo')
                                                                    ? <option value="Inactivo">Inactivo</option>
                                                                    : <option value="Activo">Activo</option>
                                                            }
                                                        </select>
                                                    </div>
                                                    : <b>{celular.usuario}</b>}</ListGroup.Item>
                                                <ListGroup.Item variant="light">Corporativo: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <select
                                                            className="form-select"
                                                            name='corporativo'
                                                            onChange={onInputChange}
                                                            required
                                                        >
                                                            <option defaultValue={celular.corporativo}>{celular.corporativo}</option>
                                                            {
                                                                (celular.corporativo === 'Si')
                                                                    ? <option value="No">No</option>
                                                                    : <option value="Si">Si</option>
                                                            }
                                                        </select>
                                                    </div>
                                                    : <b>{celular.corporativo}</b>}</ListGroup.Item>
                                                <ListGroup.Item variant="light">Número: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder={celular.numero}
                                                            value={numero}
                                                            onChange={onInputChange}
                                                            name='numero'
                                                        />
                                                    </div>
                                                    : <b>{celular.numero}</b>}</ListGroup.Item>
                                                <ListGroup.Item variant="light">Comentarios: {edit
                                                    ? <div className='input-group input-group-sm'>
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={celular.comentarios}
                                                            value={comentarios}
                                                            onChange={onInputChange}
                                                            name='comentarios'
                                                        />
                                                    </div>
                                                    : <b>{celular.comentarios}</b>}</ListGroup.Item>
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
