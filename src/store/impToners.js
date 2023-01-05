import { createSlice } from '@reduxjs/toolkit'

export const impTonersSlice = createSlice({
    name: 'impToners',
    initialState: {
        status: null,
        toners: []
    },
    reducers: {
        onLoadToners: (state) => {
            state.status = 'loading'
            state.toners = {}
        },
        onShowToners: (state, { payload = [] }) => {
            state.status = 'ready'
            state.toners = payload
        }
    },
})

export const { onLoadToners, onShowToners } = impTonersSlice.actions

export default impTonersSlice