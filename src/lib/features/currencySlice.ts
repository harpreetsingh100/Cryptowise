import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface currencyState {
  value: string;
  symbol: string;
}

const initialState = {
  value: "USD",
  symbol: "$",
} satisfies currencyState as currencyState;

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrencyType(state, action) {
      state.value = action.payload;
      switch (action.payload) {
        case "USD":
          state.symbol = "$";
          break;
        case "EUR":
          state.symbol = "€";
          break;
        case "GBP":
          state.symbol = "£";
          break;
        default:
          state.symbol = "$";
      }
    },
  },
});

export const { changeCurrencyType } = currencySlice.actions;
export default currencySlice.reducer;
