import React, { useState } from 'react'
import Header from 'components/Headers/Header'
import { Col, Container, Row, Input, Collapse, Label, Button, Form, Spinner } from 'reactstrap'
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import { updatePassword } from 'store/actions/authActions'
function ChangePassword() {
	let auth = useSelector(state => state.auth)
	let dispatch = useDispatch()
	const [name, setName] = useState(auth.user.name)
	const [sport, setSport] = useState(auth.user.sport)
	const [state, setState] = useState(auth.user.state)
	const [email, setEmail] = useState(auth.user.email)
	const [editOpen, setEditOpen] = useState(false)
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const editCollapse = () => {
		setEditOpen(!editOpen)
	}
	return (
		<>
			<Header />
			<Container fluid>
				<Row className="no-gutters justify-content-center">
					<Col lg="8">
						<div className="complaint-card mt-4">
							<div className="complaint-form">
								<p className="card-title">{name} </p>
								<p className="edit-password-info">{sport}  |  {state}</p>
								<Row className="mt-5">
									<Col>
										<p className="edit-password-info">Athlete ID:</p>
									</Col>
									<Col>
										<p className="edit-password-info">{auth.user.athleteID}</p>
									</Col>
								</Row>
								<Row>
									<Col>
										<p className="edit-password-info">Email ID:</p>
									</Col>
									<Col>
										<p className="edit-password-info">{email}</p>
									</Col>
								</Row>
								<Row>
									<Col sm="6">
										<p className="edit-password-info">Password:</p>
									</Col>
									<Col align="end">
										<div className="d-flex">
											<Input className="edit-password-info" type="password" value="......." />
											<p className="edit-password-info ml-auto text-primary" style={{ cursor: 'pointer' }} onClick={editCollapse}>Edit</p>
										</div>
									</Col>
								</Row>
								<Collapse isOpen={editOpen}>
									<Form onSubmit={e => {
										e.preventDefault()
										if (newPassword.length < 6) {
											toast.warning("Password length must be atleast 6.....")
										}
										else if (newPassword === currentPassword) {
											toast.warning("You are entering the same password.....")
										}
										else if (newPassword !== confirmPassword) {
											toast.warning("New Passwords and confirm new password didn't match......")
										} 
										else {
											let obj = {
												currentPassword: currentPassword,
												newPassword: newPassword
											}
											dispatch(updatePassword(obj))
										}
									}}>
										<Label>Current Password</Label>
										<Input
											required
											className="edit-password-info"
											type="password"
											placeholder="Your Current Password"
											value={currentPassword}
											onChange={e => setCurrentPassword(e.target.value)}
										/>
										<Label className="mt-2">New Password</Label>
										<Input
											required
											className="edit-password-info"
											type="password"
											placeholder="New Password"
											value={newPassword}
											onChange={e => setNewPassword(e.target.value)}
										/>
										<Label className="mt-2">Confirm New Password</Label>
										<Input
											required
											className="edit-password-info"
											type="password"
											placeholder="Confirm New Password"
											value={confirmPassword}
											onChange={e => setConfirmPassword(e.target.value)}
										/>
										<div className="text-right">
											<Button color="primary" type="submit">
												{auth.passwordLoading ? <Spinner size="sm" /> : 'Update'}
											</Button>
										</div>
									</Form>
								</Collapse>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default ChangePassword
