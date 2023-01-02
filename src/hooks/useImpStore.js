import { useDispatch, useSelector } from 'react-redux'
import { onShow } from '../store/impSlice'
import inventarioApi from "../api/inventarioApi"

export const useImpStore = () => {

    const dispatch = useDispatch()
    const { impresoras } = useSelector(state => state.imp)

    const startGetImp = async () => {
        try {
            const { data } = await inventarioApi.get('/impresoras')
            const impresoras = data.impresoras
            dispatch(onShow(impresoras))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostImp = async ({ ciudad, sucursal, marca, modelo, toner,
        propia, estado, sector, codigo, ip, proveedor, comentarios }) => {

        try {
            const { data } = await inventarioApi.post('/impresoras', {
                ciudad, sucursal, marca, modelo, toner,
                propia, estado, sector, codigo, ip, proveedor, comentarios
            })

            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Impresora guardada con éxito.',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (data.msg === 'existe') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ya existe impresora con el ip ${ip}`
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startDeleteImp = async (id) => {
        try {
            await inventarioApi.delete(`/impresoras/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const startPutImp = async ({ uid, ciudad, sucursal, marca, modelo, toner,
        propia, sector, codigo, ip, proveedor, comentarios }) => {

        try {
            const { data } = await inventarioApi.put(`/impresoras/${uid}`, {
                ciudad, sucursal, marca, modelo, toner,
                propia, sector, codigo, ip, proveedor, comentarios
            })

            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Impresora actualizada con éxito.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        impresoras,

        startGetImp,
        startPostImp,
        startDeleteImp,
        startPutImp
    }
}
