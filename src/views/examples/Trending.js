import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Row, Spinner, Table } from "reactstrap";
import { getSports } from "store/actions/sportAction";
import { getTrendingData } from "store/actions/trendingAction";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
const Trending = () => {
  const [activeTab, setActiveTab] = useState("Badges");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  let dispatch = useDispatch();
  const [selected, setSelected] = useState({
    sport: "",
    gender: "",
  });
  const [loader, setLoader] = useState(false);
  let { sports } = useSelector((state) => state.sport);
  let { trendingData } = useSelector((state) => state.trending);
  console.log(trendingData);
  useEffect(() => {
    setLoader(true);
    dispatch(getSports());
    dispatch(
      getTrendingData(selected, () => {
        setLoader(false);
      })
    );
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSelected((prevSelected) => ({
      ...prevSelected,
      [name]: value,
    }));
  };
  useEffect(() => {
    setLoader(true);
    dispatch(
      getTrendingData(selected, () => {
        setLoader(false);
      })
    );
  }, [selected]);
  return (
    <div className="trending">
      <Link className="text-white btn btn-primary mx-4 mt-3" to="/home">
        <IoMdArrowBack /> Go Back
      </Link>{" "}
      <Container>
        <Card className="py-4 mt-4">
          <Row className="pb-4  justify-content-end">
            <Col md="4">
              <h1 className="text-center">Who’s Popular Last Week?</h1>
            </Col>
            <Col md="4" className="d-flex justify-content-end pr-4">
              <div className="d-flex">
                <select
                  name="sport"
                  className="form-control mr-md-2"
                  value={selected.sport}
                  onChange={handleChange}
                >
                  <option value="">-- Select Sport --</option>
                  {sports.map((sport) => (
                    <option value={sport.sport}>{sport.sport}</option>
                  ))}
                </select>
                <select
                  name="gender"
                  className="form-control"
                  value={selected.gender}
                  onChange={handleChange}
                >
                  <option value="">-- Select gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </Col>
          </Row>
          {loader ? (
            <Spinner color="primary" className="mx-auto" />
          ) : (
            <>
              <Nav className="mt-2 px-3 pt-3 border-bottom-0" tabs>
                <NavItem className="pointer">
                  <NavLink
                    className={`${
                      activeTab === "Badges" ? "btn btn-primary" : ""
                    }`}
                    onClick={() => toggleTab("Badges")}
                  >
                    <h3
                      className={`${
                        activeTab === "Badges"
                          ? "text-white m-0"
                          : "text-dark m-0"
                      }`}
                    >
                      Badges
                    </h3>{" "}
                  </NavLink>
                </NavItem>
                <NavItem className="pointer">
                  <NavLink
                    className={`${
                      activeTab === "Memento" ? "btn btn-primary" : ""
                    }`}
                    onClick={() => toggleTab("Memento")}
                  >
                    <h3
                      className={`${
                        activeTab === "Memento"
                          ? "text-white m-0"
                          : "text-dark m-0"
                      }`}
                    >
                      Memento
                    </h3>{" "}
                  </NavLink>
                </NavItem>
                <NavItem className="pointer">
                  <NavLink
                    className={`${
                      activeTab === "GroupChat  " ? "btn btn-primary" : ""
                    }`}
                    onClick={() => toggleTab("GroupChat  ")}
                  >
                    <h3
                      className={`${
                        activeTab === "GroupChat  "
                          ? "text-white m-0"
                          : "text-dark m-0"
                      }`}
                    >
                      GroupChat
                    </h3>{" "}
                  </NavLink>
                </NavItem>
                <NavItem className="pointer">
                  <NavLink
                    className={`${
                      activeTab === "Single Chat" ? "btn btn-primary" : ""
                    }`}
                    onClick={() => toggleTab("Single Chat")}
                  >
                    <h3
                      className={`${
                        activeTab === "Single Chat"
                          ? "text-white m-0"
                          : "text-dark m-0"
                      }`}
                    >
                      Single Chat
                    </h3>
                  </NavLink>
                </NavItem>
                <NavItem className="pointer">
                  <NavLink
                    className={`${
                      activeTab === "Seasonal Videos" ? "btn btn-primary" : ""
                    }`}
                    onClick={() => toggleTab("Seasonal Videos")}
                  >
                    <h3
                      className={`${
                        activeTab === "Seasonal Videos"
                          ? "text-white m-0"
                          : "text-dark m-0"
                      }`}
                    >
                      Seasonal Videos
                    </h3>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="px-3 pt-1 ">
                <TabPane tabId="Badges">
                  <Table className="table  table-borderless" responsive>
                    <thead>
                      <tr>
                        <th>Athlete ID</th>
                        <th>Athlete Name</th>
                        <th>Athlete Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trendingData?.forBadges?.length > 0 ? (
                        <>
                          {trendingData?.forBadges?.map((e) => {
                            return (
                              <tr>
                                <td> {e.athleteID}</td>
                                <td>{`${e.first_name} ${e.last_name}  `}</td>
                                <td> {e.email}</td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td> N/A</td>
                          <td> N/A</td>
                          <td> N/A</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="Memento">
                  <Table className="table  table-borderless" responsive>
                    <thead>
                      <tr>
                        <th>Athlete ID</th>
                        <th>Athlete Name</th>
                        <th>Athlete Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trendingData?.forMomentos?.length > 0 ? (
                        <>
                          {trendingData?.forMomentos?.map((e) => {
                            return (
                              <tr>
                                <td> {e.athleteID}</td>
                                <td>{`${e.first_name} ${e.last_name}  `}</td>
                                <td> {e.email}</td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td> N/A</td>
                          <td> N/A</td>
                          <td> N/A</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="GroupChat  ">
                  <Table className="table  table-borderless" responsive>
                    <thead>
                      <tr>
                        <th>Athlete ID</th>
                        <th>Athlete Name</th>
                        <th>Athlete Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trendingData?.forGroupChats?.length > 0 ? (
                        <>
                          {trendingData?.forGroupChats?.map((e) => {
                            return (
                              <tr>
                                <td> {e.athleteID}</td>
                                <td>{`${e.first_name} ${e.last_name}  `}</td>
                                <td> {e.email}</td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td> N/A</td>
                          <td> N/A</td>
                          <td> N/A</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="Single Chat">
                  <Table className="table  table-borderless" responsive>
                    <thead>
                      <tr>
                        <th>Athlete ID</th>
                        <th>Athlete Name</th>
                        <th>Athlete Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trendingData?.forChats?.length > 0 ? (
                        <>
                          {trendingData?.forChats?.map((e) => {
                            return (
                              <tr>
                                <td> {e.athleteID}</td>
                                <td>{`${e.first_name} ${e.last_name}  `}</td>
                                <td> {e.email}</td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td> N/A</td>
                          <td> N/A</td>
                          <td> N/A</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="Seasonal Videos">
                  <Table className="table  table-borderless" responsive>
                    <thead>
                      <tr>
                        <th>Athlete ID</th>
                        <th>Athlete Name</th>
                        <th>Athlete Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trendingData?.forSeasonalBadges?.length > 0 ? (
                        <>
                          {trendingData?.forSeasonalBadges?.map((e) => {
                            return (
                              <tr>
                                <td> {e.athleteID}</td>
                                <td>{`${e.first_name} ${e.last_name}  `}</td>
                                <td> {e.email}</td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td> N/A</td>
                          <td> N/A</td>
                          <td> N/A</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </TabPane>
              </TabContent>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Trending;
