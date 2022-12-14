import { useDispatch, useSelector } from 'react-redux'
import inventarioApi from '../api/inventarioApi'
import { onChecking, onLogin, onLogout } from "../store/authSlice"

export const useAuthStore = () => {

    const { status, email, password } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking())
        try {
            const { data } = await inventarioApi.post('/login', { email, password })

            if (data.msg === 'NotRegisteredEmail') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Email no existe',
                    showConfirmButton: false,
                    timer: 1000
                })
                return dispatch(onLogout())
            } else if (data.msg === 'InvalidPassword') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Contraseña incorrecta',
                    showConfirmButton: false,
                    timer: 1000
                })
                return dispatch(onLogout())
            } else if (data.msg === 'LogOk') {
                localStorage.setItem('token', data.token)
                localStorage.setItem('token-init-date', new Date().getTime())
                dispatch(onLogin(data))
            }
        } catch (error) {
            dispatch(onLogout())
        }
    }

    const startRegister = async ({ email, password }) => {
        dispatch(onChecking())
        try {
            const { data } = await inventarioApi.post('/register', { email, password })

            if (data.msg === 'UserCrated') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario creado correctamente!',
                    showConfirmButton: false,
                    timer: 1000
                })
                setTimeout(() => {
                    return window.location = "/login"
                }, '1100')
            } else if (data.msg === 'EmailAlreadyRegistered') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'El email ya se encuentra registrado',
                    showConfirmButton: false,
                    timer: 1000
                })
                return dispatch(onLogout())
            }
        } catch (error) {
            dispatch(onLogout())
        }
    }

    const checkAuth = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())
        try {
            const { data } = await inventarioApi.get('/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin(data))
        } catch (error) {
            console.log(error)
            localStorage.clear()
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        // Propiedades
        status,
        email,

        // Métodos
        startLogin,
        startRegister,
        checkAuth,
        startLogout
    }
}