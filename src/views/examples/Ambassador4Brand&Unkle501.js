import React from 'react';
import { Col, Container, Label, Row } from 'reactstrap';
import sidePic from '../../assets/img/custom/SideIconFHP.png';

function Ambassador4Brand() {
	return (
		<>
			<Container className='mt-md-5 pt-md-5' fluid>
				<Row className='d-flex align-items-center mt-md-5 pt-md-5'>
					<Col xs={8} md={11}>
						<h1 className='text-dark text-center'>
							Ambassador<span className='text-primary'>4</span>
							<span style={{ color: 'red' }}>Brand</span> and Un
							<u style={{ color: '#d4af37' }}>k</u>le501
						</h1>
						<h2 className='text-dark'>
							{' '}
							<a
								href='https://athlete-for-brand.web.app/new-home'
								target='_blank'
								className='text-primary'
							>
								Ambassador4Brand
							</a>{' '}
							is where Student Athletes link up with Fans, to say
							Hello by Skype, and to schedule a training session
							for the Fan online. That’s how Student Athlete Brand
							Ambassadors earn a little extra money, teaching Fans
							online how the websites of the FHP Brand work, step
							by step.
							<span>{''}</span>
							<a
								className='text-primary'
								href='https://stellular-starship-450f06.netlify.app/'
								target='_blank'
							>
								Unkle501
							</a>{' '}
							is F<span className='text-primary'>H</span>
							<span className='text-danger'>P</span> Brand’s
							affiliated non-profit 501(c)(3), where tax
							deductible donations by Fans and Boosters help fund
							Career Counseling and Non-Sports Internships for
							Student Athletes.
						</h2>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Ambassador4Brand;
