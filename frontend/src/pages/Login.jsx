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
        <div>
          <p>{state==='Sign Up'?'Create Account':""}</p>
        </div>
    </form>
  )
}

export default Login