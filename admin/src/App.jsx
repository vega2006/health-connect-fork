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
    <div>
      <ToastContainer/>
      <Navbar/>
    </div>
  ) : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App