import FormHeader from "components/FormHeader";
import { STYLE_MODEL } from "constants/globals";
import PropTypes from "prop-types";
import React from "react";
import { Badge, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";
import "./employeeviewmodel.scss";

EmployeeViewModel.propTypes = {
  closeModel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function EmployeeViewModel(props) {
  const { data, closeModel } = props;
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
                <Badge style={{ backgroundColor: "green" }}>{data.phone}</Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Gender: </div>
                <Badge style={{ backgroundColor: "blue" }}>{data.gender}</Badge>
              </ListGroupItem>

              <ListGroupItem>
                <div>Date of Birth: </div>
                <Badge style={{ backgroundColor: "orange" }}>
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
      </div>
    </div>
  );
}

export default EmployeeViewModel;
