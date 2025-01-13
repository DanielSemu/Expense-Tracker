
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const PrivateRoute = ({children})=>{
    const {user} =useAuthContext()
    return user? children: <Navigate to='/'/>
}

export default PrivateRoute
