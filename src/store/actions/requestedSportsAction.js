import firebase from 'config/firebase';

export const createSportRequest = obj => async dispatch => {
	await firebase.firestore().collection('requested_sports').add(obj);
};

export const getSportRequest = () => async dispatch => {
	await firebase
		.firestore()
		.collection('requested_sports')
		.onSnapshot(query => {
			let newArr = [];
			query.forEach(doc => {
				newArr.push({ id: doc.id, ...doc.data() });
			});
			dispatch({ type: 'GET_SPORT_REQUEST', payload: newArr });
		});
};

export const updateSportRequest = (id, data) => {
	return async dispatch => {
		await firebase
			.firestore()
			.collection('requested_sports')
			.doc(id)
			.update({
				supported_by: data,
				support: data.length,
			});
	};
};
