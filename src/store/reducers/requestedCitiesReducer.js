const initState = {
	cityRequests: [],
};

const requestedCitiesReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_CITY_REQUEST':
			return {
				...state,
				cityRequests: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
export default requestedCitiesReducer;
