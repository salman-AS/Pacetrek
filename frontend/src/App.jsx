import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Contents from './components/Contents';
import './App.css';
import StudentReg from "./StudentReg/Registration";
import Table from './table/Table';
import Quizoption from './Quiz/Quizoption';
import Event from './Eventupdates/Event';
import Help from './Help/Help';

const App = () => {
  return (
    <Router> {/* Wrap the entire application with Router */}
          <div className='dashboard'>
            <Sidebar />
            <div className="dashboard--contents">
            <Routes>
            <Route path="/" element={<Contents />} />
            <Route path="/studentreg" element={<StudentReg/>}/>
            <Route path="/table" element={<Table/>}/>
            <Route path="/quizo" element={<Quizoption/>}/>
            <Route path="/event" element={<Event/>}/>
            <Route path="/help" element={<Help/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
