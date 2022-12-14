import { Route, Routes } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { CelularesPage } from "./CelularesPage"
import { ImpresorasPage } from "./ImpresorasPage"

export const MainPage = () => {

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='*' element={<CelularesPage />} />
                <Route path='/celulares' element={<CelularesPage />} />
                <Route path='/impresoras' element={<ImpresorasPage />} />
            </Routes>
        </>
    )
}
