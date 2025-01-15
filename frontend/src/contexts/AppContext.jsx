import { createContext, useEffect, useState } from "react";
//no more use to hardcore
// import {doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol='₹';
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [doctors,setDoctors]=useState([])
    const value = {
        doctors,
        currencySymbol,
       aToken,
       setAToken
    }
    const getDoctorsData=async ()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/list',{headers: {
                "Authorization": `Bearer ${aToken}`
              }})
            if(data.success){
                setDoctors(data.doctors)
               
            }
            else{
                toast.error(data.message)
            }
        }catch(e){
            console.log(e);
            toast.error(e.message)
        }
    }
    useEffect(()=>{
        getDoctorsData()
    },[])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider