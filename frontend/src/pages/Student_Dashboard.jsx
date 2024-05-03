import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import Sidebar from '../components/sidebar2';
import Contents from '../components/contents2';
// import Basic from '../evaluation/Basic';
import '../App.css';
import '../index.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const Student_Dashboard = () => {
  const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     console.log(cookies)
//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);

//   const verifyCookie = async () => {
//     console.log(cookies)
//     if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
//       console.log(cookies)
//       removeCookie("token")
//       navigate("/")
//     }
//     const { data } = await axios.post(
//       "http://localhost:4000/api/admin",
//       {},
//       { withCredentials: true }
//     );
//     const { status, user } = data;

//     console.log(data)

//     setUsername(user);
//     return status
//       ? /* toast(`Hello ${user}`, {
//         position: "top-right",
//     }) */console.log(cookies)
//     : (removeCookie("token"), navigate("/admin/login"));
//};

   const Logout = () => {
     removeCookie("token");
     navigate("/student/login");
 };

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">
          <Contents  />
          <div className="basic">
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Student_Dashboard;
