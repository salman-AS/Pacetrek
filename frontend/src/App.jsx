// import './App.css'
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
