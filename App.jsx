import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Contents from './components/Content';
import EventReceiver from './Events/events';
import NotificationPanel from './Notification/notific';
import PerformanceMatrix from './Performance/matrix';
import Profile from './ProfileSettings/profilesettings';
import ViewProfile from './Profile/profile';
import Quizo from './SkillDev/skill';

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
            <Route path="/ProfileSettings" element={<Profile />} />
            <Route path="/Profile" element={<ViewProfile />} />
            <Route path="/SkillDevelopment" element={<Quizo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;