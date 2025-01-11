import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Navbar = () => {
    const navigate=useNavigate();
    const [showMenu,setShowMenu]=useState(false);
    const [token,setToken]=useState(true);
return (
    <div className='flex items-center justify-between text-sm border-b border-b-gray-400 font-montserratAlt' style={{ color: '0c7066' }}>
        <div className='flex items-center'>
           
                <img onClick={()=>navigate('/')}className="cursor-pointer w-32" src={assets.logo2} alt=""/>
            
            <span className='text-2xl font-bold'>Health Connect</span>
        </div>    
        <ul className='hidden md:flex items-start gap-5 font-medium '>
            <NavLink to="/">
                <li className='mx-2 py-1'>HOME</li>
                <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary"/>
            </NavLink>
            <NavLink to="/doctors">
                <li className='mx-2 py-1'>ALL DOCTORS</li>
                <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary"/>
            </NavLink>
            <NavLink to="/about">
                <li className='mx-2 py-1'>ABOUT</li>
                <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary"/>
            </NavLink>
            <NavLink to="/contact">
                <li className='mx-2 py-1'>CONTACT</li>
                <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary"/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'> {
            token ? 
            <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className="w-8 rounded-full" src={assets.profile_pic} alt=""/>
                <img className="w-2.5" src={assets.dropdown_icon} alt=""/>
                <div className="absolute top-0 right-0 pt-10 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                    <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                        <p onClick={()=>{navigate('/my-profile')}}className="hover:text-black cursor-pointer">My Profile</p>
                        <p onClick={()=>{navigate('/my-appointments  ')}}className="hover:text-black cursor-pointer">My Appointments</p>
                        <p onClick={()=>{setToken(false)}} className="hover:text-black cursor-pointer">Logout</p>
                    </div>
                </div>
            </div> 
            : <button onClick={()=>{navigate('/login')}} className='bg-primary text-white px-8 py-3 rounded-full font-bold hidden md:block'>Create Account</button>
        }    
        </div>
    </div>
)
}

export default Navbar