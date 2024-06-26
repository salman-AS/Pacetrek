import './App.css'
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Dashboard, Student_Login, Student_Dashboard, NotFound } from "./pages";
// import Sidebar from './components/Sidebar';
// import Contents from './components/Contents';
import StudentReg from "./StudentReg/Registration";
import Table from './table/Table';
import Quizoption from './Quiz/Quizoption';
import Event from './Eventupdates/Event';
// import Help from './Help/Help';
import Qclient from "./Quiz/Qclient";
import Coding from './pages/Coding';
import Leaderboard from './pages/Leaderboard';
// import Stprofile from './Profile/Stprofile';
import EventReceiver from './Events/events';
import NotificationPanel from './Notification/notific';
import PerformanceMatrix from './Performance/matrix';
import Profile from './ProfileSettings/profilesettings'
import ViewProfile from './Profile/profile';
import Quizo from './SkillDev/skill';
import Notification from './NotificationAdmin/Notification';
import TestPage from './Hskill/Test';
import QList from './Hskill/Quizlist';

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
        <Route path="/admin/quizo/qclient" element={<Qclient option={'aptitude'} />} />
        <Route path="/admin/coursework" element={<Qclient option={'coursework'} />} />
        <Route path="/admin/coding" element={<Coding />} />
        <Route path="/admin/event" element={<Event />} />
        <Route path="/admin/leaderboard" element={<Leaderboard />} />
        <Route path="/admin/notifications" element={<Notification />} />
        {/* <Route path="/admin/help" element={<Help />} /> */}

        <Route path='/student/login' element={<Student_Login />} />
        <Route path='/student/dashboard' element={<Student_Dashboard />} />
        {/* <Route path="/" element={<Contents />} /> */}
        <Route path="/student/Eventupdates" element={<EventReceiver />} />
        <Route path="/student/Notifications" element={<NotificationPanel />} />
        <Route path="/student/PerformanceMatrix" element={<PerformanceMatrix />} />
        <Route path="/student/ProfileSettings" element={<Profile />} />
        <Route path="/student/Profile" element={<ViewProfile />} />
        <Route path="/student/SkillDevelopment" element={<Quizo />} />
        <Route path="/student/aptitude" element={<QList option={'aptitude'} />} />
        <Route path="/student/cousework" element={<QList option={'coursework'} />} />
        <Route path="/student/coding" element={<QList option={'code'} />} />
        <Route path="/student/aptitude/:id" element={<TestPage option={'aptitude'} />} />
        <Route path="/student/coursework/:id" element={<TestPage option={'coursework'} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
