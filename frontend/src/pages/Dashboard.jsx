import { useAuthContext } from '../context/AuthContext';


const Dashboard = () => {
  const { user} = useAuthContext();
  return (
    <div>
      <h1>Welcome, {user ? user.username : 'User'}!</h1>
      {/* <button onClick={''}>Logout</button> */}
    </div>
  );
};

export default Dashboard;
