import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

const RegisterLogin = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    
    
    try {
        console.log(type);
      const url = type === "login" ? "http://127.0.0.1:8000/api/token/" : "http://127.0.0.1:8000/auth/register/";
      const response = await axios.post(url, formData);

      // Handle successful response
      console.log(response.data);
      alert(`Successfully ${type === "register" ? "registered" : "logged in"}!`);
    } catch (error) {
      // Handle errors
      setError(error.response?.data?.message || "An error occurred");
    }
  };


  return (
    <div className="body-container">
    <div className={`custom-container ${toggleForm ? 'custom-active' : ''}`} id="custom-container">
      <div className="custom-form-container custom-sign-up">
        <form onSubmit={(e) => handleSubmit(e, "register")}>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
      <div className="custom-form-container custom-sign-in">
        <form onSubmit={(e) => handleSubmit(e, "login")}>
          <h1>Sign In</h1>
          <span>or use your email password</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <a href="#">Forget Your Password?</a>
          <button type='submit'>Sign In</button>
        </form>
      </div>
      <div className="custom-toggle-container">
        <div className="custom-toggle">
          <div className="custom-toggle-panel custom-toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <button className="custom-hidden" onClick={() => setToggleForm(false)} id="login">
              Sign In
            </button>
          </div>
          <div className="custom-toggle-panel custom-toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site features</p>
            <button className="custom-hidden" onClick={() => setToggleForm(true)} id="register">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegisterLogin;
