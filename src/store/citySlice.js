import { createSlice } from '@reduxjs/toolkit'

export const citySlice = createSlice({
    name: 'city',
    initialState: {
        state: null,
        ciudades: []
    },
    reducers: {
        onLoad: (state) => {
            state.status = 'loading'
            state.ciudades = {}
        },
        onShow: (state, { payload = [] }) => {
            state.status = 'ready'
            state.ciudades = payload
        }
    },
})

export const { onLoad, onShow } = citySlice.actions

export default citySlice