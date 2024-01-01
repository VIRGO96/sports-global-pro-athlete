const initState = {
	loading: false,
};

const shopReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ORDER_LOADER':
			return {
				...state,
				loading: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
export default shopReducer;
