import '../styles/LoginPage.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useAuthStore } from '../hooks/useAuthStore'

export const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPass, setShowPass] = useState(false)

    const { startLogin, status } = useAuthStore()

    const loginSubmit = (e) => {
        e.preventDefault()
        startLogin({ email, password })
    }

    const togglePass = () => {
        setShowPass(!showPass)
    }

    return (
        <div className="login">
            <form onSubmit={loginSubmit}>
                <h1 className='text-center mb-4'>Ingreso</h1>
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
                                <FontAwesomeIcon icon={faEyeSlash} />
                                : <FontAwesomeIcon icon={faEye} />
                        }
                    </button>
                </div>
                <div className="text-center mt-4">
                    {
                        (status === 'checking')
                            ? <button className="btn btn-outline-primary me-2" type="submit">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>
                            : <button className="btn btn-outline-primary me-2" type="submit">Ingresar</button>
                    }
                    <Link to='/register' className="btn btn-outline-secondary">Crear una cuenta</Link>
                </div>
            </form>
        </div>
    )
}
