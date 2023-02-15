import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isRequestCheck: false,
  isErrorCheck: false,
  audioLink: '',
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    backToInput(state) {
      state.isRequestCheck = false
      state.isErrorCheck = false
      state.audioLink = ''
    },
    checkingAudioRequest(state) {
      state.isRequestCheck = true
      state.isErrorCheck = false
      state.audioLink = '';
    },
    checkingAudioSuccess(state, action) {
      state.isRequestCheck = false
      state.isErrorCheck = false
      state.audioLink = action.payload;
    },
    checkingAudioError(state) {
      state.isRequestCheck = false
      state.isErrorCheck = true
      state.audioLink = '';
    }
  }
})

export default audioSlice.reducer
