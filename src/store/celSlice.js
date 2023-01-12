import { createSlice } from '@reduxjs/toolkit'

export const celSlice = createSlice({
    name: 'cel',
    initialState: {
        status: null,
        celulares: []
    },
    reducers: {
        onLoad: (state) => {
            state.status = 'loading'
        },
        onShow: (state, { payload = [] }) => {
            state.status = 'ready'
            state.celulares = payload
        }
    },
})

export const { onLoad, onShow } = celSlice.actions

export default celSlice