import React, { useState } from 'react'

const Login = () => {
  const [state,setState]=useState("Sign Up")
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const onSubmitHandle=async(event)=>
  {
    event.preventDefault();
  }
  return (
    <form className='min-h-[80vh] flex item-center '>
        <div  className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state==='Sign Up'?'Create Account':"Login"}</p>
          <p>Please {state==='Sign Up'?'sign up':"log in"} to book appointment</p>
          { state==="Sign Up"?<div className='w-full '>
            <p>Full Name</p>
            <input type="text" className='border border-[#DADADA] rounded w-full p-2 mt-1' required value={name} onChange={(e)=>{setName(e.target.name)}} />
          </div> : <div></div>}
          
          <div className='w-full '>
            <p>Email</p>
            <input type="email" className='border border-[#DADADA] rounded w-full p-2 mt-1'  required value={email} onChange={(e)=>{setEmail(e.target.email)}} />
          </div>
          <div className='w-full '>
            <p>Password</p>
            <input type="password" className='border border-[#DADADA] rounded w-full p-2 mt-1'  required value={password} onChange={(e)=>{setPassword(e.target.password)}} />
          </div>
          <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base' >{state==='Sign Up'?'Create Account':"Login"}</button>
          {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
        </div>
        
    </form>
  )
}

export default Login