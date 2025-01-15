
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const useAuth = () => {
  const context=useContext(AuthContext)
  if (!context) {
    throw new error("useAuth must be used within an AuthProvider")
  }
  const {user,setUser}=context
  return { user, setUser };
};

export default useAuth;
