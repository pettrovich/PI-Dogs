import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";

const store = configureStore({
    middleware: [thunk],
    reducer: rootReducer
  });

export default store;