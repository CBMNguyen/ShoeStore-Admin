import FormHeader from "components/FormHeader";
import PropTypes from "prop-types";
import React from "react";
import { Badge, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import "./userviewmodel.scss";

UserViewModel.propTypes = {
  closeModel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function UserViewModel(props) {
  const { data, closeModel } = props;
  return (
    <div className="UserViewModel">
      <div className="UserViewModel__main">
        <FormHeader closeModel={closeModel} />
        <Row>
          <Col md="4">
            <img
              className="img-thumbnail rounded img-fluid"
              src={`${process.env.REACT_APP_API_URL}/${data.image}`}
              alt={data._id}
            />
          </Col>
          <Col md="8">
            <ListGroup className="UserViewModel__list">
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
                <div>Address: </div>
                <div
                  className="UserViewModel__address bg-light text-dark"
                  style={{ wordBreak: "break-word" }}
                >
                  {data.address}
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Order Address: </div>
                <div
                  className="UserViewModel__address bg-secondary"
                  style={{ wordBreak: "break-word" }}
                >
                  {`${data.orderAddress["city"]} - ${data.orderAddress["district"]} - ${data.orderAddress["commune"]}`}{" "}
                  <br />
                  {data.orderAddress["description"]}
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UserViewModel;
