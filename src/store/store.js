import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import celSlice from "./celSlice"
import impSlice from "./impSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        imp: impSlice.reducer,
        cel: celSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})