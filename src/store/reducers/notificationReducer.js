const initState={
    notification:[]
}

const notificationReducer = (state = initState, action) => {
    switch (action.type) {
		case 'GET_NOTIFICATION':
			return {
				...state,
				notification: action.payload,
			};
		default:
			return {
				...state,
			};
	}
}

export default notificationReducer
