import { createSlice } from "@reduxjs/toolkit";

interface chartState {
  selectedCoin: string;
  selectedDays: number;
}

const initialState: chartState = {
  selectedCoin: "bitcoin",
  selectedDays: 1,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDays = action.payload;
    },
  },
});

export const { setSelectedCoin, setSelectedDate } = chartSlice.actions;
export default chartSlice.reducer;
