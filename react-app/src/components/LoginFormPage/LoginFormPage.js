import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    setEmail('demo@aa.io');
    setPassword('password')
  }

  return (
    <div id='login-page-container'>
      <div id="left-side">
        <div id='login-up-title'>Log in</div>

        <form id='login-form-container' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className='login-label'>
            Email
            </label>
            <input className='signup-input'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <label className='login-label'>
            Password
            </label>
            <input className='signup-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <button className='form-button' type="submit">Login</button>
          <button id="demo-user" type="submit" onClick={demoLogin}>Demo User Login</button>
        </form>
      </div>
      <div id="right-side">
        <div id="placeholder">image goes here</div>
      </div>
    </div>
  );
}

export default LoginFormPage;

