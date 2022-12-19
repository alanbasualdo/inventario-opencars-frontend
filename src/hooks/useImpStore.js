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

    return {
        impresoras,

        startGetImp
    }
}
