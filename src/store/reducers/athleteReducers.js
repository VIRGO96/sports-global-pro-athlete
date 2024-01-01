const initState = {
	complaintLoader: false,
	updateComplaintLoading: false,
	issues: [],
	institutes: [],
	hsInstitutes: [],
	states: [],
	schoolStates: [],
	cities: [],
	counties: [],
	collegeInstitutes: [],
};

const athleteReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_ATHLETE_ISSUES':
			return {
				...state,
				issues: action.payload,
			};
		case 'GET_INSTITUTES':
			return {
				...state,
				institutes: action.payload,
			};
		case 'GET_HIGH_SCHOOL_INSTITUTES':
			return {
				...state,
				hsInstitutes: action.payload,
			};
		case 'GET_STATES':
			return {
				...state,
				states: action.payload,
			};
		case 'GET_SCHOOL_STATES':
			return {
				...state,
				schoolStates: action.payload,
			};
		case 'GET_CITY_BY_STATE':
			return {
				...state,
				cities: action.payload,
			};
		case 'GET_COUNTY_BY_STATE':
			return {
				...state,
				counties: action.payload,
			};
		case 'NEW_COLLEGE_UNIVERSITIES':
			return {
				...state,
				collegeInstitutes: action.payload,
			};
		case 'GENERATE_COMPLAINT':
			return {
				...state,
				complaintLoader: true,
			};
		case 'GENERATE_COMPLAINT_END':
			return {
				...state,
				complaintLoader: false,
			};
		case 'UPDATEComplaintLOADER':
			return {
				...state,
				updateComplaintLoading: false,
			};
		default:
			return {
				...state,
			};
	}
};
export default athleteReducer;
