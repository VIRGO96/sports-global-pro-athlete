import React, { useState } from "react";
import Header from "components/Headers/Header";
import { Col, Container, Row, Input, Button, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

function SetProfile() {
  let auth = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  return (
    <>
      <Header />
      <Container fluid>
        <Row className="no-gutters justify-content-center">
          <Col lg="10">
            <div className="complaint-card ">
              <div className="complaint-form">
                <p className="auth-desc-subtitle mt-0 ml-0">
                  Hi Sports Fan, I am an amateur athlete
                </p>
                <div className="mt-4">
                  <Row className="request-text">
                    <Col md="6" className="d-flex">
                      <Label className="mt-2">My Name is:</Label>
                      <Label className="ml-4 edit-password-info">
                        {auth.user.first_name} {auth.user.last_name}
                      </Label>
                    </Col>
                    <Col md="6" className="d-flex">
                      <Label className="mt-2">My Player ID is:</Label>
                      <Label className="ml-4 edit-password-info">
                        {auth.user.athleteID}
                      </Label>
                    </Col>
                  </Row>
                  <Row className="request-text">
                    <Col className="d-flex">
                      <Label className="mt-2">
                        My Location to play Sport is:
                      </Label>
                      <Label className="ml-4 edit-password-info">
                        {auth.user.city}, {auth.user.state}, {auth.user.zipCode}
                      </Label>
                    </Col>
                  </Row>
                  <Row className="request-text">
                    <Col md="6" className="d-flex">
                      <Label className="mt-2">The sport(s) I play:</Label>
                      <Label className="ml-4 edit-password-info">
                        {auth.user.sport}
                      </Label>
                    </Col>
                    <Col md="6" className="d-flex">
                      <Label className="mt-2">I am a:</Label>
                      <Label className="ml-4 edit-password-info">
                        {auth.user.sportLevel}
                      </Label>
                    </Col>
                  </Row>
                  <Row className="request-text mt-3">
                    <Col md="6">
                      <Label>
                        If you want to buy a license to use my name in an
                        endorsement, that is great! My price for a license is:{" "}
                        <Label className="mt-3">(from $4 to $1000)</Label>
                      </Label>
                    </Col>
                    <Col md="6" className="mt-3 mt-md-0">
                      <Label>
                        If you do buy a license from me, I would be happy to
                        endorse with my name your TEAM SPIRIT. I can even award
                        a badge to you for your great TEAM SPIRIT.
                      </Label>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SetProfile;
