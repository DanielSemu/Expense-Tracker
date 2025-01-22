import React, { useState, useEffect, useRef } from "react";
import { AiFillDashboard } from "react-icons/ai";
import {
  FaBalanceScale,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
  FaAngleDown,
  FaChartPie,
  FaUser,
  FaKey ,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { logout, profile } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";


const Sidebar = () => {
  const [dropdownState, setDropdownState] = useState({
    charts: false,
    user: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);  
  const sidebarRef = useRef(null);
  const navigate = useNavigate();



  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = (menu) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };
  const handleLogout = async () => {
      await logout()
      navigate('/login')
      };

  useEffect(() => {
    const fetchProfile =async()=>{
      try {
          const res=await profile()
          setUserProfile(res)
      } catch (error) {
          console.error('Failed to fetch profile:', error);
      }
    }
    fetchProfile()
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={toggleSidebar}
        data-collapse-toggle="navbar-default"
        type="button"
        className="absolute top-0 left-0 z-10 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiFillDashboard />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => toggleDropdown("charts")}
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FaChartPie />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  Charts
                </span>
                <FaAngleDown />
              </button>
              <ul
                className={`${
                  dropdownState.charts ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/transactions"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GrTransaction />

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Transactions
                </span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  $
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/income"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaMoneyBillWave />
                <span className="flex-1 ms-3 whitespace-nowrap">Income</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  birr
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/expenses"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaMoneyCheckAlt />
                <span className="flex-1 ms-3 whitespace-nowrap">Expense</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  $
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/budget"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaBalanceScale />
                <span className="flex-1 ms-3 whitespace-nowrap">Budget</span>
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BiCategoryAlt />
                <span className="flex-1 ms-3 whitespace-nowrap">Categories</span>
              </Link>
            </li>

            <li>
              <button
                onClick={() => toggleDropdown("user")}
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FaUser />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                    {userProfile ? `Hello, ${userProfile.username}` : 'User'} 
                </span>
                <FaAngleDown />
              </button>
              <ul
                className={`${
                  dropdownState.user ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FaKey  />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                     Change Password
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                      onClick={handleLogout}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <CiLogout />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Sign Out
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
