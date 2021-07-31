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
import sizeReducer from "../features/Scc/sizeSlice";
import userReducer from "../features/User/userSlice";

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
