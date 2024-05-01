import './App.css'
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Dashboard, Student_Login, Student_Dashboard, NotFound } from "./pages";
// import Sidebar from './components/Sidebar';
// import Contents from './components/Contents';
import StudentReg from "./StudentReg/Registration";
import Table from './table/Table';
import Quizoption from './Quiz/Quizoption';
import Event from './Eventupdates/Event';
import Help from './Help/Help';
import Qclient from "./Quiz/Qclient";


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/signup' element={<Signup />} />
        <Route path="/admin/studentreg" element={<StudentReg />} />
        <Route path="/admin/table" element={<Table />} />
        <Route path="/admin/quizo" element={<Quizoption />} />
        <Route path="/admin/quizo/qclient" element={<Qclient />} />
        <Route path="/admin/event" element={<Event />} />
        {/* <Route path="/admin/help" element={<Help />} /> */}

        <Route path='/student/login' element={<Student_Login />} />
        <Route path='/student/dashboard' element={<Student_Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
