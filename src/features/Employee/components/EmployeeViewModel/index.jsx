import FormHeader from "components/FormHeader";
import { STYLE_MODEL } from "constants/globals";
import PropTypes from "prop-types";
import React from "react";
import {
  Badge,
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";
import "./employeeviewmodel.scss";

EmployeeViewModel.propTypes = {
  closeModel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function EmployeeViewModel(props) {
  const { data, closeModel, onLockEmployee, loading } = props;
  return (
    <div className="EmployeeViewModel" style={STYLE_MODEL}>
      <div className="EmployeeViewModel__main">
        <FormHeader closeModel={closeModel} />
        <Row>
          <Col md="4">
            <img
              className="img-thumbnail rounded img-fluid EmployeeViewModel__avatar"
              src={data.image}
              alt={data._id}
            />
          </Col>
          <Col md="8">
            <ListGroup className="EmployeeViewModel__list">
              <ListGroupItem>
                <div>Name: </div>
                <Badge
                  style={{ backgroundColor: "black" }}
                >{`${data.firstname} ${data.lastname}`}</Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Email: </div>
                <Badge style={{ backgroundColor: "deeppink" }}>
                  {data.email}
                </Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Phone: </div>
                <Badge style={{ backgroundColor: "cyan" }}>{data.phone}</Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Gender: </div>
                <Badge style={{ backgroundColor: "orange" }}>
                  {data.gender}
                </Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>State: </div>
                <Badge
                  style={{
                    backgroundColor: data.state ? "red" : "green",
                  }}
                >
                  {data.state ? "Locked" : "Active"}
                </Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Date of Birth: </div>
                <Badge style={{ backgroundColor: "purple" }}>
                  {new Date(data.birthdate).toUTCString()}
                </Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Position: </div>
                <Badge style={{ backgroundColor: "red" }}>
                  {capitalizeFirstLetter(data.position["position"])}
                </Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Salary: </div>
                <Badge style={{ backgroundColor: "yellow", color: "black" }}>
                  {data.position["salary"]} <b>$</b>
                </Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Address: </div>
                <div
                  className="EmployeeViewModel__address text-dark"
                  style={{
                    wordBreak: "break-word",
                    fontWeight: "400",
                    backgroundColor: "#e9ecee",
                  }}
                >
                  {data.address}
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        <div className="float-end mt-3">
          <Button
            onClick={() => onLockEmployee(data)}
            disabled={loading}
            color={data.state ? "primary" : "danger"}
            className="rounded-1 text-uppercase"
          >
            <code className="text-white">
              {data.state ? "unlock employee" : "lock employee"}
            </code>
            {loading && (
              <Spinner size="sm" className="ms-2">
                {""}
              </Spinner>
            )}
          </Button>
          <Button
            onClick={closeModel}
            color="secondary"
            disabled={loading}
            className="rounded-1 text-uppercase ms-2"
          >
            <code className="text-white">Close</code>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeViewModel;
