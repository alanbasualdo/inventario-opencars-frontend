import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-auth',
        email: null
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
            state.email = null
            state.usuarios = {}
        },
        onLogin: (state, { payload }) => {
            state.status = 'auth'
            state.email = payload.email
        },
        onLogout: (state) => {
            state.status = 'not-auth'
            state.email = null
        }
    },
})

export const { onChecking, onLogin, onLogout } = authSlice.actions

export default authSlice