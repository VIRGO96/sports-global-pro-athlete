import React, { useState } from "react";
import Logo from "../../assets/img/custom/logo.png";
import {
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText,
  CustomInput,
} from "reactstrap";
import Paypal from "components/Paypal";
function RegistrationFee() {
  return (
    <>
      <div className="text-center mt-5">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div className="auth-card">
        <h2 className="auth-heading">Registration Fee</h2>
        <Label className="mt-3 auth-label">Total Price</Label>
        <br />
        <Label className="price-label">$4.00</Label>
        <br />
        <Label className="mt-4 auth-label">Pay Now Via Paypal</Label>
      </div>
      <div className="text-center">
        <Button className="auth-button mt-5">Pay Now - For Registration</Button>
      </div>
    </>
  );
}

export default RegistrationFee;
