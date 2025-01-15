import { createContext, useEffect, useState } from "react";
//no more use to hardcore
// import {doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol='$';
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const value = {
        doctors,
        currencySymbol
       
    }
    const getDoctorsData=async ()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
        }catch(e){
            console.log(e);
            
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