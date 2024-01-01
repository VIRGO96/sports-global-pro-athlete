import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import signbg from '../../assets/img/custom/Signbg.jpg';
const ShopSign = () => {
	let history = useHistory();

	return (
		<>
			<div
				onClick={history.goBack}
				className='ml-2 ml-md-5 mt-2 backBtn d-flex justify-content-center align-items-center pointer'
			>
				<i class='fas fa-chevron-left fa-lg'></i>
			</div>
			<Container>
				<div className='shopMainOuter mt-2 mt-lg-0'>
					<img src={signbg} alt='buySign' className='img-fluid' />

					<Link
						to={{
							pathname: `/shop/sign/payment`,
						}}
					>
						<button className='btn btn-primary shopBtn'>
							Continue
						</button>
					</Link>
				</div>
			</Container>
		</>
	);
};

export default ShopSign;
