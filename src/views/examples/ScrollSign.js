import Header from 'components/Headers/Header';
import React from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import ScrollSignPicture from '../../assets/img/custom/Order-Sign-picture.jpg';

const ScrollSign = () => {
	return (
		<>
			<Header />
			<Container className='px-5'>
				<h2 className='text-center txtClr'>
					<b>
						Become a <u>Brand Ambassador</u> the <u>EASY WAY</u>…
					</b>
				</h2>
				<Row className='mt-5'>
					<Col xs='12' md='6' className='align-self-center'>
						<ol className='txtClr'>
							<h2 className='txtClr'>
								<li className='txtClr'>
									Order this sign or Poster.
								</li>
							</h2>

							<h2 className='txtClr'>
								<li className='txtClr'>
									Display Sign or Poster to Fans.
								</li>
							</h2>

							<h2 className='txtClr'>
								<li className='txtClr'>
									Give Fans your card which has your name and
									FHP registration number.
								</li>
							</h2>
							<h2 className='txtClr'>
								<li className='txtClr'>
									If you need to document, ask Friend to take
									your photo as you display sign to Fans.
								</li>
							</h2>
						</ol>
					</Col>
					<Col xs='12' md='6'>
						<div>
							<img
								src={ScrollSignPicture}
								alt='ScrollSignPicture'
								className='img-fluid'
							/>
						</div>
						<br />
						<div className='d-flex justify-content-center'>
							<Button
								onClick={() =>
									window.open(
										'https://fans-help-players-athlete.web.app/shop'
									)
								}
								className='btn-ScrollSign-Color rounded-pill'
							>
								ORDER
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ScrollSign;
