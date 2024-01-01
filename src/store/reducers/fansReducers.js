const initState = {
	requests: [],
	licenses: [],
	subscriptionEarning: [],
	fans: [],
	loading: false,
	chatLoading: false,
	chatEarning: [],
};
const fansReducers = (state = initState, action) => {
	switch (action.type) {
		case 'GET_FANS':
			return {
				...state,
				fans: action.payload,
			};
		case 'GET_FANS_REQUESTS':
			return {
				...state,
				requests: action.payload,
			};
		case 'GET_LICENSES':
			return {
				...state,
				licenses: action.payload,
			};
		case 'GET_EARNING_SUBSCRIPTION_BY_ID':
			return {
				...state,
				subscriptionEarning: action.payload,
			};
		case 'GET_CHAT_EARNING_BY_ID':
			return {
				...state,
				chatEarning: action.payload,
			};
		case 'SUBSCRIPTION_LOADING':
			return {
				...state,
				loading: action.payload,
			};
		case 'CHAT_EARNING_LOADING':
			return {
				...state,
				chatLoading: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
export default fansReducers;
