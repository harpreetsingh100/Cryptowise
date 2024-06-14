import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  currencyType: string;
  currencySymbol: string;
}

const initialState: CurrencyState = {
  currencyType: "USD",
  currencySymbol: "$",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyType: (state, action: PayloadAction<string>) => {
      state.currencyType = action.payload;
      localStorage.setItem("currencyType", action.payload);
      switch (action.payload) {
        case "EUR":
          state.currencySymbol = "€";
          localStorage.setItem("currencySymbol", "€");
          break;
        case "GBP":
          state.currencySymbol = "£";
          localStorage.setItem("currencySymbol", "£");
          break;
        case "USD":
        default:
          state.currencySymbol = "$";
          localStorage.setItem("currencySymbol", "$");
      }
    },
  },
});

export const { setCurrencyType } = currencySlice.actions;
export default currencySlice.reducer;
