import firebase from 'config/firebase';
import { toast } from 'react-toastify';

export const createShopOrder = ({ obj, onSuccess }) => {
	return async dispatch => {
		dispatch(orderCreateLoader(true));
		firebase
			.firestore()
			.collection('orders')
			.doc(obj.docID)
			.set(obj)
			.then(res => {
				dispatch(orderCreateLoader(false));
				onSuccess();
			})
			.catch(error => {
				dispatch(orderCreateLoader(false));
				toast.warning(error.message);
			});
	};
};

export const orderCreateLoader = data => dispatch => {
	dispatch({
		type: 'ORDER_LOADER',
		payload: data,
	});
};
