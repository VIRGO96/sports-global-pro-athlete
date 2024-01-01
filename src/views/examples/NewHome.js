import React from "react";
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import LandingDesktop from "../../assets/img/custom/LandingNew.png";
import LandingMobile from "../../assets/img/custom/NewLandingPageMobile.jpg";

function NewHome() {
  return (
    <>
      <Row className="text-center m-0">
        <Col sm="12" className="align-self-center p-0">
          <div className="overflow-hidden">
            <img
              src={LandingDesktop}
              alt="LandingDesktop"
              className="LandingDesktop d-none d-md-block"
            />

            <Link to={`/home`}>
              <Button
                color="primary"
                className="Enter-button-Desktop d-none d-md-block float-left ml-5 "
              >
                Enter
              </Button>
            </Link>
          </div>
          <div className="overflow-hidden">
            <img
              src={LandingMobile}
              alt="LandingMobile"
              className="LandingMobile d-block d-md-none"
            />
            <Link to={`/home`}>
              <Button
                color="primary"
                className="Enter-button-Mobile d-md-none float-left ml-5 "
              >
                Enter
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NewHome;
