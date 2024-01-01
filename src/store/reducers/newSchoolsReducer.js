const initState = {
	newSchoolsAllData: [],
	newSchoolsId: [],
};
const newSchoolsReducer = (state = initState, action) => {
	switch (action.type) {
		case 'NEW_SCHOOLS':
			return {
				...state,
				newSchoolsAllData: action.payload,
			};
		case 'GET_NEW_SCHOOLS_BY_ID':
			return {
				...state,
				newSchoolsId: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};
export default newSchoolsReducer;
