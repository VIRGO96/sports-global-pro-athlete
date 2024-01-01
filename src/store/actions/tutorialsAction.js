import firebase from 'config/firebase';

export const getAllTutorials = () => async dispatch => {
	firebase
		.firestore()
		.collection('tutorials')
		.where('type', 'in', ['athlete', 'both'])
		.onSnapshot(query => {
			let allTutorials = [];
			query.forEach(doc => {
				allTutorials.push({ id: doc.id, ...doc.data() });
			});

			dispatch({ type: 'GET_ALL_TUTORIALS', payload: allTutorials });
		});
};
