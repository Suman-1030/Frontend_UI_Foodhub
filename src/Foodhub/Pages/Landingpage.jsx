import React,{useState,useEffect} from 'react'
import '../../App.css'
import Navbar from '../Components/Navbar'
import ItemsDisplay from '../Components/ItemsDisplay'
import Chains from '../Components/Chains'
import FirmCollections from '../Components/FirmCollections'
import Login from '../Components/Login'
import Register from '../Components/Register'
import Cart from '../Components/Cart'
import Banner from '../Components/Banner'
import BeforeLogin from '../Components/BeforeLogin'

function Landingpage() {
  const [ShowLogin,setShowLogin]=useState(false)
  const [ShowRegister,setShowRegister]=useState(false)
  const [LoginShower,setLoginShower]=useState(false)
  const [Logout,setLogout]=useState(false)


  function Loginhandler(){
    setShowLogin(true)
    setShowRegister(false)
  }
  function Registerhandler(){
    setShowLogin(false)
    setShowRegister(true)
  }

  function Logouthandler(){
    localStorage.removeItem('Userid')
    localStorage.removeItem('login Token')
    window.location.reload()
  }

 useEffect(()=>{
  const Token=localStorage.getItem('login Token')
  if(Token){
     setLogout(true)
     setLoginShower(true)
   
  }
 },[])

  return (
    <div>
      
      <Navbar  Loginhandler={Loginhandler} Registerhandler={Registerhandler}  Logouthandler={Logouthandler} />
      {LoginShower && <Banner/>}
     
     {!LoginShower && <BeforeLogin>
      {ShowLogin &&  <Login/>}
      {ShowRegister && <Register ShowLogin={LoginShower}/>}
      </BeforeLogin>}
      
      
     {LoginShower &&<div className='bd'>
          
          <ItemsDisplay/>
          <Chains/>
          <FirmCollections/>
          </div>}
      </div>

  )
}

export default Landingpage
