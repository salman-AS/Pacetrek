// import './App.css'
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Dashboard, Student_Login, Student_Signup, Student_Dashboard } from "./pages";
// import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/student/login' element={<Student_Login />} />
        <Route path='/student/signup' element={<Student_Signup />} />
        <Route path='/student/dashboard' element={<Student_Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
