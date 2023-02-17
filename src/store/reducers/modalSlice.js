import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isErrorModalOpened: false,
  errorMessage: ''
}

export const modalSlice = createSlice({
  name: 'error-modal',
  initialState,
  reducers: {
    showModal(state, action) {
      state.isErrorModalOpened = true;
      state.errorMessage = action.payload;
    },
    hideModal(state) {
      state.isErrorModalOpened = false
      state.errorMessage = ''
    }
  }
})

export default modalSlice.reducer
