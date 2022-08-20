import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { getImageUrlToFile, screenMode } from "utils/common";
import "./SelectSizeAndQuantityList.scss";

SelectSizeAndQuantityList.propTypes = {
  color: PropTypes.object.isRequired,
  sizeOptions: PropTypes.array.isRequired,
  onClearSelectSizeAndQuantityList: PropTypes.func.isRequired,
  onSaveSelectSizeAndQuantityList: PropTypes.func.isRequired,
};

function SelectSizeAndQuantityList({
  data,
  currentImages,
  color,
  sizeOptions,
  onSaveSelectSizeAndQuantityList,
  onClearSelectSizeAndQuantityList,
}) {
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState(data ? data : [sizeOptions[0]]);
  const [sizeOption, setOption] = useState(sizeOptions);

  const [mode, setMode] = useState(screenMode.addEdit);

  useEffect(() => {
    onSaveSelectSizeAndQuantityList(color.value, [], []);

    return () => {
      onClearSelectSizeAndQuantityList(color);
    };
  }, []);

  // get Images when color exist
  useEffect(() => {
    const getImages = async () => {
      const data = await getImageUrlToFile(currentImages);
      setImages(data);
    };
    if (currentImages) {
      getImages();
    }
  }, [currentImages]);

  const handleAddButtonClick = () => {
    if (options.length < sizeOptions.length) {
      // get field input
      var formEl = Array.from(document.forms[`Product${color.label}Form`]);
      const sizeList = [];
      formEl = formEl.filter((item) => item.value !== "");

      for (var i = 0; i < formEl.length; i++) {
        if ((i % 2 === 1) & (i !== 0)) {
          sizeList.push({
            size: formEl[i - 1].value,
          });
        }
      }
      // increase row
      const newOptions = options.concat(sizeOptions[options.length]);
      setOptions(newOptions);
      // filter size List
      const newSizeOption = sizeOption.filter((item) =>
        sizeList.every(({ size }) => {
          return item.value !== size;
        })
      );
      setOption(newSizeOption);
    }
  };

  // handle set values for main form

  const handleFormSubmit = () => {
    if (!onSaveSelectSizeAndQuantityList) return;
    var formEl = Array.from(document.forms[`Product${color.label}Form`]);
    const sizeAndQuantityList = [];
    formEl = formEl.filter((item) => item.value !== "");

    for (var i = 0; i < formEl.length; i++) {
      if ((i % 2 === 1) & (i !== 0)) {
        sizeAndQuantityList.push({
          size: formEl[i - 1].value,
          quantity: parseInt(formEl[i].value),
        });
      }
    }
    onSaveSelectSizeAndQuantityList(color.value, images, sizeAndQuantityList);
    setMode(screenMode.view);
  };

  return (
    options.length !== 0 && (
      <div
        className="SelectSizeAndQuantityList rounded shadow-sm"
        style={{
          border: `2px solid ${color.label === "White" ? "#ccc" : color.label}`,
        }}
      >
        <div className="SelectSizeAndQuantityList__controls">
          <div className="d-flex" style={{ fontSize: "1.1rem" }}>
            {/* Add Row Button */}
            <button
              disabled={
                mode === screenMode.view ||
                options.length === sizeOptions.length
              }
              type="button"
              className="SelectSizeAndQuantityList__button bg-dark shadow"
              onClick={handleAddButtonClick}
            >
              <i className="zmdi zmdi-plus"></i>
            </button>
            {/* Edit Button */}
            <button
              type="button"
              disabled={mode !== screenMode.view}
              onClick={() => setMode(screenMode.addEdit)}
              style={{ fontSize: "1rem" }}
              className="SelectSizeAndQuantityList__button bg-info mx-2 shadow"
            >
              <i className="zmdi zmdi-edit"></i>
            </button>
            {/* Saved Button */}
            <button
              disabled={mode === screenMode.view}
              type="button"
              className="SelectSizeAndQuantityList__button bg-success shadow me-2"
              onClick={handleFormSubmit}
            >
              <i className="zmdi zmdi-check"></i>
            </button>
          </div>
        </div>

        <Form
          id={`Product${color.label}Form`}
          style={{
            opacity: mode === screenMode.view ? 0.4 : 1,
          }}
        >
          {options.map((item, index) => (
            <div key={index} className="mt-2">
              <Row>
                {/* Product - CheckBox Sizes */}
                <Col md={6}>
                  <FormGroup>
                    <Label>Size</Label>
                    <Select
                      defaultValue={
                        data && item.size
                          ? { label: item.size.size, value: item.size._id }
                          : sizeOption[0]
                      }
                      isMulty={false}
                      name="size"
                      label="Size"
                      placeholder="Select size ..."
                      options={sizeOption}
                      isDisabled={mode === screenMode.view}
                    />
                  </FormGroup>
                </Col>
                {/* Product - Input Quantity */}
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <FormGroup style={{ width: "90%" }}>
                      <Label>Quantity</Label>
                      <Input
                        name="quantity"
                        label="Quantity"
                        type="number"
                        placeholder="Enter quantity"
                        disabled={mode === screenMode.view}
                        defaultValue={data && item.quantity ? item.quantity : 1}
                        min={1}
                      />
                    </FormGroup>
                    <button
                      onClick={() => {
                        if (index < sizeOptions.length) {
                          const newOptions = [...options];
                          newOptions.splice(index, 1);
                          setOptions(newOptions);
                        }
                      }}
                      type="button"
                      style={{ backgroundColor: "#ccc" }}
                      disabled={mode === screenMode.view}
                      className="SelectSizeAndQuantityList__button ms-2 mt-4"
                    >
                      <i className="zmdi zmdi-close"></i>
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
          <Row className="mt-2">
            {/* Product File upload */}
            <FormGroup>
              <Input
                defaultValue={images}
                className="mt-1"
                type="file"
                disabled={mode === screenMode.view}
                onChange={(e) => {
                  // if (e.target.files.length > 3) {
                  //   toast("Please select three image");
                  //   setImages([
                  //     e.target.files[0],
                  //     e.target.files[1],
                  //     e.target.files[2],
                  //   ]);
                  // } else if (e.target.files.length < 3) {
                  //   setImages(e.target.files);
                  //   toast("Please select three image");
                  // } else {
                  //   setImages(e.target.files);
                  // }
                  setImages(e.target.files);
                }}
                multiple
                accept="image/*"
              />
            </FormGroup>
          </Row>
        </Form>
        {options.length === 0 && <></>}
      </div>
    )
  );
}

export default SelectSizeAndQuantityList;
