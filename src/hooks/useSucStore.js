import { useDispatch, useSelector } from 'react-redux'
import { onShow } from '../store/sucSlice'
import inventarioApi from "../api/inventarioApi"

export const useSucStore = () => {

    const dispatch = useDispatch()
    const { sucursales } = useSelector(state => state.suc)

    const startGetSuc = async () => {
        try {
            const { data } = await inventarioApi.get('/sucursales')
            const sucursales = data.sucursales
            dispatch(onShow(sucursales))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostSuc = async ({ nombre }) => {

        try {
            const { data } = await inventarioApi.post('/sucursales', { nombre })
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
                    text: `Ya existe la sucursal ${nombre}`
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startDeleteSuc = async (id) => {
        try {
            await inventarioApi.delete(`/sucursales/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        sucursales,

        startGetSuc,
        startPostSuc,
        startDeleteSuc
    }
}
