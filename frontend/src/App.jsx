import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Contents from './components/Content';
import EventReceiver from './Events/events';
import NotificationPanel from './Notification/notific';
import PerformanceMatrix from './Performance/matrix';

import './App.css';
const App = () => {
  return (
    <Router> {/* Wrap the entire application with Router */}
          <div className='dashboard'> 
            <Sidebar />
            <div className="dashboard--contents">
            <Routes>
            <Route path="/" element={<Contents />} />
            <Route path="/Eventupdates" element={<EventReceiver />} />
            <Route path="/Notifications" element={<NotificationPanel />} />
            <Route path="/PerformanceMatrix" element={<PerformanceMatrix />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;