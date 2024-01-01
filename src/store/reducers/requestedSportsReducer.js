const initState = {
	sportRequests: [],
};

const requestedSportsReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_SPORT_REQUEST':
			return {
				...state,
				sportRequests: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
export default requestedSportsReducer;
