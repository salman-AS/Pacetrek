import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './admin/Login'
import Register from './admin/Register'
import { useAuth } from './contexts/AuthContext'
// import Sidebar from './components/Sidebar';
// import Contents from './components/Contents';
// import Basic from './evaluation/Basic';
// import 'react-big-calendar/lib/css/react-big-calendar.css'


const App = () => {

  const isAuthenticated  = useAuth()

  return (
    // <div className='dashboard'>
    //   <Sidebar />
    // <div className="dashboard--contents">
    //   <Contents />
    //   <div className="basic">
    //   </div>
    // </div>
    // </div>
    <Router>
      <Routes>
        <Route path='/admin/signup' element={!isAuthenticated ? <Navigate to='/dashboard' /> : <Register />} />
        <Route path='/admin/login' element={!isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='/dashboard' element={!isAuthenticated ? <Dashboard /> : <Navigate to='/admin/login' />} />
      </Routes>
    </Router>
  );
};

export default App;