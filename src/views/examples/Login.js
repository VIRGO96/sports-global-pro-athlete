import React, { useState, useEffect } from "react";
import Logo from "../../assets/img/custom/logo.png";
import { Label, Input, Button, Form, Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerSuccess, login } from "store/actions/authActions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(registerSuccess());
  }, []);
  if (auth.uid) {
    return <Redirect to="/admin/index" />;
  }
  return (
    <>
      <div className="text-center mt-5">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          let creds = {
            email: email,
            password: password,
          };
          dispatch(login(creds));
        }}
      >
        <div className="auth-card ">
          <h2 className="auth-heading">Athlete Login</h2>
          <Label className="mt-3 auth-label">
            <b>Email</b>
          </Label>
          <Input
            required
            placeholder="name@gmail.com"
            type="email"
            className=" custom-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label className="mt-5 auth-label" type="password">
            <b>Password</b>
          </Label>
          <Input
            required
            type="password"
            placeholder="Your Password"
            className=" custom-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex mt-4">
            <Label className="ml-auto auth-label">
              <Link to="/auth/forgot-password">
                <u>Forgot Password?</u>
              </Link>
            </Label>
          </div>
        </div>
        <div className="text-center">
          <Button disabled={!email || !password} className="auth-button mt-5">
            {auth.loading ? <Spinner size="sm" /> : "Log In"}
          </Button>
        </div>
      </Form>
      <div className="mt-3 mx-0 mx-md-5 text-center">
        <Label className="auth-label">Don't have an account yet?</Label>{" "}
        <Link to="/auth/register">
          <Label
            className="text-primary auth-label"
            style={{ cursor: "pointer" }}
          >
            {" "}
            <b>
              <u>Sign Up</u>
            </b>
          </Label>
        </Link>
      </div>
    </>
  );
}

export default Login;
