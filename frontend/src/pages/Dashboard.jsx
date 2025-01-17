import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../api/auth";

const Dashboard = () => {
  const navigate=useNavigate()
  const { user,} = useAuth();
  const handleLogout =async()=>{
      await logout()
      navigate('/login')
  } 
  return (
    <div>
      <h1>Welcome, {user || 'User'}!</h1>
      <Link to="/home">Home</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
