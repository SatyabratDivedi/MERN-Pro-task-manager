import {configureStore} from "@reduxjs/toolkit";
import flashSlice from "./FlashSlice";
import isLoginSlice from "./isLoginSlice";
import changeCatogary from "./changeCatogary";

export const store = configureStore({
  reducer: {
    flashReducer: flashSlice,
    loginReducer: isLoginSlice,
    changeCatogaryReducer: changeCatogary,
  },
});
