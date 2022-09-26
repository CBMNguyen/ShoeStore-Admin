import { fetchEmployee } from "features/Employee/employeeSlice";
import { fetchOrder } from "features/Order/orderSlice";
import { fetchProduct } from "features/product/productSlice";
import { fetchReviews } from "features/Review/reviewSlice";
import { fetchUser } from "features/User/userSlice";
import { useState } from "react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { monthlyIncome, quarterlyIncome } from "utils/common";
import DashBoardHeader from "../components/DashBoardHeader";
import { DoughnutChart } from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import RecentReview from "../components/RecentReview";
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
    dispatch(fetchReviews());
  }, [dispatch]);

  const { employee } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { order } = useSelector((state) => state.order);
  const { review } = useSelector((state) => state.review);

  const [filter, setFilter] = useState({ year: 2022, type: 0, chartType: 0 });

  // handle total income every month
  const MonthlyIncome = useMemo(
    () => monthlyIncome(order, filter.year),
    [order, filter.year]
  );
  const QuarterlyIncome = useMemo(
    () => quarterlyIncome(order, filter.year),
    [order, filter.year]
  );

  return (
    <div style={{ backgroundColor: "#e6e9eb" }}>
      <DashBoardHeader
        monthlyIncome={MonthlyIncome}
        user={user}
        employee={employee}
        products={products}
      />

      <LineChart
        data={filter.type === 0 ? MonthlyIncome : QuarterlyIncome}
        setFilter={setFilter}
        filter={filter}
      />

      {/* <BarChart /> */}
      <Row className="mx-2 my-3">
        <Col md={8} className="pe-2">
          <RecentSaleTable order={order} />
        </Col>
        <Col md={4} className="ps-2">
          <DoughnutChart order={order} />
        </Col>
      </Row>
      <Row className="mx-2 pb-3">
        <Col className="pe-2">
          <TopProductSeling products={products} />
        </Col>
        <Col className="ps-2">
          <RecentReview reviews={review} />
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(MainPage);
