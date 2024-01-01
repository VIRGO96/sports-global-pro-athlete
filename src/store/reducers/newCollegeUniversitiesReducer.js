const initState = {
	newCollegeUniversitiesData: [],
	newCollegesDataId: [],
};
const newCollegeUniversitiesReducer = (state = initState, action) => {
	switch (action.type) {
		case 'NEW_COLLEGE_UNIVERSITIES':
			return {
				...state,
				newCollegeUniversitiesData: action.payload,
			};
		case 'GET_NEW_COLLEGE_BY_ID':
			return {
				...state,
				newCollegesDataId: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
export default newCollegeUniversitiesReducer;
