import { useDispatch, useSelector } from 'react-redux'
import { onShow } from '../store/celSlice'
import { onShowMarcas } from '../store/celMarcas'
import { onShowModelos } from '../store/celModelos'
import inventarioApi from "../api/inventarioApi"

export const useCelStore = () => {

    const dispatch = useDispatch()
    const { celulares } = useSelector(state => state.cel)
    const { marcas } = useSelector(state => state.celMarcas)
    const { modelos } = useSelector(state => state.celModelos)

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
            await inventarioApi.delete(`/celulares/${id}`)
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

    /////////////////////////////////////////////////// Marcas ///////////////////////////////////////////////////

    const startGetMarcas = async () => {
        try {
            const { data } = await inventarioApi.get('/celulares/marcasCelulares')
            const marcas = data.marcas
            dispatch(onShowMarcas(marcas))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostMarca = async ({ nombre }) => {
        try {
            const { data } = await inventarioApi.post('/celulares/marcasCelulares', { nombre })
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
                    text: `Ya existe la marca ${nombre}`
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startDeleteMarca = async (id) => {
        try {
            await inventarioApi.delete(`/celulares/marcasCelulares/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    /////////////////////////////////////////////////// Modelos ///////////////////////////////////////////////////

    const startGetModelos = async () => {
        try {
            const { data } = await inventarioApi.get('/celulares/modelosCelulares')
            const modelos = data.modelos
            dispatch(onShowModelos(modelos))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostModelo = async ({ nombre }) => {
        try {
            const { data } = await inventarioApi.post('/celulares/modelosCelulares', { nombre })
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
                    text: `Ya existe el modelo ${nombre}`
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startDeleteModelo = async (id) => {
        try {
            await inventarioApi.delete(`/celulares/modelosCelulares/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        celulares,
        marcas,
        modelos,

        startGetCel,
        startPostCel,
        startDeleteCel,
        startPutCel,
        startGetMarcas,
        startPostMarca,
        startDeleteMarca,
        startGetModelos,
        startPostModelo,
        startDeleteModelo
    }
}
