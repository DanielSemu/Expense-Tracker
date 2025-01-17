import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './privateRoute';
import Home from './pages/Home';
import MainRoute from './routes/MainRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PrivateRoute><MainRoute /></PrivateRoute>} />
    </Routes>
  );
};

export default App;
