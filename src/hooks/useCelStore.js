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

    const startPostCel = async ({ ciudad, sucursal, facturacion, marca, modelo,
        usuario, estado, corporativo, numero, comentarios }) => {

        try {
            const { data } = await inventarioApi.post('/celulares', {
                ciudad, sucursal, facturacion, marca, modelo,
                usuario, estado, corporativo, numero, comentarios
            })

            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Celular guardado con éxito.',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (data.msg === 'existe') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ya existe celular con el número ${numero}`
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

    const startPutCel = async ({ uid, ciudad, sucursal, facturacion, marca,
        modelo, usuario, estado, corporativo, numero, comentarios }) => {

        try {
            const { data } = await inventarioApi.put(`/celulares/${uid}`, {
                uid, ciudad, sucursal, facturacion, marca, modelo, usuario,
                estado, corporativo, numero, comentarios
            })

            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Celular actualizado con éxito.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        celulares,

        startGetCel,
        startPostCel,
        startDeleteCel,
        startPutCel
    }
}
