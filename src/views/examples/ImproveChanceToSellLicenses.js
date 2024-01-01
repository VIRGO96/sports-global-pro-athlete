import Header from 'components/Headers/Header';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import threeways from '../../assets/img/custom/threeways.png';
import coach from '../../assets/img/custom/coach.png';
import post from '../../assets/img/custom/post.jpg';
import team from '../../assets/img/custom/team.jpg';

const ImproveChanceToSellLicenses = () => {
	return (
		<>
			<Header />
			<Container>
				<Row className='align-items-center'>
					<Col md={3} className='d-flex threeWaysImg'>
						<img
							src={threeways}
							alt='Under construction'
							className='img-fluid'
							style={{ maxHeight: '200px' }}
						/>
					</Col>
					<Col md={9}>
						<h1 style={{ fontSize: '41px', color: 'black' }}>
							Three ways to improve your chances to sell your
							licenses to fans here
						</h1>
					</Col>
				</Row>

				<Row className='mt-4 ml-2'>
					<Col
						md={3}
						lg={2}
						className='d-flex justify-content-center'
					>
						<img
							src={coach}
							alt='Under construction'
							className='img-fluid'
							style={{ maxHeight: '60px' }}
						/>
						<span
							style={{
								fontSize: '20px',
								fontWeight: 'bold',
								color: 'black',
								paddingLeft: '10px',
							}}
						>
							1.
						</span>
					</Col>

					<Col md={9} lg={10}>
						<h1
							style={{
								fontSize: '20px',
								color: 'black',
								fontWeight: 'bold',
							}}
						>
							Ask your COACH or Parent to register here as Fan,
							because then coach or Parent can compile a TEAM
							ROSTER here to help FANS find your profile to buy a
							license from you.
						</h1>
					</Col>
				</Row>

				<Row className='ml-2 mt-3'>
					<Col
						md={3}
						lg={2}
						className='d-flex justify-content-center'
					>
						<img
							src={team}
							alt='Under construction'
							className='img-fluid'
							style={{ maxHeight: '60px' }}
						/>
						<span
							style={{
								fontSize: '20px',
								fontWeight: 'bold',
								color: 'black',
								paddingLeft: '10px',
							}}
						>
							2.
						</span>
					</Col>

					<Col md={9} lg={10}>
						<h1
							style={{
								fontSize: '20px',
								color: 'black',
								fontWeight: 'bold',
							}}
						>
							Ask your TEAMMATES to register here, because
							teammates can recommend other teammates to FANS for
							buying licenses from teammates like you.
						</h1>
					</Col>
				</Row>

				<Row className='ml-2 mt-3'>
					<Col
						md={3}
						lg={2}
						className='d-flex justify-content-center'
					>
						<img
							src={post}
							alt='Under construction'
							className='img-fluid'
							style={{ maxHeight: '60px' }}
						/>
						<span
							style={{
								fontSize: '20px',
								fontWeight: 'bold',
								color: 'black',
								paddingLeft: '10px',
							}}
						>
							3.
						</span>
					</Col>

					<Col md={9} lg={10}>
						<h1
							style={{
								fontSize: '20px',
								color: 'black',
								fontWeight: 'bold',
							}}
						>
							Link your posts on SOCIAL MEDIA about your sports
							experience to your PROFILE here, so FANS can
							understand why they should buy your licenses.
						</h1>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ImproveChanceToSellLicenses;
