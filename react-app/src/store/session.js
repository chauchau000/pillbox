// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_MEDS = "session/GET_MEDS";
const GET_APPOINTMENTS = "session/GET_APPOINTMENTS";
const GET_USER_PROVIDERS = 'session/GET_USER_PROVIDERS'
const GET_GLUCOSE = 'session/GET_GLUCOSE'

//Direction constants
const AM_DIRECTIONS = [
	'Take 1 tablet once daily', //
	'Take 1 tablet once daily in the morning', //AM
	'Take 1 tablet twice daily', //AM PM
	'Take 1 tablet three times daily', // AM NOON PM
	'Take 1 tablet four times daily', // AM NOON PM QHS
	'Take 1 tablet every 6 hours', // AM NOON PM QHS
	'Take 1 tablet every 8 hours', // AM NOON QHS
	'Take 1 tablet every 12 hours', // AM HS

	'Take 1 capsule once daily', //
	'Take 1 capsule once daily in the morning', //AM
	'Take 1 capsule twice daily', //AM PM
	'Take 1 capsule three times daily', // AM NOON PM
	'Take 1 capsule four times daily', // AM NOON PM QHS
	'Take 1 capsule every 6 hours', // AM NOON PM QHS
	'Take 1 capsule every 8 hours', // AM NOON QHS
	'Take 1 capsule every 12 hours', // AM HS
]

const NOON_DIRECTIONS = [	
	'Take 1 tablet once daily at lunch', //
	'Take 1 tablet once daily at noon', //
	'Take 1 tablet three times daily', // AM NOON PM
	'Take 1 tablet four times daily', // AM NOON PM QHS
	'Take 1 tablet every 6 hours', // AM NOON PM QHS
	'Take 1 tablet every 8 hours', // AM NOON QHS

	'Take 1 capsule once daily at lunch', //
	'Take 1 capsule once daily at noon', //
	'Take 1 capsule three times daily', // AM NOON PM
	'Take 1 capsule four times daily', // AM NOON PM QHS
	'Take 1 capsule every 6 hours', // AM NOON PM QHS
	'Take 1 capsule every 8 hours', // AM NOON QHS
]

const PM_DIRECTIONS = [
	'Take 1 tablet once daily in the evening', //PM
	'Take 1 tablet twice daily', //AM PM
	'Take 1 tablet three times daily', // AM NOON PM
	'Take 1 tablet four times daily', // AM NOON PM QHS
	'Take 1 tablet every 6 hours', // AM NOON PM QHS

	'Take 1 capsule once daily in the evening', //PM
	'Take 1 capsule twice daily', //AM PM
	'Take 1 capsule three times daily', // AM NOON PM
	'Take 1 capsule four times daily', // AM NOON PM QHS
	'Take 1 capsule every 6 hours', // AM NOON PM QHS
]

const HS_DIRECTIONS = [
	'Take 1 tablet once daily at bedtime', //HS
	'Take 1 tablet four times daily', // AM NOON PM QHS
	'Take 1 tablet every 6 hours', // AM NOON PM QHS
	'Take 1 tablet every 8 hours', // AM NOON QHS
	'Take 1 tablet every 12 hours', // AM HS

	'Take 1 capsule once daily at bedtime', //HS
	'Take 1 capsule four times daily', // AM NOON PM QHS
	'Take 1 capsule every 6 hours', // AM NOON PM QHS
	'Take 1 capsule every 8 hours', // AM NOON QHS
	'Take 1 capsule every 12 hours', // AM HS
]

const PRN_DIRECTIONS = [
	'Take 1 capsule every 6 hours as needed',
	'Take 1 capsule every 4 hours as needed',
	'Take 1 capsule every 8 hours as needed',
	'Take 1 capsule every 12 hours as needed',
	'Take 1 capsule every 2 hours as needed',
	'Take 1 capsule every hour as needed',

	'Take 1 tablet every 6 hours as needed',
	'Take 1 tablet every 4 hours as needed',
	'Take 1 tablet every 8 hours as needed',
	'Take 1 tablet every 12 hours as needed',
	'Take 1 tablet every 2 hours as needed',
	'Take 1 tablet every hour as needed',

]


// const ADD_USERMED = 'session/ADD_USERMED'

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const getMeds = (meds) => ({
	type: GET_MEDS,
	payload: meds,
})

const getAppointments = (appointments) => ({
	type: GET_APPOINTMENTS,
	payload: appointments,
})

const getUserProviders = (providers) => ({
	type: GET_USER_PROVIDERS,
	payload: providers
})

const getGlucose = (glucose) => ({
	type: GET_GLUCOSE,
	payload: glucose
})

// const addUserMed = (med) => ({
// 	type: ADD_USERMED,
// 	payload: med
// })


const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (first_name, last_name, dob, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			first_name,
			last_name,
			dob,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

//fetch User values - user meds, appointments, glucose


export const fetchUserMeds = () => async (dispatch) => {
	const response = await fetch('/api/users/meds')

	if (response.ok) {
		const data = await response.json();
		dispatch(getMeds(data));
		return data
	} else {
		const errors = await response.json();
		return errors
	}


}

export const fetchUserAppointments = () => async (dispatch) => {
	const response = await fetch('/api/users/appointments')

	if (response.ok) {
		const data = await response.json();
		dispatch(getAppointments(data));
		return data
	} else {
		const errors = await response.json();
		return errors
	}
}

export const fetchUserProviders = () => async dispatch => {
	const response = await fetch('/api/users/providers')

	if (response.ok) {
		const data = await response.json();
		await dispatch(getUserProviders(data));
	} else {
		const errors = await response.json()
		return errors
	}
}

export const fetchGlucose = () => async dispatch => {
	const response = await fetch('/api/users/glucose')

	if (response.ok) {
		const data = await response.json();
		dispatch(getGlucose(data));
		return data
	} else {
		const errors = await response.json()
		return errors
	}
}

//User Meds

export const createUserMed = (med_id, provider_id, newMed) => async dispatch => {
	const res = await fetch(`/api/users/meds/${med_id}/${provider_id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newMed)
	})
	if (res.ok) {
		const data = await res.json();
		console.log('User med created')
		return data
	} else {
		const errors = await res.json();
		return errors;
	}

}

export const deleteUserMed = (userMed_id) => async dispatch => {
	const res = await fetch(`/api/users/meds/${userMed_id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})

	if (res.ok) {
		const data = await res.json()
		// console.log(data)
		return data
	} else {
		const errors = await res.json()
		return errors
	}
}

export const flipActive = (userMed_id) => async dispatch => {
	const res = await fetch(`/api/users/meds/${userMed_id}/active`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
		}
	})

	if (res.ok) {
		// console.log("Med activity flipped")
		return res
	} else {
		const errors = await res.json()
		return errors
	}
}

export const editMed = (userMed_id, newMed) => async dispatch => {
	const res = await fetch(`/api/users/meds/${userMed_id}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newMed)
	})

	if (res.ok) {
		const data = await res.json()
		// console.log(data)
		return data
	} else {
		const errors = await res.json()
		return errors
	}
}

//Appointments

export const createAppt = (provider_id, appt) => async dispatch => {
	const res = await fetch(`/api/appointments/${provider_id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(appt)
	})

	if (res.ok) {
		const data = await res.json();
		// console.log('User appt created')
		return data
	} else {
		const errors = await res.json();
		return errors;
	}
}

export const editAppt = (appt_id, newAppt) => async dispatch => {
	const res = await fetch(`/api/appointments/${appt_id}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newAppt)
	})

	if (res.ok) {
		const data = await res.json();
		return data
	} else {
		const errors = await res.json()
		return errors
	}
}

export const deleteAppt = (id) => async dispatch => {
	const res = await fetch(`/api/appointments/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})

	if (res.ok) {
		const data = await res.json()
		// console.log(data)
		return data
	} else {
		const errors = await res.json()
		return errors
	}
}

//Glucose 

export const createGlucose = (date,time,level,notes) => async (dispatch) => {
	const res = await fetch("/api/glucose/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({date,time,level,notes})
	})

	if (res.ok) {
		const data = await res.json();
		return data
	} else {
		const errors = await res.json();
		// console.log(errors)
		return errors;
	}
}


export const editGlucose = (glucose_id, newGlucose) => async dispatch => {
	const res = await fetch(`/api/glucose/${glucose_id}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newGlucose)
	})

	if (res.ok) {
		const data = await res.json();
		return data
	} else {
		const errors = await res.json()
		return errors
	}
}

export const deleteGlucose = (id) => async dispatch => {
	const res = await fetch(`/api/glucose/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})

	if (res.ok) {
		const data = await res.json()
		// console.log(data)
		return data
	} else {
		const errors = await res.json()
		return errors
	}
}


const sessionReducer = (state = initialState, action) => {
	let newState = { ...state }
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case GET_MEDS:
			const meds = action.payload;
			newState['meds'] = meds;
			newState['am'] = []
			newState['noon'] = []
			newState['pm'] = []
			newState['hs'] = []
			newState['prn'] = []
			meds.filter(med => med.active).forEach(med => {
				if (AM_DIRECTIONS.includes(med.directions)) newState['am'].push(med)
				if (NOON_DIRECTIONS.includes(med.directions)) newState['noon'].push(med)
				if (PM_DIRECTIONS.includes(med.directions)) newState['pm'].push(med)
				if (HS_DIRECTIONS.includes(med.directions)) newState['hs'].push(med)
				if (PRN_DIRECTIONS.includes(med.directions)) newState['prn'].push(med)
			})
			return newState
		case GET_APPOINTMENTS:
			newState['appointments'] = action.payload
			return newState;
		case GET_USER_PROVIDERS:
			newState['providers'] = action.payload
			return newState
		case GET_GLUCOSE:
			// console.log(action.payload)
			newState['glucose'] = action.payload
			return newState
		case REMOVE_USER:
			return { user: null, meds: null, appointments: null, providers: null };
		default:
			return state;
	}
}

export default sessionReducer