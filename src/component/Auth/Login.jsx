import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice'; 
import apiClient from '../../intercepter/intercepter';
import { getUserInfoFromToken } from '../../utils/jwtTokenUtils';  
import  socket  from '../../utils/socket';

const Login = () => {
  const [formData, setFormData] = useState({ phoneNumber: '', countryCode: '+1', otp: '' });
  const [showOtpForm, setShowOtpForm] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e, isOtp = false) => {
    e.preventDefault();
    setSuccessMessage('');
    dispatch(loginStart());
  
    try {
      const endpoint = isOtp ? '/verify' : '/login';
      const { data } = await apiClient.post(endpoint, formData);
      
      setSuccessMessage(data?.message || (isOtp ? 'OTP verified successfully!' : 'Login successful!'));
      setShowOtpForm(!isOtp);
      
      // Save token to localStorage when OTP is verified
      if (data?.data?.token) {
        localStorage.setItem('authToken', data.data.token);

        // Decode the token and dispatch userLogin action with user details
        const userDetails = getUserInfoFromToken();
        if (userDetails) {
          dispatch(loginSuccess({ token: data.data.token, user: userDetails }));
          socket.emit('userLogin', userDetails);  // Emit the userLogin event with user details
        }

        // Navigate to the user route after successful login/OTP verification
       navigate('/chat');
      }
  
      dispatch(loginSuccess());
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'An error occurred.'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">{showOtpForm ? 'Enter OTP' : 'Login'}</h2>
        <form onSubmit={(e) => handleSubmit(e, showOtpForm)}>
          {!showOtpForm && (
            <div className="mb-4 flex space-x-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="w-1/4 p-2 border-gray-600 rounded-l-md bg-gray-700 text-white"
              >
                <option value="+1">US (+1)</option>
                <option value="+91">India (+91)</option>
                <option value="+44">UK (+44)</option>
                <option value="+977">Nepal (+977)</option>
              </select>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-3/4 p-2 border-gray-600 rounded-r-md bg-gray-700 text-white"
              />
            </div>
          )}
          {showOtpForm && (
            <>
             <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-3/4 p-2 border-gray-600 rounded-r-md bg-gray-700 text-white"
              />
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              placeholder="Enter 6-digit OTP"
              className="w-full p-2 border-gray-600 rounded-md bg-gray-700 text-white mb-4"
            />
            </>
          )}
          {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
          >
            {loading ? (showOtpForm ? 'Verifying...' : 'Logging in...') : showOtpForm ? 'Verify OTP' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
