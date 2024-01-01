import Header from "components/Headers/Header";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { getAllTutorials } from "store/actions/tutorialsAction";

const Tutorials = () => {
  const dispatch = useDispatch();
  let { allTutorials } = useSelector((state) => state.tutorial);

  useEffect(() => {
    dispatch(getAllTutorials());
  }, []);

  return (
    <>
      <Header />
      <Container>
        <p className="text-dark auth-desc-title m-0 p-0">
          FHP Brand Video Tutorials
        </p>
        <h1 className="text-dark">FansHelpPlayers.com</h1>
        {allTutorials &&
          allTutorials.map((ele, index) => {
            return (
              <Row className="p-0 m-0">
                <Col md={12} lg={6} className="p-0 m-0">
                  <Row className="align-items-center p-0 m-0">
                    <Col
                      md={10}
                      xs={10}
                      className="p-0 m-0"
                      style={{ wordBreak: "break-all" }}
                    >
                      <h4 className="text-dark">
                        {index + 1}-{ele.title}
                      </h4>
                      <a href={ele.url} target="_blank">
                        {ele.url}
                      </a>
                    </Col>
                    <Col md={2} xs={2} className="p-0 m-0 pl-lg-4">
                      <button className="btn btn-danger rounded tutorialBtn">
                        <div>
                          <i className="fas fa-play fa-lg"></i>
                        </div>
                      </button>
                    </Col>
                  </Row>
                  <div
                    className="my-2"
                    style={{
                      borderTop: "2px dotted #5e72e4",
                    }}
                  ></div>
                </Col>
              </Row>
            );
          })}
      </Container>
    </>
  );
};

export default Tutorials;
