import { createSlice } from '@reduxjs/toolkit'

export const impProveedoresSlice = createSlice({
    name: 'impProveedores',
    initialState: {
        status: null,
        proveedores: []
    },
    reducers: {
        onLoadProveedores: (state) => {
            state.status = 'loading'
            state.proveedores = {}
        },
        onShowProveedores: (state, { payload = [] }) => {
            state.status = 'ready'
            state.proveedores = payload
        }
    },
})

export const { onLoadProveedores, onShowProveedores } = impProveedoresSlice.actions

export default impProveedoresSlice