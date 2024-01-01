import React, { useEffect, useState } from "react";
import Header from "components/Headers/Header";
import {
  Col,
  Container,
  Row,
  Input,
  Button,
  Form,
  Spinner,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import firebase from "config/firebase";
import { createComplaint, updateComplaint } from "store/actions/athleteActions";
import { getIssues } from "store/actions/athleteActions";
import moment from "moment";
import { deleteIssue } from "store/actions/athleteActions";

function ComplaintForm() {
  const [issue, setIssue] = useState("");
  const [issueUpdated, setIssueUpdated] = useState("");
  const [issuesUpdateId, setIssueUpdateId] = useState("");
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  let auth = useSelector((state) => state.auth);
  let athlete = useSelector((state) => state.athlete);
  const { updateComplaintLoading } = useSelector((state) => state.athlete);

  let dispatch = useDispatch();
  const toggle = () => {
    setModal(!modal);
    setIssue("");
  };
  const toggleUpdate = () => {
    setEditModal(!editModal);
  };
  useEffect(() => {
    if (athlete.issues.length == 0) {
      dispatch(getIssues(auth.uid));
    }
  }, []);

  //Issue Update
  const IssueUpdate = (data) => {
    setIssueUpdated(data.message);
    setIssueUpdateId(data.id);
    setEditModal(true);
  };
  return (
    <>
      <Header />
      {/* Edit Modal */}
      <Modal isOpen={editModal}>
        <ModalHeader>Update Issue</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              let obj = {
                message: issueUpdated,
                created_at: firebase.firestore.Timestamp.now(),
                issue_by: auth.uid,
                issue_id: Math.floor(Math.random() * 10000) + 1000,
                issue_from: "Player",
                status: "submitted",
              };
              dispatch(updateComplaint(obj, issuesUpdateId));
              toggleUpdate();
              setIssueUpdated("");
            }}
          >
            <>
              <p className="auth-desc-subtitle mt-0 ml-0">
                Please write down your issue
              </p>
              <Input
                required
                value={issueUpdated}
                onChange={(e) => setIssueUpdated(e.target.value)}
                type="textarea"
                rows="9"
                className="complaint-input mt-4"
                placeholder="Write your issue..."
              />
              <div className="text-right">
                <Button
                  className="mt-4"
                  color="danger"
                  onClick={toggleUpdate}
                  disabled={updateComplaintLoading}
                >
                  Close
                </Button>
                <Button
                  disabled={!issueUpdated}
                  color="primary"
                  size="md"
                  className="mt-4"
                  type="submit"
                >
                  {updateComplaintLoading ? <Spinner size="sm" /> : "send"}
                </Button>
              </div>
            </>
          </Form>
        </ModalBody>
      </Modal>

      {/* Modal */}
      <Modal isOpen={modal}>
        <ModalHeader>Submit Issue</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              let obj = {
                message: issue,
                created_at: firebase.firestore.Timestamp.now(),
                issue_by: auth.uid,
                issue_id: Math.floor(Math.random() * 10000) + 1000,
                issue_from: "Player",
                status: "submitted",
              };
              dispatch(createComplaint(obj));
              toggle();
              setIssue("");
            }}
          >
            <>
              <p className="auth-desc-subtitle mt-0 ml-0">
                Please write down your issue
              </p>
              <Input
                required
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                type="textarea"
                rows="9"
                className="complaint-input mt-4"
                placeholder="Write your issue..."
              />
              <div className="text-right">
                <Button
                  className="mt-4"
                  color="danger"
                  onClick={toggle}
                  disabled={athlete.complaintLoader}
                >
                  Close
                </Button>
                <Button
                  disabled={!issue}
                  color="primary"
                  size="md"
                  className="mt-4"
                  type="submit"
                >
                  {athlete.complaintLoader ? <Spinner size="sm" /> : "Send"}
                </Button>
              </div>
            </>
          </Form>
        </ModalBody>
      </Modal>
      <Container className="mt--4" fluid>
        <div className="d-flex mt-3">
          <p className="text-dark auth-desc-subtitle ml-0 mb-0 mt-2">Issues</p>
          <Button className="custom-btn ml-auto" onClick={toggle}>
            Raise an Issue
          </Button>
        </div>
        {athlete.issues.length == 0 ? (
          <Card className="filter-card mt-5">
            <CardBody className="bg-danger text-center rounded">
              <h2 className="text-white">
                <i className="fa fa-exclamation-triangle mr-3"></i> No Issue
                Submitted Yet.
              </h2>
            </CardBody>
          </Card>
        ) : (
          <Table
            className="align-items-center table-flush mt-5 complaintForm"
            responsive
          >
            <thead>
              <tr>
                <th scope="col" className="custom-table-heading custom-heading">
                  ID
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center "
                >
                  Message
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  className="custom-table-heading custom-heading text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="custom-table-body mt-3">
              {athlete.issues.length > 0 &&
                athlete.issues.map((d, idx) => (
                  <tr>
                    <td
                      className={`custom-table-text ${
                        idx == 0 ? "custom-table-body-top-left" : ""
                      }`}
                    >
                      {d.issue_id}
                    </td>
                    <td className="custom-table-text" align="left">
                      {d.message}
                    </td>
                    <td className="custom-table-text" align="center">
                      {moment.unix(d.created_at.seconds).format("DD MMM YYYY")}
                    </td>
                    <td
                      className={`custom-table-text justify-content-between ${
                        idx == 0
                          ? "custom-table-body-top-right justify-content-between"
                          : ""
                      }`}
                    >
                      <i
                        className="fa fa-trash text-danger pointer float-left pl-0 ml-2"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteIssue(d.id));
                        }}
                      ></i>{" "}
                      <i
                        className="fas fa-edit text-danger pointer float-right pr-0 mr-0"
                        onClick={() => IssueUpdate(d, idx)}
                      ></i>
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

export default ComplaintForm;
