import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-auth',
        email: null,
        usuarios: []
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
            state.email = null
        },
        onLogin: (state, { payload }) => {
            state.status = 'auth'
            state.email = payload.email
        },
        onShow: (state, { payload = [] }) => {
            state.status = 'ready'
            state.usuarios = payload
        },
        onLogout: (state) => {
            state.status = 'not-auth'
            state.email = null
        }
    },
})

export const { onChecking, onLogin, onLogout, onShow } = authSlice.actions

export default authSlice