import { createSlice } from '@reduxjs/toolkit'

export const impModelosSlice = createSlice({
    name: 'impModelos',
    initialState: {
        status: null,
        modelos: []
    },
    reducers: {
        onLoadModelos: (state) => {
            state.status = 'loading'
            state.modelos = {}
        },
        onShowModelos: (state, { payload = [] }) => {
            state.status = 'ready'
            state.modelos = payload
        }
    },
})

export const { onLoadModelos, onShowModelos } = impModelosSlice.actions

export default impModelosSlice