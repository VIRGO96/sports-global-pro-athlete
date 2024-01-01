import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import signbg from '../../assets/img/custom/Signbg.jpg';
import posterbg from '../../assets/img/custom/Posterbg.jpg';
import balls from '../../assets/img/custom/balls.png';
import { Link, useHistory } from 'react-router-dom';

const Shop = () => {
	const history = useHistory();
	return (
		<>
			<div
				onClick={history.goBack}
				className='ml-2 ml-md-5 mt-2 backBtn d-flex justify-content-center align-items-center pointer'
			>
				<i class='fas fa-chevron-left fa-lg'></i>
			</div>
			<Container>
				<Row className='mt-5'>
					<Col md={4}>
						<Link to='/shop/signs'>
							<div class='card p-2'>
								<img
									class='card-img'
									src={signbg}
									height='200px'
								/>
								<div class='card-img-overlay  d-flex flex-column justify-content-center'>
									<h4 class='card-title text-white text-center'>
										Buy Scroll Signs
									</h4>
								</div>
							</div>
						</Link>
					</Col>
					<Col md={4}>
						<Link to='/shop/posters'>
							<div class='card p-2'>
								<img
									class='card-img'
									src={posterbg}
									height='200px'
								/>
								<div class='card-img-overlay d-flex flex-column justify-content-center'>
									<h4 class='card-title text-white text-center'>
										Buy posters
									</h4>
								</div>
							</div>
						</Link>
					</Col>
					<Col md={4}>
						<Link to='/shop/signs-and-posters'>
							<div class='card p-2'>
								<img
									class='card-img'
									src={balls}
									height='200px'
								/>
								<div class='card-img-overlay d-flex flex-column justify-content-center'>
									<h4 class='card-title text-white text-center'>
										Buy Both
									</h4>
								</div>
							</div>
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Shop;
