import {createSlice} from "@reduxjs/toolkit";

const loginLocalStorage = localStorage.getItem("isLogin") !== null;
const initialState = {
  isLoginState: loginLocalStorage,
};
const isLoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    isLogin: (store, action) => {
      store.isLoginState = action.payload;
    },
  },
});

export const {isLogin} = isLoginSlice.actions;
export default isLoginSlice.reducer;
