import React, { useEffect, useState } from "react";
import Header from "components/Headers/Header";
import {
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  Form,
  Spinner,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateImg } from "store/actions/authActions";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { updateInfo } from "store/actions/authActions";
import { getSports } from "store/actions/sportAction";
import { fetchSchoolStates } from "store/actions/athleteActions";
import { fetchStates } from "store/actions/athleteActions";
import { getSchoolCounty } from "store/actions/athleteActions";
import { getCollegeCity } from "store/actions/athleteActions";
import { addSocialLink } from "store/actions/userAction";
import { updateQrCode } from "store/actions/authActions";
import { toast } from "react-toastify";

function Profile() {
  let auth = useSelector((state) => state.auth);

  const { schoolStates, states, cities, counties } = useSelector(
    (state) => state.athlete
  );
  let { sports } = useSelector((state) => state.sport);

  let dispatch = useDispatch();
  const [sport, setSport] = useState("");
  const [email, setEmail] = useState(auth.user.email);
  const [first_name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [chatRate, setChatRate] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [state, setState] = useState("");
  const [teamList, setTeamList] = useState(
    auth.user.promoted_teammates ? auth.user.promoted_teammates : [""]
  );
  const [fields, setFields] = useState({
    nameEdit: false,
    lastNameEdit: false,
    chatRateEdit: false,
    sportLevelEdit: false,
    cityEdit: false,
    youtubeEdit: false,
    sportEdit: false,
    stateEdit: false,
    collegeEdit: false,
  });
  const [modals, setModals] = useState({
    promote: false,
    postWarning: false,
  });
  const [image, setImage] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [vid, setVid] = useState("");
  const [socialMediaName, setSocialMediaName] = useState("");
  const [socialMediaURL, setSocialMediaURL] = useState("");
  useEffect(() => {
    if (states.length == 0) {
      dispatch(fetchStates());
    }
    if (schoolStates.length == 0) {
      dispatch(fetchSchoolStates());
    }
  }, []);
  // Get Sports
  useEffect(() => {
    dispatch(getSports());
  }, []);
  useEffect(() => {
    if (auth.user.sportLevel == "College athlete") {
      dispatch(getCollegeCity(auth.user.state));
    } else {
      dispatch(getSchoolCounty(auth.user.state));
    }
  }, [auth.user.state]);
  const defaultStateProps = {
    options:
      auth.user.sportLevel == "College athlete"
        ? states?.map((insti) => {
            return insti.name;
          })
        : schoolStates?.map((insti) => {
            return insti.name;
          }),
    getOptionLabel: (option) => option,
  };
  const defaultCollegeProps = {
    options:
      auth.user.sportLevel == "College athlete"
        ? cities?.map((insti) => {
            return insti.city;
          })
        : counties?.map((insti) => {
            return insti.county;
          }),
    getOptionLabel: (option) => option,
  };
  const defaultSportProps = {
    options:
      sports.length > 0 &&
      sports.map((item) => {
        return item.sport;
      }),
    getOptionLabel: (option) => option,
  };

  const fieldToggle = (name) => {
    let newField = JSON.parse(JSON.stringify(fields));
    for (let field of Object.keys(newField)) {
      if (field != name) newField[field] = false;
    }
    newField[name] = !newField[name];
    setFields(newField);
  };
  const modalToggle = (name) => {
    let newModal = JSON.parse(JSON.stringify(modals));
    for (let modal of Object.keys(newModal)) {
      if (modal != name) newModal[modal] = false;
    }
    newModal[name] = !newModal[name];
    setModals(newModal);
  };

  // handle input change
  const handleTeamInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...teamList];
    list[index] = value;
    setTeamList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...teamList];
    list.splice(index, 1);
    setTeamList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setTeamList([...teamList, ""]);
  };

  //   HandleSocialMedia
  const HandleSocialMedia = (e) => {
    e.preventDefault();
    if (socialMediaName && socialMediaURL) {
      let temp = { name: socialMediaName, url: socialMediaURL };
      let social_media;
      if (auth.user?.social_media) {
        social_media = [...auth.user?.social_media, temp];
      } else {
        social_media = [temp];
      }
      dispatch(
        addSocialLink(social_media, auth.uid, () => {
          setSocialMediaName("");
          setSocialMediaURL("");
        })
      );
    } else {
      alert("Please Add name and url");
    }
  };
  // Delete Social Media Icons
  const DeleteSocialMedia = (index) => {
    let social_media = auth.user?.social_media.filter(
      (element, idx) => idx !== index
    );
    dispatch(addSocialLink(social_media, auth.uid));
  };

  return (
    <>
      <Header />
      <Container fluid>
        <div className="complaint-card mb-4">
          <div className="complaint-form">
            <Row>
              <Col>
                <p className="edit-password-info">Athlete ID:</p>
              </Col>
              <Col>
                <p className="edit-password-info">{auth.user.athleteID}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="edit-password-info">Email ID:</p>
              </Col>
              <Col>
                <p className="edit-password-info">{email}</p>
              </Col>
            </Row>
            <h4 className="mt-4">
              POST SPORTS EXPERIENCE ON YOUR SOCIAL MEDIA & GIVE FANS LINK:{" "}
              <span
                className="text-primary pointer"
                onClick={() => modalToggle("postWarning")}
              >
                INSTRUCTIONS
              </span>
            </h4>
            <Row className="mt-2">
              <Col>
                <p className="edit-password-info">Social Media Link:</p>
              </Col>
              <Col>
                <div className={`${!fields.youtubeEdit ? "d-flex" : "d-none"}`}>
                  {auth.user.youtube_url ? (
                    <a
                      className="mt-1"
                      href={`${auth.user.youtube_url}`}
                      target="_blank"
                    >
                      {auth.user.youtube_url}
                    </a>
                  ) : (
                    <p className="edit-password-info">Add Now</p>
                  )}
                  <i
                    className="fa fa-pencil-alt mt-1 ml-2 pointer"
                    onClick={() => fieldToggle("youtubeEdit")}
                  ></i>
                </div>
                <Form
                  className={`${fields.youtubeEdit ? "d-flex" : "d-none"}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(updateInfo(auth.uid, youtubeURL, "youtube")).then(
                      (res) => {
                        fieldToggle("youtubeEdit");
                      }
                    );
                  }}
                >
                  <Row>
                    <Col md={12} lg={6} xl={6} sm={12}>
                      <Input
                        required
                        className="custom-input mt-0"
                        type="text"
                        placeholder="Enter Link"
                        value={youtubeURL}
                        onChange={(e) => setYoutubeURL(e.target.value)}
                      />
                    </Col>
                    <Col sm={12} md={12} lg={6} xl={6} className="mt-2 d-flex">
                      <Button className=" ml-3" color="primary" type="submit">
                        Update
                      </Button>
                      <Button
                        className=""
                        color="danger"
                        onClick={() => fieldToggle("youtubeEdit")}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row className={`${fields.youtubeEdit ? "mt-5" : "mt-0"}`}>
              <Col>
                <p className="edit-password-info">First Name: </p>
              </Col>
              <Col>
                <div className={`${!fields.nameEdit ? "d-flex" : "d-none"}`}>
                  <p className="edit-password-info">{auth.user.first_name}</p>
                  <i
                    className="fa fa-pencil-alt mt-2 ml-2 pointer"
                    onClick={() => fieldToggle("nameEdit")}
                  ></i>
                </div>
                <Form
                  className={`${fields.nameEdit ? "d-flex" : "d-none"}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(updateInfo(auth.uid, first_name, "name")).then(
                      (res) => {
                        fieldToggle("nameEdit");
                      }
                    );
                  }}
                >
                  <Row>
                    <Col md={12} lg={6} xl={6} sm={12}>
                      <Input
                        required
                        className="custom-input mt-0"
                        type="text"
                        placeholder="Enter First Name"
                        value={first_name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                    <Col sm={12} md={12} lg={6} xl={6} className="mt-2 d-flex">
                      <Button className=" ml-3" color="primary" type="submit">
                        Update
                      </Button>
                      <Button
                        className=""
                        color="danger"
                        onClick={() => fieldToggle("nameEdit")}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row className={`${fields.nameEdit ? "mt-5" : "mt-0"}`}>
              <Col>
                <p className="edit-password-info">Last Name: </p>
              </Col>
              <Col>
                <div
                  className={`${!fields.lastNameEdit ? "d-flex" : "d-none"}`}
                >
                  <p className="edit-password-info">{auth.user.last_name}</p>
                  <i
                    className="fa fa-pencil-alt mt-2 ml-2 pointer"
                    onClick={() => fieldToggle("lastNameEdit")}
                  ></i>
                </div>
                <Form
                  className={`${fields.lastNameEdit ? "d-flex" : "d-none"}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(updateInfo(auth.uid, last_name, "last_name")).then(
                      (res) => {
                        fieldToggle("lastNameEdit");
                      }
                    );
                  }}
                >
                  <Row>
                    <Col md={12} lg={6} xl={6} sm={12}>
                      <Input
                        required
                        className="custom-input mt-0"
                        type="text"
                        placeholder="Enter Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Col>
                    <Col sm={12} md={12} lg={6} xl={6} className="mt-2 d-flex">
                      <Button className=" ml-3" color="primary" type="submit">
                        Update
                      </Button>
                      <Button
                        className=""
                        color="danger"
                        onClick={() => fieldToggle("lastNameEdit")}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row className={`${fields.cityEdit ? "mt-5" : "mt-0"}`}>
              <Col>
                <p className="edit-password-info">State:</p>
              </Col>
              <Col>
                <div className={`${!fields.stateEdit ? "d-flex" : "d-none"}`}>
                  <p className="edit-password-info">{auth.user.state}</p>
                  <i
                    className="fa fa-pencil-alt mt-2 ml-2 pointer"
                    onClick={() => fieldToggle("stateEdit")}
                  ></i>
                </div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(updateInfo(auth.uid, state, "state")).then(
                      (res) => {
                        fieldToggle("stateEdit");
                      }
                    );

                    dispatch(updateInfo(auth.uid, "", "college"));
                  }}
                >
                  <div className={`${fields.stateEdit ? "d-flex" : "d-none"}`}>
                    <Row>
                      <Col md={12} lg={6} xl={6} sm={12}>
                        <Autocomplete
                          {...defaultStateProps}
                          id="auto-complete"
                          className="w-100"
                          autoComplete
                          includeInputInList
                          onChange={(e, val) => setState(val)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              placeholder="Select State"
                              variant="standard"
                            />
                          )}
                        />
                      </Col>
                      <Col
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mt-2 d-flex"
                      >
                        <Button className=" ml-3" color="primary" type="submit">
                          Update
                        </Button>
                        <Button
                          className=""
                          color="danger"
                          onClick={() => fieldToggle("stateEdit")}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Col>
            </Row>
            <Row className={`${fields.stateEdit ? "mt-5" : "mt-0"}`}>
              <Col>
                <p className="edit-password-info mb-0">High School / County</p>
                <p className="edit-password-info mt-0">
                  College / City or Other:
                </p>
              </Col>
              <Col>
                <div className={`${!fields.collegeEdit ? "d-flex" : "d-none"}`}>
                  <p className="edit-password-info">{auth.user.college}</p>
                  <i
                    className="fa fa-pencil-alt mt-2 ml-2 pointer"
                    onClick={() => fieldToggle("collegeEdit")}
                  ></i>
                </div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.preventDefault();
                    dispatch(updateInfo(auth.uid, state, "college")).then(
                      (res) => {
                        fieldToggle("collegeEdit");
                      }
                    );
                  }}
                >
                  <div
                    className={`${fields.collegeEdit ? "d-flex" : "d-none"}`}
                  >
                    <Row>
                      <Col md={12} lg={6} xl={6} sm={12}>
                        <Autocomplete
                          {...defaultCollegeProps}
                          id="auto-complete"
                          className="w-100"
                          autoComplete
                          includeInputInList
                          onChange={(e, val) => setState(val)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              placeholder="Select City"
                              variant="standard"
                            />
                          )}
                        />
                      </Col>
                      <Col
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mt-2 d-flex"
                      >
                        <Button className=" ml-3" color="primary" type="submit">
                          Update
                        </Button>
                        <Button
                          className=""
                          color="danger"
                          onClick={() => fieldToggle("collegeEdit")}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Col>
            </Row>
            <Row className={`${fields.collegeEdit ? "mt-5" : "mt-0"}`}>
              <Col>
                <p className="edit-password-info">Sport:</p>
              </Col>
              <Col>
                <div className={`${!fields.sportEdit ? "d-flex" : "d-none"}`}>
                  <p className="edit-password-info">{auth.user.sport}</p>
                  <i
                    className="fa fa-pencil-alt mt-2 ml-2 pointer"
                    onClick={() => fieldToggle("sportEdit")}
                  ></i>
                </div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.preventDefault();
                    dispatch(updateInfo(auth.uid, sport, "sport")).then(
                      (res) => {
                        fieldToggle("sportEdit");
                      }
                    );
                  }}
                >
                  <div className={`${fields.sportEdit ? "d-flex" : "d-none"}`}>
                    <Row>
                      <Col md={12} lg={6} xl={6} sm={12}>
                        <Autocomplete
                          {...defaultSportProps}
                          id="auto-complete"
                          className="w-100"
                          autoComplete
                          includeInputInList
                          onChange={(e, val) => setSport(val)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              placeholder="Select Sport"
                              variant="standard"
                            />
                          )}
                        />
                      </Col>
                      <Col
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mt-2 d-flex"
                      >
                        <Button className=" ml-3" color="primary" type="submit">
                          Update
                        </Button>
                        <Button
                          className=""
                          color="danger"
                          onClick={() => fieldToggle("sportEdit")}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Col>
            </Row>
            <Row className={`${fields.collegeEdit ? "mt-5" : "mt-0"}`}>
              <Col>
                <p className="edit-password-info">Gender:</p>
              </Col>
              <Col>
                <div className="d-flex">
                  <p className="edit-password-info">{auth.user.gender}</p>
                </div>
              </Col>
            </Row>
            <Row className={`${fields.nameEdit ? "mt-5" : "mt-0"}`}>
              <Col>
                <p className="edit-password-info">Chat Rate:</p>
              </Col>
              <Col>
                <div
                  className={`${!fields.chatRateEdit ? "d-flex" : "d-none"}`}
                >
                  <p className="edit-password-info">{auth.user?.chatRate}$</p>
                  <i
                    className="fa fa-pencil-alt mt-2 ml-2 pointer"
                    onClick={() => fieldToggle("chatRateEdit")}
                  ></i>
                </div>
                <Form
                  className={`${fields.chatRateEdit ? "d-flex" : "d-none"}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(updateInfo(auth.uid, chatRate, "chatRate")).then(
                      (res) => {
                        fieldToggle("chatRateEdit");
                      }
                    );
                  }}
                >
                  <Row>
                    <Col md={12} lg={6} xl={6} sm={12}>
                      <Input
                        required
                        className="custom-input mt-0"
                        type="number"
                        placeholder="Enter Your Chat Rate"
                        value={chatRate}
                        min="0"
                        onChange={(e) => setChatRate(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            // allow arrow up and arrow down keys
                            return;
                          }
                          e.preventDefault();
                        }}
                        // onWheel={(e) => {
                        //   e.preventDefault();
                        //   const step = e.deltaY > 0 ? -1 : 1;
                        //   const value = parseInt(e.target.value) || 0;
                        //   const newValue = value + step;
                        //   setChatRate(newValue);
                        // }}
                      />
                    </Col>
                    <Col sm={12} md={12} lg={6} xl={6} className="mt-2 d-flex">
                      <Button className=" ml-3" color="primary" type="submit">
                        Update
                      </Button>
                      <Button
                        className=""
                        color="danger"
                        onClick={() => fieldToggle("chatRateEdit")}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <h3>WANT TO HELP YOUR TEAMMATES?</h3>
            <Row>
              <Col md="6">
                <h5>
                  WE KNOW SOME OF YOUR TEAMMATES COULD REALLY USE THE HELP OF
                  FANS TO BUY THEIR LICENSES. TELL US WHICH TEAMMATES YOU
                  RECOMMEND, AND WE WILL ALERT FANS WHO BUY YOUR LICENSE ABOUT
                  YOUR RECOMMENDATIONS{" "}
                  <strong>
                    AUTOMATICALLY WHEN FAN DOWNLOADS YOUR LICENSE BADGE:
                  </strong>
                </h5>
              </Col>
            </Row>
            <Button color="primary" onClick={() => modalToggle("promote")}>
              Recommend Teammates
            </Button>
            <Row className="mt-4">
              <Col>
                <Label className="auth-label mb-0">Current Image</Label>
                <br />
                <img
                  src={auth.user?.player_image?.url}
                  width="150px"
                  height="150px"
                  alt="img"
                />
              </Col>
              <Col>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let obj = {
                      image: image,
                      fileName: auth.user.player_image.file_name,
                    };
                    dispatch(updateImg(obj, auth.uid));
                    setImage("");
                  }}
                >
                  <Label className="auth-label mb-0">Change QR Code</Label>
                  <Input
                    type="file"
                    required
                    onChange={(e) => {
                      let file = e.target.files[0];
                      if (file.size <= 1000000) {
                        setImage(file);
                      } else {
                        toast.error("File size exceeds 1MB");
                      }
                    }}
                    accept="image/png, image/gif, image/jpeg"
                    className="mt-4"
                  />
                  <Label className="auth-label text-danger">Max Size 1MB</Label>
                  <br />
                  <Button
                    className="mt-3"
                    color="primary"
                    disabled={!image}
                    type="submit"
                  >
                    {auth.imgLoading ? <Spinner size="sm" /> : "Update"}
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Label className="auth-label mb-0">Current QR Code</Label>
                <br />
                {auth.user?.qrCode?.url ? (
                  <img
                    src={auth.user?.qrCode?.url}
                    width="150px"
                    height="150px"
                    alt="qrcode"
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    Upload Qr Code
                    <span
                      className="text-primary pointer"
                      onClick={() => modalToggle("AthleteInstructions")}
                    >
                      : INSTRUCTIONS
                    </span>
                  </div>
                )}
              </Col>
              <Col>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let obj = {
                      qrCode: qrCode,
                      fileName: auth?.user?.qrCode?.file_name,
                    };
                    dispatch(updateQrCode(obj, auth.uid));
                    setQrCode("");
                  }}
                >
                  <Label className="auth-label mb-0">Change Image</Label>
                  <Input
                    type="file"
                    required
                    onChange={(e) => {
                      let file = e.target.files[0];
                      if (file.size <= 1000000) {
                        setQrCode(file);
                      } else {
                        toast.error("File size exceeds 1MB");
                      }
                    }}
                    accept="image/png, image/gif, image/jpeg"
                    className="mt-4"
                  />
                  <Label className="auth-label text-danger">Max Size 1MB</Label>
                  <br />
                  <Button
                    className="mt-3"
                    color="primary"
                    disabled={!qrCode}
                    type="submit"
                  >
                    {auth.qrCodeLoading ? <Spinner size="sm" /> : "Update"}
                  </Button>
                </Form>
              </Col>
            </Row>
            {/* <Row className="mt-3">
              <Col>
                <Label className="auth-label mb-0">Current Video</Label>
                <br />
                <video
                  src={auth.user?.player_video?.url}
                  controls
                  width="250px"
                  height="150px"
                ></video>
              </Col>
              <Col>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let obj = {
                      video: vid,
                      fileName: auth.user.player_video.file_name,
                    };
                    dispatch(updateVid(obj, auth.uid));
                    setVid("");
                  }}
                >
                  <Label className="auth-label mb-0">Change Video</Label>
                  <Input
                    required
                    onChange={(e) => setVid(e.target.files[0])}
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
                    className="mt-4"
                  />
                  <Label className="auth-label text-danger">
                    Max 30 Seconds
                  </Label>
                  <br />
                  <Button className="mt-3" disabled={!vid} color="primary">
                    {auth.vidLoading ? <Spinner size="sm" /> : "Update"}
                  </Button>
                </Form>
              </Col>
            </Row> */}
            {/*  */}
            {/* new row */}
            {/* {editSocialMediaConditon == false ? ( */}
            <>
              <Row className="mt-3">
                <Col md="4">
                  <Label className="auth-label mb-0">Social</Label>
                  <br />
                  <Input
                    type="select"
                    value={socialMediaName}
                    onChange={(e) => setSocialMediaName(e.target.value)}
                  >
                    <option value="">Select Option</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                  </Input>
                </Col>
                <Col md="4">
                  <Label className="auth-label mb-0">Url</Label>
                  <br />
                  <Input
                    type="text"
                    placeholder="Enter URL"
                    value={socialMediaURL}
                    onChange={(e) => setSocialMediaURL(e.target.value)}
                  />
                </Col>
                <Col md="4">
                  <br />
                  <Button color="primary" onClick={HandleSocialMedia}>
                    Add
                  </Button>
                </Col>
              </Row>
            </>
            {/* ) : ( */}
            {/* <>
                <Row className="mt-3">
                  <Col md="4">
                    <Label className="auth-label mb-0">Social</Label>
                    <br />
                    <Input
                      type="select"
                      value={editSocialMedia.type}
                      onChange={(e) =>
                        setEditSocialMedia({
                          ...editSocialMedia,
                          type: [e.target.value],
                        })
                      }
                    >
                      <option value="">Select Option</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                    </Input>
                  </Col>
                  <Col md="4">
                    <Label className="auth-label mb-0">Url</Label>
                    <br />
                    <Input
                      type="text"
                      placeholder="Enter URL"
                      value={editSocialMedia.url}
                      onChange={(e) =>
                        setEditSocialMedia({
                          ...editSocialMedia,
                          url: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col md="4">
                    <br />
                    <Button color="primary" onClick={HandleUpdateSocialMedia}>
                      Update
                    </Button>
                  </Col>
                </Row>
              </>
            )}  */}
            <Table className="align-items-center table-flush mt-3" responsive>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="custom-table-heading custom-heading"
                  >
                    Icon
                  </th>
                  <th
                    scope="col"
                    className="custom-table-heading custom-heading"
                  >
                    URL
                  </th>
                  <th
                    scope="col"
                    className="custom-table-heading custom-heading"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="custom-table-body mt-3">
                {auth.user?.social_media?.map((data, index) => {
                  return (
                    <tr>
                      <td className="custom-table-text">
                        {data &&
                        data?.name?.toLowerCase().includes("facebook") ? (
                          <>
                            <i class="fab fa-facebook"></i>
                          </>
                        ) : data?.name?.toLowerCase().includes("instagram") ? (
                          <>
                            <i class="fab fa-instagram"></i>
                          </>
                        ) : data?.name?.toLowerCase().includes("twitter") ? (
                          <>
                            <i class="fab fa-twitter"></i>
                          </>
                        ) : (
                          ""
                        )}{" "}
                        {data?.name}
                      </td>
                      <td className="custom-table-text">{data?.url}</td>
                      <td className="custom-table-text">
                        {data && (
                          <Button onClick={() => DeleteSocialMedia(index)}>
                            <i class="fas fa-trash text-danger"></i>{" "}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
        <Modal
          centered
          isOpen={modals.AthleteInstructions}
          toggle={() => modalToggle("AthleteInstructions")}
        >
          <ModalBody>
            <Label>
              <h3 className="custom-label text-dark">
                <span className="text-underline">Instructions for Athlete</span>{" "}
                : How to put your QR on your own badges at FHP:
              </h3>
            </Label>
            <Label className="custom-checkbox-label text-dark">
              <ul>
                <li>Make your video, see script on your Chat Home Page.</li>
                <li>Load your video on YouTube.</li>
                <li>Get URL from YouTube.</li>
                <li>
                  Use the URL to generate a QR (at QRcodechimp.com or
                  AdobeExpressQR).
                </li>
                <li>Upload the QR to your profile.</li>
                <li>Now FHP will put that QR on your subscription badges.</li>
                <li>
                  This way your fans can buy your badge, scan the QR, see your
                  video.
                </li>
              </ul>
            </Label>
            <div className="text-right">
              <Button
                color="danger"
                onClick={() => modalToggle("AthleteInstruction")}
              >
                Close
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          centered
          isOpen={modals.postWarning}
          toggle={() => modalToggle("postWarning")}
        >
          <ModalBody>
            <Label className="custom-label text-primary">
              <b>Instructions:</b>
            </Label>
            <Label className="custom-checkbox-label text-dark">
              <strong>
                Do not post sensitive personal information online. You cannot
                trust everyone you meet online.
              </strong>
            </Label>
            <div className="text-right">
              <Button color="danger" onClick={() => modalToggle("postWarning")}>
                Close
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={modals.promote} toggle={() => modalToggle("promote")}>
          <ModalBody>
            <Label className="auth-label">
              <b>Add Teammate ID to Recommend them:</b>{" "}
              <small className="text-danger">(Max-3)</small>
            </Label>
            <Form
              className="mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(updateInfo(auth.uid, teamList, "teamList")).then(
                  (res) => {
                    // setTeamList([''])
                    modalToggle("promote");
                  }
                );
              }}
            >
              {teamList.length == 0 && (
                <div className="text-right">
                  <Button onClick={handleAddClick} color="primary" size="md">
                    <i className="fa fa-plus"></i>
                  </Button>
                </div>
              )}
              {teamList.map((team, index) => (
                <div key={index}>
                  <Label className="mt-3">Teammate #{index + 1}</Label>
                  <div className="d-flex">
                    <Input
                      required
                      className="mr-3"
                      name="teammate_id"
                      type="number"
                      placeholder="Enter Teammate ID"
                      defaultValue={team}
                      onChange={(e) => handleTeamInputChange(e, index)}
                    />
                    {teamList.length < 3 && (
                      <Button
                        onClick={handleAddClick}
                        color="primary"
                        size="md"
                      >
                        <i className="fa fa-plus"></i>
                      </Button>
                    )}
                    {teamList.length > 0 && (
                      <Button
                        onClick={() => handleRemoveClick(index)}
                        color="danger"
                        size="md"
                      >
                        <i className="fa fa-minus"></i>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-right mt-5">
                <Button color="danger" onClick={() => modalToggle("promote")}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
}

export default Profile;
