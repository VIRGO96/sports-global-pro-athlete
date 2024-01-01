const initialState = {
	confirmConsentById: '',
	consentLoading: false,
};
const confirmConsentReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CONSENT_MESSAGE_CONFIRMED':
			return {
				...state,
				confirmConsentById: action.payload,
			};
		case 'CONFIRM_CONSENT_LOADER':
			return {
				...state,
				consentLoading: action.payload,
			};
		default:
			return state;
	}
};
export default confirmConsentReducer;
