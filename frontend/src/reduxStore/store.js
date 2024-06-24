import {configureStore} from "@reduxjs/toolkit";
import flashSlice from "./FlashSlice";
import isLoginSlice from "./isLoginSlice";

export const store = configureStore({
  reducer: {
    flashReducer: flashSlice,
    loginReducer: isLoginSlice,
  },
});
