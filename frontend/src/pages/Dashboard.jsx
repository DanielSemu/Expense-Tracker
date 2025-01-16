import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../api/auth";

const Dashboard = () => {
  
  const { user} = useAuth();
  return (
    <div>
      <h1>Welcome, {user || 'User'}!</h1>
      <Link to="/home">Home</Link>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
