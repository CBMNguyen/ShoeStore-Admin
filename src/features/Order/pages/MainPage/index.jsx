import TableFooter from "components/TableFooter";
import { ORDER_STATE_OPTIONS } from "constants/globals";
import OrderDetail from "features/Order/components/OrderDetail";
import OrderHeader from "features/Order/components/OrderHeader";
import OrderList from "features/Order/components/OrderList";
import { fetchOrder } from "features/Order/orderSlice";
import useModel from "hooks/useModel";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./order.scss";

function MainPage(props) {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: "",
    state: "",
    page: 1,
    limit: 9,
  });

  // handle fetchOrder update order state

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const { order, loading } = useSelector((state) => state.order);
  const { model, showModel, closeModel } = useModel();

  // Filter order by user name and order state

  const filterOrder = order.filter((od) => {
    return (
      (od.user.firstname.toLowerCase().indexOf(filter["name"].toLowerCase()) !==
        -1 ||
        od.user.lastname.toLowerCase().indexOf(filter["name"].toLowerCase()) !==
          -1) &&
      od.state.indexOf(filter["state"]) !== -1
    );
  });

  const start = (filter["page"] - 1) * filter["limit"];
  const end = filter["page"] * filter["limit"];

  // handle Pagination and filter Change

  const handlePageChange = (page) => {
    setFilter({ ...filter, page });
  };

  const handleNameChange = (name) => {
    setFilter({ ...filter, page: 1, name });
  };

  const handleStateChange = (state) => {
    state = state === "All" ? "" : state;
    setFilter({ ...filter, page: 1, state });
  };

  return (
    <div className="Order shadow">
      <OrderHeader
        name="order"
        options={ORDER_STATE_OPTIONS}
        onNameChange={handleNameChange}
        onOptionsChange={handleStateChange}
      />

      <OrderList order={filterOrder.slice(start, end)} showModel={showModel} />

      <TableFooter
        filter={filter}
        totalRow={order.length}
        onPageChange={handlePageChange}
      />

      {model.show && (
        <OrderDetail
          order={model.data}
          closeModel={closeModel}
          loading={loading}
        />
      )}
    </div>
  );
}

export default MainPage;
