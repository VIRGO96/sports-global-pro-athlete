import Header from 'components/Headers/Header';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import teamRosterWorkLeft from '../../assets/img/custom/teamRosterWorkLeft.png';
import teamRosterWorkRightOne from '../../assets/img/custom/teamRosterWorkRightOne.png';
import teamRosterWorkRight2 from '../../assets/img/custom/teamRosterWorkRight2.png';

const HowTeamRosterWorks = () => {
	return (
		<>
			<Header />
			<Container>
				<Row className='align-items-center'>
					<Col lg={6}>
						<img
							src={teamRosterWorkLeft}
							alt='Under construction'
							className='img-fluid'
						/>
					</Col>
					<Col lg={6}>
						<h1 className='text-center' style={{ color: 'black' }}>
							Steps to set up team roster:
						</h1>
						<h6 className='text-center teamWorkTxt'>
							a. Each team member registers at FHP.
						</h6>
						<h6 className='text-center teamWorkTxt'>
							b. Each team member gives registration number to Parent.
						</h6>
						<h6 className='text-center teamWorkTxt'>
							c.Parent registers as FAN &
							makes/updates TEAM ROSTER on FHP.
						</h6>

						<Row className='mb-2'>
							<Col
								md={4}
								className='d-flex justify-content-center'
							>
								<img
									src={teamRosterWorkRight2}
									alt='Under construction'
									className='img-fluid'
									style={{ height: '320px' }}
								/>
							</Col>
							<Col md={8}>
								<img
									src={teamRosterWorkRightOne}
									alt='Under construction'
									className='img-fluid align-left'
									style={{ height: '250px' }}
								/>
								<h6 className='text-center teamWorkTxt'>
									d. FAN visits TEAM ROSTER.
								</h6>
							</Col>
						</Row>
					</Col>
				</Row>
				<div><h2><b>NOTE:</b>it is not allowed to buy badges of full team solely due to team roster.Fans may buy individual badges, one-by-one of athletes here.</h2></div>
			</Container>
		</>
	);
};

export default HowTeamRosterWorks;
