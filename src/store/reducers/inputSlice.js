import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  value: '',
  isFocused: false,
}

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    changeValue(state, action) {
      state.value = action.payload
    },
    toggleFocused(state) {
      state.isFocused = !state.isFocused
    }
  }
})

export default inputSlice.reducer
