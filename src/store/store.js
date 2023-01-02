import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import celMarcasSlice from "./celMarcas"
import celModelosSlice from "./celModelos"
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
        city: citySlice.reducer,
        celMarcas: celMarcasSlice.reducer,
        celModelos: celModelosSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})