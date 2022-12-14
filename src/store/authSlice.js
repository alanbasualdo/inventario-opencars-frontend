import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-auth',
        email: null,
        password: null
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
            state.email = null
            state.password = null
        },
        onLogin: (state, { payload }) => {
            state.status = 'auth'
            state.email = payload.email
            state.password = payload.password
        },
        onLogout: (state) => {
            state.status = 'not-auth'
            state.email = null
            state.password = null
        }
    },
})

export const { onChecking, onLogin, onLogout } = authSlice.actions

export default authSlice