import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import rootReducer from "../reducer/index";

const store = configureStore({
    middleware: [thunk],
    reducer: rootReducer
  });

export default store;