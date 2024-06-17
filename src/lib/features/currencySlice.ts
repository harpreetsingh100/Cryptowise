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
          break;
        case "GBP":
          state.currencySymbol = "£";
          break;
        case "BTC":
          state.currencySymbol = "BTC";
          break;
        case "ETH":
          state.currencySymbol = "ETH";
          break;
        case "USD":
        default:
          state.currencySymbol = "$";
      }
    },
  },
});

export const { setCurrencyType } = currencySlice.actions;
export default currencySlice.reducer;
