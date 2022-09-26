import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import employeeReducer from "../features/Employee/employeeSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/Scc/categorySlice";
import colorReducer from "../features/Scc/colorSlice";
import positionReducer from "../features/Scc/positionSlice";
import importOrderReducer from "../features/ImportOrder/importOrderSlice";
import supplierReducer from "../features/Supplier/supplierSlice";
import discountReducer from "../features/Discount/discountSlice";
import discountTypeReducer from "../features/Scc/discountTypeSlice";
import roleReducer from "../features/Role/roleSlice";
import reviewReducer from "../features/Review/reviewSlice";
import sizeReducer from "../features/Scc/sizeSlice";
import userReducer from "../features/User/userSlice";
import orderReducer from "../features/Order/orderSlice";

const persistConfig = {
  key: "shoesStore",
  storage,
  whitelist: ["employee"],
  blacklist: ["employee"],
};

const employeePersistConfig = {
  key: "employee",
  storage: storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  products: productReducer,
  category: categoryReducer,
  color: colorReducer,
  size: sizeReducer,
  employee: persistReducer(employeePersistConfig, employeeReducer),
  user: userReducer,
  position: positionReducer,
  importOrder: importOrderReducer,
  supplier: supplierReducer,
  discount: discountReducer,
  discountType: discountTypeReducer,
  role: roleReducer,
  review: reviewReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
