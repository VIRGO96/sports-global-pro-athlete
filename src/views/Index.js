import React, { useEffect } from "react";
import Header from "components/Headers/Header";
import { Link, Redirect } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Button,
  Table,
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFans } from "store/actions/fansActions";
import { getLicensePurchases } from "store/actions/fansActions";
import moment from "moment";
import { getSubscriptionEarning } from "store/actions/fansActions";
import { getChatEarningByAthleteID } from "store/actions/fansActions";

function Index() {
  let auth = useSelector((state) => state.auth);
  let fan = useSelector((state) => state.fan);
  let dispatch = useDispatch();
  const getFan = (id) => {
    if (id != undefined) {
      let obj = fan.fans.length > 0 && fan.fans.find((f) => f.id == id);
      if (obj != null) {
        return obj;
      } else {
        return "N/A";
      }
    } else {
      return "N/A";
    }
  };
  const getEarning = (id) => {
    if (id != undefined) {
      let licenseArray =
        fan.licenses.length > 0 &&
        fan.licenses.filter((lic) => lic.athlete_id == id);
      let total = 0;
      if (licenseArray.length > 0) {
        licenseArray.map((lic) => {
          return (total =
            total +
            (Number(lic.amount.value) - (Number(lic.amount.value) * 5) / 100));
        });
      }
      return total.toFixed(2);
    } else {
      return 0;
    }
  };

  useEffect(() => {
    dispatch(getFans());
    dispatch(getLicensePurchases(auth.uid));
  }, []);
  useEffect(() => {
    dispatch(getSubscriptionEarning(auth.uid));
    dispatch(getChatEarningByAthleteID(auth.uid));
  }, []);

  if (!auth.uid) {
    return <Redirect to="/auth/login" />;
  }
  return (
    <>
      <Header />
      <Container className="mb-5" fluid>
        <Row className="justify-content-center ">
          <Col lg={4} sm={6} align="center">
            <div className="dashboard-card">
              <p className="dashboard-card-earning-title">Earned By License</p>
              <p className="dashboard-card-numbers ">
                {fan.subscriptionEarning.length > 0
                  ? Number(getEarning(auth.uid)) +
                    fan.subscriptionEarning[0]?.amount
                  : Number(getEarning(auth.uid))}
                $
              </p>
            </div>
          </Col>
          <Col lg={4} sm={6} align="center">
            <div className="dashboard-card">
              <p className="dashboard-card-earning-title">
                NOTE: For download of your athlete earnings activity – see
                Transaction Log and My Account in your Home Page for Chats
                Dashboard.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4} sm={6} align="center">
            <div className="dashboard-card">
              <p className="dashboard-card-earning-title">Earned By Chat</p>
              <p className="dashboard-card-numbers ">
                {fan.chatLoading ? (
                  <Spinner size="xl" />
                ) : (
                  fan.chatEarning + "$"
                )}
              </p>
            </div>
          </Col>
          <Col lg={4} sm={6} align="center">
            <div className="dashboard-card">
              <p className="dashboard-card-earning-title">Total Earned</p>
              <p className="dashboard-card-numbers ">
                {fan.subscriptionEarning.length > 0
                  ? Number(getEarning(auth.uid)) +
                    Number(fan.chatEarning) +
                    Number(fan.subscriptionEarning[0]?.amount) +
                    "$"
                  : Number(getEarning(auth.uid)) +
                    Number(fan.chatEarning) +
                    "$"}
              </p>
            </div>
          </Col>
        </Row>
        <p className="text-dark auth-desc-subtitle ml-0">
          Previous License Purchasers
        </p>
        {fan.licenses.length == 0 ? (
          <Card className="filter-card mt-5">
            <CardBody className="bg-danger text-center rounded">
              <h2 className="text-white">
                <i className="fa fa-exclamation-triangle mr-3"></i> No License
                Purchased Yet.
              </h2>
            </CardBody>
          </Card>
        ) : (
          <Table className="align-items-center table-flush mt-3" responsive>
            <thead>
              <tr>
                <th scope="col" className="custom-table-heading custom-heading">
                  Name
                </th>
                <th scope="col" className="custom-table-heading custom-heading">
                  Date
                </th>
                <th scope="col" className="custom-table-heading custom-heading">
                  State
                </th>
                <th scope="col" className="custom-table-heading custom-heading">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="custom-table-body mt-3">
              {fan.licenses.length > 0 &&
                fan.licenses.map((d, idx) => (
                  <tr>
                    <td
                      className={`custom-table-text ${
                        idx == 0 ? "custom-table-body-top-left" : ""
                      }`}
                      s
                    >
                      {getFan(d.fan_id).name}
                    </td>
                    <td className="custom-table-text">
                      {moment.unix(d.created_at.seconds).format("D MMM YYYY")}
                    </td>
                    <td className="custom-table-text">
                      {getFan(d.fan_id).state}
                    </td>
                    <td
                      className={`custom-table-text ${
                        idx == 0 ? "custom-table-body-top-right" : ""
                      }`}
                    >
                      $
                      {(
                        Number(d.amount.value) -
                        (Number(d.amount.value) * 5) / 100
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default Index;
