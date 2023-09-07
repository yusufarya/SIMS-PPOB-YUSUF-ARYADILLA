import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Main_layout from "./layout/main-layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { getToken } from "./authorization/getToken"
import Topup from "./pages/Topup"
import Listrik from "./pages/Listrik"
import History from "./pages/History"
import Profile from "./pages/Profile"

function App() {

  const userToken = getToken()
  
  return (
    <>
      <Router>
        <Main_layout>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/tupup" element={<Topup/>} />
                <Route path="/transaction" element={<History/>} />
                <Route path="/listrik" element={<Listrik/>} />
                <Route path="/akun" element={<Profile/>} />
                <Route path="/" element={userToken != null ? <Navigate to="/home" /> : <Navigate to="/login" /> } />
            </Routes>

        </Main_layout>
      </Router>
    </>
  )
}

export default App
