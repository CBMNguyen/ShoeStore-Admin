import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/Scc/categorySlice";
import colorReducer from "../features/Scc/colorSlice";
import sizeReducer from "../features/Scc/sizeSlice";
import positionReducer from "../features/Scc/positionSlice";
import employeeReducer from "../features/Employee/employeeSlice";
import userReducer from "../features/User/userSlice";

const rootReducer = {
  products: productReducer,
  category: categoryReducer,
  color: colorReducer,
  size: sizeReducer,
  employee: employeeReducer,
  user: userReducer,
  position: positionReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
