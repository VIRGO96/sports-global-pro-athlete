import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Container,
  Card,
  CardBody,
  Input,
  Button,
  Form,
  Table,
  Modal,
  ModalBody,
  Label,
} from "reactstrap";
import { getCityRequests } from "store/actions/requestedCitiesAction";
import { getAllUsers } from "store/actions/userAction";
import { updateCityRequest } from "store/actions/requestedCitiesAction";
import { createCityRequest } from "store/actions/requestedCitiesAction";
import { getSports } from "store/actions/sportAction";
import { fetchStates } from "store/actions/athleteActions";
const RequestedCities = () => {
  let dispatch = useDispatch();
  let { uid } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.users);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [sport, setSport] = useState("");
  const [college, setCollege] = useState("");
  const [support, setSupport] = useState([]);
  const [modal, setModal] = useState(false);
  const { states } = useSelector((state) => state.athlete);
  let { sports } = useSelector((state) => state.sport);
  const { cityRequests } = useSelector((state) => state.requestedCities);

  const newCity = city.toLowerCase().split(" ");
  for (let i = 0; i < newCity.length; i++) {
    newCity[i] = newCity[i][0]?.toUpperCase() + newCity[i].substr(1);
  }

  const newCollege = college.toLowerCase().split(" ");
  for (let i = 0; i < newCollege.length; i++) {
    newCollege[i] = newCollege[i][0]?.toUpperCase() + newCollege[i].substr(1);
  }

  const toggle = () => {
    setModal(!modal);
  };

  const defaultStateProps = {
    options: states?.map((insti) => {
      return insti.name;
    }),
    getOptionLabel: (option) => option,
  };

  const getPlayerName = (ID) => {
    var obj =
      allUsers &&
      allUsers.find((ele) => {
        return ele.id == ID;
      });
    if (obj) {
      if (obj.role == "athlete") {
        return obj.first_name + " " + obj.last_name;
      } else if (obj.role == "fan") {
        return obj.name;
      }
    } else {
      return "N/A";
    }
  };

  useEffect(() => {
    if (states.length == 0) {
      dispatch(fetchStates());
    }
  }, []);

  useEffect(() => {
    if (cityRequests.length == 0) {
      dispatch(getCityRequests());
    }
  }, []);

  // GET ALL USERS FUNC

  useEffect(() => {
    if (allUsers.length == 0) {
      dispatch(getAllUsers());
    }
  }, []);

  // GET SPORTS FUNC

  useEffect(() => {
    dispatch(getSports());
  }, []);

  // HandleSupport Click
  const handleHeartClick = (id, arr) => {
    if (arr.includes(uid)) {
      let checkedArr = arr.filter((item) => item !== uid);
      dispatch(updateCityRequest(id, checkedArr));
    } else {
      let obj = [...arr, uid];
      dispatch(updateCityRequest(id, obj));
    }
  };

  // AutoComplete Option For Sport

  const defaultSportProps = {
    options: sports.map((insti) => {
      return insti.sport;
    }),

    getOptionLabel: (option) => option,
  };

  return (
    <>
      <Header />

      <Modal isOpen={modal}>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              let obj = {
                state: state,
                city: newCity.join(" "),
                college: newCollege.join(" "),
                sport: sport,
                status: "pending",
                added_by: uid,
                supported_by: support,
                support: support.length,
              };
              dispatch(createCityRequest(obj));
              toggle();
              setState("");
              setCity("");
              setCollege("");
              setSport("");
            }}
          >
            <>
              <p className="auth-desc-subtitle mt-0 ml-0">Add Requested City</p>

              <div>
                <Label className="m-0 text-center">
                  <h3>State:</h3>
                </Label>
                <Autocomplete
                  {...defaultStateProps}
                  id="auto-complete"
                  autoComplete
                  includeInputInList
                  disableClearable={true}
                  disableListWrap
                  value={state}
                  onChange={(e, val) => {
                    setState(val);
                    setCity("");
                    setCollege("");
                    setSport("");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
              </div>
              <div className="mt-3">
                <Label className="m-0 text-center">
                  <h3>City:</h3>
                </Label>
                <Input
                  type="text"
                  value={city}
                  style={{
                    border: "none",
                    borderRadius: "0px",
                    borderBottom: "1px solid Black",
                    color: "black",
                  }}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <Label className="m-0 text-center">
                  <h3>Sport:</h3>
                </Label>
                <Autocomplete
                  {...defaultSportProps}
                  id="auto-complete"
                  autoComplete
                  includeInputInList
                  disableClearable={true}
                  disableListWrap
                  value={sport}
                  onChange={(e, val) => {
                    setSport(val);
                    setCollege("");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
              </div>
              <div className="mt-3">
                <Label className="m-0 text-center">
                  <h3>College:</h3>
                </Label>
                <Input
                  type="text"
                  value={college}
                  style={{
                    border: "none",
                    borderRadius: "0px",
                    height: "32px",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
                    color: "black",
                  }}
                  onChange={(e) => setCollege(e.target.value)}
                />
              </div>

              <div className="text-right">
                <Button className="mt-4" color="danger" onClick={toggle}>
                  Close
                </Button>
                <Button
                  color="primary"
                  size="md"
                  className="mt-4"
                  type="submit"
                  disabled={!state || !sport || !college || !city}
                >
                  Submit
                </Button>
              </div>
            </>
          </Form>
        </ModalBody>
      </Modal>
      <Container className="mt--4" fluid>
        <p className="text-dark auth-desc-subtitle ml-0 mb-0 mt-2">
          My college’s city not listed. Please add.
        </p>
        <div className="d-flex mt-3">
          <p className="text-dark auth-desc-subtitle ml-0 mb-0 mt-2">Cities</p>
          <Button className="custom-btn ml-auto" onClick={toggle}>
            Add New City
          </Button>
        </div>
        {cityRequests.length == 0 ? (
          <Card className="filter-card mt-5">
            <CardBody className="bg-danger text-center rounded">
              <h2 className="text-white">
                <i className="fa fa-exclamation-triangle mr-3"></i> No City
                Request Submitted Yet.
              </h2>
            </CardBody>
          </Card>
        ) : (
          <Table className="align-items-center table-flush mt-5" responsive>
            <thead>
              <tr>
                <th scope="col" className="custom-table-heading custom-heading">
                  State
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  City
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  My College Name
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  My College’s Sports
                </th>{" "}
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  Support
                </th>
              </tr>
            </thead>
            <tbody className="custom-table-body mt-3">
              {cityRequests.length > 0 &&
                cityRequests.map((d, idx) => (
                  <tr>
                    <td
                      className={`custom-table-text ${
                        idx == 0 ? "custom-table-body-top-left" : ""
                      }`}
                    >
                      {d.state}
                    </td>
                    <td className="custom-table-text" align="center">
                      {d.city}
                    </td>
                    <td className="custom-table-text" align="center">
                      {d.status}
                    </td>
                    <td className="custom-table-text" align="center">
                      {d.college}
                    </td>
                    <td className="custom-table-text" align="center">
                      {d.sport}
                    </td>
                    <td
                      align="center"
                      className={`custom-table-text ${
                        idx == 0 ? "custom-table-body-top-right" : ""
                      }`}
                    >
                      <div className="d-flex justify-content-center">
                        <i
                          className={
                            d.supported_by.includes(uid)
                              ? "fas fa-heart fa-2x text-danger pointer"
                              : "fas fa-heart fa-2x pointer"
                          }
                          onClick={() => handleHeartClick(d.id, d.supported_by)}
                        ></i>
                        <p className="pl-2">{d.support}</p>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default RequestedCities;
