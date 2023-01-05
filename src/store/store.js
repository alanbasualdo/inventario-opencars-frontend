import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import celMarcasSlice from "./celMarcas"
import celModelosSlice from "./celModelos"
import celSlice from "./celSlice"
import citySlice from "./citySlice"
import impMarcasSlice from "./impMarcas"
import impModelosSlice from "./impModelos"
import impProveedoresSlice from "./impProveedores"
import impSlice from "./impSlice"
import impTonersSlice from "./impToners"
import sucSlice from "./sucSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        imp: impSlice.reducer,
        cel: celSlice.reducer,
        suc: sucSlice.reducer,
        city: citySlice.reducer,
        celMarcas: celMarcasSlice.reducer,
        celModelos: celModelosSlice.reducer,
        impMarcas: impMarcasSlice.reducer,
        impModelos: impModelosSlice.reducer,
        impToners: impTonersSlice.reducer,
        impProveedores: impProveedoresSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})