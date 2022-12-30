import { NavLink } from "react-router-dom"
import { useAuthStore } from "../hooks/useAuthStore"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Ciudades } from "./Ciudades"

export const Navbar = () => {

    const { startLogout } = useAuthStore()

    const logOut = () => {
        Swal.fire({
            title: 'Desea salir?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                startLogout()
            }
        })
    }

    return (
        <nav className="navbar mt-2">
            <form className="container-fluid justify-content-center">
                <NavLink to="/impresoras" className="btn btn-sm btn-outline-light me-2" type="button">Impresoras</NavLink>
                <NavLink to="/celulares" className="btn btn-sm btn-outline-light me-2" type="button">Celulares</NavLink>
                <div className="btn-group me-2">
                    <button className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-house"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <Ciudades />
                        <li className="dropdown-item">Agregar sucursal</li>
                    </ul>
                </div>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={logOut}>Salir</button>
            </form>
        </nav>
    )
}
