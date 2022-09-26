import Category from "features/Scc/components/Category";
import Color from "features/Scc/components/Color";
import DiscountType from "features/Scc/components/DiscountType";
import Position from "features/Scc/components/Position";
import Size from "features/Scc/components/Size";
import { withRouter } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "./main.scss";

function MainPage(props) {
  return (
    <div className="MainPage">
      <Row className="Sccp rounded">
        <Col md={3}>
          <h2>Size</h2>
          <Size />
        </Col>
        <Col md={3}>
          <h2>Category</h2>
          <Category />
        </Col>
        <Col md={3}>
          <h2>Color</h2>
          <Color />
        </Col>
        <Col md={3}>
          <h2>Position</h2>
          <Position />
        </Col>
        <Col md={3}>
          <h2>Discount Type</h2>
          <DiscountType />
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(MainPage);
