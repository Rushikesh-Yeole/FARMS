import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login} from "../store/loginSlice"

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.loginuser);

  const handleLogin = () => {
    if (mobileNumber && password) {
      dispatch(login({ mobileNumber, password }));
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="error">{error}</p>}
      {userData && <div className="user-info">{JSON.stringify(userData)}</div>}
    </div>
  );
};

export default LoginPage;