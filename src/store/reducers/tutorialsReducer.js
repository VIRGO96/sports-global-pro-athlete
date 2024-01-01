const initState = {
	allTutorials: [],
};
const tutorialsReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_ALL_TUTORIALS':
			return {
				...state,
				allTutorials: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
export default tutorialsReducer;
