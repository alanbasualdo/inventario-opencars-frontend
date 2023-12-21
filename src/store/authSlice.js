import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-auth',
        email: null,
        users: []
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
            state.email = null
            state.users = []
        },
        onLogin: (state, { payload }) => {
            state.status = 'auth'
            state.email = payload.email
        },
        onShow: (state, { payload }) => {
            state.users = payload
        },
        onLogout: (state) => {
            state.status = 'not-auth'
            state.email = null
            state.users = []
        }
    },
})

export const { onChecking, onLogin, onLogout, users, onShow } = authSlice.actions

export default authSlice