import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa6";

function Navbar({ Loginhandler, Registerhandler, Logouthandler }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('login Token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('login Token')]); // force refresh on logout/login

  return (
    <div className='Nav'>
     
      <div className='title'>
      <Link to={'/'} className='linked'>
        <div >
          <h1>Foodhub</h1>
        </div>
      </Link>
      </div>
      
      <div className="Auth">
        {isLoggedIn ? (
          <div className='cartlog'>
            <div className="logout">
              <span onClick={Logouthandler}>Logout</span>
            </div>
            <Link to="/Cart">
              <span className="cart">
                <FaCartPlus />
              </span>
            </Link>                   
          </div>
        ) : (
          <div className="auth-options">
            <span onClick={Loginhandler}>Login</span>
            <span onClick={Registerhandler}>/Signup</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
