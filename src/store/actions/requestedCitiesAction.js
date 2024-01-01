import firebase from 'config/firebase';

export const createCityRequest = obj => async dispatch => {
	firebase.firestore().collection('requested_locations').add(obj);
};

export const getCityRequests = () => async dispatch => {
	firebase
		.firestore()
		.collection('requested_locations')
		.onSnapshot(query => {
			let newRequest = [];
			query.forEach(doc => {
				newRequest.push({ id: doc.id, ...doc.data() });
			});
			dispatch({ type: 'GET_CITY_REQUEST', payload: newRequest });
		});
};

export const updateCityRequest = (id, data) => {
	return async dispatch => {
		await firebase
			.firestore()
			.collection('requested_locations')
			.doc(id)
			.update({
				supported_by: data,
				support: data.length,
			});
	};
};
