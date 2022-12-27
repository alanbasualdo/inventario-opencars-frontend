import { useDispatch, useSelector } from 'react-redux'
import { onShow } from '../store/celSlice'
import inventarioApi from "../api/inventarioApi"

export const useCelStore = () => {

    const dispatch = useDispatch()
    const { celulares } = useSelector(state => state.cel)

    const startGetCel = async () => {
        try {
            const { data } = await inventarioApi.get('/celulares')
            const celulares = data.celulares
            dispatch(onShow(celulares))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostCel = async ({ ciudad, sucursal, marca, modelo, toner,
        propia, estado, sector, codigo, ip, proveedor, comentarios }) => {

        try {
            const { data } = await inventarioApi.post('/celulares', {
                ciudad, sucursal, marca, modelo, toner,
                propia, estado, sector, codigo, ip, proveedor, comentarios
            })

            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Celular guardada con éxito.',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (data.msg === 'existe') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ya existe celular con el ip ${ip}`
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startDeleteCel = async (id) => {
        try {
            const { data } = await inventarioApi.delete(`/celulares/${id}`)
            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Celular borrado con éxito.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startPutCel = async ({ ciudad, sucursal, marca, modelo, toner,
        propia, sector, codigo, ip, proveedor, comentarios }) => {

        console.log({
            ciudad, sucursal, marca, modelo, toner,
            propia, sector, codigo, ip, proveedor, comentarios
        })
    }

    return {
        celulares,

        startGetCel,
        startPostCel,
        startDeleteCel,
        startPutCel
    }
}
