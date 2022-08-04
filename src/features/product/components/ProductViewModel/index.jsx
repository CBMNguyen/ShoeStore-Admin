import { ArrowDirection } from "components/ArrowDirection";
import { STYLE_MODEL } from "constants/globals";
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
    <div className="ProductViewModel animation-fade-in" style={STYLE_MODEL}>
      <div className="ProductViewModel__main">
        <FormHeader closeModel={closeModel} />
        <Row>
          <Col md={5}>
            <div style={{ border: "1px solid #dedede" }} className="rounded">
              <div>
                <Slider className="p-1" {...settings}>
                  {data.productDetail
                    .reduce(
                      (initialValue, item) => initialValue.concat(item.images),
                      []
                    )
                    .map((image) => (
                      <img
                        key={image}
                        className="img-fluid"
                        src={image}
                        alt={image}
                      />
                    ))}
                </Slider>
              </div>
              <div className="mt-4 text-center">
                <cite>{data.name}</cite>
              </div>
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
                  <Badge className="bg-warning">{data.salePrice}$</Badge>
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
                  <Badge className="bg-info rounded p-2">
                    {data.quantityStock}
                  </Badge>
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Promotion Percent:</div>
                <div>
                  <Badge className="bg-secondary text-light">
                    {data.promotionPercent} %
                  </Badge>
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Color: </div>
                {data.productDetail.map(({ color }) => (
                  <div
                    key={color._id}
                    className="shadow"
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                      marginRight: "5px",
                      backgroundColor: `${color.color}`,
                    }}
                  />
                ))}
              </ListGroupItem>

              <ListGroupItem>
                <div style={{ width: "45%" }}>Size: </div>
                <div
                  style={{
                    maxHeight: "80px",
                    overflowY: "scroll",
                    width: "55%",
                  }}
                >
                  <table style={{ fontSize: "0.8rem", textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.productDetail.map(({ color, sizeAndQuantity }) =>
                        sizeAndQuantity
                          .slice()
                          .sort((a, b) => a.size.size - b.size.size)
                          .map(({ size, quantity }, index) => (
                            <tr key={index}>
                              <td>
                                {index === 0 && (
                                  <div
                                    className="m-auto rounded shadow"
                                    style={{
                                      backgroundColor: color.color,
                                      width: "32px",
                                      height: "16px",
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                )}
                              </td>
                              <td style={{ fontWeight: 500 }}>{size.size}</td>
                              <td
                                style={{
                                  color:
                                    quantity < 10
                                      ? "red"
                                      : quantity < 50
                                      ? "orange"
                                      : "green",
                                  fontWeight: 500,
                                }}
                              >
                                {quantity}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
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
                    maxHeight: "240px",
                    overflowY: "scroll",
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
