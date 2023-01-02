import { createSlice } from '@reduxjs/toolkit'

export const celModelosSlice = createSlice({
    name: 'celModelos',
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

export const { onLoadModelos, onShowModelos } = celModelosSlice.actions

export default celModelosSlice