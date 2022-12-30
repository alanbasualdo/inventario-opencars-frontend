import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import celSlice from "./celSlice"
import citySlice from "./citySlice"
import impSlice from "./impSlice"
import sucSlice from "./sucSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        imp: impSlice.reducer,
        cel: celSlice.reducer,
        suc: sucSlice.reducer,
        city: citySlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})