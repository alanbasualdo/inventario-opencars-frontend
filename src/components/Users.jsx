import '../styles/RegisterPage.css'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../hooks/useAuthStore'

export const Users = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailConfirm, setEmailConfirm] = useState("")
    const [passConfirm, setPassConfirm] = useState("")

    const { startRegister, status, startGetUsers, users, startDeleteUser } = useAuthStore()

    const [showPass, setShowPass] = useState(false)
    const [showPassConf, setShowPassConf] = useState(false)

    const registerSubmit = (e) => {
        e.preventDefault()
        resetForm()
        if (email === emailConfirm && password !== passConfirm) {
            Swal.fire('Las contraseñas deben ser iguales')
        } else if (email !== emailConfirm && password === passConfirm) {
            Swal.fire('Los emails deben ser iguales')
        } else if (email !== emailConfirm && password !== passConfirm) {
            Swal.fire('Los emails y las contraseñas deben coincidir')
        } else if (password.length < 5) {
            Swal.fire('La contraseña debe ser mayor a 5 dígitos')
        } else {
            startRegister({ email, password })
        }
    }

    const togglePass = () => {
        setShowPass(!showPass)
    }

    const togglePassConf = () => {
        setShowPassConf(!showPassConf)
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setEmailConfirm('')
        setPassConfirm('')
    }

    useEffect(() => {
        startGetUsers()
    }, [])

    const deleteUser = (id) => {
        if (users.length > 1) {
            Swal.fire({
                title: 'Desea eliminar usuario?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    startDeleteUser(id)
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No se puede eliminar usuario',
                text: 'La cantidad mínima de usuarios debe ser de 1'
            })
        }
    }

    return (
        <div className="g-4 text-center m-2 animate__animated animate__fadeIn">
            <div className="register mt-4">
                <form onSubmit={registerSubmit}>
                    <h3 className='text-center mb-4'>Registrar usuario</h3>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Email</span>
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            required
                        />
                        <input
                            type="text"
                            placeholder='Repetir email'
                            className="form-control"
                            value={emailConfirm}
                            onChange={(e) => setEmailConfirm(e.target.value)}
                            name="emailConfirm"
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Contraseña</span>
                        <input
                            type={showPass ? 'text' : 'password'}
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            required
                        />
                        <button
                            className="btn btn-outline-light"
                            type="button"
                            onClick={togglePass}
                            title={showPass ? 'Ocultar' : 'Ver'}
                        >
                            {
                                (showPass) ?
                                    <i className="bi bi-eye-slash-fill"></i>
                                    : <i className="bi bi-eye-fill"></i>
                            }
                        </button>
                        <input
                            type={showPassConf ? 'text' : 'password'}
                            placeholder='Repetir contraseña'
                            className="form-control"
                            value={passConfirm}
                            onChange={(e) => setPassConfirm(e.target.value)}
                            name="passwordConfirm"
                            required
                        />
                        <button
                            className="btn btn-outline-light"
                            type="button"
                            onClick={togglePassConf}
                            title={showPass ? 'Ocultar' : 'Ver'}
                        >
                            {
                                (showPassConf) ?
                                    <i className="bi bi-eye-slash-fill"></i>
                                    : <i className="bi bi-eye-fill"></i>
                            }
                        </button>
                    </div>
                    {
                        (password.length < 5 && password.length != 0) &&
                        <p className="form-label mb-3 text-danger">La contraseña debe ser mayor a 5 dígitos.</p>
                    }
                    <div className="text-center mt-4">
                        {
                            (status === 'checking')
                                ? <button className="btn btn-outline-primary me-2" type="submit">
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </button>
                                : <button className="btn btn-outline-primary" type="submit" disabled={password.length < 5 && password.length != 0}>
                                    Registrar
                                </button>
                        }
                    </div>
                </form>
            </div>
            <div>
                {users.map(user => (
                    <ol className="list-group m-2" key={user.uid}>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {user.email}
                            <span
                                type='button'
                                className="badge bg-danger rounded-pill p-2"
                                title="Eliminar"
                                onClick={() => deleteUser(user.uid)}
                            >
                                <i className="bi bi-trash-fill"></i>
                            </span>
                        </li>
                    </ol>
                ))}
            </div>
        </div>
    )
}
