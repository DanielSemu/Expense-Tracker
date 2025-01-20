import React, { useState,useRef, useEffect } from "react";
import "./navbar.css";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import  {FaAngleDown} from 'react-icons/fa'
import { Link,useNavigate } from "react-router-dom";
import { logout, profile } from "../../api/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [headerActive, setHeaderActive] = useState(false);
  const [userProfile, setUserProfile] = useState(null);  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
const handleLogout = async () => {
  await logout()
  navigate('/login')
};

const handleDropdownToggle = () => {
  setDropdownVisible(!dropdownVisible);
};

const handleChangePassword = () => {
  setDropdownVisible(false);
  navigate('/change-password');
};



useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setHeaderActive(true);
      } else {
        setHeaderActive(false);
      }
    };
  
    const fetchProfile = async () => {
      try {
        const res = await profile();  
        setUserProfile(res);  
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
  
    fetchProfile();
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className={`header ${headerActive ? "active" : ""}`} data-header>
      <div className="container">
        {/* Logo */}
        <a href="#" className="logo">
          Expense Tracker
        </a>

        {/* Navigation */}
        <nav className={`navbar ${menuOpen ? "active" : ""}`} data-navbar>
          {/* Close button */}
          <button
            className="nav-close-btn"
            aria-label="close menu"
            onClick={toggleMenu}
          >
            <IoCloseOutline aria-hidden="true" className="ion-icon" />
          </button>
        
          {/* Navbar list */}
      
          <ul className="navbar-list">
            <li>
              <Link  to="/home" className="navbar-link">Home</Link>
            </li>
            <li>
            <Link  to="/expenses" className="navbar-link">Expenses</Link>
            </li>
            <li>
            <Link  to="/incomes" className="navbar-link">Incomes</Link>
            </li>
            <li>
            <Link  to="/budget" className="navbar-link">Budget</Link>
            </li>
            <li>
            <Link  to="/categories" className="navbar-link">Categories</Link>
            </li>
            <li className="navbar-link ">
          
            <div className='relative'>
            {/* Display Username */}
            <button onClick={handleDropdownToggle} className="flex items-center focus:outline-none">
              {userProfile ? `Hello, ${userProfile.username}` : 'User'} <span><FaAngleDown/></span>
            </button>
            
            {dropdownVisible && (
  <div
    ref={dropdownRef}
    className="absolute md:right-0 md:ml-5 -left-12 mt-2 bg-white text-black rounded shadow-lg p-2 w-80" 
  >
    <button
      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      {userProfile.username}
    </button>
    <button
      onClick={handleChangePassword}
      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      Change Password
    </button>
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      Logout
    </button>
  </div>
)}

          </div>

            </li>
          </ul>
        </nav>

        {/* Open button */}
        <button
          className="nav-open-btn"
          aria-label="open menu"
          onClick={toggleMenu}
        >
          <IoMenuOutline className="ion-icon" aria-hidden="true" />
        </button>

        {/* Overlay */}
        <div
          className={`overlay ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        ></div>
      </div>
    </header>
  );
};

export default Navbar;
