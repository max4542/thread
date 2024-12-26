
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './component/Auth/Login';
import User from './component/User/User';
import ProtectedRoute from './utils/ProtectedRoute'; 
import { isTokenValid } from './utils/jwtTokenUtils';

const isAuthenticated = isTokenValid();

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route: Login page */}
        <Route path="/login" element={<Login />} />

        {/* Protected route: User page, only accessible if the token is valid */}
        <Route path="/user" element={<ProtectedRoute component={User} />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/user" : "/login"} />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
