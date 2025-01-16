import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user} = useAuth();
  return (
    <div>
      <h1>Welcome, {user || 'User'}!</h1>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default Dashboard;
