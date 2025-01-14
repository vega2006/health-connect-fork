import React from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { useContext } from 'react';
import Navbar from './components/Navbar'
const App = () => {
  const {aToken}=useContext(AdminContext)
  return aToken? (
    <div className='bg-[#F8F9FD]'>
        <ToastContainer/>
        <Navbar/>
        <div className='flex items-start'> 
            <SideBar/>
            <Routes>
              <Route path='/' element={<></>}  />
              <Route path='/admin-dashboard' element={<Dashboard/>} />
              <Route path='/all-appointments' element={<AllAppointments/>} />
              <Route path='/add-doctor' element={<AddDoctor/>} />
              <Route path='/doctor-list' element={<DoctorsList/>} />

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