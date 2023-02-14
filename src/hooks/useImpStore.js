import { useDispatch, useSelector } from 'react-redux'
import { onLoad, onShow } from '../store/impSlice'
import inventarioApi from "../api/inventarioApi"
import { onShowMarcas } from '../store/impMarcas'
import { onShowModelos } from '../store/impModelos'
import { onShowToners } from '../store/impToners'
import { onShowProveedores } from '../store/impProveedores'

export const useImpStore = () => {

    const dispatch = useDispatch()
    const { impresoras, status } = useSelector(state => state.imp)
    const { marcas } = useSelector(state => state.impMarcas)
    const { modelos } = useSelector(state => state.impModelos)
    const { toners } = useSelector(state => state.impToners)
    const { proveedores } = useSelector(state => state.impProveedores)

    const startGetImp = async () => {
        dispatch(onLoad())
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
                    timer: 1000
                })
                startGetImp()
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
            startGetImp()
        } catch (error) {
            console.log(error)
        }
    }

    const startPutImp = async ({ uid, estado, sector, ip, comentarios }) => {
        try {
            const { data } = await inventarioApi.put(`/impresoras/${uid}`, {
                estado, sector, ip, comentarios
            })
            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                startGetImp()
            } else if (data.msg === 'existeIp') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ya existe impresora con el ip ${ip}`
                })
            } else if (data.msg === 'existeCod') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Ya existe impresora con el código ${codigo}`
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    /////////////////////////////////////////////////// Marcas ///////////////////////////////////////////////////

    const startGetMarcas = async () => {
        try {
            const { data } = await inventarioApi.get('/impresoras/marcasImpresoras')
            const marcas = data.marcas
            dispatch(onShowMarcas(marcas))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostMarca = async ({ nombre }) => {
        try {
            const { data } = await inventarioApi.post('/impresoras/marcasImpresoras', { nombre })
            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                startGetMarcas()
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
            await inventarioApi.delete(`/impresoras/marcasImpresoras/${id}`)
            startGetMarcas()
        } catch (error) {
            console.log(error)
        }
    }

    /////////////////////////////////////////////////// Modelos ///////////////////////////////////////////////////

    const startGetModelos = async () => {
        try {
            const { data } = await inventarioApi.get('/impresoras/modelosImpresoras')
            const modelos = data.modelos
            dispatch(onShowModelos(modelos))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostModelo = async ({ nombre }) => {
        try {
            const { data } = await inventarioApi.post('/impresoras/modelosImpresoras', { nombre })
            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                startGetModelos()
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
            await inventarioApi.delete(`/impresoras/modelosImpresoras/${id}`)
            startGetModelos()
        } catch (error) {
            console.log(error)
        }
    }

    /////////////////////////////////////////////////// Tóners ///////////////////////////////////////////////////

    const startGetToners = async () => {
        try {
            const { data } = await inventarioApi.get('/impresoras/toners')
            const toners = data.toners
            dispatch(onShowToners(toners))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostToner = async ({ nombre }) => {
        try {
            const { data } = await inventarioApi.post('/impresoras/toners', { nombre })
            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                startGetToners()
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

    const startDeleteToner = async (id) => {
        try {
            await inventarioApi.delete(`/impresoras/toners/${id}`)
            startGetToners()
        } catch (error) {
            console.log(error)
        }
    }

    /////////////////////////////////////////////////// Proveedores ///////////////////////////////////////////////////

    const startGetProveedores = async () => {
        try {
            const { data } = await inventarioApi.get('/impresoras/proveedores')
            const proveedores = data.proveedores
            dispatch(onShowProveedores(proveedores))
        }
        catch (error) {
            console.log(error)
        }
    }

    const startPostProveedor = async ({ nombre }) => {
        try {
            const { data } = await inventarioApi.post('/impresoras/proveedores', { nombre })
            if (data.msg === 'ok') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                startGetProveedores()
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

    const startDeleteProveedor = async (id) => {
        try {
            await inventarioApi.delete(`/impresoras/proveedores/${id}`)
            startGetProveedores()
        } catch (error) {
            console.log(error)
        }
    }

    return {
        impresoras,
        marcas,
        modelos,
        toners,
        proveedores,
        status,

        startGetImp,
        startPostImp,
        startDeleteImp,
        startPutImp,
        startGetMarcas,
        startPostMarca,
        startDeleteMarca,
        startGetModelos,
        startPostModelo,
        startDeleteModelo,
        startGetToners,
        startPostToner,
        startDeleteToner,
        startGetProveedores,
        startPostProveedor,
        startDeleteProveedor
    }
}
