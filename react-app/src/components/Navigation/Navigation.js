import React from 'react';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import ProfileButton from './ProfileButton';
import { logout } from "../../store/session";

import './Navigation.css'


function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();

	if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
		return null
	}

	if (!sessionUser) return <Redirect to="/" />;


	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	  };


	return (
		<div id='nav-list'>
			<NavLink exact to='/home' id='nav-title'>pillbox</NavLink>
			{isLoaded && (
				<>
					<NavLink exact to="/home" className='nav-item'>
						<span id='nav-icon' className="material-symbols-outlined">
							pill
						</span>
						<p className="nav-item-text">
							Meds
						</p>
					</NavLink>
					<NavLink exact to="/appointments" className='nav-item'>
						<span id='nav-icon' className="material-symbols-outlined">
							calendar_month
						</span>
						<p className="nav-item-text">
							Appointments
						</p>
					</NavLink>
					<NavLink exact to="/blood-glucose" className='nav-item'>
						<span class="material-symbols-outlined" id='nav-icon'>
							water_drop
						</span>
						<p className="nav-item-text">
							Glucose
						</p>
					</NavLink>

					<div id='logout-button' className='nav-item' onClick={handleLogout}>
						<span id='logout-icon' className="material-symbols-outlined">
							logout
						</span>
						<p className="nav-item-text">
							Log Out
						</p>
					</div>
				</>
			)}
		</div>
	);
}

export default Navigation;