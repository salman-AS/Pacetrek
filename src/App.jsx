import React from 'react';
import Sidebar from './components/Sidebar';
import Contents from './components/Contents';
import Basic from './evaluation/Basic';
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'


const App = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
    <div className="dashboard--contents">
      <Contents />
      <div className="basic">
      </div>
    </div>
    </div>
  );
};

export default App;