import React from 'react';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();

	if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
		return null
	}

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<div id='nav-list'>
			{isLoaded && (
				<>
					<ProfileButton id='profile-button' user={sessionUser} />
					<NavLink exact to="/home" className='nav-item'><span id='nav-icon' className="material-symbols-outlined">
						pill
					</span>Meds</NavLink>
					<NavLink exact to="/appointments" className='nav-item'><span id='nav-icon' class="material-symbols-outlined">
						calendar_month
					</span>Appointments</NavLink>
					<NavLink exact to="/blood-glucose" className='nav-item'>
						<span class="material-symbols-outlined" id='nav-icon'>
							water_drop
						</span>Glucose
					</NavLink>
				</>
			)}
		</div>
	);
}

export default Navigation;