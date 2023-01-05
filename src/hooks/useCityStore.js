import { useDispatch, useSelector } from 'react-redux'
import { onShow } from '../store/citySlice'
import inventarioApi from "../api/inventarioApi"

export const useCityStore = () => {

    const dispatch = useDispatch()
    const { ciudades } = useSelector(state => state.city)

    const startGetCity = async () => {
        try {
            const { data } = await inventarioApi.get('/ciudades')
            const ciudades = data.ciudades
            dispatch(onShow(ciudades))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostCity = async ({ nombre }) => {

        try {
            const { data } = await inventarioApi.post('/ciudades', { nombre })

            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
            } else if (data.msg === 'existe') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ya existe la ciudad ${nombre}`
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startDeleteCity = async (id) => {
        try {
            await inventarioApi.delete(`/ciudades/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        ciudades,

        startGetCity,
        startPostCity,
        startDeleteCity
    }
}
