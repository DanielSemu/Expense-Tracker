import { useAuthContext } from '../context/AuthContext';


const Dashboard = () => {
  const { user} = useAuthContext();
  console.log(user); 
  return (
    <div>

      <h1>Welcome, {user || 'User'}!</h1>


      {/* <button onClick={''}>Logout</button> */}
    </div>
  );
};

export default Dashboard;
