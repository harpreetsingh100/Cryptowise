import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface currencyState {
  value: string;
}

const initialState = { value: "USD" } satisfies currencyState as currencyState;

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrencyType(state, action) {
      state.value = action.payload;
    },
  },
});

export const { changeCurrencyType } = currencySlice.actions;
export default currencySlice.reducer;
