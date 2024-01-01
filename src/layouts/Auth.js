import React from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import Ball from '../assets/img/custom/balls.png';

import routes from 'routes.js';

const Auth = props => {
	const mainContent = React.useRef(null);
	const location = useLocation();

	React.useEffect(() => {
		document.body.classList.add('bg-default');
		return () => {
			document.body.classList.remove('bg-default');
		};
	}, []);
	React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContent.current.scrollTop = 0;
	}, [location]);

	const getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.layout === '/auth') {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};
	return (
		<>
			<div ref={mainContent}>
				{/* Page content */}
				<Container fluid>
					<Row className='auth-right'>
						<Col lg={5} className='bg-white-1'>
							<Switch>
								{getRoutes(routes)}
								<Redirect from='*' to='/auth/login' />
							</Switch>
						</Col>
						<Col lg={7} className='bg-secondary'>
							<div>
								<h2 className='text-dark  auth-desc-title'>
									HOW FANS HELP PLAYERS
								</h2>
								<p className='text-dark auth-desc-subtitle'>
									We all love our favorite school teams - but
									some
									<br /> players struggle just to pay their
									bills. Now we FANS <br /> can help{' '}
									<u>
										BY USING NEW LAWS FOR athlete NIL <br />
										(Name, Image, Likeness ), and ATHLETE
										SERVICE AS BRAND AMBASSADOR. WE FANS CAN
										BUY AN <br /> ENDORSEMENT LICENSE FROM A
										COLLEGE ATHLETE, <br /> AND EVEN FROM A
										HIGH SCHOOL ATHLETE <br />
										IN SOME USA STATES (check your state).
										YOUR FAVORITE <br /> AMATEUR ATHLETE CAN
										EARN MONEY AS FHP
									</u>
									<br />
									{/* You can even participate in a call with
									athlete  */}
									BRAND AMBASSADOR AND FANS CAN GET GREAT
									DEALS!
								</p>
								<p className='text-dark auth-desc-points'>
									1- Players all get signed up right here. And
									Fans, we each find our favorite player by
									verifying via athlete’s social media.
									<br />
									<br />
									2- Then a Fan buys a badge (Price as fan
									chooses - $4 to $1000).
									<br />
									<br />
									3- Fan downloads their endorsement badge and
									posts it on their social media page or
									prints badge out for framing.
									<br />
									<br />
									4- Buyer on honor system to remove badge
									from social media after license expires.
									<br />
									<br />
									5- Each dollar of price gives one week on
									license. Example, price of $4 means license
									expires after 4 weeks from purchase.
									<br />
									<br />
									6. Fan can request a call with their
									favorite athlete, as non-paid Skype call or
									a call on Pay-by-minute line to be educated
									by athlete Brand Ambassador on details of
									FHP Brand and website use.
								</p>
								<div className='text-center mb-3 d-none d-sm-block'>
									<Row className='justify-content-center'>
										<Col md='8'>
											<img
												src={Ball}
												alt='balls'
												width='100%'
											/>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default Auth;
