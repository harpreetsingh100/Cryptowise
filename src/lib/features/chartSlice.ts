import { createSlice } from "@reduxjs/toolkit";

interface chartState {
  selectedCoin: string;
  selectedCoinTwo: string;
  selectedCoinThree: string;
  selectedDays: number;
}

const initialState: chartState = {
  selectedCoin: "bitcoin",
  selectedCoinTwo: "",
  selectedCoinThree: "",
  selectedDays: 1,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    setSelectedCoinTwo: (state, action) => {
      state.selectedCoinTwo = action.payload;
    },
    setSelectedCoinThree: (state, action) => {
      state.selectedCoinThree = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDays = action.payload;
    },
  },
});

export const {
  setSelectedCoin,
  setSelectedCoinTwo,
  setSelectedCoinThree,
  setSelectedDate,
} = chartSlice.actions;
export default chartSlice.reducer;
