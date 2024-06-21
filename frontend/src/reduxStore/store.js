import {configureStore} from "@reduxjs/toolkit";
import flashSlice from "./FlashSlice";

export const store = configureStore({
  reducer: {
    flashReducer: flashSlice,
  },
});
