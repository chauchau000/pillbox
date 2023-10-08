import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(first_name, last_name, dob, email, password));
      if (data) {
        setErrors(data)
      }

    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div id='signup-page-container'>
      <div id="left-side">

        <div id='sign-up-title'>Create an account</div>
        <form id='signup-form-container' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className='signup-label'> First Name</label>
          <input className='signup-input'
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label className='signup-label'>
            Last Name
          </label>
          <input className='signup-input'
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label className='signup-label'>
            Email
          </label>
          <input className='signup-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className='signup-label'>
            Date of Birth
          </label>
          <input className='signup-input'
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <label className='signup-label'>
            Password
          </label>
          <input className='signup-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className='signup-label'>
            Confirm Password
          </label>
          <input className='signup-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className='form-button' type="submit">Sign Up</button>
        </form>

        <div id='left-bottom-container'>
          <p>Already have an account?</p>
          <Link id='sign-in-button' to='/login'>Sign In</Link>
        </div>
      </div>

      <div id="right-side">
        <div id="placeholder">image goes here</div>
      </div>

    </div>
  );
}

export default SignupFormPage;
