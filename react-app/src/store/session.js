// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_MEDS = "session/GET_MEDS";
const GET_APPOINTMENTS = "session/GET_APPOINTMENTS";
const GET_USER_PROVIDERS = 'session/GET_USER_PROVIDERS'
const GET_GLUCOSE = 'session/GET_GLUCOSE'

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
		dispatch(getUserProviders(data));
		return data
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


const sessionReducer = (state = initialState, action) => {
	let newState = { ...state}
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case GET_MEDS:
			newState['meds'] = action.payload
			return newState
		case GET_APPOINTMENTS:
			newState['appointments'] = action.payload
			return newState;	
		case GET_USER_PROVIDERS:
			newState['providers'] = action.payload
			return newState
		case GET_GLUCOSE:
			console.log(action.payload)
			newState['glucose'] = action.payload
			return newState
		case REMOVE_USER:
			return { user: null, meds: null, appointments: null, providers: null };
		default:
			return state;
	}
}

export default sessionReducer