import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  value: '',
}

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    changeValue(state, action) {
      state.value = action.payload
    }
  }
})

export default inputSlice.reducer
