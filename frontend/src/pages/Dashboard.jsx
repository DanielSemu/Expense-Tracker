import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome, {user ? user.username : 'User'}!</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Dashboard;
