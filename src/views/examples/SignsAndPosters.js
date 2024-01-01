import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import balls from '../../assets/img/custom/balls.png';

const SignsAndPosters = () => {
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
				<div className='shopMainOuter mt-2 mt-md-0 flexSet'>
					<img
						src={balls}
						alt='buyposter'
						className='img-fluid mt-5'
					/>

					<div className='mt-3 mt-lg-0'>
						<Link
							to={{
								pathname: `/shop/both/payment`,
							}}
						>
							<button className='btn btn-primary ml-0 ml-md-5'>
								Continue
							</button>
						</Link>
					</div>
				</div>
			</Container>
		</>
	);
};

export default SignsAndPosters;
