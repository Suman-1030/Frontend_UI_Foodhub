import React,{useState} from 'react'
import { Api_Path } from '../Pages/Link'

function Login({Welcomehandler}) {
const [Email,setEmail]=useState("")
const [Password,setPassword]=useState("")
const [data,setdata]=useState("")
const [Loading,setLoading]=useState("")



const Loginhandler=async (e)=>{
    
  setLoading(true)
    e.preventDefault()
    try{
      const response=await fetch(`${Api_Path}/user/Login`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({Email,Password})
      } )
     const Data=await response.json()
     if(response.ok){
       alert("Login Successful")
       setEmail("")
       setPassword("")
       localStorage.setItem('login Token',Data.token)
       localStorage.setItem('Userid',Data.UserId)
       setdata(Data)
       setLoading(false)
      
     }
     if(!response.ok){
        if ((response.status===404) &&(Data.msg=="user not found")){
          alert("user not Registered")
        }
        if ((response.status===400) &&(Data.msg=="Invalid password")){
          alert("Incorrect password")
        }
     }
     window.location.reload()
    }

    catch(error){
        console.log(error)
        alert("Login failed")
    }
  }


  return (
    
    <div className="login">
     
        <form onSubmit={Loginhandler}>
            <h2>Login Form</h2><br/>
            <label>Email</label>
            <input type='email' name='Email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email'/><br/>
            <label>Password</label>
            <input type='password' name='Password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password'/><br/>

            <button type='submit'>{Loading?(<div>Submitting...</div>):(<div>Submit</div>)}</button>
        </form>
      
    </div>
  )
}

export default Login
