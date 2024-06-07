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
    // increment(state) {
    //   state.value++
    // },
    // decrement(state) {
    //   state.value--
    // },

    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload
    // },
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default currencySlice.reducer;