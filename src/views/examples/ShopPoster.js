import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import posterbg from '../../assets/img/custom/Posterbg.jpg';

const ShopPoster = () => {
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
					<img src={posterbg} alt='buyposter' className='img-fluid' />
					<Link
						to={{
							pathname: `/shop/poster/payment`,
						}}
					>
						<div className='flexBtnPoster mt-3 mt-lg-0'>
							<button className='btn btn-primary'>
								Continue
							</button>
						</div>
					</Link>
				</div>
			</Container>
		</>
	);
};

export default ShopPoster;
