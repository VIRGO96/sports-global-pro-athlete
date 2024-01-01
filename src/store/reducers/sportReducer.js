const initState = {
	sports: [],
};
const sportReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_SPORTS':
			return {
				...state,
				sports: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
export default sportReducer;
