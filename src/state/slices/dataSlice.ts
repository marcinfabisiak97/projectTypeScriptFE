import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InterInitialState } from "../../interfaces";

const initialState = {
  filterVal: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    readValue: (state: InterInitialState, action: PayloadAction<string>) => {
      state.filterVal = action.payload;
    },
    resetValue: (state: InterInitialState) => {
      state.filterVal = "";
    },
  },
});

export const { readValue, resetValue } = dataSlice.actions;
export default dataSlice.reducer;
