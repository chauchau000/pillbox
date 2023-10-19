import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import LoginImage from "../LoginImage/LoginImage";

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
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    const errors = {};
    if (!email.length) errors.email = "Email is required";
    if (!first_name.length) errors.first_name = "First name is required";
    if (!last_name.length) errors.last_name = "Last name is required";
    if (!dob.length) errors.dob = "Date of birth is required";
    if (!password.length) errors.password = "Password is required";
    if (!confirmPassword.length) errors.confirmPassword = "Confirm password is required";
    if (password !== confirmPassword) errors.passwordMatch = "Password and confirmed passwords must match"

    setErrors(errors)

  }, [email, first_name, last_name, dob, password, confirmPassword])

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.keys(errors).length) {
      return
    }

    const data = await dispatch(signUp(first_name, last_name, dob, email, password));
    setErrors({})
    setHasSubmitted(false);

  };

  return (
    <div id='signup-page-container'>
      <div id="left-side">
        <div id="pillbox-welcome">pillbox</div>
        <div id='sign-up-title'>Create an account</div>
        <form id='signup-form-container' onSubmit={handleSubmit}>
          <div className="signup-section-container">

            <div className="signup-subsection-container section-left">

              <label className='signup-label'> First Name</label>
              <input className='signup-input'
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {hasSubmitted && errors.first_name && <p className='errors'>{errors.first_name}</p>}

            </div>

            <div className="signup-subsection-container section-right">

              <label className='signup-label'>
                Last Name
              </label>
              <input className='signup-input'
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />

              {hasSubmitted && errors.last_name && <p className='errors'>{errors.last_name}</p>}

            </div>

          </div>

          <div className="signup-section-container">


            <div className="signup-subsection-container section-left">

              <label className='signup-label'>
                Email
              </label>
              <input className='signup-input'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {hasSubmitted && errors.email && <p className='errors'>{errors.email}</p>}

            </div>

            <div className="signup-subsection-container section-right">

              <label className='signup-label'>
                Date of Birth
              </label>
              <input className='signup-input'
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              {hasSubmitted && errors.dob && <p className='errors'>{errors.dob}</p>}

            </div>
          </div>
          <div className="signup-section-container">

            <div className="signup-subsection-container section-left">

              <label className='signup-label'>
                Password
              </label>
              <input className='signup-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {hasSubmitted && errors.password && <p className='errors'>{errors.password}</p>}

            </div>

            <div className="signup-subsection-container section-right">

              <label className='signup-label'>
                Confirm Password
              </label>
              <input className='signup-input'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {hasSubmitted && errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
              {hasSubmitted && errors.passwordMatch && <p className='errors'>{errors.passwordMatch}</p>}


            </div>
          </div>
          <button id='signup-button' type="submit">Sign Up</button>
        </form>

        <div id='signup-bottom-container'>
          <p>Already have an account?</p>
          <Link id='signin-button' to='/login'>Sign In</Link>
        </div>
      </div>

      <div id="right-side">
        <LoginImage />
      </div>

    </div>
  );
}

export default SignupFormPage;
