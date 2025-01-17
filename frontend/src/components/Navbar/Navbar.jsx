import React, { useState, useEffect } from "react";
import "./navbar.css";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for menu open/close
  const [headerActive, setHeaderActive] = useState(false); // State for header scroll behavior

  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Add a scroll event listener to handle header activation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setHeaderActive(true);
      } else {
        setHeaderActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${headerActive ? "active" : ""}`} data-header>
      <div className="container">
        {/* Logo */}
        <a href="#" className="logo">
          Crafti
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
                
              <Link  to="/home" className="navbar-link">
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="navbar-link">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link">
                Contact Us
              </a>
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
