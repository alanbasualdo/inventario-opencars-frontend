import { createSlice } from '@reduxjs/toolkit'

export const impMarcasSlice = createSlice({
    name: 'impMarcas',
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

export const { onLoadMarcas, onShowMarcas } = impMarcasSlice.actions

export default impMarcasSlice