import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import { SocketProvider } from './context/SocketProvider.jsx'
import AppContextProvider from './context/AppContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SocketProvider>
    <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
      <App />
      </AppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>
  </SocketProvider>  
  </BrowserRouter>
)
