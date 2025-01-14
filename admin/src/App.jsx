import React from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { useContext } from 'react';
import { Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
const App = () => {
  const {aToken}=useContext(AdminContext)
  return aToken? (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className="flex items-start">
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/all-appointments" element={<AllAppointments/>}/>
          <Route path="/doctor-list" element={<DoctorsList/>}/>
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