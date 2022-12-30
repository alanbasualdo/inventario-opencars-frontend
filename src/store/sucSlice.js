import { createSlice } from '@reduxjs/toolkit'

export const sucSlice = createSlice({
    name: 'suc',
    initialState: {
        state: null,
        sucursales: []
    },
    reducers: {
        onLoad: (state) => {
            state.status = 'loading'
            state.sucursales = {}
        },
        onShow: (state, { payload = [] }) => {
            state.status = 'ready'
            state.sucursales = payload
        }
    },
})

export const { onLoad, onShow } = sucSlice.actions

export default sucSlice