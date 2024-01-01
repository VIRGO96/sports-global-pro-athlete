import firebase from 'config/firebase';

export const getSports = () => async dispatch => {
	firebase
		.firestore()
		.collection('sports')
		.orderBy('sport', 'asc')
		.onSnapshot(query => {
			let temp = [];
			query.forEach(doc => {
				temp.push({
					...doc.data(),
				});
			});
			dispatch({ type: 'GET_SPORTS', payload: temp });
		});
};
