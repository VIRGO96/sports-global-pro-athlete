import Header from 'components/Headers/Header';
import React from 'react';
import { Container } from 'reactstrap';

const HowYouSucceed = () => {
	return (
		<>
			<Header />
			<Container className='px-5'>
				<div className='text-center'>
					<h1 className='text-dark'>
						<b>Student Athlete listen up...</b>
					</h1>
					<h3 className='text-dark'>
						Yes, a goal on FHp is selling badges!
					</h3>
					<h3 className='text-dark'>
						But that is only part of{' '}
						<u>
							<b>the larger goal.</b>
						</u>
					</h3>
					<h3 className='text-dark'>
						That larger goal is to{' '}
						<u>
							<b>
								succeed by giving fans a good experience in
								dealing with you. <span>{''}</span> Be thankful
								to fans,
							</b>
						</u>
						even when they do not buy right away.
					</h3>
					<h3 className='text-dark'>
						<b>
							<u>
								The Friendlier you are, the more likely they are
								to buy eventually.
							</u>
						</b>
					</h3>

					<hr
						style={{ borderTop: '5px dotted black', width: '35%' }}
					/>
				</div>
				<div>
					<h2 className='text-dark'>
						<b>So,in interactions with FANS...</b>
					</h2>
					<h2 className='text-dark pl-3'>
						<b>
							Share your personal sports experiences and say thank
							you.
						</b>
					</h2>

					<h2 className='text-dark pl-3'>
						<b>Ask them If you can teach them how to use site.</b>
					</h2>
					<h2 className='text-dark pl-3'>
						<b>Tell them how much you appreciate their help.</b>
					</h2>
					<h2 className='text-dark pl-3'>
						<b>Smile and wish them a great day.</b>
					</h2>
				</div>
			</Container>
		</>
	);
};

export default HowYouSucceed;
