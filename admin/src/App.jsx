import React from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { useContext } from 'react';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import SideBar from './components/SideBar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorOnlineAppointments from './pages/Doctor/DoctorOnlineAppointments';
import Room from './pages/Doctor/Room';
const App = () => {

  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  return (aToken || dToken)? (
    
    <div className='bg-[#F8F9FD]'>
        <ToastContainer/>
 
        
        <Navbar/>
        <div className='flex items-start'> 
            <SideBar/>
            <Routes>
              {/* admin routes */}
              <Route path='/' element={<></>}  />
              <Route path='/admin-dashboard' element={<Dashboard/>} />
              <Route path='/all-appointments' element={<AllAppointments/>} />
              <Route path='/add-doctor' element={<AddDoctor/>} />
              <Route path='/doctor-list' element={<DoctorsList/>} />
              {/* doctor routes */}
              <Route path='doctor-dashboard' element={<DoctorDashboard/>}/>
              <Route path='doctor-appointments' element={<DoctorAppointments/>}/>
              <Route path='doctor-profile' element={<DoctorProfile/>}/>
              <Route path='doctor-online-appointments' element={<DoctorOnlineAppointments/>}/>
              <Route path='room/:roomId' element={<Room/>}/>
            </Routes>
        </div>
    </div>
  ) : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App