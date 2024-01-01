import React, { useState } from "react";
import Logo from "../../assets/img/custom/logo.png";
import {
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  Form,
  Spinner,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isUserExist, register } from "../../store/actions/authActions";
import LoadingOverlay from "react-loading-overlay";
import Paypal from "components/Paypal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ImageIcon from "../../assets/img/custom/picture-instruction.jpg";
import VideoIcon from "../../assets/img/custom/video-instruction.jpg";
import { useEffect } from "react";
import { getSports } from "store/actions/sportAction";
import { newSchoolsData } from "store/actions/newSchoolsAction";
import { newCollegeUniversities } from "store/actions/newCollegeUniversities";
import { newSchoolsDataByIdAction } from "store/actions/newSchoolsAction";
import { newCollegeUniversityDataById } from "store/actions/newCollegeUniversities";
import { fetchStates } from "store/actions/athleteActions";
import { fetchSchoolStates } from "store/actions/athleteActions";
import { getCollegeCity } from "store/actions/athleteActions";
import { getSchoolCounty } from "store/actions/athleteActions";
import renderPdf from "../../pdf/Summary.pdf";
import PDFViewer from "pdf-viewer-reactjs";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

function Register() {
  const [loading, setLoading] = useState(false);
  const [imgOpen, setImgOpen] = useState(false);
  const [vidOpen, setVidOpen] = useState(false);
  const [taxOpen, setTaxOpen] = useState(false);
  const [agrOpen, setAgrOpen] = useState(false);
  const [ambassadorAgreement, setAmbassadorAgreement] = useState(false);
  const [name, setName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paypal, setPaypal] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [chatRate, setChatRate] = useState("");
  const [chatRateInfo, setChatRateInfo] = useState(false);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [sport, setSport] = useState("");
  const [sportLevel, setSportLevel] = useState("College athlete");
  const [divisionOne, setDivisionOne] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [newSchool, setNewSchool] = useState(""); //New Schools
  const [college, setCollege] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [tac, setTac] = useState(false);
  const [tor, setTor] = useState(false);
  const [tol, setTol] = useState(false);
  const [tax, setTax] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [nilPolicy, setNilPolicy] = useState(false);
  const [samePolicy, setSamePolicy] = useState(false);
  const [nilEligible, setNilEligible] = useState(false);
  const [photoInstruction, setPhotoInstruction] = useState(false);
  const [videoInstruction, setVideoInstruction] = useState(false);
  const [stateLaw, setStateLaw] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [agreementBox, setAgreementBox] = useState(false);
  const [price, setPrice] = useState("2.0");
  const [typicalRestrictions, setTypicalRestrictions] = useState(false);
  const [noteToggle, setNoteToggle] = useState({
    imgNote: false,
    videoNote: false,
  });
  const [checkOut, setCheckOut] = useState(false);
  const [tolOpen, setTolOpen] = useState(false);
  const [tolOpenInfo, setTolOpenInfo] = useState(false);

  let auth = useSelector((state) => state.auth);
  const { states, schoolStates, cities, counties } = useSelector(
    (state) => state.athlete
  );
  let { sports } = useSelector((state) => state.sport);
  const { newSchoolsAllData, newSchoolsId } = useSelector(
    (state) => state.schools
  );

  const { newCollegeUniversitiesData, newCollegesDataId } = useSelector(
    (state) => state.collegeAndUniversities
  );
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStates());
    dispatch(fetchSchoolStates());
  }, []);

  useEffect(() => {
    if (state != "" && college != "") {
      if (sportLevel == "College athlete") {
        dispatch(newCollegeUniversityDataById(newSchool));
      } else {
        dispatch(newSchoolsDataByIdAction(newSchool));
      }
    }
  }, [newSchool]);

  useEffect(() => {
    if (state != "") {
      if (sportLevel == "College athlete") {
        dispatch(getCollegeCity(state));
      } else {
        dispatch(getSchoolCounty(state));
      }
    }
  }, [state]);

  useEffect(() => {
    if (state != "" && college != "") {
      if (sportLevel == "College athlete") {
        dispatch(newCollegeUniversities(state, college));
      } else {
        dispatch(newSchoolsData(state, college));
      }
    }
  }, [state, college]);

  // Get Sports
  useEffect(() => {
    dispatch(getSports());
  }, []);
  const agreeToggle = () => {
    setAgrOpen(!agrOpen);
  };
  const imgToggle = () => {
    setImgOpen(!imgOpen);
  };
  const vidToggle = () => {
    setVidOpen(!vidOpen);
  };
  const taxToggle = () => {
    setTaxOpen(!taxOpen);
  };
  const tolToggle = () => {
    setTolOpen(!tolOpen);
  };
  const tolInfoToggle = () => {
    setTolOpenInfo(!tolOpenInfo);
  };
  const chatRateInfoToggle = () => {
    setChatRateInfo(!chatRateInfo);
  };
  const ambassdorToggle = () => {
    setAmbassadorAgreement(!ambassadorAgreement);
  };
  const handleInfoIcon = () => {
    setTolOpenInfo(true);
    setTolOpen(false);
  };
  const toggleNote = (name) => {
    let newField = JSON.parse(JSON.stringify(noteToggle));
    for (let field of Object.keys(newField)) {
      if (field != name) newField[field] = false;
    }
    newField[name] = !newField[name];
    setNoteToggle(newField);
  };
  const getPaypalDetail = (details) => {
    let creds = {
      name: name,
      lastName: firstLetter + lastName,
      email: email,
      gender: gender,
      paypal: details.payer.email_address,
      phoneNumber: phoneNumber,
      sport: sport,
      chatRate: chatRate,
      sportLevel: sportLevel,
      state: state,
      college: college,
      new_institute_id:
        sportLevel != "College athlete"
          ? newSchoolsId[0]?.id
          : newCollegesDataId[0]?.id,
      institute_name: newSchool,
      zipCode: zipCode,
      tac: tac,
      nilPolicy: nilPolicy,
      samePolicy: samePolicy,
      stateLaw: stateLaw,
      tol: tol,
      tax: tax,
      photoInstruction: photoInstruction,
      videoInstruction: videoInstruction,
      agreement: agreement,
      typicalRestrictions: typicalRestrictions,
      img: image,
    };
    dispatch(
      register(creds, password, details, () => {
        setLoading(false);
        setCheckOut(false);
      })
    );
  };
  const defaultSportProps = {
    options:
      sports.length > 0 &&
      sports.map((item) => {
        return item.sport;
      }),
    getOptionLabel: (option) => option,
  };
  const defaultStateProps = {
    options:
      sportLevel == "College athlete"
        ? states?.map((insti) => {
            return insti.name;
          })
        : schoolStates?.map((insti) => {
            return insti.name;
          }),
    getOptionLabel: (option) => option,
  };
  // Schools Props

  let newSchools = [];
  const getInstitutes = () => {
    if (sportLevel == "College athlete") {
      newCollegeUniversitiesData.forEach((insti) => {
        insti.institutes?.forEach((ele) => {
          newSchools.push(ele);
        });
      });
    } else {
      newSchoolsAllData.forEach((insti) => {
        insti.institutes?.forEach((ele) => {
          newSchools.push(ele);
        });
      });
    }
    if (newSchools) {
      return newSchools;
    }
  };
  const defaultNewSchoolProps = {
    options: getInstitutes(),
    getOptionLabel: (option) => option,
  };
  // END OF School Props
  const defaultCollegeProps = {
    options:
      sportLevel == "College athlete"
        ? cities?.map((insti) => {
            return insti.city;
          })
        : counties?.map((insti) => {
            return insti.county;
          }),
    getOptionLabel: (option) => option,
  };
  const defaultLetterProps = {
    options: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    getOptionLabel: (option) => option,
  };
  const handleChange = (value) => {
    const input = value.replace(/\D/g, "").substring(0, 10);
    const first = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) {
      setPhoneNumber(`(${first})-(${middle})-(${last})`);
    } else if (input.length > 3) {
      setPhoneNumber(`(${first})-(${middle})`);
    } else if (input.length >= 0) {
      setPhoneNumber(input);
    }
  };
  const handleNameCheck = (val) => {
    if (/[^a-z A-Z]/.test(val)) {
      return;
    } else {
      setName(val);
    }
  };
  const handleLastNameCheck = (val) => {
    if (/[^a-z A-Z]/.test(val)) {
      return;
    } else {
      setLastName(val);
    }
  };
  const handleCityCheck = (val) => {
    if (/[^a-z A-Z]/.test(val)) {
      return;
    } else {
      setCity(val);
    }
  };

  const SummaryToggle = () => {
    setSummaryOpen(!summaryOpen);
  };

  const zipHandleChange = (value) => {
    const input = value.replace(/\D/g, "").substring(0, 5);
    const newZipCode = input.substring(0, 5);
    if (input.length < 6) {
      setZipCode(newZipCode);
    }
  };

  if (auth.registered) {
    return <Redirect to="/auth/login" />;
  }

  const docs = [
    {
      uri: "https://internal.gredu.co/files/user_scores/1633600395-FORMATIMPORTNILAIPENGETAHUANKELAS1A-1633600395-15.xlsx",
    },
    { uri: require("../../pdf/Summary.pdf") },
    {
      uri: "https://api.core.sowat.dev/v2/assets?url=https://s3.ap-southeast-1.amazonaws.com/internal.gredu.co/dev/lesson_attachments/%282%29%20Aljabar%20Fisika-2-1637294567.pdf",
    },
  ];

  const handelPayment = (e) => {
    e.preventDefault();
    dispatch(
      isUserExist(email, () => {
        setCheckOut(true);
      })
    );
  };
  return (
    <LoadingOverlay active={loading} spinner text="Please Wait...">
      <>
        <div className="text-center mt-5">
          <Link to="/">
            <img src={Logo} alt="logo" className="logo" />
          </Link>
        </div>

        <div className="auth-card">
          <h2 className="auth-heading">Athlete Sign Up</h2>
          <div>
            <Label for="certify" className="custom-checkbox-label text-dark ">
              <p className="text-dark">
                I will read the attached Brand Ambassador Agreement. My
                agreement thereto will be recorded after Part 29, by my ‘Click
                to Accept’ near the end of the agreement.{" "}
                <span
                  onClick={() => setAmbassadorAgreement(true)}
                  className="text-primary font-weight-bold pointer"
                >
                  View, Read and then Click
                </span>
              </p>
            </Label>{" "}
          </div>
          <div className="d-flex mt-4 ml-4">
            <Input
              required
              type="checkbox"
              className="custom-checkbox"
              checked={nilEligible}
              onChange={(e) => setNilEligible(e.target.checked)}
            />
            <Label className="custom-checkbox-label text-dark mx-4 mt-1">
              <p className="text-dark">
                I understand that the Brand Ambassador agreement has a download
                button after part 29. I further understand that I am SOLELY
                RESPONSIBLE to provide a copy of this agreement to my school if
                they need it to verify my compliance to regs for NIL activities.
              </p>
            </Label>
          </div>
          <Label className="mt-3 auth-label">
            Click for College or High School athlete
          </Label>
          <div className="d-flex ml-4  mt-2">
            <div>
              <Input
                type="radio"
                checked={sportLevel == "College athlete"}
                id="d_yes"
                name="sportLevel"
                value="College athlete"
                onChange={(e) => {
                  setState("");
                  setCollege("");
                  setNewSchool("");
                  setSportLevel(e.target.value);
                }}
              />
              <Label
                for="d_yes"
                className={`auth-label ${
                  sportLevel == "College athlete" ? "text-primary" : ""
                }`}
              >
                NIL-eligible <br /> College athlete
              </Label>
            </div>
            <div className="mx-auto">
              <Input
                type="radio"
                id="d_no"
                name="sportLevel"
                checked={sportLevel == "High School athlete"}
                value="High School athlete"
                onChange={(e) => {
                  setState("");
                  setCollege("");
                  setNewSchool("");
                  setSportLevel(e.target.value);
                }}
              />
              <Label
                for="d_no"
                className={`auth-label ${
                  sportLevel == "High School athlete" ? "text-primary" : ""
                }`}
              >
                NIL-eligible <br /> High School ahtlete*
              </Label>
            </div>
          </div>
          <Label
            className={`auth-label ${
              sportLevel != "High School athlete" && "d-none"
            }`}
          >
            *Play H.S. sports in one of Alaska, California, Colorado,
            Connecticut, Dist. of Columbia, Idaho, Illinois, Iowa, Kansas,
            Louisiana, Maine, Maryland, Massachusetts, Minnesota, Nebraska, New
            Jersey, New York, North Dakota, Oklahoma, Oregon, Pennsylvania,
            Rhode Island, Tennessee, Utah, Washington,
          </Label>
        </div>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={`auth-card `}>
            <Label className="mt-4 auth-label">First Name</Label>
            <Input
              required
              placeholder="John"
              type="text"
              className=" custom-input"
              value={name}
              onChange={(e) => handleNameCheck(e.target.value)}
            />
            <Label className="mt-5 auth-label">First Letter of Last Name</Label>
            <Autocomplete
              {...defaultLetterProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              onChange={(e, val) => setFirstLetter(val)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="First letter of Last Name"
                  variant="standard"
                />
              )}
            />
            <Label className="text-danger mt-1">
              <i>S of Smith goes here</i>
            </Label>
            <br />
            <Label className="mt-5 auth-label">Rest of Last Name</Label>
            <Input
              required
              placeholder="mith"
              type="text"
              className=" custom-input"
              value={lastName}
              onChange={(e) => handleLastNameCheck(e.target.value)}
            />
            <Label className="text-danger mt-1">
              <i>mith of Smith goes here</i>
            </Label>
            <br />
            <Label className="mt-5 auth-label">Gender</Label>
            <div className="d-flex mt-3 ml-4">
              <div>
                <Input
                  type="radio"
                  checked={gender == "Male"}
                  id="male"
                  name="gender"
                  value="Male"
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
                <Label
                  for="male"
                  className={`auth-label ${
                    gender == "Male" ? "text-primary" : ""
                  }`}
                >
                  Male
                </Label>
              </div>
              <div className="mx-auto">
                <Input
                  type="radio"
                  id="female"
                  name="gender"
                  checked={gender == "Female"}
                  value="Female"
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
                <Label
                  for="female"
                  className={`auth-label ${
                    gender == "Female" ? "text-primary" : ""
                  }`}
                >
                  Female
                </Label>
              </div>
            </div>
            <Label className="mt-5 auth-label">Email</Label>
            <Input
              required
              placeholder="name@gmail.com"
              type="email"
              className=" custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label className="mt-5 auth-label">Password</Label>
            <Input
              required
              placeholder="Your password"
              type="password"
              className=" custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex">
              <div className="text-center">
                <Button
                  className="mt-5 custom-btn"
                  onClick={() => {
                    toggleNote("imgNote");
                  }}
                >
                  <i
                    className={`fa fa-check text-success ${
                      image ? "mt-1 " : "d-none"
                    }`}
                  ></i>{" "}
                  Upload Photo
                </Button>
                <br />
                <small
                  className="text-danger pointer"
                  onClick={() => {
                    toggleNote("imgNote");
                  }}
                >
                  Read this first.
                </small>
                <br />
                <img src={ImageIcon} alt="img-icon" className="img-fluid" />
              </div>
            </div>
            <br />
            <div className="d-flex mt-4 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={samePolicy}
                onChange={(e) => setSamePolicy(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                <p className="text-dark">
                  I understand that another person might register at FHP with
                  same name as myself, and even submit similar photo. I agree
                  that I am solely responsible to alert FANS to my correct
                  identity on FHP, such as by including my FHP Registration
                  Number on my Social Media linked to my Profile here on FHP,
                  and by posting the ad from ‘Athlete Posts this Ad’ page of
                  FHP.
                </p>
              </Label>
            </div>
            <Label className="mt-5 auth-label mb-0">Paypal Email</Label>
            <Input
              required
              placeholder="Your PayPal Account Email"
              type="email"
              className=" custom-input mb-2"
              value={paypal}
              onChange={(e) => setPaypal(e.target.value)}
            />
            <Label className="custom-label">
              If you don’t have a PayPal account to receive money, you can sign
              up{" "}
              <a
                href="https://www.paypal.com/in/webapps/mpp/account-selection"
                target="_blank"
              >
                <b>here</b>
              </a>
            </Label>
            <br />
            <Label className="mt-4 auth-label">Phone Number</Label>
            <Input
              required
              type="tel"
              className=" custom-input"
              value={phoneNumber}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="(xxx)-(xxx)-(xxxx)"
            />
            <br />
            <div className="d-flex justify-content-between align-items-end">
              <div>
                <Label className="mt-5 auth-label mb-0">Chat Rate</Label>
              </div>
              <div className="pointer">
                <i
                  className="fas fa-info-circle fa-lg"
                  onClick={() => setChatRateInfo(true)}
                ></i>
              </div>
            </div>

            <Input
              required
              placeholder="Your Chat Rate Per Minute"
              type="number"
              className=" custom-input mb-2"
              value={chatRate}
              onChange={(e) => setChatRate(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  return;
                }
                e.preventDefault();
              }}
              min="0"
            />
            <Label className="mt-5 auth-label">Sport(s)</Label>
            <Autocomplete
              {...defaultSportProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              onChange={(e, val) => setSport(val)}
              renderInput={(params) => (
                <TextField {...params} placeholder="Sport" variant="standard" />
              )}
            />
            <Label className="text-dark">
              If your sport not listed, email unkle5408@gmail.com
            </Label>
            <br />

            <Label className="mt-5 auth-label">
              Address Where School Located
            </Label>
            <br />
            <Label className="auth-label mt-3">State</Label>
            <Autocomplete
              {...defaultStateProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              value={state}
              onChange={(e, val) => {
                setState(val);
                setCollege("");
                setNewSchool("");
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="State" variant="standard" />
              )}
            />
            <br />
            <Label className="auth-label mt-3">
              {sportLevel == "College athlete" ? "City" : "County"}
            </Label>
            <Autocomplete
              {...defaultCollegeProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              disabled={!state}
              value={college}
              onChange={(e, val) => {
                setCollege(val);
                setNewSchool("");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    sportLevel == "College athlete" ? "City" : "County "
                  }
                  variant="standard"
                />
              )}
            />
            <br />
            <Label className="auth-label mt-3">School</Label>
            <Autocomplete
              {...defaultNewSchoolProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              value={newSchool}
              disabled={!state || !college}
              onChange={(e, val) => setNewSchool(val)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select your School from Dropdown menu"
                  variant="standard"
                />
              )}
            />
            <Label className="custom-label">
              (School name not listed on any NIL commercial objects. Used for
              compliance checking.)
            </Label>
            <br />
            <div
              className={`${sportLevel != "College athlete" && "d-none"}`}
            ></div>
            <div className={`${sportLevel == "College athlete" && "d-none"}`}>
              <Label className="text-dark auth-label">
                Select your County (HS athlete)
              </Label>
            </div>
            <div className="d-flex mt-4 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={nilPolicy}
                onChange={(e) => setNilPolicy(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                <p className="text-dark">
                  I understand and agree that I am responsible to check Name,
                  Image and Likeness (NIL) policy at my school. I will check to
                  see if I can use my school’s institutional marks/logos and/or
                  use institutional facilities at my school for my NIL activity.
                </p>
              </Label>
            </div>
            <div className="d-flex mt-4 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={typicalRestrictions}
                onChange={(e) => setTypicalRestrictions(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                <p className="text-dark">
                  I UNDERSTAND MANY SCHOOLS APPLY AS TYPICAL RESTRICTIONS that:
                  Use of any registered marks, logos, verbiage, or designs owned
                  and protected by the school is not permitted unless athlete
                  receives prior written permission.
                </p>
              </Label>
            </div>
            <div className="d-flex mt-4 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={stateLaw}
                onChange={(e) => setStateLaw(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                I understand and agree that I am also responsible to familiarize
                myself about NCAA rules for NIL(see attached).
                <b className="pointer text-primary" onClick={SummaryToggle}>
                  View
                </b>
              </Label>
            </div>
            <div className="d-flex mt-4 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={tac}
                onChange={(e) => setTac(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                Accept terms & conditions for use of FHP platform and websites .{" "}
                <Link
                  to={{
                    pathname: `/terms-and-conditions`,
                    search: "?" + `register`,
                  }}
                  target="_blank"
                >
                  <b>View</b>
                </Link>
              </Label>
            </div>
            <div className="d-flex mt-5 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={tol}
                onChange={(e) => setTol(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                I agree to terms of license for use of my amateur athlete name
                and photo.{" "}
                <b className="pointer text-primary" onClick={tolToggle}>
                  View
                </b>
              </Label>
            </div>
            <div className="d-flex mt-4 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={tax}
                onChange={(e) => setTax(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                I accept Tax responsibility.
                <b className="text-primary pointer" onClick={taxToggle}>
                  View
                </b>
              </Label>
            </div>
            <div className="d-flex mt-2 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                I agree to 4 year registration{" "}
                <b className="text-primary pointer" onClick={agreeToggle}>
                  View
                </b>
              </Label>
            </div>
            <div className="d-flex mt-2 ml-4">
              <Input required type="checkbox" className="custom-checkbox" />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                I agree to serve as a BRAND AMBASSADOR for the FANSHELPPLAYERS
                BRAND under NIL rules and guidance. I may receive payment for my
                Brand Ambassador services. I understand my services are as a
                self-employed provider responsible to handle my own taxes.{" "}
                <b className="text-primary pointer" onClick={agreeToggle}>
                  View
                </b>
              </Label>
            </div>
            <div className="ml-2 ml-md-5 ">
              <Label className="mt-4 auth-label">Registration Fee</Label>
              <br />
              <Label className="price-label">$2.00</Label>
              <br />
              <Label className="mt-2 auth-label">Pay Now Via Paypal</Label>
              <br />
              <div className="text-center">
                {checkOut ? (
                  <Paypal
                    setLoading={setLoading}
                    price={price}
                    getPaypalDetail={getPaypalDetail}
                  />
                ) : (
                  <Button
                    disabled={
                      !name ||
                      !firstLetter ||
                      !lastName ||
                      !email ||
                      !password ||
                      !paypal ||
                      !image ||
                      !phoneNumber ||
                      !sport ||
                      !state ||
                      !newSchool || //enter new school
                      !college ||
                      !tac ||
                      !gender ||
                      !tol ||
                      !tax ||
                      !chatRate ||
                      !stateLaw ||
                      !photoInstruction ||
                      !nilPolicy ||
                      !samePolicy ||
                      !agreement ||
                      !typicalRestrictions
                    }
                    className="mt-3 auth-button"
                    onClick={handelPayment}
                  >
                    Pay Registration Fee
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form>
        <div className="mt-3 mx-0 mx-md-5 text-center">
          <Label className="auth-label">Already have an account?</Label>{" "}
          <Link to="/auth/login">
            <Label
              className="text-primary auth-label"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <b>
                <u>Login</u>
              </b>
            </Label>
          </Link>
        </div>
        <Modal isOpen={chatRateInfo} toggle={chatRateInfoToggle}>
          <ModalBody>
            <Label className="custom-label ">
              <p className="text-dark">
                As Brand Ambassador, you can earn money by the minute when you
                chat with Fans who request you to chat with them. Before they
                agree, you need to set the rate they will pay. Don’t worry, you
                can change the rate later by visiting your profile page.Here,
                for now,you can click up arrow to $4.
              </p>
            </Label>
          </ModalBody>
        </Modal>
        <Modal isOpen={imgOpen}>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setImage(e.target.player_img.files[0]);
                imgToggle();
              }}
            >
              <Label className="custom-label ">
                <p className="text-dark">
                  Make sure the photo you upload shows your full face clearly,
                  so your fans can recognize you. Make sure the photo you upload
                  complies to your school’s policy for NIL activities of amateur
                  athletes.
                </p>
              </Label>
              <br />
              <Label className="auth-label mt-4">Upload Image</Label>
              <Input
                type="file"
                required
                name="player_img"
                accept="image/png, image/gif, image/jpeg"
              />
              <Label className="auth-label text-danger">Max Size 1MB</Label>
              <div className="text-right">
                <Button color="danger" onClick={imgToggle}>
                  {" "}
                  Close
                </Button>
                <Button color="primary" type="submit">
                  {" "}
                  Upload
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={noteToggle.imgNote}>
          <ModalBody>
            <strong>
              <u>Before posting your photo: </u>
            </strong>
            <Label className="custom-label text-dark">
              <p className="text-dark">
                {" "}
                Some schools do not allow you to wear your uniform during NIL
                activities or show school facilities in the photo. Find out your
                school's policy first, before posting your photo.
              </p>
            </Label>
            <div className="d-flex mt-2 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={photoInstruction}
                onChange={(e) => setPhotoInstruction(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                I've read the photo instructions.
              </Label>
            </div>
            <div className="text-right mt-2">
              <Button
                color="danger"
                className="mr-2"
                onClick={() => toggleNote("imgNote")}
              >
                {" "}
                Close
              </Button>
              <Button
                disabled={!photoInstruction}
                color="primary"
                onClick={() => {
                  toggleNote("imgNote");
                  imgToggle();
                }}
              >
                {" "}
                Continue
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={vidOpen}>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setVideo(e.target.player_video.files[0]);
                vidToggle();
              }}
            >
              <Label className="custom-label">
                <p className="text-dark">
                  {" "}
                  Make sure the video you upload shows your Full face clearly,
                  so your fans can recognize you. Make sure the video you upload
                  has your words spoken clearly and slowly. Make sure the video
                  complies to your school’s policy for NIL activities of amateur
                  athletes. During your video, please say:
                </p>
              </Label>
              <br />
              <Label className="auth-label">
                <i>
                  ‘Hi, my name is ________. I am here on FansHelpPlayers dot com
                  to offer you a license to use my name and photo in endorsing
                  your TEAM SPIRIT. You select how much you pay. You can display
                  my name and photo endorsement one week on your social media
                  for each dollar of total price you pay. Thanks for your
                  support.’
                </i>
              </Label>
              <Label className="auth-label mt-4">Upload Video</Label>
              <Input
                type="file"
                accept="video/mp4,video/x-m4v,video/*"
                required
                name="player_video"
              />
              <Label className="auth-label text-danger">Max 30 Seconds</Label>
              <div className="text-right">
                <Button color="danger" onClick={vidToggle}>
                  {" "}
                  Close
                </Button>
                <Button color="primary" type="submit">
                  {" "}
                  Upload
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={noteToggle.videoNote}>
          <ModalBody>
            <strong>
              <u>Before posting your video: </u>
            </strong>
            <Label className="custom-label text-dark ">
              Some schools do not allow you to say trademarked school verbiage
              during NIL activities, such as posting a video of you saying the
              school's name or team name. Find out your school's policy first,
              before posting your video.
            </Label>
            <div className="d-flex mt-2 ml-4">
              <Input
                required
                type="checkbox"
                className="custom-checkbox"
                checked={videoInstruction}
                onChange={(e) => setVideoInstruction(e.target.checked)}
              />
              <Label className="custom-checkbox-label text-dark mx-4 mt-1">
                I've read the video instructions.
              </Label>
            </div>
            <div className="text-right mt-2">
              <Button
                color="danger"
                className="mr-2"
                onClick={() => toggleNote("videoNote")}
              >
                {" "}
                Close
              </Button>
              <Button
                disabled={!videoInstruction}
                color="primary"
                onClick={() => {
                  toggleNote("videoNote");
                  vidToggle();
                }}
              >
                {" "}
                Continue
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={taxOpen}>
          <ModalBody>
            <Label className="custom-label text-danger">
              <b>Warning:</b>
            </Label>
            <Label className="custom-label">
              <p className="text-dark">
                I understand and agree that FansHelpPlayers.com is not
                responsible to provide any registered amateur athlete with
                assistance on tax preparation, tax payment or tax advice. I
                understand that money I receive from Fans via
                FansHelpPlayers.com is subject to the possibility of state
                and/or federal taxes. I understand and agree that I, and not
                FansHelpPlayers.com, am responsible to save money to cover the
                tax. I understand and agree that if and when required to account
                by the tax authority, I and not FansHelpPlayers.com, am
                responsible to make an accounting of monies I may have received
                via FansHelpPlayers.com.
              </p>
            </Label>
            <div className="text-right">
              <Button
                color="primary"
                onClick={() => {
                  setTax(true);
                  taxToggle();
                }}
              >
                {" "}
                Agree
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={summaryOpen} toggle={SummaryToggle} size="lg">
          <ModalBody>
            Vinson and Elkins attorneys Zach Terwilliger and Grant Newton wrote,
            in an online 2022 article* about the meaning of the recent NCAA
            guidance on NIL that:
            <h3 className="m-0">
              <u>
                <strong>
                  “NIL agreements must be based on a case-by-case analysis of
                  the value a student-athlete brings…”
                </strong>
              </u>
            </h3>
            Accordingly, FansHelpPlayers, LLC compensates student athlete Brand
            Ambassadors in relation to the case-by-case analysis of the value
            each individual Brand Ambassador brings to FHP (see Brand Ambassador
            contract).
            <br />
            For example:
            <ol type="a">
              <li>
                {" "}
                At FHP, student athlete Brand Ambassador can earn a share of
                monies they help raise in sales on FHP platform of said student
                athlete’s NIL-licensed goods, and{" "}
              </li>
              <li>
                At FHP, student athlete Brand Ambassador can earn a share of the
                monies they help raise in sales via FHP platform of per-minute
                paid chat.{" "}
              </li>
            </ol>
            *https://www.velaw.com/insights/nobody-did-anything-about-it-or-did-they-ncaa-releases-new-nil-guidelines-targeting-university-affiliated-nil-collectives/
          </ModalBody>
        </Modal>
        <Modal isOpen={agrOpen}>
          <ModalBody>
            <p className="custom-checkbox-label text-dark">
              I understand and agree that my registration shall be for a term up
              to a maximum of 4 years. I understand and agree that site
              administration can restrict or cancel my registration at any time
              without notice to me. I understand and agree that site
              administration can act at its sole discretion regarding
              restricting and/or canceling my registration. I understand and
              agree that no refund is available to me if my registration is
              restricted or canceled.
            </p>
            <div className="text-right">
              <Button
                color="primary"
                onClick={() => {
                  setAgreement(true);
                  agreeToggle();
                }}
              >
                Agree
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={tolOpen} toggle={tolToggle} size="lg">
          <div className="d-flex justify-content-between align-items-center p-3 pointer">
            <div>License Agreement</div>
          </div>
          <ModalBody>
            <Label className="custom-label">
              <strong className="text-dark">
                B0TH FAN BUYER AND ATHLETE SELLER AGREE TO TERMS OF USE BELOW:
              </strong>{" "}
              <br />
              <br />
              <b className="text-dark">1. FAN SEARCH FOR PLAYER:</b>{" "}
              <p className="text-dark">
                After entering site, Fan may visit Search Page and search for at
                least one Amateur Athlete from whom Fan might then decide to
                purchase a license to use said Athlete’s Name and photo. Then
                Fan selects a license price.{" "}
              </p>{" "}
              <b className="text-dark">2. PRICE OF LICENSE:</b>{" "}
              <p className="text-dark">
                Fan Buyer is free to choose price for license from range of $4
                to $1000.{" "}
              </p>{" "}
              <b className="text-dark">3. GRANT OF LICENSE:</b>{" "}
              <p className="text-dark">
                Upon payment by Fan buyer to Athlete seller of Fan-selected
                price, buyer is granted use-of-name license by athlete-seller
                per terms herein disclosed. Fan-buyer thus will be enabled to
                download a badge of endorsement upon which is listed: Name of
                Fan Buyer as endorsed in Team Spirit by Athlete selected by Fan,
                plus name and photo of endorsing Athlete, date of issuance of
                badge and price for badge which Fan chose to pay.{" "}
              </p>{" "}
              <b className="text-dark">4. USE OF BADGE:</b>
              <p className="text-dark">
                Fan Buyer is authorized to display badge on Fan Buyer’s social
                media pages during time when license is current. .{" "}
              </p>{" "}
              <b className="text-dark">5. EXPIRATION OF LICENSE:</b>{" "}
              <p className="text-dark">
                The license will expire after the number of weeks equal to the
                number of dollars paid for badge. Example: A badge for which Fan
                Buyer chose to pay $4 expires after four weeks.
              </p>{" "}
              <b className="text-dark">6. RULES OF AMATEUR ATHLETICS:</b>{" "}
              <p className="text-dark">
                Athlete seller is solely responsible to verify before he/she
                undertakes this license sale, that this license sale and
                associated financial transaction qualifies under applicable
                rules as allowing said athlete to maintain his/her amateur
                status.
              </p>
            </Label>
            <div className="text-right">
              <Button
                color="primary"
                onClick={() => {
                  setTol(true);
                  tolToggle();
                }}
              >
                Agree
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={tolOpenInfo} toggle={tolInfoToggle} size="lg">
          <ModalBody>
            <Label className="custom-label">
              <b className="text-dark" style={{ textDecoration: "underline" }}>
                Note:{" "}
              </b>
              Users of FHP should familiarize themselves with the contents of
              this video: ____________________ . Please share this link with all
              fans of school sports and all student athletes.
            </Label>
          </ModalBody>
        </Modal>
        <Modal isOpen={ambassadorAgreement} toggle={ambassdorToggle} size="lg">
          <ModalBody>
            <div className="text-dark AggrementOuter">
              <h2 className="text-center text-dark">
                <u>BRAND AMBASSADOR AGREEMENT</u>
              </h2>

              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "center",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <p className="text-dark text-justify m-0">
                This Brand Ambassador Agreement (“
                <b>Agreement</b>”) is made and entered as of _______________ (“
                <b>Effective Date</b>”), by and between FansHelpPlayers, LLC (“
                <b>FHP</b>”) and _____________________ (“<b>Athlete</b>”), each
                being referred to as individually as a “<b>Party</b>, and
                collectively as the “<b>Parties</b>” throughout this Agreement.
              </p>
              <p className="text-dark text-justify m-0">
                <span>&nbsp;</span>
              </p>
              <p
                className="text-dark text-justify m-0"
                style={{
                  textIndent: "36pt",
                }}
              >
                <b>WHEREAS</b>, FHP operates an online platform (the “
                <b>Platform</b>”) that allows athletes to sell athlete-licensed
                Non-Fungible (NFTs), including, but not limited to, electronic
                FHP “team spirit” badges (referred to herein as “
                <b>NFT Badges</b>
                ”) to fans and arranges online chats between athletes and fans;
              </p>
              <p className="text-dark text-justify m-0">
                <span>&nbsp;</span>
              </p>
              <p
                className="text-dark text-justify m-0"
                style={{
                  textIndent: "36pt",
                }}
              >
                <b>WHEREAS</b>, FHP wishes to engage Athlete for the purpose of
                Athlete promoting the Platform, including, but not limited to,
                serving as a brand ambassador for the Platform;
              </p>
              <p className="text-dark text-justify m-0">
                <span>&nbsp;</span>
              </p>
              <p
                className="text-dark text-justify m-0"
                style={{
                  textIndent: "36pt",
                }}
              >
                <b>WHEREAS</b>, this Agreement sets forth certain terms and
                conditions pursuant to which Athlete may register a profile on
                the Platform (“<b>Profile</b>”) in order to engage in and/or
                provide the License and Services (as each are defined herein)
                for the Platform; and
              </p>
              <p className="text-dark text-justify m-0">
                <span>&nbsp;</span>
              </p>
              <p
                className="text-dark text-justify m-0"
                style={{
                  textIndent: "36pt",
                }}
              >
                <b>WHEREAS</b>, this Agreement further sets forth certain terms
                and conditions pursuant to which FHP and Athlete will
                collaborate for the purpose of FHP developing and/or designing
                NFTs, including, but not limited to, NFT Badges, utilizing
                Athlete’s NIL Rights (as later defined), to be sold to
                third-party purchasers via the Platform in accordance with the
                terms set forth in this Agreement.
              </p>
              <p className="text-dark text-justify m-0">
                <span>&nbsp;</span>
              </p>
              <p
                className="text-dark text-justify m-0"
                style={{
                  textIndent: "36pt",
                }}
              >
                <strong>NOW, THEREFORE</strong>, in consideration of the mutual
                promises and conditions contained in this Agreement, and for
                other good and valuable consideration, the receipt of which are
                hereby acknowledged, the Parties agree as follows:
              </p>
              <p className="text-dark text-justify m-0">
                <span>&nbsp;</span>
              </p>
              <h2 className="text-center text-dark">
                <u>TERMS AND CONDITIONS</u>
              </h2>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "center",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol style={{ margin: "0pt", paddingLeft: "0pt" }} type={1}>
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <p className="text-dark">
                    <strong>
                      <u>Term.</u>
                    </strong>{" "}
                    The term of this Agreement shall commence on the Effective
                    Date and shall remain in full force and effect until the
                    earlier of the following: (i) four (4) years following the
                    Effective Date, or (ii) the date Athlete is no longer
                    considered an intercollegiate athlete and/or permanently
                    elects to no longer participate in athletic competition at
                    Athlete’s school (the <b>“Term”</b>). For the purpose of
                    this Agreement,<b>“school”</b> shall mean Athlete’s high
                    school/college/university and/or any other venue of amateur
                    athletic competition pursuant to which Athlete is
                    participant as an amateur athlete.
                  </p>
                </li>
              </ol>
              <ol
                start={2}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <p className="text-dark">
                    <strong>
                      <u>Termination.</u>
                    </strong>{" "}
                    Either Party may elect to terminate this Agreement
                    immediately upon written notice to the other Party as
                    follows:
                  </p>
                </li>
              </ol>
              <ol style={{ margin: "0pt", paddingLeft: "0pt" }} type="a">
                <li
                  style={{
                    marginLeft: "67.33pt",
                    textAlign: "justify",
                    paddingLeft: "4.67pt",
                  }}
                >
                  <p className="text-dark">
                    <strong> Material Breach: </strong> A Party materially
                    breaches any representation, warranty provision, duty,
                    obligation, or covenant in this Agreement or refuses to
                    fulfill any material obligation under this Agreement and
                    such Party fails to cure such breach within thirty (30) days
                    of receiving notice of such breach. Additionally, FHP may
                    terminate this Agreement, effective immediately upon written
                    notice to Athlete and without penalty or further obligation,
                    for any of the following:
                  </p>
                </li>
              </ol>
              <ol
                start={2}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type="a"
              >
                <li
                  style={{
                    marginLeft: "68pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <p className="text-dark">
                    <strong> TOS Violation:</strong> FHP may terminate this
                    Agreement in the event Athlete violates any provision
                    contained within the Platform’s Terms and Conditions.
                  </p>
                </li>
              </ol>
              <ol
                start={3}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type="a"
              >
                <li
                  style={{
                    marginLeft: "67.33pt",
                    textAlign: "justify",
                    paddingLeft: "4.67pt",
                  }}
                >
                  <p className="text-dark">
                    <strong>High School/NCAA Rules or Laws Violation:</strong>{" "}
                    FHP may terminate this Agreement in the event that: (i) FHP,
                    in its sole and absolute discretion, determines or becomes
                    aware that (a) the existence of this Agreement, entering
                    into this Agreement, and/or performance of this Agreement in
                    any way violates, contradicts or is otherwise affected by
                    high school district rules and regulations, NCAA rules
                    and/or other applicable university policy or rules governing
                    use of Athlete’s NIL Rights (collectively, “
                    <b>NIL Policy</b>”), and/or applicable laws (whether
                    federal, state, or otherwise) (the “<b>Laws</b>
                    ”), and/or (b) any requirements, limitations or provisions
                    contained in any NIL Policy and/or Laws, or the actual or
                    potential enforcement thereof, renders performance of this
                    Agreement impossible or impracticable and/or presents a
                    legal or reputational risk to FHP. In the event this
                    Agreement is terminated as a result of any violation (or
                    threatened violation) of NIL Policy and/or Laws, Athlete
                    shall return all Compensation paid by FHP under this
                    Agreement.
                  </p>
                </li>
              </ol>
              <p
                className="text-dark"
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  textAlign: "justify",
                }}
              >
                Upon the expiration or termination of this Agreement, all rights
                granted hereunder shall automatically terminate; provided,
                following the expiration or termination of this Agreement in
                accordance with Section 2(a) or Section 2(b), FHP shall have the
                continued right, in perpetuity, to sell NFTs, including, but not
                limited to, NFT Badges, bearing Athlete’s NIL Rights in
                accordance with the terms set forth in this Agreement.
              </p>
              <ol
                start={3}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <p className="text-dark">
                    <strong>
                      <u>License; Exclusivity.</u>
                    </strong>
                  </p>
                </li>
              </ol>
              <ol style={{ margin: "0pt", paddingLeft: "0pt" }} type="a">
                <li
                  style={{
                    marginLeft: "67.33pt",
                    textAlign: "justify",
                    paddingLeft: "4.67pt",
                  }}
                >
                  <p className="text-dark">
                    During the Term, Athlete grants FHP the non-exclusive,
                    worldwide, royalty-free (except as otherwise set forth
                    herein), sublicensable right and license to use Athlete’s
                    name, image, likeness, biographical details, logos, videos,
                    and all other indicia of identity specified and/or
                    associated with Athlete (“
                    <b>Athlete’s NIL Rights</b>”), solely in connection with:
                    (i) promoting FHP and/or the Platform, and (ii) in
                    furtherance of minting, distributing, marketing,
                    advertising, and selling NFTs on the Platform (the “
                    <b>License</b>”). Athlete agrees that FHP will have the
                    right to grant sublicenses and take further acts with
                    respect to the License consistent with the enjoyment of its
                    grant of the License herein. Except as may arise from a
                    breach of this Agreement, Athlete hereby irrevocably waives
                    and agrees not to assert any claims based on moral rights or
                    any other theory based on FHP’s exercise of the License. All
                    materials submitted by Athlete bearing Athlete’s NIL Rights
                    (“
                    <b>Athlete Materials</b>”) shall be deemed approved for use
                    in accordance with the terms set forth in this Agreement
                  </p>
                </li>
              </ol>
              <ol
                start={2}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type="a"
              >
                <li
                  style={{
                    marginLeft: "67.33pt",
                    textAlign: "justify",
                    paddingLeft: "4.67pt",
                  }}
                >
                  <p className="text-dark">
                    Notwithstanding, Athlete reserves all rights in and to
                    Athlete’s NIL Rights to the extent not granted herein.
                  </p>
                </li>
              </ol>
              <ol
                start={4}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <p>
                    <strong>
                      <u>Services.</u>
                    </strong>{" "}
                    During the Term, Athlete agrees to provide the services set
                    forth in{" "}
                    <b>
                      <u>Schedule A</u>
                    </b>
                    , attached hereto.
                  </p>
                </li>
              </ol>
              <ol
                start={5}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <p className="text-dark">
                    <strong>
                      <u>Compensation.</u>
                    </strong>{" "}
                    In exchange for the License and Athlete’s performance of
                    Services under this Agreement, FHP agrees to compensate
                    Athlete in accordance with the terms set forth in{" "}
                    <b>
                      <u>Schedule B</u>
                    </b>
                    , attached hereto (“
                    <b>Compensation</b>”).
                  </p>
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                &nbsp;
              </p>
              <ol
                start={6}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <strong>
                    <u> Athlete Profile Requirements.</u>
                  </strong>{" "}
                  In order to provide the Services, Athlete must create a
                  Profile on the Platform. By creating a Profile on the
                  Platform, Athlete agrees to provide true, accurate, current,
                  and complete information, and comply with the Terms of Use
                  provided via the Platform. Athlete agrees not to create a
                  Profile using a false identity or providing false information
                  or if Athlete has previously been removed or banned from the
                  Platform. Athlete is responsible for maintaining the
                  confidentiality of Athlete’s Profile information, including
                  Athlete’s username and password. Athlete is responsible for
                  all activities that occur on or in connection with Athlete’s
                  Profile. Athlete agrees to immediately notify FHP of any
                  unauthorized access or use of Athlete’s Profile. Athlete
                  acknowledges and agrees that FHP is not responsible or liable
                  for any damages, losses, costs, expenses, or liabilities
                  related to any unauthorized access to or use of Athlete’s
                  Profile.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={7}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <strong>
                    <u>Profile Verification.</u>
                  </strong>{" "}
                  FHP reserves the right to verify Athlete’s Profile information
                  (including, but not limited to, contacting Athlete and/or
                  Athlete’s school) in order to ensure Athlete’s eligibility to
                  participate on the Platform. In the event FHP determines that
                  a Profile is not eligible for participation on the Platform,
                  FHP reserves the right to immediately remove the Profile
                  without prior warning or written notice.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={8}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <strong>
                    <u>Disclosure.</u>
                  </strong>{" "}
                  Athlete understands that it is Athlete’s sole responsibility
                  to notify and/or report this Agreement (including, but not
                  limited to, deal terms and compensation) as needed to
                  Athlete’s school, conference, and/or any other governing
                  entity responsible for determining eligibility. FHP
                  acknowledges and agrees that this Agreement is subject to the
                  approval of Athlete’s university (or other academic
                  institution) as is, or may be, required by applicable state
                  law. Accordingly, Athlete acknowledges and agrees that this
                  Agreement will be disclosed to Athlete’s university prior to
                  the execution hereof.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                &nbsp;
              </p>
              <ol
                start={9}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <strong>
                    <u>Minting NFT Badges and/or Other NFTS.</u>
                  </strong>{" "}
                  By completing registration and creating a Profile on the
                  Platform, Athlete agrees and acknowledges each of the
                  following:
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol style={{ margin: "0pt", paddingLeft: "0pt" }} type="a">
                <li
                  style={{
                    marginLeft: "67.33pt",
                    textAlign: "justify",
                    paddingLeft: "4.67pt",
                  }}
                >
                  Athlete authorizes and grants FHP an irrevocable license to
                  use Athlete’s NIL Rights to mint one or more NFT Badges and/or
                  other NFTs bearing Athlete’s name, image, and/or likeness, the
                  amount thereof to be determined in FHP’s sole discretion; and
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "72pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={2}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type="a"
              >
                <li
                  style={{
                    marginLeft: "68pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  Athlete and FHP shall mutually determine the purchase price
                  and currency for first sale of NFT Badges and/or other NFTs
                  created utilizing Athlete’s NIL Rights.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={10}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>FTC Guidelines.</u>
                  </strong>{" "}
                  Athlete shall comply with all applicable laws, rules and
                  regulations, including the Federal Trade Commission’s “Guides
                  Concerning the Use of Endorsements and Testimonials in
                  Advertising”, as amended, with regard to Athlete’s promotion
                  and/or endorsement of FHP and/or the Platform.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={11}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Platform Ownership.</u>
                  </strong>{" "}
                  Except as it relates to Athlete Materials and/or other content
                  provided by Athlete in accordance with Athlete’s participation
                  on the Platform, FHP shall own all right, title, and interest
                  in and to: (i) the Platform, including all software, ideas,
                  processes, data, text, media, and other content available on
                  the Platform (individually, and collectively, “
                  <b>Platform Content</b>”); and (ii) FHP’s trademarks, logos,
                  and brand (“<b>Marks</b>
                  ”). Athlete shall not duplicate, copy, or reuse any portion of
                  Platform Content or use the Marks without FHP’s prior express
                  written consent.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={12}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Work for Hire.</u>
                  </strong>{" "}
                  Athlete agrees and acknowledges that all NFTs shall be created
                  as original files owned by FHP, and Athlete acknowledges that
                  all Services and/or materials (including, but not limited to,
                  Athlete Materials) provided by Athlete for and on behalf of
                  FHP under this Agreement shall constitute “works made for
                  hire” as defined by United States Copyright Law (17 U.S.C. §
                  101, et seq.) and that all rights, title, and interest in and
                  to all materials, ideas, feedback, suggestions, improvements,
                  themes, creations, documents, designs, concepts, deliverables,
                  and/or copyrights (but expressly excluding Athlete’s NIL
                  Rights) (collectively, the “<b>Works</b>”) shall solely and
                  exclusively be owned by FHP in perpetuity and throughout the
                  world. In furtherance thereof Athlete shall not have, nor lay
                  claim to any rights, title, or interest in and to any Works
                  provided hereunder. All ownership rights, title and interest
                  in and to the Works (including, but not limited to, NFTs), and
                  any and all derivative works made therefrom, will be, become,
                  and remain the sole property of FHP during and after the Term.
                  If, for any reason, the Works are determined not to be "works
                  made for hire" or such doctrine is not effective, then Athlete
                  hereby irrevocably assigns, conveys, and otherwise transfers
                  to FHP, and its respective successors, licensees, and assigns,
                  in perpetuity, all right, title and interest worldwide in and
                  to the Works, and all proprietary rights therein, in any and
                  all media now known or hereafter developed, including all
                  copyrights, trademarks, design patents, trade secret rights,
                  moral rights, and all contract and licensing rights, and all
                  ancillary, subsidiary and derivative rights contained therein
                  and all elements thereof, and the exclusive right to
                  advertise, publicize, market, distribute and/ or sell product
                  developed in connection with the Works and anything contained
                  therein, on the Platform and/or any other medium.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={13}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Platform Feedback.</u>
                  </strong>{" "}
                  To the extent Athlete submits any ideas, suggestions,
                  proposals, plans, or other materials related to the Platform
                  (individually, and collectively, “<b>Feedback</b>”), Athlete
                  acknowledges and agrees that Athlete is submitting Feedback at
                  Athlete’s own risk and that FHP has no obligation (including
                  of confidentiality or privacy) with respect to Athlete’s
                  Feedback. Athlete grants FHP a non-exclusive, royalty-free,
                  fully paid, unlimited, universal, sublicensable (through
                  multiple tiers of sublicenses), perpetual, and irrevocable
                  license, in any and all manner and media, whether now known or
                  hereinafter invented or devised, to reproduce, license,
                  distribute, modify, adapt, publicly perform, publicly display,
                  create derivative works of (for example, translations,
                  adaptations, or other changes), and otherwise use and exploit
                  in any manner (including commercially), any and all Feedback.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={14}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Non-Disparagement.</u>
                  </strong>{" "}
                  Athlete agrees that at no time during and after the Term will
                  Athlete disparage FHP or the Platform.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={15}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Confidentiality.</u>
                  </strong>{" "}
                  The Parties acknowledge and agree that the terms of this
                  Agreement, and any and all confidential information regarding
                  a Party or its operations that is disclosed by a Party to the
                  other in furtherance of this Agreement, including, without
                  limitation, information concerning the Parties’ operating and
                  marketing methods, pricing practices, sales figures, and/or
                  any other information deemed proprietary by the disclosing
                  Party (“
                  <b>Confidential Information</b>”) will be treated as
                  confidential and will not be disclosed to any third party
                  (except as set forth herein) at any time during the Term of
                  this Agreement and thereafter or used for any purposes other
                  than for purposes contemplated by this Agreement.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>
                  Each Party agrees to: (i) protect the other Party’s
                  Confidential Information using the same standard of care it
                  uses to protect its own Confidential Information, provided
                  that in no event will a Party use less than a reasonable
                  standard of care; and (ii) not disclose the other Party’s
                  Confidential Information, except to its affiliates,
                  contractors, employees, independent contractors, and agents
                  who express a “need to know” and have agreed in writing or are
                  otherwise under a legal duty to keep such information
                  confidential at a level no less protective than required
                  herein. Each Party (and any affiliates, contractors, employees
                  and agents to whom it has disclosed Confidential Information)
                  may use the other Party’s Confidential Information only to the
                  extent necessary to exercise the rights granted and fulfill
                  its duties and obligations contained within this Agreement,
                  and each Party acknowledges that it shall be responsible for
                  the actions of any of its affiliates, partners, contractors,
                  employees, and agents that are in violation hereof. All
                  Confidential Information shall be the exclusive property of
                  the disclosing Party and shall be returned to the disclosing
                  Party, or destroyed, immediately upon the termination or
                  expiration of this Agreement, or at any other time at the
                  disclosing Party’s request.
                </span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>
                  Each Party may disclose the other Party’s Confidential
                  Information when required by law but only to the extent
                  necessary to comply with such law and only after such Party,
                  if legally permissible: (i) uses commercially reasonable
                  efforts to notify the other Party; and (ii) gives the other
                  Party the chance to challenge or limit the disclosure.
                </span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={16}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Representations and Warranties.</u>
                  </strong>{" "}
                  Each Party represents, warrants, and covenants to the other
                  Party that it has the full right and power to (i) enter into
                  this Agreement, (ii) perform all obligations to be performed
                  by it hereunder, and (iii) grant all rights hereunder granted,
                  in each case without violating the legal or equitable rights
                  of any other person or entity. Athlete further represents and
                  warrants that, as of the Effective Date and continuing
                  throughout the Term of this Agreement, the Athlete Materials,
                  and FHP’s and/or its affiliates' exercise of any License
                  granted under this Agreement, does not and will not: (i)
                  infringe the rights of any third party; (ii) require the
                  payment by FHP of any royalties, remuneration, residuals or
                  any other fees (except as otherwise set forth herein); or
                  (iii) result in any tort, injury, damage or harm to any third
                  party.
                </li>
              </ol>

              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                <strong>&nbsp;</strong>
              </p>
              <ol
                start={17}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Indemnification.</u>
                  </strong>{" "}
                  Athlete shall defend, indemnify and hold harmless FHP, and
                  FHP’s officers, directors, employees, representatives, and
                  members, (collectively, “<b>FHP Indemnitees</b>”), from and
                  against any and all claims, suits, losses, damages and
                  expenses (including reasonable attorney’s fees and expenses),
                  resulting from third party claims made or suits brought
                  against any FHP Indemnitee to the extent based on any action
                  or omissions by or on behalf of Athlete, including, without
                  limitation, those based upon: (i) Athlete’s grant of the
                  License; (ii) FHP’s use of the Athlete Materials and/or
                  Athlete’s NIL Rights in accordance with the terms set forth in
                  this Agreement; (iii) any negligent act, error or omission, or
                  willful misconduct of Athlete, or any third party acting for
                  or on behalf of Athlete; and/or (iv) Athlete’s breach of any
                  term, condition, representation, or warranty contained in this
                  Agreement (each a “<b>Claim</b>”). If any Claim is brought
                  against an FHP Indemnitee, Athlete will defend such Claim at
                  Athlete’s sole expense using counsel selected by the FHP
                  Indemnitee. If Athlete fails to take timely action to defend
                  such Claim, the FHP Indemnitee may defend such Claim at
                  Athlete’s expense, including, without limitation, deduction of
                  any Compensation payable under this Agreement. Athlete shall
                  cooperate in all reasonable respects with the investigation,
                  disclosure and defense of any Claim. Athlete will not settle,
                  compromise or otherwise enter into any agreement regarding the
                  disposition of any Claim against an FHP Indemnitee without the
                  prior written consent and approval of the FHP Indemnitee.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={18}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Limitation of Liability.</u>
                  </strong>{" "}
                  Notwithstanding Athlete’s duty to indemnify FHP in accordance
                  with Section 17 of this Agreement, in no event shall either
                  Party be liable to the other Party for any special, exemplary,
                  indirect, incidental, consequential, or punitive damages of
                  any kind or nature whatsoever (including, without limitation,
                  lost revenue, profits, savings, or business), whether in an
                  action based on contract, warranty, strict liability, tort
                  (including, without limitation, negligence) or otherwise, even
                  if such Party has been informed in advance of the possibility
                  of such damages, or if such damages could have reasonably been
                  foreseen by such Party. In no event will FHP’s liability under
                  this Agreement exceed the total amount of Compensation paid by
                  FHP to Athlete in the six (6) months preceding the act that
                  gave rise to liability.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <ol
                start={19}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Waiver.</u>
                  </strong>{" "}
                  The failure of either Party to exercise the rights granted to
                  such Party under this Agreement upon the occurrence of any of
                  the contingencies set forth in this Agreement shall not in any
                  event constitute a waiver of any such rights upon the
                  occurrence of any additional such contingencies.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={20}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Notices.</u>
                  </strong>{" "}
                  Any notice required to be given hereunder shall be given by
                  sending the same by email, overnight express mail or
                  registered or certified mail, postage prepaid, return receipt
                  requested to the address stated herein, or to any subsequent
                  address designated by either Party for the purpose of
                  receiving notices pursuant to this Agreement. All notices
                  shall be deemed validly given: (i) after one (1) business day
                  if sent via email or overnight express mail, or (ii) after
                  five (5) business days if sent via registered or certified
                  mail. Notices shall be sent to the following:
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span> to FHP:</span>
                <span
                  style={{
                    width: "5.33pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>128 DORCHESTER F</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span
                  style={{
                    width: "18pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>WEST PALM BEACH, FL 33417</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span>Email: unkle5408@gmail.com</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "126pt",
                  marginBottom: "0pt",
                  textIndent: "18pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span> to Athlete:&nbsp;</span>
                <span
                  style={{
                    width: "25.02pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>______________________</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span
                  style={{
                    width: "18pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>______________________</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span
                  style={{
                    width: "18pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>Email: ________________</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={21}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Press Release; Promotion.</u>
                  </strong>{" "}
                  The Parties may, upon mutual agreement, issue a press release
                  upon execution of this Agreement or issue other public
                  marketing and communications materials during the Term
                  detailing and/or promoting the Platform, and/or NFTs bearing
                  Athlete’s NIL Rights. FHP and Athlete agree to work together
                  in good faith to undertake mutually agreed upon advertising
                  and promotional activities for the promotion of the Platform,
                  including, but not limited to, Athlete promoting the Platform,
                  FHP, FHP’s release of NFTs, and the relationship provided for
                  herein on Athlete’s official social media and/or streaming
                  platforms (including, but not limited to, Twitter, Instagram,
                  Twitch, YouTube, and/or Facebook).
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={22}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Severability.</u>
                  </strong>{" "}
                  In the event any provision of this Agreement is determined to
                  be invalid by a court of competent jurisdiction, such
                  determination shall in no way affect the validity or
                  enforceability of any other provision contained herein.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                &nbsp;
              </p>
              <ol
                start={23}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Equitable Relief.</u>
                  </strong>{" "}
                  Athlete acknowledges that the License and Athlete’s
                  performance of Services provided pursuant to this Agreement
                  are personal and unique, and a breach of this Agreement would
                  cause FHP irreparable injury for which there is no adequate
                  remedy at law. In the event of Athlete’s breach (or threatened
                  breach) of any terms, representations, or warranties contained
                  within this Agreement, FHP will have the right to enforce this
                  Agreement and any of its provisions by injunction, specific
                  performance, or other equitable relief without prejudice to
                  any other legal or equitable relief to which it may have for
                  Athlete’s breach (or threatened breach) of this Agreement, and
                  without any obligation to post a bond or other security or to
                  prove damages.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={24}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Governing Law; Dispute Resolution.</u>
                  </strong>{" "}
                  This Agreement shall be governed by and construed in
                  accordance with the laws of the State of Florida, without
                  regard to conflict of law principles thereof. Each Party
                  agrees that binding arbitration under the Commercial Rules of
                  Arbitration of the American Arbitration Association before a
                  single arbitrator shall resolve any dispute or controversy
                  arising in connection with this Agreement. Judgment upon any
                  award may be entered in any court of competent jurisdiction.
                  The decision of the arbitrator shall be binding and conclusive
                  upon the Parties. In the event of any legal action or
                  arbitration proceeding brought for the enforcement of this
                  Agreement, the prevailing party shall be entitled to recover
                  reasonably incurred attorney’s fees and costs.
                  Notwithstanding, this agreement to binding arbitration shall
                  not prevent either Party from seeking injunctive and/or other
                  equitable relief from a court of competent jurisdiction.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={25}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Relationship of the Parties.</u>
                  </strong>{" "}
                  The Parties agree that nothing herein shall be deemed to
                  constitute either Party as a partner, employee, joint venture,
                  or agent of the other Party. Neither Party shall have the
                  power or authority to bind the other with respect to third
                  parties or to represent to third parties that they have such
                  authority. Athlete expressly acknowledges and agrees that FHP
                  will not withhold any federal, state or local income or
                  unemployment insurance or social security taxes from any
                  payments made under this Agreement (except where tax
                  withholding is otherwise required by law), and that it is the
                  responsibility of Athlete to report and pay all income,
                  unemployment insurance, social security and other taxes on
                  Athlete’s own behalf.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={26}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u> No Third-Party Beneficiaries. </u>
                  </strong>{" "}
                  Nothing contained herein, expressed or implied, is intended or
                  shall be construed to confer upon or give to any person or
                  entity, other than the Parties to this Agreement and their
                  respective successors and permitted assigns, any rights or
                  remedies under or by reason of this Agreement. This Agreement,
                  and all provisions and conditions hereof, are intended to be,
                  and shall be, for the sole and exclusive benefit of the
                  Parties and their respective successors and permitted assigns,
                  and not for the benefit of any other person or entity.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                &nbsp;
              </p>
              <ol
                start={27}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Force Majeure.</u>
                  </strong>{" "}
                  In the event that either Party’s performance of any of its
                  respective duties and obligations under this Agreement is
                  prevented or hindered due to any act of God, fires, strikes,
                  labor disputes, accidents, embargoes, riots, floods,
                  earthquakes, wars, pandemic, epidemic, governmental actions,
                  or other circumstances beyond the control of such Party (each,
                  a “<b>Force Majeure Event</b>”), then such performance shall
                  wholly or partially be suspended during the period in which
                  the Force Majeure Event is in existence, and no Party shall be
                  liable to the other Party during such period owing to such
                  circumstances.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={28}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Assignment.</u>
                  </strong>{" "}
                  This Agreement and any rights or obligations of Athlete
                  hereunder shall not be assigned or delegated, whether by
                  transfer, merger, operation of law or otherwise, without FHP’s
                  prior written consent. FHP may assign and/or sublicense its
                  rights hereunder to any affiliate or successor entity in the
                  event of a merger, reorganization or sale of FHP, or
                  substantially all of its assets. All provisions of this
                  Agreement are binding upon, shall inure to the benefit of, and
                  are enforceable by or against the Parties and their respective
                  heirs, executors, administrators or other legal
                  representatives and permitted successors and assigns.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={29}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Entire Agreement.</u>
                  </strong>{" "}
                  This Agreement and schedules attached hereto constitute the
                  entire understanding between the Parties with respect to the
                  subject matter of this Agreement and supersedes all prior
                  agreements whether written or oral. No waiver, modification or
                  addition to this Agreement shall be valid unless made in
                  writing and signed by the Parties hereto. This Agreement may
                  be executed concurrently in one or more counterparts, each of
                  which shall be an original, but all of which together shall
                  constitute one and the same instrument. This Agreement shall
                  not be binding upon either Party until executed by an
                  authorized officer thereof.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol
                start={30}
                style={{ margin: "0pt", paddingLeft: "0pt" }}
                type={1}
              >
                <li
                  style={{
                    marginLeft: "18pt",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    <u>Platform Terms and Conditions</u>
                  </strong>{" "}
                  Athlete agrees that Athlete’s participation on the Platform
                  shall remain subject to the provisions set forth in Platform’s
                  Terms and Conditions; provided, in the event of any conflict
                  between this Agreement and the Platform’s Terms and
                  Conditions, the terms set forth in this Agreement shall
                  prevail.
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textIndent: "18pt",
                  textAlign: "justify",
                }}
              >
                <strong>
                  <span>IN WITNESS WHEREOF</span>
                </strong>
                <span>
                  , the Parties have duly executed this Agreement as of the
                  Effective Date written above, wherein execution for Athlete is
                  made effective through Athlete’s registration of Athlete’s
                  Profile on the FHP website via Athlete’s “Click to Accept” of
                  these terms.
                </span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textIndent: "18pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textIndent: "18pt",
                  textAlign: "justify",
                }}
              >
                <strong>
                  <span>ATHLETE</span>
                </strong>
                <span
                  style={{
                    width: "13.98pt",
                    textIndent: "0pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <input
                  required
                  type="checkbox"
                  checked={agreementBox}
                  onChange={(e) => setAgreementBox(e.target.checked)}
                />
                <strong>
                  <span> I ACCEPT</span>
                </strong>
                <span
                  style={{
                    width: "2.33pt",
                    textIndent: "0pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    textIndent: "0pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    textIndent: "0pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    textIndent: "0pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <strong>
                  <span>FANSHELPPLAYERS, LLC</span>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>By: ______________________________</span>
                <span
                  style={{
                    width: "15.66pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span
                  style={{
                    width: "21pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>By: ________________________________</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>Name: ________________________</span>
                <span
                  style={{
                    width: "1.01pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>___</span>
                <span
                  style={{
                    width: "18pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>Name: ________________________</span>
                <span
                  style={{
                    width: "1.01pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span>______</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "180pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <span
                  style={{
                    width: "36pt",
                    display: "inline-block",
                  }}
                >
                  &nbsp;
                </span>
                <em>
                  <span>I have authority to bind FHP</span>
                </em>
              </p>

              <a
                target="_blank"
                download="aggrement File"
                href="https://firebasestorage.googleapis.com/v0/b/fans-help-players.appspot.com/o/NEW_BRAND_AMBASSADOR_CONTRACT%20.docx?alt=media&token=9c580f89-c86a-47e1-9560-6575da8ef0ec&_gl=1*e67eb2*_ga*MTU4MTIzMTk5NS4xNjgzNzkwODU2*_ga_CW55HF8NVT*MTY5NjI0MjUwNy40ODAuMS4xNjk2MjQyNjYyLjU1LjAuMA.."
              >
                <Button className="bg-primary text-white border-0 ml-2 ml-lg-5">
                  Download
                </Button>
              </a>

              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "center",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  textAlign: "center",
                }}
              >
                <strong>
                  <span>SCHEDULE A</span>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "center",
                }}
              >
                <strong>
                  <u>
                    <span>Services</span>
                  </u>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ol style={{ margin: "0pt", paddingLeft: "0pt" }} type={1}>
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <strong>
                    <u>Athlete Duties and Obligations .</u>
                  </strong>
                  During the Term, Athlete shall perform each of the following
                  services, as required and/or directed by FHP (the “
                  <b>Services</b>
                  ”):
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ul style={{ margin: "0pt", paddingLeft: "0pt" }} type="disc">
                <li
                  style={{
                    marginLeft: "46.52pt",
                    textAlign: "justify",
                    paddingLeft: "7.48pt",
                  }}
                >
                  <span>
                    Athlete shall serve as brand ambassador for the Platform,
                    including, but not limited to, participating in online chats
                    with fans via text chat and/or Zoom for the purpose of,
                    among other things, teaching fans about NFT Badges and/or
                    the Platform.
                  </span>
                </li>
              </ul>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "54pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <ul style={{ margin: "0pt", paddingLeft: "0pt" }} type="disc">
                <li
                  style={{
                    marginLeft: "46.52pt",
                    textAlign: "justify",
                    paddingLeft: "7.48pt",
                  }}
                >
                  <span>
                    Athlete shall promote FHP and/or the Platform on Athlete’s
                    social media, as directed by FHP (“
                    <b>Social Media Posts</b>”). FHP shall inform Athlete when
                    to publish such Social Media Posts, which time shall be
                    determined pursuant to FHP’s discretion. Social Media Posts
                    should tag and/or mention FHP and/or the Platform through
                    authorized hash tags as requested by FHP. Athlete agrees to
                    follow FHP’s direction on suggested topics, promotion, and
                    hash tags when reasonable to do so. All Social Media Posts
                    (and/or any other posts or public statements related to FHP
                    and/or the Platform) will clearly and conspicuously disclose
                    Athlete’s material connection with FHP by including
                    necessary disclosure statements (i.e. #ad, #sponsored, # FHP
                    Athlete, or other disclosure provided by FHP).
                  </span>
                </li>
              </ul>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "54pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "54pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>
                  Athlete shall ensure that at all times throughout the Term:
                  (i) each Social Media Post is accessible and viewable by all
                  of Athlete’s social media followers; (ii) Athlete does not
                  delete any Social Media Posts for any period of time; and
                  (iii) Athlete does not take any action to have Athlete’s
                  social media account suspended, deleted or removed from any
                  social media platform. FHP may provide Athlete with content
                  and/or material to be included in a Social Media Post. The
                  content of any Social Media Post shall be subject to FHP’s
                  final approval. FHP may direct Athlete to remove and/or repost
                  any Social Media Post.
                </span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "54pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "54pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>
                  FHP expressly reserves the right to repost and/or retweet
                  Social Media Posts. FHP shall have the right to maintain or
                  retain, or not remove posts, reposts, retweets and any other
                  social media updates or uploads from FHP’s own social media
                  accounts upon the conclusion of the Agreement. Athlete’s
                  failure to comply with the Social Media Post requirements in
                  accordance with the terms set forth herein shall be deemed a
                  material breach of this Agreement.
                </span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "36pt",
                  marginBottom: "0pt",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "center",
                }}
              >
                <strong>
                  <span>SCHEDULE B</span>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "center",
                }}
              >
                <strong>
                  <span>&nbsp;</span>
                </strong>
              </p>
              <p className="text-center">
                <strong>
                  <u>
                    <span>Compensation</span>
                  </u>
                </strong>
              </p>
              <ol style={{ margin: "0pt", paddingLeft: "0pt" }} type={1}>
                <li
                  style={{
                    marginLeft: "14pt",
                    textAlign: "justify",
                    paddingLeft: "4pt",
                  }}
                >
                  <strong>
                    <u>Royalties.</u>
                  </strong>{" "}
                  Regarding FHP’s sale of NFT Badges and/or other NFTs, FHP
                  agrees to pay Athlete a percentage of Net Revenue (as defined
                  below) earned therefrom as follows:
                </li>
              </ol>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <table
                cellPadding={0}
                cellSpacing={0}
                style={{
                  marginLeft: "18pt",
                  border: "0.75pt solid #000000",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  <tr style={{ height: "36.4pt" }}>
                    <td
                      style={{
                        width: "267.95pt",
                        borderRightStyle: "solid",
                        borderRightWidth: "0.75pt",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "0.75pt",
                        paddingRight: "5.03pt",
                        paddingLeft: "5.03pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "justify",
                          fontSize: "12pt",
                        }}
                      >
                        <strong>
                          <span>Sales Badges bearing Athlete’s Rights</span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "159.95pt",
                        borderLeftStyle: "solid",
                        borderLeftWidth: "0.75pt",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "0.75pt",
                        paddingRight: "5.03pt",
                        paddingLeft: "5.03pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "justify",
                          fontSize: "12pt",
                        }}
                      >
                        <span>50% - Athlete&nbsp;</span>
                      </p>
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "justify",
                          fontSize: "12pt",
                        }}
                      >
                        <span>50% - FHP</span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "36.4pt" }}>
                    <td
                      style={{
                        width: "267.95pt",
                        borderTopStyle: "solid",
                        borderTopWidth: "0.75pt",
                        borderRightStyle: "solid",
                        borderRightWidth: "0.75pt",
                        paddingRight: "5.03pt",
                        paddingLeft: "5.03pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "justify",
                          fontSize: "12pt",
                        }}
                      >
                        <strong>
                          <span>
                            Sales of other NFTs bearing Athlete’s Rights
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "159.95pt",
                        borderTopStyle: "solid",
                        borderTopWidth: "0.75pt",
                        borderLeftStyle: "solid",
                        borderLeftWidth: "0.75pt",
                        paddingRight: "5.03pt",
                        paddingLeft: "5.03pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "justify",
                          fontSize: "12pt",
                        }}
                      >
                        <span>70% - Athlete&nbsp;</span>
                      </p>
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "justify",
                          fontSize: "12pt",
                        }}
                      >
                        <span>30% - FHP</span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                className="text-justify"
                style={{
                  marginLeft: "18pt",
                }}
              >
                <span>“</span>
                <strong>
                  <span>Net Revenue</span>
                </strong>
                <span>
                  ” is defined as all revenues of any type received from the
                  sale and/or distribution of NFT Badges and/or other NFTs
                  bearing Athlete’s NIL Rights, less (i) applicable fees
                  specifically related to the distribution, dissemination and
                  delivery of the NFT Badges and/or other NFTs (i.e. applicable
                  Platform fees paid to distribute NFT Badges and/or other
                  NFTs), (ii) credit card charge-backs, refunds, or other
                  payment processing fees arising in connection with
                  distribution of the NFT Badges and/or other NFTs, (iii) sales
                  tax, and (iv) any other expenses incurred relating to the
                  design, development, minting, and/or creation of such
                  Athlete’s NFT Badges and/or other NFTs.
                </span>
              </p>
              <p
                className="text-justify"
                style={{
                  marginLeft: "18pt",
                }}
              >
                <span>
                  Regarding Athlete’s participation in fans’ pay-per-minute
                  chats with Athlete, FHP agrees that Athlete shall set
                  Athlete’s own “per-minute” rate (“<b>PPM Chat Rate</b>”) and
                  FHP agree to pay Athlete a percentage of Net Earnings (as
                  defined below) earned therefrom as follows:
                </span>
              </p>
              <table
                cellPadding={0}
                cellSpacing={0}
                style={{
                  marginLeft: "18pt",
                  border: "0.75pt solid #000000",
                  borderCollapse: "collapse",
                  width: "96%",
                }}
              >
                <tbody>
                  <tr style={{ height: "36.4pt" }}>
                    <td
                      style={{
                        borderRightStyle: "solid",
                        borderRightWidth: "0.75pt",
                        paddingRight: "5.03pt",
                        paddingLeft: "5.03pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "justify",
                          fontSize: "12pt",
                        }}
                      >
                        <strong>
                          <span>Pay-Per-Minute Chats</span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        borderLeftStyle: "solid",
                        borderLeftWidth: "0.75pt",
                        paddingRight: "5.03pt",
                        paddingLeft: "5.03pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          fontSize: "12pt",
                        }}
                        className="d-flex justify-content-between"
                      >
                        <span>Satisfactory / No Rating:</span>
                        <span>
                          <p>88% - Athlete&nbsp;</p>
                          <p>12% - FHP&nbsp;</p>
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          fontSize: "12pt",
                        }}
                        className="d-flex justify-content-between"
                      >
                        <span>Unsatisfactory Rating (Rude/Short Time):</span>
                        <span>
                          <p>53% - Athlete&nbsp;</p>
                          <p>12% - FHP&nbsp;</p>
                          <p>(remainder returned to fan)</p>
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          fontSize: "12pt",
                        }}
                        className="d-flex justify-content-between"
                      >
                        <span>Unsatisfactory Rating (No Show): </span>
                        <span>
                          <p>23% - Athlete&nbsp;</p>
                          <p>12% - FHP&nbsp;</p>
                          <p>(remainder returned to fan)</p>
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>“</span>
                <strong>
                  <span>Net Earnings</span>
                </strong>
                <span>
                  ” is defined as all revenues of any type received from
                  pay-per-minute chats with Athlete, less (i) sales tax, and
                  (ii) applicable fees and/or expenses related to the hosting of
                  pay-per-minute chat.
                </span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span>&nbsp;</span>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginLeft: "18pt",
                  marginBottom: "0pt",
                  textAlign: "justify",
                }}
              >
                <span className="text-dark" style={{ fontSize: "16px" }}>
                  Royalties shall be calculated on a monthly basis and shall be
                  due and payable no later than thirty (30) days following the
                  last day of each quarter during the Term.
                </span>
              </p>
            </div>
          </ModalBody>
        </Modal>
      </>
    </LoadingOverlay>
  );
}

export default Register;
