import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import { useImpStore } from "../../hooks/useImpStore"

export const ImpresorasProveedores = () => {

    const { startGetProveedores, startPostProveedor, startDeleteProveedor, proveedores } = useImpStore()

    const [show, setShow] = useState(false)
    const [checked, setChecked] = useState(false)
    const [nombre, setNombre] = useState("")

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const toggleCheck = () => {
        setChecked(!checked)
    }

    const submit = (e) => {
        e.preventDefault()
        startPostProveedor({ nombre })
        setNombre('')
    }

    const deleteModelo = (id) => {
        Swal.fire({
            title: 'Desea borrar modelo?',
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
                startDeleteProveedor(id)
            }
        })
    }

    useEffect(() => {
        startGetProveedores()
    }, [])

    return (
        <>
            <button className="btn btn-sm btn-outline-primary animate__animated animate__fadeIn" type="button" title='Agregar proveedor' onClick={handleShow}>Proveedores</button>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Proveedores</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit}>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text">
                                <div className="form-check form-switch mt-1">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        onChange={toggleCheck}
                                    />
                                </div>
                            </span>
                            {
                                (checked)
                                    ? <>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del modelo"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            name="nombre"
                                            required
                                        />
                                        <button className="btn btn-outline-success" type="submit">Agregar</button>
                                    </>
                                    : <>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del modelo"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            name="nombre"
                                            disabled
                                        />
                                        <button className="btn btn-outline-success" type="submit" disabled>Agregar</button>
                                    </>
                            }
                        </div>
                    </form>

                    <ol className="list-group list-group m-4">
                        {
                            proveedores.map(proveedor => (
                                <li key={proveedor.uid} className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        {proveedor.nombre}
                                    </div>
                                    <span
                                        type='button'
                                        className="badge bg-danger rounded-pill p-2"
                                        title="Eliminar"
                                        onClick={() => deleteModelo(proveedor.uid)}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </span>
                                </li>
                            ))
                        }
                    </ol>
                </Modal.Body>
            </Modal>
        </>
    )
}
