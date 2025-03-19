import React, { useContext,useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate } from 'react-router-dom'
const MyAppointments = () => {
 
  const { backendUrl ,token ,getDoctorsData } = useContext(AppContext);
  const navigate=useNavigate()
  const [appointments,setAppointments ]=useState([]);
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const slotDateFormat=(slotDate)=>{
     const dateArray=slotDate.split('_');
     return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
  }
  const getUserAppointments=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{'Authorization':`Bearer ${token}`}})
      if(data.success)
      {
        setAppointments(data.appointments.reverse());     
        // console.log(data.appointments);
           
      }
     
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  const cancelAppointment=async(appointmentId)=>{
    
    try {

        const {data}=await axios.post(backendUrl+"/api/user/cancel-appointment",{appointmentId},{headers:{'Authorization':`Bearer ${token}`}})
        if(data.success)
        {
          
           getUserAppointments()
           getDoctorsData()
           toast.success(data.message);
        }
        else
        {
          toast.error(data.message)
        }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }


    const initPay=(order)=>{
      const options={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:'Appointment Payment',
        description:'Appointment Payment',
        order_id:order.id,
        receipt:order.receipt,
        handler:async(response)=>{
          console.log("response now");
          
          console.log(response);
          try{
            const {data}=await  axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{
              'Authorization':`Bearer ${token}`
            }})
            if(data.success){
              getUserAppointments()
              console.log("sdfdsf");
              
              navigate('/my-appointments')
            }
          }catch(e){
            console.log(e);
            toast.error(e.message)
            
          }
        }
      }
      const rzp=new window.Razorpay(options)
      rzp.open()
    }
  const appointmentRazorpay=async (appointmentId)=>{
    // console.log(appointmentId);
    
    try{
      const {data}=await axios.post(backendUrl+"/api/user/payment-razorpay",{appointmentId},{headers:{'Authorization':`Bearer ${token}`}})
      // console.log(data);
      
      if(data.success===true){
          initPay(data.order)
      }
      else{

      }
    }catch(e){
      console.log(e.message);
      
    }
  }

  useEffect(()=>{
    if(token)
    {
      getUserAppointments()
    }
  },[])

  return (
    <div>
      <div className="pb-3 mt-12 font-medium text-zinc-700 border-b">
      <p className="">
        My Appointments
      </p>
      </div>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img className="w-32 bg-[#1Acc82] " src={item.docData.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600 ">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address :</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)}| {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment &&!item.isCompleted&& <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">Pay Online
                </button>}
                
                {!item.cancelled && !item.isCompleted && !item.payment &&<button onClick={()=>{cancelAppointment(item._id)}} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel Appointment
              </button>}
              {item.cancelled&&!item.isCompleted &&<button className="sm:min-w-48  py-2 border border-red-500 rounded text-red-500" >Appointment Cancelled</button>}
              {item.isCompleted&&<button className="sm:min-48 py-2 px-4 border border-green-500 rounded text-green-500">completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
