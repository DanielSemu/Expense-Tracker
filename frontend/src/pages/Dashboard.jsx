import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user} = useAuth();
  return (
    <div>
      <h1>Welcome, {user || 'User'}!</h1>
    </div>
  );
};

export default Dashboard;
