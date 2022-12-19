import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import impSlice from "./impSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        imp: impSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})