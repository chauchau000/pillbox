import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import LoginImage from "../LoginImage/LoginImage";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (!email.length) errors.email ="Email is required."
    if (!password.length) errors.password='Password is required.'
    setErrors(errors)

  }, [email, password])


  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginErrors([])
    setHasSubmitted(true);

    if (Object.keys(errors).length) {
      return
    }

    const data = await dispatch(login(email, password));
    if (data) {
      setLoginErrors(data)
      setErrors({})
      setHasSubmitted(false);
      return
    };

  };

  const demoLogin = async (e) => {
    setEmail('demo@aa.io');
    setPassword('AppAcademy1')
  }





  return (
    <div id='login-page-container'>

      <div id="left-side">
        <div id="pillbox-welcome">pillbox</div>
        <div id='login-up-title'>Log in</div>

        <form id='login-form-container' onSubmit={handleSubmit}>
          <div id='login-email-container'>

            <label className='login-label'>
              Email
            </label>
            <input className='login-input'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />

          {hasSubmitted && errors.email && <p className='errors'>{errors.email}</p>}
          </div>

          <div id="login-password-container">

            <label className='login-label'>
              Password
            </label>
            <input className='login-input'
              type="password"
              value={password}
              placeholder='Password'

              onChange={(e) => setPassword(e.target.value)}
            />
            {hasSubmitted && errors.password && <p className='errors'>{errors.password}</p>}
            {loginErrors.length > 0 && loginErrors.map( (e, key) =>(
              <p className='errors' key={key}>{e}</p>
            ))}
          </div>
          <button id='login-button' type="submit">Login</button>
          <button id="demo-user" type="submit" onClick={demoLogin}>Demo User Login</button>
        </form>

        <div id="login-sign-up-container">
          <p>Don't have an account here?</p> 
          <p> Sign up here!</p>
          <Link className='login-signup' to='/signup'>Sign up</Link>
        </div>
      </div>
      <div id="right-side">
        <LoginImage />
      </div>
    </div>
  );
}

export default LoginFormPage;

