import Header from "components/Headers/Header";
import React, { useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import threeways from "../../assets/img/custom/threeways.png";
import coach from "../../assets/img/custom/coach.png";
import post from "../../assets/img/custom/post.jpg";
import team from "../../assets/img/custom/team.jpg";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getconfirmConsentById } from "store/actions/confirmConsentAction";
import { useLocation } from "react-router-dom";
const query = new URLSearchParams(window.location.search);

const ConsentConfirmation = () => {
  const id = query.get("id");

  const dispatch = useDispatch();

  const { confirmConsentById, consentLoading } = useSelector(
    (state) => state.confirmConsent
  );

  useEffect(() => {
    dispatch(getconfirmConsentById(id));
  }, []);

  return (
    <>
      <h1 className="text-center mt-5">
        <b> FHP CONSENT VERIFICATION</b>
      </h1>

      <div className="verifyBox text-light mt-3 pb-2">
        <Row>
          <Col>
            <div className="d-flex justify-content-center align-items-center">
              {consentLoading ? (
                ""
              ) : confirmConsentById &&
                confirmConsentById == "This Consent Does Not Exist" ? (
                <i className="fas fa-times text-danger mr-2 fa-lg"></i>
              ) : (
                <i className="fas fa-check text-green mr-2 fa-lg"></i>
              )}
              <h2 className="pt-2">
                <b>Consent Status Report</b>
              </h2>
            </div>

            {consentLoading ? (
              <>
                <Spinner
                  className="d-flex mx-auto align-items-center justify-content-center overflow-hidden"
                  size="sm"
                  color="blue"
                />
              </>
            ) : (
              <>
                <h2 className="text-center mt-3">{confirmConsentById}</h2>
              </>
            )}

            <br />
            {consentLoading ? (
              ""
            ) : (
              <div class="d-flex justify-content-center">
                <Link to="/auth/login">
                  <Button className="btn text-white bg-primary">
                    Back To Login
                  </Button>
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConsentConfirmation;
