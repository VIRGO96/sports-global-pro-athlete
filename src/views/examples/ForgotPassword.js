import React, { useState } from 'react'
import Logo from "../../assets/img/custom/logo.png"
import {
    Label, Input, Button, Spinner
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { forgetpassword } from 'store/actions/authActions'

function ForgotPassword() {
    let auth = useSelector(state => state.auth)
    let dispatch = useDispatch()
    const [email, setEmail] = useState("")
    return (
        <>
            <div className="text-center mt-5">
                <img src={Logo} alt="logo" className="logo" />
            </div>
            <div className="auth-card ">
                <h2 className="auth-heading">Forgot Password</h2>
                <Label className="mt-3 auth-label"><b>Email</b></Label>
                <Input
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    required
                    type="email"
                    className=" custom-input"
                />
            </div>
            <div className="text-center">
                <Link to="/auth/login">
                    <Button
                        disabled={!email}
                        className="auth-button mt-5"
                        onClick={e => {
                            e.preventDefault()
                            dispatch(forgetpassword(email))
                            setEmail("")
                        }}>{auth.passwordLoading ? <Spinner size="sm" /> : "Send Email"}
                    </Button>
                </Link>
            </div>
            <div className="mt-3 mx-0 mx-md-5 text-center">
                <Label className="auth-label">Remember Password?</Label>{" "}<Link to="/auth/login"><Label className="text-primary auth-label" style={{ cursor: 'pointer' }}> <b><u>Login</u></b></Label></Link>
            </div>
        </>
    )
}

export default ForgotPassword

