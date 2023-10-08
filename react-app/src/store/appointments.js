
//FETCH USER APPOINTMENTS
const GET_APPOINTMENTS = "appointments/GET_APPOINTMENTS";

const getAppointments = (appointments) => ({
    type: GET_APPOINTMENTS,
    payload: appointments,
})

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

//EMPTY MED STORE ON LOGOUT
const REMOVE_APPOINTMENTS = 'appointments/REMOVE_APPOINTMENTS'

const removeAppointments = () => ({
    type: REMOVE_APPOINTMENTS
})

export const removeUserAppointments = () => async dispatch => {
    dispatch(removeAppointments())
}

const initialState = {};

const appointmentsReducer = (state = initialState, action) => {
    let newState = { ...state}
	switch (action.type) {
		case GET_APPOINTMENTS:
            const userAppointments = action.payload
            userAppointments.forEach( (app) => {
                newState[app['id']] = app
            })
			return newState;
        case REMOVE_APPOINTMENTS:
            return {}
		default:
			return state;
	}
}

export default appointmentsReducer;