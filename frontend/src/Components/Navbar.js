import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
        const [loggedIn, setLoggedIn] = useState(false);
        const [user,setUser] = useState(null)
        useEffect(() => {
          const currUser = localStorage.getItem('user');
          setUser(currUser)
        },[]);
        useEffect(()=>{
                if (user) {
                        setLoggedIn(true);
                      } if(!user) {
                        setLoggedIn(false);
                      }
        },[user])

  const renderNavBar = () => {
    if (loggedIn) {
      return (
        <ul className='navbar-right d-flex navbar-list'>
          <li className='nav-item'>
            <Link className='nav-link' to='/logout'>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='navbar-right d-flex navbar-list'>
          <li className='nav-item'>
            <Link className='nav-link' to='/registerUser'>
              Register
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/loginUser'>
              Login
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <nav className='navbar navbar-component'>
      <h3 className='brand'>Link Swift</h3>
      {renderNavBar()}
    </nav>
  );
};

export default Navbar;
