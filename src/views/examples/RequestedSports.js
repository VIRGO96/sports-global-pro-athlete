import { Autocomplete, TextField } from "@mui/material";
import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Row,
  Label,
} from "reactstrap";
import { newCollegeUniversitiesData } from "store/actions/athleteActions";
import { getCollegeCity } from "store/actions/athleteActions";
import { fetchStates } from "store/actions/athleteActions";
import { updateSportRequest } from "store/actions/requestedSportsAction";
import { createSportRequest } from "store/actions/requestedSportsAction";
import { getSportRequest } from "store/actions/requestedSportsAction";
import { getAllUsers } from "store/actions/userAction";

const RequestedSports = () => {
  let dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalPosition, setModalPosition] = useState(false);
  const [sport, setSport] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [college, setCollege] = useState("");
  let { uid } = useSelector((state) => state.auth);
  let { allUsers } = useSelector((state) => state.users);
  let { sportRequests } = useSelector((state) => state.requestedSports);
  const [support, setSupport] = useState([]);
  const [inputList, setInputList] = useState([{ category: "", meaning: "" }]);
  const { states, cities, collegeInstitutes } = useSelector(
    (state) => state.athlete
  );

  const newSport = sport.toLowerCase().split(" ");
  for (let i = 0; i < newSport.length; i++) {
    newSport[i] = newSport[i][0]?.toUpperCase() + newSport[i].substr(1);
  }

  const [data, setData] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  const handlePositionToggle = () => {
    setModalPosition(!modalPosition);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { category: "", meaning: "" }]);
  };

  useEffect(() => {
    dispatch(getSportRequest());
  }, []);

  useEffect(() => {
    if (allUsers.length == 0) {
      dispatch(getAllUsers());
    }
  }, []);

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

  const handleHeartClick = (id, arr) => {
    if (arr.includes(uid)) {
      let checkedArr = arr.filter((item) => item !== uid);
      dispatch(updateSportRequest(id, checkedArr));
    } else {
      let obj = [...arr, uid];
      dispatch(updateSportRequest(id, obj));
    }
  };

  const handlePositionModal = (item) => {
    setModalPosition(true);
    setData(item);
  };

  useEffect(() => {
    if (states.length == 0) {
      dispatch(fetchStates());
    }
  }, []);
  useEffect(() => {
    if (state != "") {
      dispatch(getCollegeCity(state));
    }
  }, [state]);

  useEffect(() => {
    if (state != "" && city != "") {
      dispatch(newCollegeUniversitiesData(state, city));
    }
  }, [state, city]);

  const defaultStateProps = {
    options: states?.map((insti) => {
      return insti.name;
    }),
    getOptionLabel: (option) => option,
  };

  const defaultCollegeProps = {
    options: cities?.map((insti) => {
      return insti.city;
    }),
    getOptionLabel: (option) => option,
  };

  let newSchools = [];
  const getInstitutes = () => {
    collegeInstitutes.forEach((insti) => {
      insti.institutes?.forEach((ele) => {
        newSchools.push(ele);
      });
    });

    if (newSchools) {
      return newSchools;
    }
  };
  const defaultSchoolProps = {
    options: getInstitutes(),
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
                details: inputList,
                sport: newSport.join(""),
                state: state,
                city: city,
                college: college,
                status: "pending",
                added_by: uid,
                supported_by: support,
                support: support.length,
              };
              dispatch(createSportRequest(obj));
              toggle();
              setSport("");
              setState("");
              setCollege("");
              setCity("");
              setInputList([{ category: "", meaning: "" }]);
            }}
          >
            <>
              <p className="auth-desc-subtitle mt-0 ml-0">
                Add Requested Sport
              </p>
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
              <div>
                <Label className="mt-2 text-center">
                  <h3>City:</h3>
                </Label>
                <Autocomplete
                  {...defaultCollegeProps}
                  id="auto-complete"
                  autoComplete
                  includeInputInList
                  disableClearable={true}
                  disableListWrap
                  value={city}
                  onChange={(e, val) => {
                    setCity(val);
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
                  <h3>School:</h3>
                </Label>
                <Autocomplete
                  {...defaultSchoolProps}
                  id="auto-complete"
                  autoComplete
                  includeInputInList
                  disableClearable={true}
                  disableListWrap
                  value={college}
                  onChange={(e, val) => {
                    setCollege(val);
                    setSport("");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
              </div>

              <div className="mt-3">
                <Label className="m-0 text-center">
                  <h3>Sport:</h3>
                </Label>
                <Input
                  type="text"
                  value={sport}
                  style={{
                    border: "none",
                    borderRadius: "0px",
                    height: "32px",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
                    color: "black",
                  }}
                  onChange={(e) => setSport(e.target.value)}
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
                  disabled={!sport || !city || !college || !state || !inputList}
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
          My favorite sport not listed. Please add it.
        </p>
        <div className="d-flex mt-3">
          <p className="text-dark auth-desc-subtitle ml-0 mb-0 mt-2">Sports</p>
          <Button className="custom-btn ml-auto" onClick={toggle}>
            Add New Sport
          </Button>
        </div>

        {sportRequests.length == 0 ? (
          <Card className="filter-card mt-5">
            <CardBody className="bg-danger text-center rounded">
              <h2 className="text-white">
                <i className="fa fa-exclamation-triangle mr-3"></i> No Sport
                Request Submitted Yet.
              </h2>
            </CardBody>
          </Card>
        ) : (
          <Table className="align-items-center table-flush mt-5" responsive>
            <thead>
              <tr>
                <th scope="col" className="custom-table-heading custom-heading">
                  Sport
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  My School’s Name
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
                  My School’s Location
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  Support
                </th>
              </tr>
            </thead>
            <tbody className="custom-table-body mt-3">
              {sportRequests.length > 0 &&
                sportRequests.map((ele, idx) => (
                  <tr>
                    <td
                      className={`custom-table-text ${
                        idx == 0 ? "custom-table-body-top-left" : ""
                      }`}
                    >
                      {ele.sport}
                    </td>
                    <td className="custom-table-text" align="center">
                      {ele.college}
                    </td>
                    <td className="custom-table-text" align="center">
                      {ele.status}
                    </td>
                    <td className="custom-table-text" align="center">
                      {ele.state},{ele.city}
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
                            ele.supported_by.includes(uid)
                              ? "fas fa-heart fa-2x text-danger pointer"
                              : "fas fa-heart fa-2x  pointer"
                          }
                          onClick={() =>
                            handleHeartClick(ele.id, ele.supported_by)
                          }
                        ></i>
                        <p className="pl-2">{ele.support}</p>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Container>

      <Modal isOpen={modalPosition}>
        <ModalBody>
          <p className="auth-desc-subtitle mt-0 ml-0 pl-3 mb-0">
            Sport Details
          </p>
          <Table className="align-items-center table-flush" responsive>
            <thead>
              <tr>
                <th scope="col" className="custom-table-heading custom-heading">
                  Sport Category
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  Category Name
                </th>
              </tr>
            </thead>
            <tbody className="custom-table-body mt-3">
              {sportRequests.length > 0 &&
                data.map((ele, index) => (
                  <tr>
                    <td className={"custom-table-text"}>{ele.category}</td>
                    <td className="custom-table-text" align="center">
                      {ele.meaning}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="text-right">
            <Button
              className="mt-4"
              color="danger"
              onClick={handlePositionToggle}
            >
              Close
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RequestedSports;
