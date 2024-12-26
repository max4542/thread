import { useState } from 'react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code is US (+1)

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle the login logic here
    console.log('Phone Number:', phoneNumber);
    console.log('Country Code:', countryCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 flex space-x-2">
            <div className="flex-2 w-1/4">
              <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="countryCode">
                Country Code
              </label>
              <select
                id="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
              >
                <option value="+1">US (+1)</option>
                <option value="+91">India (+91)</option>
                <option value="+44">UK (+44)</option>
                <option value="+977">Nepal (+977)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full p-2 border border-gray-600 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
