
const GET_ALLMEDS = 'meds/allMeds'

const getAllMeds = (meds) => ({
    type: GET_ALLMEDS,
    payload: meds
})

export const fetchAllMeds = () => async dispatch => {
    const response = await fetch('/api/meds')

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllMeds(data));
        return data
    } else {
        const errors = await response.json();
        return errors
    }
}

const initialState = {};

const medsReducer = (state = initialState, action) => {
    let newState = { ...state}
	switch (action.type) {
        case GET_ALLMEDS:
            const meds = action.payload;
            meds.forEach(med => {
                newState[med.id]= med
            })
            return newState
		default:
			return state;
	}
}

export default medsReducer;