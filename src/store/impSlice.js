import { createSlice } from '@reduxjs/toolkit'

export const impSlice = createSlice({
    name: 'imp',
    initialState: {
        status: null,
        impresoras: []
    },
    reducers: {
        onLoad: (state) => {
            state.status = 'loading'
            state.impresoras = {}
        },
        onShow: (state, { payload = [] }) => {
            state.status = 'ready'
            state.impresoras = payload
        }
    },
})

export const { onLoad, onShow } = impSlice.actions

export default impSlice