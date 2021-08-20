import { fetchEmployee } from "features/Employee/employeeSlice";
import { fetchOrder } from "features/Order/orderSlice";
import { fetchProduct } from "features/product/productSlice";
import { fetchUser } from "features/User/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { monthlyIncome, orderPriceTotal } from "utils/common";
import BarChart from "../components/BarChart";
import DashBoardHeader from "../components/DashBoardHeader";
import RecentSaleTable from "../components/RecentSaleTable";
import TopProductSeling from "../components/TopProductSeling";

MainPage.propTypes = {};

function MainPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchUser());
    dispatch(fetchProduct());
    dispatch(fetchOrder());
  }, [dispatch]);

  const { employee } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { order } = useSelector((state) => state.order);

  // handle total price order
  let total = 0;
  order.forEach((order) => {
    if (order.state === "deliveried") total += orderPriceTotal(order);
  });

  // handle total income every month
  const MonthlyIncome = monthlyIncome(order);

  return (
    <div>
      <DashBoardHeader
        total={total}
        user={user}
        employee={employee}
        products={products}
      />

      <BarChart monthlyIncome={MonthlyIncome} />

      <div className="ms-3 d-flex">
        <RecentSaleTable order={order} />
        <TopProductSeling products={products} />
      </div>
    </div>
  );
}

export default withRouter(MainPage);
