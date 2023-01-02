import { createSlice } from '@reduxjs/toolkit'

export const celMarcasSlice = createSlice({
    name: 'celMarcas',
    initialState: {
        status: null,
        marcas: []
    },
    reducers: {
        onLoadMarcas: (state) => {
            state.status = 'loading'
            state.marcas = {}
        },
        onShowMarcas: (state, { payload = [] }) => {
            state.status = 'ready'
            state.marcas = payload
        }
    },
})

export const { onLoadMarcas, onShowMarcas } = celMarcasSlice.actions

export default celMarcasSlice