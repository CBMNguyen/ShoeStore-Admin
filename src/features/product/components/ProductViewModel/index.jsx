import { ArrowDirection } from "components/ArrowDirection";
import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";
import { Badge, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";
import FormHeader from "../../../../components/FormHeader";
import "./productviewmore.scss";

ProductViewModel.propTypes = {
  closeModel: PropTypes.func,
  data: PropTypes.object.isRequired,
};

ProductViewModel.defaultProps = {
  closeModel: null,
};

function ProductViewModel(props) {
  const { closeModel, data } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowDirection />,
    prevArrow: <ArrowDirection />,
  };
  return (
    <div className="ProductViewModel">
      <div className="ProductViewModel__main">
        <FormHeader closeModel={closeModel} />
        <Row>
          <Col md={5}>
            <div>
              <Slider className="p-1" {...settings}>
                {data.images.map((image) => (
                  <img
                    key={image.toString()}
                    className="img-fluid img-thumbnail rounded"
                    src={`${process.env.REACT_APP_API_URL}/${image}`}
                    alt={image}
                  />
                ))}
              </Slider>
            </div>
            <div className="mt-4 text-center">
              <cite>{data.name}</cite>
            </div>
          </Col>
          <Col md={7}>
            {" "}
            <ListGroup className="ProductViewModel__list">
              <ListGroupItem>
                <div>Brand: </div>{" "}
                <div>
                  <Badge className="bg-danger">
                    {capitalizeFirstLetter(data.category.name)}
                  </Badge>
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Sale Price:</div>
                <div>
                  <Badge className="bg-warning">{data.originalPrice}$</Badge>
                </div>{" "}
              </ListGroupItem>

              <ListGroupItem>
                <div>Free Ship: </div>
                <div>
                  <Badge className="bg-success">
                    {data.isFreeShip ? "Free Ship" : "No Free Ship"}
                  </Badge>
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Quantity: </div>
                <div>
                  <Badge className="bg-info rounded-circle">
                    {data.quantityStock}
                  </Badge>
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Promotion Percent:</div>
                <div>
                  <Badge className="bg-light text-dark">
                    {data.promotionPercent} %
                  </Badge>
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Color: </div>
                {data.color.map((c) => (
                  <div
                    key={c._id}
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "1px solid #000",
                      borderRadius: "50%",
                      margin: "0 5px",
                      backgroundColor: `${c.color}`,
                    }}
                  />
                ))}
              </ListGroupItem>

              <ListGroupItem>
                <div>Size: </div>
                {data.size
                  .slice()
                  .sort((a, b) => a.size - b.size)
                  .map((s) => (
                    <Badge
                      key={s.size}
                      className="me-2"
                      style={{ backgroundColor: "deeppink" }}
                    >
                      {s.size}
                    </Badge>
                  ))}
              </ListGroupItem>

              <ListGroupItem>
                <div>Description: </div>

                <div
                  style={{
                    fontSize: "0.85rem",
                    backgroundColor: "#e4eef5",
                    borderRadius: "0.2rem",
                    color: "black",
                    padding: "0 0.4rem",
                    fontWeight: "400",
                  }}
                >
                  {data.description}
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Created At: </div>
                <div style={{ fontWeight: "400", fontSize: "0.85rem" }}>
                  {data.createdAt}
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Updated At: </div>
                <div style={{ fontWeight: "400", fontSize: "0.85rem" }}>
                  {data.updatedAt}
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProductViewModel;
