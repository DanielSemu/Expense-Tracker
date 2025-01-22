// import React, { useState,useRef, useEffect } from "react";
// import "./navbar.css";
// import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
// import  {FaAngleDown} from 'react-icons/fa'
// import { Link,useNavigate } from "react-router-dom";
// import { logout, profile } from "../../api/auth";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false); 
//   const [headerActive, setHeaderActive] = useState(false);
//   const [userProfile, setUserProfile] = useState(null);  
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

// const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
// const handleLogout = async () => {
//   await logout()
//   navigate('/login')
// };

// const handleDropdownToggle = () => {
//   setDropdownVisible(!dropdownVisible);
// };

// const handleChangePassword = () => {
//   setDropdownVisible(false);
//   navigate('/change-password');
// };



// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownVisible(false);
//     }
//   };
//   document.addEventListener('mousedown', handleClickOutside);
//   return () => {
//     document.removeEventListener('mousedown', handleClickOutside);
//   };
// }, []);



//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY >= 50) {
//         setHeaderActive(true);
//       } else {
//         setHeaderActive(false);
//       }
//     };
  
//     const fetchProfile = async () => {
//       try {
//         const res = await profile();  
//         setUserProfile(res);  
//       } catch (error) {
//         console.error('Failed to fetch profile:', error);
//       }
//     };
  
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownVisible(false);
//       }
//     };
  
//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener('mousedown', handleClickOutside);
  
//     fetchProfile();
  
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
  
//   return (
//     <header className={`header ${headerActive ? "active" : ""}`} data-header>
//       <div className="container">
//         {/* Logo */}
//         <a href="#" className="logo">
//           Expense Tracker
//         </a>

//         {/* Navigation */}
//         <nav className={`navbar ${menuOpen ? "active" : ""}`} data-navbar>
//           {/* Close button */}
//           <button
//             className="nav-close-btn"
//             aria-label="close menu"
//             onClick={toggleMenu}
//           >
//             <IoCloseOutline aria-hidden="true" className="ion-icon" />
//           </button>
        
//           {/* Navbar list */}
      
//           <ul className="navbar-list">
//             <li>
//               <Link  to="/home" className="navbar-link">Home</Link>
//             </li>
//             <li>
//             <Link  to="/transactions" className="navbar-link">Transactions</Link>
//             </li>
//             {/* <li>
//             <Link  to="/expenses" className="navbar-link">Expenses</Link>
//             </li>
//             <li>
//             <Link  to="/incomes" className="navbar-link">Incomes</Link>
//             </li> */}
//             <li>
//             <Link  to="/budget" className="navbar-link">Budget</Link>
//             </li>
//             <li>
//             <Link  to="/categories" className="navbar-link">Categories</Link>
//             </li>
//             <li className="navbar-link ">
          
//             <div className='relative'>
//             {/* Display Username */}
//             <button onClick={handleDropdownToggle} className="flex items-center focus:outline-none">
//               {userProfile ? `Hello, ${userProfile.username}` : 'User'} <span><FaAngleDown/></span>
//             </button>
            
//             {dropdownVisible && (
//   <div
//     ref={dropdownRef}
//     className="absolute md:right-0 md:ml-5 -left-12 mt-2 bg-white text-black rounded shadow-lg p-2 w-80" 
//   >
//     <button
//       className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//     >
//       {userProfile.username}
//     </button>
//     <button
//       onClick={handleChangePassword}
//       className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//     >
//       Change Password
//     </button>
//     <button
//       onClick={handleLogout}
//       className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//     >
//       Logout
//     </button>
//   </div>
// )}

//           </div>

//             </li>
//           </ul>
//         </nav>

//         {/* Open button */}
//         <button
//           className="nav-open-btn"
//           aria-label="open menu"
//           onClick={toggleMenu}
//         >
//           <IoMenuOutline className="ion-icon" aria-hidden="true" />
//         </button>

//         {/* Overlay */}
//         <div
//           className={`overlay ${menuOpen ? "active" : ""}`}
//           onClick={toggleMenu}
//         ></div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;import React from 'react'

const Navbar = () => {
  return (
    <div className="p-0 sm:ml-64">
        <div className="p-0 flex gap-2 ">
          
        <nav class="bg-white w-full border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
      </div>
  )
}

export default Navbar
