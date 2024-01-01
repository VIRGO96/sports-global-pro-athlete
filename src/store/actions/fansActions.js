import axios from 'axios';
import firebase from 'config/firebase';
import { toast } from 'react-toastify';

export const getFans = id => {
	return async dispatch => {
		firebase
			.firestore()
			.collection('users')
			.where('role', '==', 'fan')
			.onSnapshot(query => {
				var fans = [];
				query.forEach(doc => {
					fans.push({ id: doc.id, ...doc.data() });
				});
				dispatch({
					type: 'GET_FANS',
					payload: fans,
				});
			});
	};
};

export const getFansRequests = id => {
	return async dispatch => {
		firebase
			.firestore()
			.collection('fan_requests')
			.where('athlete_id', '==', id)
			.onSnapshot(query => {
				var requests = [];
				query.forEach(doc => {
					requests.push({ id: doc.id, ...doc.data() });
				});
				dispatch({
					type: 'GET_FANS_REQUESTS',
					payload: requests,
				});
			});
	};
};
export const updateFanRequest = (id, status) => async dispatch => {
	firebase
		.firestore()
		.collection('fan_requests')
		.doc(id)
		.update({ status })
		.then(res => {
			toast.success('Fan request completed successfully');
		});
};
export const deleteFanRequest = id => {
	return async dispatch => {
		firebase
			.firestore()
			.collection('fan_requests')
			.doc(id)
			.delete()
			.then(toast.success('Request Deleted Successfully'));
	};
};
export const getLicensePurchases = id => {
	return async dispatch => {
		firebase
			.firestore()
			.collection('license_purchases')
			.where('athlete_id', '==', id)
			.onSnapshot(query => {
				var licenses = [];
				query.forEach(doc => {
					licenses.push({ id: doc.id, ...doc.data() });
				});
				dispatch({
					type: 'GET_LICENSES',
					payload: licenses,
				});
			});
	};
};
export const getSubscriptionEarning = id => {
	return async dispatch => {
		dispatch(subscriptionLoading(true));
		var users = [];
		var data = [];
		var finalData = [];
		var accessToken;
		var totalAmount;
		let subscriptionsData = await firebase
			.firestore()
			.collection('license_subscriptions')
			.where('athlete_id', '==', id)
			.get();

		const params = new URLSearchParams();
		params.append('grant_type', 'client_credentials');
		var session_url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
		var uname =
			'Ac1W0YzPDGD31xq0SQmhPqcOGnTC3tWFSr0a3rwVqXB54GZyfSPHV6-51e8VWt8HZTcm1Ug6UMmNhHTH';
		var pass =
			'EK-5mee1dxMSGURhUhN0Iq8RdTj3RO56yihfb71-lOZGOwvKArTsOgb_G19ZX45z2pCSIXj5MxIE_mw7';
		await axios
			.post(session_url, params, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				auth: {
					username: uname,
					password: pass,
				},
			})
			.then(response => {
				accessToken = response.data.access_token;
			});

		for (let doc of subscriptionsData.docs) {
			let halfAmount = Number(doc.data().amount?.value) / 2;
			var session_url2 = `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${
				doc.data().subscription_id
			}`;
			await axios
				.get(session_url2, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				})
				.then(response => {
					totalAmount =
						response.data.billing_info.cycle_executions[0]
							.cycles_completed * halfAmount;
					users.push({
						athlete_id: doc.data()?.athlete_id,
						amount: totalAmount,
					});
				})
				.catch(error => {
					console.log('Error in Subscription ', error.message);
				});
		}
		await firebase
			.firestore()
			.collection('users')
			.get()
			.then(query => {
				for (let doc of query.docs) {
					data.push({
						id: doc.id,
						...doc.data(),
					});
				}
			});
		users?.map(val => {
			let obj = data?.find(v => v.id == val.athlete_id);
			let check = finalData?.find(v => v.id == val.athlete_id);
			if (obj && !check) {
				finalData.push({
					id: obj?.id,
					athleteID: obj?.athleteID,
					name: obj?.first_name + ' ' + obj?.last_name,
					email: obj?.email,
					amount: val?.amount,
					created_at: obj?.created_at,
				});
			} else if (check) {
				let idx = finalData?.indexOf(check);
				finalData[idx].amount += val?.amount;
			}
		});
		dispatch(subscriptionLoading(false));
		dispatch({
			type: 'GET_EARNING_SUBSCRIPTION_BY_ID',
			payload: finalData,
		});
	};
};

export const getChatEarningByAthleteID = id => {
	return async dispatch => {
		dispatch(chatEarningLoading(true));

		let val = 0;
		let chatEarningData = await firebase
			.firestore()
			.collection('a4b_chat')
			.where('athleteID', '==', id)
			.where('athlete_payment', '==', true)
			.get();
		for (let doc of chatEarningData.docs) {
			val += (Number(doc.data()?.paid_amount.value) / 100) * 76;
		}
		dispatch({
			type: 'GET_CHAT_EARNING_BY_ID',
			payload: val,
		});
		dispatch(chatEarningLoading(false));
	};
};
export const subscriptionLoading = val => async dispatch => {
	dispatch({ type: 'SUBSCRIPTION_LOADING', payload: val });
};

export const chatEarningLoading = val => async dispatch => {
	dispatch({ type: 'CHAT_EARNING_LOADING', payload: val });
};
