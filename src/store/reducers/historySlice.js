import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  history: [],
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory(state, action) {
      if (state.history.length === 5) {
        state.history = state.history.slice(1, state.history.length);
      }
      state.history.push(action.payload);
    }
  }
});

export default historySlice.reducer
