
const GET_ALL_PROVIDERS = 'providers/allProviders'

const getAllProviders = (providers) => ({
    type: GET_ALL_PROVIDERS,
    payload: providers
})

export const fetchAllProviders = () => async dispatch => {
    const response = await fetch('/api/providers')

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllProviders(data));
        return data
    } else {
        const errors = await response.json();
        return errors
    }
}


export const createProvider = (provider) => async dispatch => {
    const res = await fetch(`/api/providers/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(provider)
	})

	if (res.ok) {
		const data = await res.json();
		console.log('Provider created')
		return data
	} else {
		const errors = await res.json();
		return errors;
	}
}

const initialState = {};

const providersReducer = (state = initialState, action) => {
    let newState = { ...state}
	switch (action.type) {
        case GET_ALL_PROVIDERS:
            const providers = action.payload;
            providers.forEach(provider => {
                newState[provider.id]= provider
            })
            return newState
		default:
			return state;
	}
}

export default providersReducer;