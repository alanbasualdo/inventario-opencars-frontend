import { useDispatch, useSelector } from 'react-redux'
import inventarioApi from '../api/inventarioApi'
import { onChecking, onLogin, onLogout } from "../store/authSlice"

export const useAuthStore = () => {

    const { status, email } = useSelector(state => state.auth)
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
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('token-init-date', new Date().getTime())
                dispatch(onLogin(data))
            }
        } catch (error) {
            dispatch(onLogout())
        }
    }

    const checkAuth = async () => {
        const token = sessionStorage.getItem('token')
        if (!token) return dispatch(onLogout())
        try {
            const { data } = await inventarioApi.get('/login/renew')
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin(data))
        } catch (error) {
            console.log(error)
            sessionStorage.clear()
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        sessionStorage.clear()
        dispatch(onLogout())
    }

    return {
        // Propiedades
        status,
        email,

        // Métodos
        startLogin,
        checkAuth,
        startLogout
    }
}