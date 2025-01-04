
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './component/Auth/Login';
import User from './component/Chat/Chat';
import ProtectedRoute from './utils/ProtectedRoute'; 
import { isTokenValid ,getUserInfoFromToken} from './utils/jwtTokenUtils';
import  socket from './utils/socket';
import Test from './component/Test/Test'
const isAuthenticated = isTokenValid();

const userDetails = getUserInfoFromToken();
if (userDetails) {
  // Emit userLogin event to the server to track the user connection
  socket.emit('userLogin', userDetails);

}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route: Login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
 
        {/* Protected route: User page, only accessible if the token is valid */}
        <Route path="/chat" element={<ProtectedRoute component={User} />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
