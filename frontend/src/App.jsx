import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './privateRoute';
import { AuthProvider } from './context/AuthContext';


const App = () => {
  return (
   
      <Router> 
        <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
        </AuthProvider>
      </Router>
    
  );
};

export default App;
