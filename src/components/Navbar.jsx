import { NavLink } from "react-router-dom"
import { useAuthStore } from "../hooks/useAuthStore"
import 'bootstrap-icons/font/bootstrap-icons.css'

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
                <NavLink to="/config" className="btn btn-sm btn-outline-secondary me-2" type="button"><i className="bi bi-gear"></i></NavLink>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={logOut}>Salir</button>
            </form>
        </nav>
    )
}
