import Header from "components/Headers/Header";
import React from "react";
import { Col, Container, Row, Table } from "reactstrap";
import Logo from "../../assets/img/brand/instructionLogo.png";

const InstructionsReadFirst = () => {
  return (
    <>
      <Header />
      <Container className="px-5">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className="ml-2 ml-sm-5">
            <a href="https://youtu.be/NHZWgEXJ_q8" target="_blank">
              <button className="btn btn-danger rounded media-btn">
                <div> Viewpoint</div>
                <div>
                  <i className="fas fa-play fa-lg"></i>
                </div>
                <div>Video1</div>
              </button>
            </a>
          </div>
          <div className="mr-2 mr-sm-5">
            <a href="https://youtu.be/-aoLX8wUMCg" target="_blank">
              <button className="btn btn-danger rounded media-btn">
                <div> Viewpoint</div>
                <div>
                  <i className="fas fa-play fa-lg"></i>
                </div>
                <div>Video2</div>
              </button>
            </a>
          </div>
        </div>

        <div className="table-responsive">
          <Table>
            <thead>
              <tr className="bg-primary text-white text-center w-100">
                <th> </th>
                <th>STUDENT ATHLETES </th>
                <th> </th>
              </tr>
              <tr>
                <th className="bg-primary text-white">
                  <span className="text-capitalize text-underline">
                    What you can do here
                  </span>
                </th>
                <th className="bg-table-color text-center">
                  <span className="text-capitalize text-underline">How</span>
                </th>
                <th className="bg-table-color text-center">
                  <span className="text-capitalize text-underline">Why</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-white bg-primary">Sell Licenses</td>
                <td>Register your profile</td>
                <td>you Make Money & find career</td>
              </tr>
              <tr>
                <td className="text-white bg-primary">
                  Speak to Fans for free
                </td>
                <td className="bg-table-color">Skype call</td>
                <td className="bg-table-color">Fans verify it's you</td>
              </tr>
              <tr>
                <td className="text-white bg-primary">Chat to Fans for pay</td>
                <td>fan pays by minute </td>
                <td>Help Fan as Brand Ambas'dr</td>
              </tr>
              <tr>
                <td className="text-white bg-primary">Teach Fans System</td>
                <td className="bg-table-color">You first learn system</td>
                <td className="bg-table-color">Then you teach Fan</td>
              </tr>
              <tr>
                <td className="text-white bg-primary">
                  Card, Scroll Sign & posters
                </td>
                <td>More Fans contact you</td>
                <td>You earn & build fan base</td>
              </tr>
              <tr>
                <td className="text-white bg-primary">
                  Learn about internship
                </td>
                <td>Book internship</td>
                <td>Make contacts for job hunt</td>
              </tr>
            </tbody>
          </Table>
          Want to carry out your Brand Ambassador duties and sell
        </div>
        <h2 className="text-center txtClr mt-3">
          <b>To all Amateur Athletes, we at</b>
        </h2>
        <div className="d-flex justify-content-center">
          <img
            className="mx-2"
            alt={Logo}
            src={Logo}
            height="20px"
            width="200px"
          />
        </div>
        <h3 className="text-center txtClr">
          <b>say to you </b>
        </h3>
        <h1 className="text-center txtClr mt-2">
          <b>
            ‘We’re Here to HELP YOU’
            <br />
            ‘Feel free to give us your suggestions!’
          </b>
        </h1>
        <Row>
          <Col
            sm="2"
            className="d-flex align-items-center justify-content-center"
          >
            <h1>Take Survey?</h1>
          </Col>
          <Col sm="10">
            <h3 className="text-center txtClr mt-3">
              <b>
                Hey Athletes-We are planning a sports analysis video database
                where coaches comment on game strategy and give their insights.
                Fans and Athletes will have free access. Click{" "}
                <a
                  href="https://fhp-coach-platform.web.app/auth/info"
                  target="_blank"
                >
                  here
                </a>{" "}
                to give your input. And by the way please ask your coach to
                click the "Coach's Game Perspective' on the home page to give
                their input.Once your input is received, we can design the
                database accordingly, and coaches will be able to sign up on FHP
                site too.
              </b>
            </h3>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InstructionsReadFirst;
