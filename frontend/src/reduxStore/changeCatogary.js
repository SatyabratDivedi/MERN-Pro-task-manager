import {createSlice} from "@reduxjs/toolkit";

const changeCatogarySlice = createSlice({
  name: "changeCatogary",
  initialState: {
    value: 0,
  },
  reducers: {
    increaseVal: (store, action) => {
      store.value++;
    },
  },
});

export const {increaseVal} = changeCatogarySlice.actions;
export default changeCatogarySlice.reducer;
