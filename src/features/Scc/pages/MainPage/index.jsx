import Category from "features/Scc/components/Category";
import Color from "features/Scc/components/Color";
import Position from "features/Scc/components/Position";
import Size from "features/Scc/components/Size";
import React from "react";
import { Col, Row } from "reactstrap";
import "./main.scss";

function MainPage(props) {
  return (
    <div className="MainPage">
      <Row className="Sccp rounded">
        <Col className="col-auto">
          <h2>Size</h2>
          <Size />
        </Col>
        <Col className="col-auto">
          <h2>Category</h2>
          <Category />
        </Col>
        <Col className="col-auto">
          <h2>Color</h2>
          <Color />
        </Col>
        <Col className="col-auto">
          <h2>Position</h2>
          <Position />
        </Col>
      </Row>
    </div>
  );
}

export default MainPage;
